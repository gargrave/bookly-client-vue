<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">
          <div class="card-title bg-primary text-white">
            Reset Password
          </div><!-- /card-title -->

          <div class="card-content">
            <p>Password reset page!</p>
            <p>Token: {{ token }}</p>
          </div><!-- /card-content -->
        </div><!-- /card -->


      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import ContainerMixin from '../../mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  data: () => ({
    token: null
  }),

  created () {
    this.token = this.$route.query.token
    if (!this.token) {
      this.$router.push('/')
    }
  }
}
</script>
