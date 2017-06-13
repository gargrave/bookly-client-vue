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
import { mapGetters } from 'vuex'

import { localUrls } from '../../../globals/urls'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import AuthorCard from '../components/AuthorListCard'
import AuthorContainerMixin from '../mixins/AuthorContainerMixin'

export default {
  mixins: [
    AuthorContainerMixin
  ],

  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appAuthorCard: AuthorCard
  },

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
    /** Callback for 'add new author' button click event */
    onAddClick () {
      this.$router.push(localUrls.authorCreate)
    },

    /** Callback for clicking on a Author card: routes to that Author's details page. */
    onAuthorClick ({ id }, event) {
      if (Number.isInteger(id)) {
        this.$router.push(`${localUrls.authorsList}/${id}`)
      }
    }
  }
}
</script>
