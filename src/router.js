import Vue from 'vue'
import VueRouter from 'vue-router'

import { localUrls, routes } from './globals/urls'

import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import RegisterPage from './components/auth/containers/RegisterPage'
import LoginPage from './components/auth/containers/LoginPage'

import AuthorCreatePage from './components/authors/containers/AuthorCreatePage'
import AuthorDetailPage from './components/authors/containers/AuthorDetailPage'
import AuthorsListPage from './components/authors/containers/AuthorsListPage'

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

    /* ============================================
     = Authors routes
     ============================================= */
    {
      path: localUrls.authorCreate,
      component: AuthorCreatePage,
      name: routes.authors.create
    },
    {
      path: localUrls.authorDetail,
      component: AuthorDetailPage,
      name: routes.authors.detail
    },
    {
      path: localUrls.authorsList,
      component: AuthorsListPage,
      name: routes.authors.list
    },

    { path: '/', component: load('Index') }, // Default
    { path: '*', component: load('Error404') } // Not found
  ]
})
