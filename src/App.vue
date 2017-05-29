<template>
  <div id="q-app">
    <q-layout>

      <div slot="header">
        <app-title-bar @toggleDrawer="toggleDrawer">
        </app-title-bar>
      </div>

      <app-side-nav ref="sideNav"></app-side-nav>

      <router-view></router-view>

    </q-layout>
  </div>
</template>

<script>
import SideNav from './components/layout/SideNav'
import TitleBar from './components/layout/TitleBar'

export default {
  components: {
    appSideNav: SideNav,
    appTitleBar: TitleBar
  },

  methods: {
    // fowards the 'open()' call to the child drawer
    toggleDrawer () {
      this.$refs.sideNav.open()
    }
  }
}
</script>
