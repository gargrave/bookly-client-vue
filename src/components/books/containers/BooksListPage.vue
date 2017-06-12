<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center">
        <!-- 'add a book' button -->
        <button
          class="list-view-add-button positive shadow-1"
          @click="onAddClick">
          Add a Book
        </button>
      </div><!-- /row -->

      <section v-if="initializing">
        <app-initializing-card></app-initializing-card>
      </section>

      <section v-else>
        <section v-if="books.length">
          <div
            class="row justify-center"
            v-for="book in books">
            <app-book-card
              :book="book"
              @click="onBookClick">
            </app-book-card>
          </div><!-- /row -->
        </section>

        <app-empty-list-card
          v-else
          itemName="Books">
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
import BookCard from '../components/BookListCard'

export default {
  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appBookCard: BookCard
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
      return this.initializing || this.working || this.booksAjaxPending
    },

    ...mapGetters([
      'booksAjaxPending',
      'books'
    ])
  },

  methods: {
    /** Queries the store to update the local list of Books */
    rebuildBooksList () {
      this.apiError = ''
      this.working = true
      Loading.show({ message: 'Loading...' })

      this.getCachedOrFetchBooks()
        .then(() => {
          this.working = false
          this.initializing = false
          Loading.hide()
        }, err => { this.onError(err) })
    },

    /** Callback for 'add new book' button click event */
    onAddClick () {
      this.$router.push(localUrls.bookCreate)
    },

    /** Callback for clicking on a Book card: routes to that Book's details page. */
    onBookClick ({ id }, event) {
      if (Number.isInteger(id)) {
        this.$router.push(`${localUrls.booksList}/${id}`)
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
      'getCachedOrFetchBooks'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.rebuildBooksList()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        Loading.hide()
      })
  }
}
</script>
