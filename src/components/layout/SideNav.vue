<template>
  <q-drawer ref="drawer">
    <div class="list platform-delimiter">

      <div class="item drawer-closer drawer-title" exact="">
        <i class="item-primary">view_quilt</i>
        <div class="item-content drawer-title-text">
          Bookly
        </div>
      </div>

      <div v-if="isLoggedIn" class="drawer-links-loggedin-nav">
        <hr>
        <div class="list-label">Navigation</div>

        <q-drawer-link
          icon="games"
          :to="{ name: routes.books.list }">
          My Books
        </q-drawer-link>

        <q-drawer-link
          icon="radio"
          :to="{ name: routes.authors.list }">
          My Authors
        </q-drawer-link>
      </div>

      <hr>
      <div class="list-label">Account</div>

      <div v-if="isLoggedIn" class="drawer-links-loggedin-auth">
        <q-drawer-link
          icon="account_circle"
          :to="{ name: routes.auth.detail }">
          My Account
        </q-drawer-link>
      </div>

      <div v-else class="drawer-links-notloggedin-login">

        <!-- link to "register" page -->
        <router-link
          class="item item-link drawer-closer drawer-link drawer-link-login"
          active-class="router-link-active"
          :to="{ name: routes.auth.login }">
          <i class="item-primary">account_circle</i>
          <div class="item-content">Log In</div>
        </router-link>

        <!-- link to "register" page -->
        <router-link
          class="item item-link drawer-closer drawer-link drawer-link-register"
          active-class="router-link-active"
          :to="{ name: routes.auth.register }">
          <i class="item-primary">add_circle_outline</i>
          <div class="item-content">Sign Up</div>
        </router-link>

      </div><!-- /drawer-links-notloggedin-login -->

      <hr>
      <div class="drawer-links-about">
        <!-- link to "about" page -->
        <router-link
          class="item item-link drawer-closer drawer-link drawer-link-about"
          active-class="router-link-active"
          :to="{ name: routes.common.about }">
          <i class="item-primary">info_outline</i>
          <div class="item-content">About Bookly</div>
        </router-link>
      </div>

    </div>
  </q-drawer>
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

  methods: {
    open () {
      this.$refs.drawer.toggle()
    }
  },

  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
