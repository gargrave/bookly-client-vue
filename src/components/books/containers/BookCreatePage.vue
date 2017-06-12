<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create a Book
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-book-form
              :working="working"
              :errors="errors"
              :book="model"
              :authors="authors"
              :handleInput="handleInput"
              :handleSelect="handleSelect"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-book-form>
          </div><!-- /card-content -->

        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import BookModel from '../../../models/book'
import { validate } from '../utils/bookValidator'

import BookForm from '../components/BookForm'

export default {
  components: {
    appBookForm: BookForm
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // model for new instance
    model: BookModel.empty(),
    // local validation errors
    errors: BookModel.emptyErrors()
  }),

  computed: {
    ...mapGetters([
      'authors'
    ])
  },

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.model) {
        this.model[key] = e.target.value
      }
    },

    /** callback for handling changes to select fields */
    handleSelect (value) {
      this.model.author = value
    },

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const book = BookModel.toAPI(this.model)
      const { errors, valid } = validate(book)

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Book...' })

        this.createBook(book)
          .then(res => {
            toasts.createConfirm('Book')
            this.$router.push(`${localUrls.booksList}/${res.id}`)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.booksList)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'createBook'
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
