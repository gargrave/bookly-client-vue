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
              <p>
                It is probably painfully obvious, but this project was not designed
                with the goal of being a ground-breaking technical achievement.
              </p>
              <p>
                I built it as an exercise to learn all about the
                <a href="https://hapijs.com"
                  target="_blank" rel="noopener noreferrer">HapiJS</a>
                framework and its surrounding ecosystem, as well as learning more about
                deploying and maintaining an Nginx server on Digital Ocean.
                I intentionally kept the design and functionality simple in order to
                be able to focus on these tasks.
              </p>
              <p>
                In spite of its simplicity, it has most of the features you would expect in
                a CRUD app + REST API (you can read more on this at the server code repo, linked below).
              </p>
              <p>
                If you have any questions or concerns, feel free to use one of the Github links
                below to reach out to me.
              </p>

              <hr>
              <h6>Client Source Code</h6>
              <p>
                The source code for this front end project (VueJS/Quasar)
                is available on my Github account for all dirty, prying eyes
                <a href="https://github.com/gargrave/bookly-client"
                  target="_blank" rel="noopener noreferrer">right here</a>.
              </p>

              <hr>
              <h6>Server Source Code</h6>
              <p>
                Aaaaaand the source code for the back end project (Node/HapiJS) is available
                <a href="https://github.com/gargrave/bookly-server"
                  target="_blank" rel="noopener noreferrer">here</a>.
              </p>
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

<style scoped>
h6 {
  text-decoration: underline;
  margin: 15px;
}
</style>
