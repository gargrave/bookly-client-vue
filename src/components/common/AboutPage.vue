<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center">
        <div class="card index-page-card">
          <div class="card-title bg-primary text-white">
            About Bookly
          </div><!-- /card-title -->

          <div class="card-content">
            <p style="margin: 0;">
              Hello. This is the about page.
            </p>
          </div><!-- /card-content -->
        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { localUrls, routes } from '../../globals/urls'

import ContainerMixin from '../mixins/ContainerMixin'

export default {
  mixins: [
    ContainerMixin
  ],

  data () {
    return {
      localUrls, // expose to template
      routes // expose to template
    }
  }
}
</script>
