<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            My Profile
          </div><!-- /card-title -->

          <app-account-detail-view
            :userData="userData"
            :profile="{}"
            @editClicked="onEditClick"
            @logoutClicked="onLogoutClick">
          </app-account-detail-view>

        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading, Toast } from 'quasar'

import { localUrls } from '../../../globals/urls'

import AccountDetailView from '../components/AccountDetailView'

export default {
  components: {
    appAccountDetailView: AccountDetailView
  },

  data () {
    return {
      initializing: true,
      // whether any operations are currently running
      working: false,
      // error messages returned from API (e.g. invalid data)
      apiError: '',
      // whether we are in editing or viewing mode
      editing: false
    }
  },

  computed: {
    ...mapGetters([
      'userData',
      'profile'
    ])
  },

  methods: {
    /**
     * Callback for clicking the 'edit' button; simply change to 'editing' state.
     */
    onEditClick () {
      this.editing = true
    },

    /**
     * Callback for clicking the 'logout' button; simply logout.
     */
    onLogoutClick () {
      this.working = true
      Loading.show({ message: 'Logging out...' })

      this.logout()
        .then(() => {
          Toast.create.info('Logged out!')
          this.$router.push(localUrls.login)
          this.working = false
          Loading.hide()
        })
    },

    ...mapActions([
      'checkForStoredLogin',
      'logout'
    ])
  },

  created () {
    // redirect to login page if not logged in
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.working = false
        this.initializing = false
        Loading.hide()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        this.initializing = false
        Loading.hide()
      })
  }
}
</script>
