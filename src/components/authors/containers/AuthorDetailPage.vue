<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            {{ originalModel.firstName }} {{ originalModel.lastName }}
          </div><!-- /card-title -->

          <app-author-edit-view
            v-if="editing"
            :working="working"
            :apiError="apiError"
            :author="model"
            :errors="errors"
            :handleInput="handleInput"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-author-edit-view>

          <app-author-detail-view
            v-else
            :author="originalModel"
            @editClicked="onEditClick"
            @backClicked="onBackClick">
          </app-author-detail-view>

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
import AuthorModel from '../../../models/author'
import { areEqual, validate } from '../utils/authorValidator'

import DetailViewMixin from '../../mixins/DetailViewMixin'
import AuthorDetailView from '../components/AuthorDetailView'
import AuthorEditView from '../components/AuthorEditView'
import AuthorContainerMixin from '../mixins/AuthorContainerMixin'

export default {
  mixins: [
    AuthorContainerMixin,
    DetailViewMixin
  ],

  components: {
    appAuthorDetailView: AuthorDetailView,
    appAuthorEditView: AuthorEditView
  },

  data: () => ({
    config: {
      modelName: 'Author',
      listRoute: localUrls.authorsList
    }
  }),

  computed: {
    isWorking () {
      return this.working || this.editingAuthorsAjaxPending
    },

    ...mapGetters([
      'authorsAjaxPending'
    ])
  },

  methods: {
    getBaseModel: () => AuthorModel,

    /** Callback for clicking the 'delete' button; send a request to delete this object. */
    onDeleteClick () {
      dialogs.confirmDelete(this.config.modelName, () => {
        this.working = true
        this.apiError = ''
        Loading.show({ message: `Deleting ${this.config.modelName}...` })

        this.deleteAuthor(this.model.id)
          .then(() => {
            toasts.deleteConfirm(this.config.modelName)
            this.$router.push(this.config.listRoute)
            this.exitWorkingState()
          }, err => { this.onError(err) })
      })
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const author = AuthorModel.toAPI(this.model)
      const hasChanges = !areEqual(author, this.originalModel)
      const { errors, valid } = validate(author)

      if (valid && hasChanges) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Author...' })

        this.updateAuthor(author)
          .then(() => {
            toasts.updateConfirm('Author')
            this.$router.push(localUrls.authorsList)
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
     * Custom hook to attempt to load the information for the specified Author (by ID).
     * If the Author is not found, redirect back to the Authors list view.
     */
    afterCreatedLoggedIn () {
      const authorId = this.$route.params.id
      if (!authorId) {
        this.$router.push(localUrls.authorsList)
      } else {
        this.findAuthor(authorId)
          .then(authorRes => {
            this.model = cloneDeep(authorRes)
            this.originalModel = cloneDeep(authorRes)
            this.exitWorkingState()
          }, () => {
            // if no valid instance, return to the List view
            this.$router.push(localUrls.authorsList)
          })
      }
    },

    ...mapActions([
      'findAuthor',
      'updateAuthor',
      'deleteAuthor'
    ])
  }
}
</script>
