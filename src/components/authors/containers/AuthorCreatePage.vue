<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create a Author
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-author-form
              :working="working"
              :errors="errors"
              :author="model"
              :handleInput="handleInput"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-author-form>
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
import AuthorModel from '../../../models/author'
import { validate } from '../utils/authorValidator'

import AuthorForm from '../components/AuthorForm'

export default {
  components: {
    appAuthorForm: AuthorForm
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // model for new instance
    model: AuthorModel.empty(),
    // local validation errors
    errors: AuthorModel.empty()
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
      const author = AuthorModel.toAPI(this.model)
      const { errors, valid } = validate(author)

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Author...' })

        this.createAuthor(author)
          .then(res => {
            toasts.createConfirm('Author')
            this.$router.push(`${localUrls.authorsList}/${res.id}`)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.authorsList)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'createAuthor'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        // if logged in, no further action needed
        this.initializing = false
        Loading.hide()
      }, () => {
        this.$router.push(localUrls.login)
      })
  }
}
</script>
