<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">
          <div class="card-title bg-primary text-white">
            Account Verification
          </div><!-- /card-title -->

          <div class="card-content">
            <section v-if="initializing || working">
              <p>Sending verification request...</p>
            </section>

            <section v-if="successfullyVerified === true">
              <p>Thank you for verifying your account!</p>
            </section>

            <section v-if="successfullyVerified === false">
              <p>The verification link you used does not appear to be valid.</p>
              <p>If you have already verified your account, this is normal and you can ignore this error.</p>
              <p>Otherwise, if you need to request a new link, you can do so from your Account page.</p>
            </section>

            <button
              class="primary"
              @click.prevent="handleGotoAccount">
              Go to My Account
            </button>
          </div><!-- /card-content -->
        </div><!-- /card -->


      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

import { localUrls } from '../../../globals/urls'

import ContainerMixin from '../../mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  data: () => ({
    successfullyVerified: undefined
  }),

  methods: {
    handleGotoAccount () {
      this.$router.push(localUrls.account)
    },

    ...mapActions([
      'verifyAccount'
    ])
  },

  async created () {
    const token = this.$route.query.token
    if (token) {
      try {
        let result = await this.verifyAccount(token)
        this.exitWorkingState()
        if (result.verified === true) {
          this.successfullyVerified = true
        }
      } catch (err) {
        this.exitWorkingState()
        this.successfullyVerified = false
      }
    } else {
      this.$router.push('/')
    }
  }
}
</script>
