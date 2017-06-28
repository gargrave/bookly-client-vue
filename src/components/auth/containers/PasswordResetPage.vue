<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">
          <div class="card-title bg-primary text-white">
            Reset Password
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiSuccessMsg" class="alert alert-success">Success! {{ apiSuccessMsg }}</p>
            <p v-if="apiError" class="alert alert-danger">Error: {{ apiError }}</p>

            <p>Enter and confirm your new password below.</p>
            <hr>

            <app-pw-form
              :working="working || !!apiSuccessMsg"
              :errors="errors"
              :model="model"
              :handleInput="handleInput"
              @submitted="handleFormSubmission">
            </app-pw-form>

          </div><!-- /card-content -->
        </div><!-- /card -->


      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import { Loading } from 'quasar'

import toasts from '../../../globals/toasts'
import { validatePasswords } from '../utils/userRegisterValidator'

import ContainerMixin from '../../mixins/ContainerMixin'
import ModelViewMixin from '../../mixins/ModelViewMixin'
import PasswordResetForm from '../components/PasswordResetForm'

export default {
  mixins: [
    ContainerMixin,
    ModelViewMixin
  ],

  components: {
    appPwForm: PasswordResetForm
  },

  data: () => ({
    apiSuccessMsg: '',
    token: null
  }),

  methods: {
    getBaseModel: () => {
      return {
        empty: () => ({
          password: '',
          passwordConfirm: ''
        })
      }
    },

    async handleFormSubmission () {
      const payload = {
        password: this.model.password,
        passwordConfirm: this.model.passwordConfirm
      }
      const { errors, valid } = validatePasswords(payload)
      this.errors = errors

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Sending request...' })

        try {
          await this.submitPasswordReset(payload)
          this.handleRequestSuccess()
        } catch (err) {
          this.onError(err)
        }
      }
    },

    handleRequestSuccess () {
      toasts.success('Password update')
      this.apiSuccessMsg = 'Password successfully updated. You can now log in with your new password.'
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'submitPasswordReset'
    ])
  },

  created () {
    this.token = this.$route.query.token
    if (!this.token) {
      this.$router.push('/')
    }
  }
}
</script>
