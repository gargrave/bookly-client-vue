<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create an Author
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
import AuthorContainerMixin from '../mixins/AuthorContainerMixin'

export default {
  mixins: [
    AuthorContainerMixin
  ],

  components: {
    appAuthorForm: AuthorForm
  },

  data: () => ({
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
            this.exitWorkingState()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.authorsList)
    },

    ...mapActions([
      'createAuthor'
    ])
  }
}
</script>
