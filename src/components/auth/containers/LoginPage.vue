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
              @cancelled="onBackClick">
            </app-login-form>

            <!-- password reset link -->
            <p class="pw-reset-notice">
              Forgot your password?
              <router-link :to="{ name: routes.auth.pwReset }">Click here to reset it.</router-link>
            </p>

          </div><!-- /card-content -->
        </div><!-- /card -->
      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

import toasts from '../../../globals/toasts'
import { localUrls, routes } from '../../../globals/urls'
import UserLoginModel from '../../../models/userLogin'

import { validate } from '../utils/userLoginValidator'

import ContainerMixin from '../../mixins/ContainerMixin'
import ModelViewMixin from '../../mixins/ModelViewMixin'

import LoginForm from '../components/LoginForm'

export default {
  mixins: [
    ContainerMixin,
    ModelViewMixin
  ],

  components: {
    appLoginForm: LoginForm
  },

  data: () => ({
    routes, // expose to template
    config: {
      listRoute: localUrls.register
    }
  }),

  methods: {
    getBaseModel: () => UserLoginModel,

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    async onFormSubmitted (value) {
      const userData = UserLoginModel.toAPI(this.model)
      const { errors, valid } = validate(userData)
      this.errors = errors

      if (valid) {
        this.enterWorkingState()

        try {
          await this.login(userData)
          toasts.success('Log In')
          this.$router.push(localUrls.booksList)
          this.exitWorkingState()
        } catch (err) {
          this.onError(err)
        }
      }
    },

    ...mapActions([
      'login'
    ])
  },

  async created () {
    try {
      this.enterWorkingState()
      await this.checkForStoredLogin()
      this.$router.push(localUrls.authorsList)
    } catch (err) {
      // if not logged in, we are in the right place!
      this.exitWorkingState()
    }
  }
}
</script>

<style scoped>
p.pw-reset-notice {
  margin: 0;
  margin-top: 12px;
  padding: 2px;
  font-size: .9rem;
  text-align: left;
}
</style>
