<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <p>Thank you for verifying your account!</p>

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import ContainerMixin from '../../mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  methods: {
    ...mapActions([
      'verifyAccount'
    ])
  },

  created () {
    const token = this.$route.query.token
    if (token) {
      this.enterWorkingState()
      this.verifyAccount(token).then(res => {
        this.exitWorkingState()
        console.log('************************************************')
        console.log('* TODO: VerifyAccountPage.vue')
        console.log('*   - handle API response on verify token')
        console.log('************************************************')
      })
    }
  }
}
</script>
