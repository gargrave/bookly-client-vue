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

import { localUrls } from '../../../globals/urls'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import ContainerMixin from '../../mixins/ContainerMixin'
import BookCard from '../components/BookListCard'
import BookMixin from '../mixins/BookMixin'

export default {
  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appBookCard: BookCard
  },

  mixins: [
    ContainerMixin,
    BookMixin
  ],

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

    ...mapActions([
      'checkForStoredLogin',
      'getCachedOrFetchBooks'
    ])
  }
}
</script>
