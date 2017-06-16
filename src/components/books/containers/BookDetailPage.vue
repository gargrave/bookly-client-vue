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

import DetailViewMixin from '../../mixins/DetailViewMixin'
import BookDetailView from '../components/BookDetailView'
import BookEditView from '../components/BookEditView'
import BookContainerMixin from '../mixins/BookContainerMixin'

export default {
  components: {
    appBookDetailView: BookDetailView,
    appBookEditView: BookEditView
  },

  mixins: [
    BookContainerMixin,
    DetailViewMixin
  ],

  data: () => ({
    config: {
      modelName: 'Book',
      listRoute: localUrls.booksList
    }
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
    getBaseModel: () => BookModel,

    /** callback for handling changes to select fields */
    handleSelect (value) {
      this.model.author.id = value
    },

    /** Callback for clicking the 'delete' button; send a request to delete this object. */
    onDeleteClick () {
      dialogs.confirmDelete(this.config.modelName, () => {
        this.working = true
        this.apiError = ''
        Loading.show({ message: `Deleting ${this.config.modelName}...` })

        this.deleteBook(this.model.id)
          .then(() => {
            toasts.deleteConfirm(this.config.modelName)
            this.$router.push(this.config.listRoute)
            this.exitWorkingState()
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
        Loading.show({ message: `Saving ${this.config.modelName}...` })

        this.updateBook(book)
          .then(() => {
            toasts.updateConfirm(this.config.modelName)
            this.$router.push(this.config.listRoute)
            this.exitWorkingState()
          }, err => { this.onError(err) })
      } else {
        if (!hasChanges) {
          toasts.noChanges()
        }
        this.errors = errors
      }
    },

    /**
     * Custom hook to attempt to load the information for the specified book (by ID).
     * If the Book is not found, redirect back to the Books list view.
     */
    afterCreatedLoggedIn () {
      const bookId = this.$route.params.id
      if (!bookId) {
        this.$router.push(localUrls.booksList)
      } else {
        this.findBook(bookId)
          .then(bookRes => {
            this.model = cloneDeep(bookRes)
            this.originalModel = cloneDeep(bookRes)
            this.originalModel.authorId = this.originalModel.author.id
            this.exitWorkingState()
          }, () => {
            // if no valid instance, return to the List view
            this.$router.push(localUrls.booksList)
          })
      }
    },

    ...mapActions([
      'findBook',
      'updateBook',
      'deleteBook'
    ])
  }
}
</script>
