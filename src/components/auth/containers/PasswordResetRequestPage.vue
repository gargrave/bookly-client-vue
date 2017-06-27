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

            <p>Enter your email below and you will receive a link to reset your password.</p>
            <hr>

            <app-pw-form
              :working="working || !!apiSuccessMsg"
              :errors="errors"
              :userData="model"
              :handleInput="handleInput"
              @submitted="handleFormSubmission"
              @cancelled="onBackClick">
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

import { localUrls } from '../../../globals/urls'
import { validateEmail } from '../utils/userLoginValidator'

import ContainerMixin from '../../mixins/ContainerMixin'
import ModelViewMixin from '../../mixins/ModelViewMixin'
import PasswordResetRequestForm from '../components/PasswordResetRequestForm'

export default {
  mixins: [
    ContainerMixin,
    ModelViewMixin
  ],

  components: {
    appPwForm: PasswordResetRequestForm
  },

  data: () => ({
    apiSuccessMsg: '',
    config: {
      listRoute: localUrls.login
    }
  }),

  methods: {
    getBaseModel: () => {
      return {
        empty: () => ({ email: '' })
      }
    },

    async handleFormSubmission () {
      const payload = { email: this.model.email }
      const { errors, valid } = validateEmail(payload)
      this.errors = errors

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Sending request...' })

        try {
          await this.requestPasswordReset(payload)
          this.handleRequestSuccess()
        } catch (err) {
          this.onError(err)
        }
      }
    },

    handleRequestSuccess () {
      this.apiSuccessMsg = 'A password reset link will be emailed to you shortly.'
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'requestPasswordReset'
    ])
  }
}
</script>
