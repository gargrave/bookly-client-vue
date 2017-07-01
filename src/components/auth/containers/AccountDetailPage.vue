<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center" v-if="userData.verified === false">
        <div class="card">
          <div class="card-title bg-negative text-white">
            Verify Your Account
          </div><!-- /card-title -->

          <app-verify-notice
            :email="userData.email"
            :newLinkRequested="newLinkRequested"
            :handleNewVerificationRequest="handleNewVerificationRequest">
          </app-verify-notice>

        </div><!-- /card -->
      </div><!-- /row -->

      <div class="row justify-center">
        <div class="card">
          <div class="card-title bg-primary text-white">
            My Profile
          </div><!-- /card-title -->

          <app-edit-view
            v-if="editing"
            :working="working"
            :apiError="apiError"
            :profile="model"
            :errors="errors"
            :handleInput="handleInput"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-edit-view>

          <app-detail-view
            v-else
            :user="userData"
            @editClicked="onEditClick"
            @logoutClicked="onLogoutClick">
          </app-detail-view>

        </div><!-- /card -->
      </div><!-- /row -->

    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading, Toast } from 'quasar'
import { cloneDeep } from 'lodash'

import { localUrls } from '../../../globals/urls'
import ProfileModel from '../../../models/profile'

import ContainerMixin from '../../mixins/ContainerMixin'
import DetailViewMixin from '../../mixins/DetailViewMixin'
import ProfileDetailView from '../components/ProfileDetailView'
import ProfileEditView from '../components/ProfileEditView'
import AccountVerifyNotice from '../components/AccountVerifyNotice'

export default {
  mixins: [
    ContainerMixin,
    DetailViewMixin
  ],

  components: {
    appDetailView: ProfileDetailView,
    appEditView: ProfileEditView,
    appVerifyNotice: AccountVerifyNotice
  },

  data: () => ({
    config: {
      modelName: 'Profile',
      listRoute: localUrls.login
    },
    // whether the user has clicked the 'request new link' button
    newLinkRequested: false
  }),

  computed: {
    ...mapGetters([
      'userData'
    ])
  },

  methods: {
    getBaseModel: () => ProfileModel,

    /**
     * Callback for clicking the 'logout' button; simply logout.
     */
    onLogoutClick () {
      this.working = true
      Loading.show({ message: 'Logging out...' })

      this.logout().then(() => {
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

    /** Attempts to a Profile UPDATE request to the API. */
    onFormSubmitted (value, event) {
      console.log('*** TODO: implement AccountDetailPage.onFormSubmitted')
      console.log('*** TODO: need a new validation definition')
      console.log(`${this.model.firstName} ${this.model.lastName}`)
      // const author = AuthorModel.toAPI(this.model)
      // const hasChanges = !areEqual(author, this.originalModel)
      // const { errors, valid } = validate(author)

      // if (valid && hasChanges) {
      //   this.working = true
      //   this.apiError = ''
      //   Loading.show({ message: 'Saving Author...' })

      //   this.updateAuthor(author)
      //     .then(() => {
      //       toasts.updateConfirm('Author')
      //       this.$router.push(localUrls.authorsList)
      //       this.exitWorkingState()
      //     }, err => { this.onError(err) })
      // } else {
      //   if (!hasChanges) {
      //     toasts.noChanges()
      //   }
      //   this.errors = errors
      // }
    },

    ...mapActions([
      'checkForStoredLogin',
      'logout',
      'requestNewVerifyLink'
    ])
  },

  async created () {
    this.enterWorkingState()
    try {
      await this.checkForStoredLogin()
      this.model = cloneDeep(this.userData.profile)
      this.originalModel = cloneDeep(this.userData.profile)
      this.exitWorkingState()
    } catch (err) {
      this.$router.push(localUrls.login)
      this.exitWorkingState()
    }
  }
}
</script>
