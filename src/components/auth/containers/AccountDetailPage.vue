<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center" v-if="userData.verified === false">
        <div class="card">
          <div class="card-title bg-negative text-white">
            Verify Your Account
          </div><!-- /card-title -->

          <app-account-verify-notice
            :email="userData.email"
            :newLinkRequested="newLinkRequested"
            :handleNewVerificationRequest="handleNewVerificationRequest">
          </app-account-verify-notice>
        </div><!-- /card -->
      </div><!-- /row -->

      <div class="row justify-center">
        <div class="card">
          <div class="card-title bg-primary text-white">
            My Profile
          </div><!-- /card-title -->

          <app-account-detail-view
            :userData="userData"
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
import AccountVerifyNotice from '../components/AccountVerifyNotice'

export default {
  components: {
    appAccountDetailView: AccountDetailView,
    appAccountVerifyNotice: AccountVerifyNotice
  },

  data () {
    return {
      initializing: true,
      // whether any operations are currently running
      working: false,
      // error messages returned from API (e.g. invalid data)
      apiError: '',
      // whether we are in editing or viewing mode
      editing: false,
      // whether the user has clicked the 'request new link' button
      newLinkRequested: false
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
      // this.editing = true
      Toast.create.info('Sorry, not implemented yet!')
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

    handleNewVerificationRequest () {
      const payload = { email: this.userData.email }

      this.newLinkRequested = true
      if (this.userData.verified === false) {
        this.requestNewVerifyLink(payload).then(() => {
          Toast.create.info('New link sent!')
        })
      }
    },

    ...mapActions([
      'checkForStoredLogin',
      'logout',
      'requestNewVerifyLink'
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
