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
              @click="onInstanceClick">
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
import { mapGetters } from 'vuex'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import ListViewMixin from '../../mixins/ListViewMixin'
import AuthorCard from '../components/AuthorListCard'
import AuthorContainerMixin from '../mixins/AuthorContainerMixin'

export default {
  mixins: [
    AuthorContainerMixin,
    ListViewMixin
  ],

  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appAuthorCard: AuthorCard
  },

  data: () => ({
    routeName: 'authors'
  }),

  computed: {
    isWorking () {
      return this.initializing || this.working || this.authorsAjaxPending
    },

    ...mapGetters([
      'authorsAjaxPending',
      'authors'
    ])
  }
}
</script>
