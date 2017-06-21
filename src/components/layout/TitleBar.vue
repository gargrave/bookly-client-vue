<template>
  <div class="toolbar">

    <button
      class="hide-on-drawer-visible"
      @click="$emit('toggleDrawer')">
      <i>menu</i>
    </button>

    <div class="toolbar-content">

      <span class="toolbar-element toolbar-title">Bookly</span>

      <!-- toolbar links; only shown on lg sizes -->
      <span
        class="toolbar-links gt-sm inline"
        v-if="isLoggedIn">
        <router-link
          class="toolbar-element toolbar-link"
          active-class="toolbar-link-active"
          :to="{ name: routes.books.list }">
          Books
        </router-link>

        <router-link
          class="toolbar-element toolbar-link"
          active-class="toolbar-link-active"
          :to="{ name: routes.authors.list }">
          Authors
        </router-link>
      </span>

    </div><!-- /toolbar-content -->

  </div><!-- /toolbar -->
</template>

<script>
import { mapGetters } from 'vuex'

import { routes } from '../../globals/urls'

export default {
  data () {
    return {
      routes // expose to template
    }
  },

  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
