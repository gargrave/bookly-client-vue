<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card index-page-card">

        <div class="card-title bg-primary text-white">
          Welcome to Bookly!
        </div><!-- /card-title -->

        <div class="card-content" v-if="isLoggedIn">
          <p>
            The <em>only</em> place on the Internet where you can track your favorite
            authors <em>and</em> their books!
          </p>

          <hr>
          <p>You are currently logged in as <strong>{{ userData.email }}</strong>.</p>

          <hr>
          <p>Looking for something to do?</p>
          <br>

          <p>
            Create a new
            <router-link :to="{ name: routes.authors.create }">Author</router-link>
            or
            <router-link :to="{ name: routes.books.create }">Book</router-link>.
          </p>

          <p>
            View your existing
            <router-link :to="{ name: routes.authors.list }">Authors</router-link>
            or
            <router-link :to="{ name: routes.books.list }">Books</router-link>.
          </p>

          <p>
            View your
            <router-link :to="{ name: routes.auth.detail }">Account</router-link>.
          </p>

        </div><!-- /card-content -->

        <div class="card-content" v-else>
          <p>
            The <em>only</em> place on the Internet where you can track your favorite authors <em>and</em> their books!
          </p>
          <p>
            While other apps will only let you track authors, we have cracked the technology required to
            keep track of books as well, so prepare yourself for a truly next-gen experience!
          </p>

          <hr>

          <p>Log in or sign up to get started!</p>

          <p>
            <button
              class="primary"
              @click="$router.push(localUrls.account)">
              Log In
            </button>
            <button
              class="secondary"
              @click="$router.push(localUrls.register)">
              Sign Up
            </button>
          </p>
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapGetters } from 'vuex'

import { localUrls, routes } from '../globals/urls'

import ContainerMixin from './mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  data () {
    return {
      localUrls, // expose to template
      routes // expose to template
    }
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'userData'
    ])
  },

  created () {
    this.enterWorkingState()
    this.checkForStoredLogin()
      .then(
        () => this.exitWorkingState(),
        () => this.exitWorkingState()
      )
  }
}
</script>
