<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">
        <div class="card">

          <div class="card-title bg-primary text-white">
            Sign Up
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-register-form
              :working="working"
              :errors="errors"
              :user="user"
              :handleInput="handleInput"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-register-form>
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
import { localUrls } from '../../../globals/urls'
import UserRegisterModel from '../../../models/userRegister'
import { validate } from '../utils/userRegisterValidator'

import RegisterForm from '../components/RegisterForm'

export default {
  components: {
    appRegisterForm: RegisterForm
  },

  data () {
    return {
      // whether any operations are currently running
      working: false,
      // error messages returned from API (e.g. invalid login)
      apiError: '',
      // model for registration data
      user: UserRegisterModel.empty(),
      // form validation errors (if any)
      errors: UserRegisterModel.empty()
    }
  },

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.user) {
        this.user[key] = e.target.value
      }
    },

    /**
     * Attempts to submit the current user data to the API to create a new user.
     */
    onFormSubmitted (value, event) {
      const user = UserRegisterModel.toAPI(this.user)
      const { errors, valid } = validate(user)

      if (valid) {
        this.working = true
        Loading.show({ message: 'Creating Account...' })

        this.createUser(user)
          .then(() => {
            toasts.createConfirm('Account')
            this.$router.push(localUrls.account)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.login)
    },

    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'createUser'
    ])
  },

  created () {
    // if we already logged in, redirect to account/profile page
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.$router.push(localUrls.account)
        this.working = false
        Loading.hide()
      }, err => { this.onError(err) })
  }
}
</script>
