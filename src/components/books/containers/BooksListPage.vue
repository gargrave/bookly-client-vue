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
              @click="onInstanceClick">
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
import { mapGetters } from 'vuex'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import ListViewMixin from '../../mixins/ListViewMixin'
import BookCard from '../components/BookListCard'
import BookContainerMixin from '../mixins/BookContainerMixin'

export default {
  mixins: [
    BookContainerMixin,
    ListViewMixin
  ],

  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appBookCard: BookCard
  },

  data: () => ({
    routeName: 'books'
  }),

  computed: {
    isWorking () {
      return this.initializing || this.working || this.booksAjaxPending
    },

    ...mapGetters([
      'booksAjaxPending',
      'books'
    ])
  }
}
</script>
