<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center">
        <!-- 'add a author' button -->
        <button
          class="list-view-add-button positive shadow-1"
          @click="onAddClick">
          Add an Author
        </button>
      </div><!-- /row -->

      <section v-if="initializing">
        <app-initializing-card></app-initializing-card>
      </section>

      <section v-else>
        <section v-if="authors.length">
          <div
            class="row justify-center"
            v-for="author in authors">
            <app-author-card
              :author="author"
              @click="onAuthorClick">
            </app-author-card>
          </div><!-- /row -->
        </section>

        <app-empty-list-card
          v-else
          itemName="Authors">
        </app-empty-list-card>
      </section>

    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'

import { localUrls } from '../../../globals/urls'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import AuthorCard from '../components/AuthorListCard'

export default {
  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appAuthorCard: AuthorCard
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: ''
  }),

  computed: {
    isWorking () {
      return this.initializing || this.working || this.authorsAjaxPending
    },

    ...mapGetters([
      'authorsAjaxPending',
      'authors'
    ])
  },

  methods: {
    /** Queries the store to update the local list of Authors */
    rebuildAuthorsList () {
      this.apiError = ''
      this.working = true
      Loading.show({ message: 'Loading...' })

      this.getCachedOrFetchAuthors()
        .then(() => {
          this.working = false
          this.initializing = false
          Loading.hide()
        }, err => { this.onError(err) })
    },

    /** Callback for 'add new author' button click event */
    onAddClick () {
      this.$router.push(localUrls.authorCreate)
    },

    /** Callback for clicking on a Author card: routes to that Author's details page. */
    onAuthorClick ({ id }, event) {
      if (Number.isInteger(id)) {
        this.$router.push(`${localUrls.authorsList}/${id}`)
      }
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      console.log('err')
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'getCachedOrFetchAuthors'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.rebuildAuthorsList()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        Loading.hide()
      })
  }
}
</script>
