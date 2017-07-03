<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">
        <div class="card">

          <div class="card-title bg-primary text-white">
            Sign Up
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="alert alert-danger">Error: {{ apiError }}</p>
            <app-register-form
              :working="working"
              :errors="errors"
              :user="model"
              :handleInput="handleInput"
              @submitted="onFormSubmitted"
              @cancelled="onBackClick">
            </app-register-form>
          </div><!-- /card-content -->

        </div><!-- /card -->
      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import UserRegisterModel from '../../../models/userRegister'

import { validate } from '../utils/userRegisterValidator'

import ContainerMixin from '../../mixins/ContainerMixin'
import ModelViewMixin from '../../mixins/ModelViewMixin'

import RegisterForm from '../components/RegisterForm'

export default {
  mixins: [
    ContainerMixin,
    ModelViewMixin
  ],

  components: {
    appRegisterForm: RegisterForm
  },

  data () {
    return {
      config: {
        listRoute: localUrls.login
      }
    }
  },

  methods: {
    getBaseModel: () => UserRegisterModel,

    /**
     * Attempts to submit the current user data to the API to create a new user.
     */
    async onFormSubmitted (value, event) {
      const payload = UserRegisterModel.toAPI(this.model)
      const { errors, valid } = validate(payload)

      if (valid) {
        this.enterWorkingState()

        try {
          await this.register(payload)
          toasts.createConfirm('Account')
          this.$router.push(localUrls.account)
          this.exitWorkingState()
        } catch (err) {
          this.onError(err)
        }
      } else {
        this.errors = errors
      }
    },

    ...mapActions([
      'register'
    ])
  },

  async created () {
    try {
      this.enterWorkingState()
      await this.checkForStoredLogin()
      // if we already logged in, redirect to account/profile page
      this.$router.push(localUrls.account)
    } catch (err) {
      // if not logged in, we are in the right place!
      this.exitWorkingState()
    }
  }
}
</script>
