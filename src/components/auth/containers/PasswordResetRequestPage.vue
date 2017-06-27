<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">
          <div class="card-title bg-primary text-white">
            Reset Password
          </div><!-- /card-title -->

          <div class="card-content">
            <p>Password reset request page!</p>
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
  ]
}
</script>
