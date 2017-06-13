<script>
import { mapActions } from 'vuex'

import { localUrls } from '../../../globals/urls'

import ContainerMixin from '../../mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  methods: {
    /**
     * Queries the store to update the local list of Authors
     **/
    rebuildAuthorsList () {
      this.enterWorkingState()
      this.getCachedOrFetchAuthors()
        .then(() => {
          this.exitWorkingState()
        }, err => {
          this.onError(err)
        })
    },

    /**
     * Callback hook for after the user has been confirmed to be authenticated
     * in the created hook.
     *
     * By default, simply loads the list of the User's Authors.
     */
    afterCreatedLoggedIn () {
      this.rebuildAuthorsList()
    },

    /**
     * Callback hook for after the user has been confirmed to be NOT authenticated
     * in the created hook.
     *
     * By default, simply redirects to the Login page.
     */
    afterCreatedNotLoggedIn () {
      this.$router.push(localUrls.login)
      this.exitWorkingState()
    },

    ...mapActions([
      'getCachedOrFetchAuthors'
    ])
  },

  created () {
    this.enterWorkingState()
    this.checkForStoredLogin()
      .then(() => {
        this.afterCreatedLoggedIn()
      }, () => {
        this.afterCreatedNotLoggedIn()
      })
  }
}
</script>
