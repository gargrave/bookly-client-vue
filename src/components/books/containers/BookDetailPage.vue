<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            {{ originalModel.title }}
          </div><!-- /card-title -->

          <app-book-edit-view
            v-if="editing"
            :working="working"
            :apiError="apiError"
            :book="model"
            :errors="errors"
            :handleInput="handleInput"
            :handleSelect="handleSelect"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-book-edit-view>

          <app-book-detail-view
            v-else
            :book="originalModel"
            @editClicked="onEditClick"
            @backClicked="onBackClick">
          </app-book-detail-view>

        </div><!-- /card -->

      </div><!-- /row -->

      <div
        v-if="editing"
        class="row justify-center">
        <div class="card">
          <div class="card-content">
            <button
              class="negative full-width"
              @click="onDeleteClick">
              Delete
            </button>
          </div>
        </div><!-- /card -->
      </div><!-- /row -->

    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import { cloneDeep } from 'lodash'

import dialogs from '../../../globals/dialogs'
import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import BookModel from '../../../models/book'
import { areEqual, validate } from '../utils/bookValidator'

import BookDetailView from '../components/BookDetailView'
import BookEditView from '../components/BookEditView'

export default {
  components: {
    appBookDetailView: BookDetailView,
    appBookEditView: BookEditView
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // whether we are in editing or viewing mode
    editing: false,
    // the working copy of the instance
    model: BookModel.empty(),
    // the untouched copy of the original instance
    originalModel: BookModel.empty(),
    // local validation errors
    errors: BookModel.emptyErrors()
  }),

  computed: {
    isWorking () {
      return this.working || this.editingBooksAjaxPending
    },

    ...mapGetters([
      'booksAjaxPending'
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

    /** Callback for clicking the 'edit' button; simply change to 'editing' state. */
    onEditClick () {
      this.model = cloneDeep(this.originalModel)
      this.editing = true
    },

    /** Callback for clicking the 'back' button; simply return to list page. */
    onBackClick () {
      this.$router.push(localUrls.booksList)
    },

    /** Callback for clicking the 'delete' button; send a request to delete this object. */
    onDeleteClick () {
      dialogs.confirmDelete('Book', () => {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Deleting Book...' })

        this.deleteBook(this.model.id)
          .then(() => {
            toasts.deleteConfirm('Book')
            this.$router.push(localUrls.booksList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      })
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const book = BookModel.toAPI(this.model)
      const hasChanges = !areEqual(book, this.originalModel)
      const { errors, valid } = validate(book)

      if (valid && hasChanges) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Book...' })

        this.updateBook(book)
          .then(() => {
            toasts.updateConfirm('Book')
            this.$router.push(localUrls.booksList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        if (!hasChanges) {
          toasts.noChanges()
        }
        this.errors = errors
      }
    },

    /**
     * Callback for 'cancel' button on form;
     * cancel the 'editing' state and revert the model.
     */
    onFormCancelled (value, event) {
      this.model = cloneDeep(this.originalModel)
      this.editing = false
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'findBook',
      'updateBook',
      'deleteBook'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        const bookId = this.$route.params.id
        if (!bookId) {
          this.$router.push(localUrls.booksList)
        } else {
          this.findBook(bookId)
            .then(bookRes => {
              this.model = cloneDeep(bookRes)
              this.originalModel = cloneDeep(bookRes)
              this.working = false
              this.initializing = false
              Loading.hide()
            }, () => {
              // if no valid instance, return to the List view
              this.$router.push(localUrls.booksList)
            })
        }
      }, err => { this.onError(err) })
  }
}
</script>
