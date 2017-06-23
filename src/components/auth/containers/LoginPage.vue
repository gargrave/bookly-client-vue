<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Log In
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="alert alert-danger">Error: {{ apiError }}</p>
            <app-login-form
              :working="working"
              :errors="errors"
              :userData="model"
              :handleInput="handleInput"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-login-form>
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
import UserLoginModel from '../../../models/userLogin'
import { validate } from '../utils/userLoginValidator'

import LoginForm from '../components/LoginForm'

export default {
  components: {
    appLoginForm: LoginForm
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // model for new instance
    model: UserLoginModel.empty(),
    // local validation errors
    errors: UserLoginModel.empty()
  }),

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.model) {
        this.model[key] = e.target.value
      }
    },

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const userData = UserLoginModel.toAPI(this.model)
      const { errors, valid } = validate(userData)
      this.errors = errors

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Logging in...' })

        this.login(userData)
          .then(res => {
            toasts.success('Log In')
            this.$router.push(localUrls.booksList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.register)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'login'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.$router.push(localUrls.authorsList)
      }, () => {
        // if not logged in, we are in the right place!
        this.initializing = false
        Loading.hide()
      })
  }
}
</script>
