import Vue from 'vue'
import VueRouter from 'vue-router'

import { localUrls, routes } from './globals/urls'

import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import RegisterPage from './components/auth/containers/RegisterPage'
import LoginPage from './components/auth/containers/LoginPage'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    /* ============================================
     = Auth routes
     ============================================= */
    {
      path: localUrls.login,
      component: LoginPage,
      name: routes.auth.login
    },
    {
      path: localUrls.account,
      component: AccountDetailPage,
      name: routes.auth.detail
    },
    {
      path: localUrls.accountCreate,
      component: RegisterPage,
      name: routes.auth.create
    },

    { path: '/', component: load('Index') }, // Default
    { path: '*', component: load('Error404') } // Not found
  ]
})
