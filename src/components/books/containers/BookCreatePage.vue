<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create a Book
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="alert alert-danger">Error: {{ apiError }}</p>
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
import BookContainerMixin from '../mixins/BookContainerMixin'

export default {
  components: {
    appBookForm: BookForm
  },

  mixins: [
    BookContainerMixin
  ],

  data: () => ({
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
      this.model.author.id = value
    },

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const book = BookModel.toAPI(this.model)
      const { errors, valid } = validate(book)
      this.errors = errors

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Book...' })

        this.createBook(book)
          .then(res => {
            toasts.createConfirm('Book')
            this.$router.push(`${localUrls.booksList}/${res.id}`)
            this.exitWorkingState()
          }, err => { this.onError(err) })
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.booksList)
    },

    ...mapActions([
      'createBook'
    ])
  }
}
</script>
