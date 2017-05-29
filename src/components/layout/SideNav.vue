<template>
  <q-drawer ref="drawer">
    <div class="list platform-delimiter">

      <div class="item drawer-closer" exact="">
        <i class="item-primary">view_quilt</i>
        <div class="item-content">
          Bookly
        </div>
      </div>

      <div v-if="isLoggedIn">
        <hr>
        <div class="list-label">Navigation</div>

        <q-drawer-link
          icon="games"
          :to="{ name: routes.games.list }">
          My Games
        </q-drawer-link>

        <q-drawer-link
          icon="radio"
          :to="{ name: routes.platforms.list }">
          My Platforms
        </q-drawer-link>
      </div>

      <hr>
      <div class="list-label">Account</div>

      <div v-if="isLoggedIn">
        <q-drawer-link
          icon="account_circle"
          :to="{ name: routes.auth.detail }">
          My Account
        </q-drawer-link>
      </div>

      <div v-else>
        <q-drawer-link
          icon="account_circle"
          :to="{ name: routes.auth.login }">
          Log In
        </q-drawer-link>
        <q-drawer-link
          icon="add_circle_outline"
          :to="{ name: routes.auth.create }">
          Sign Up
        </q-drawer-link>
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
