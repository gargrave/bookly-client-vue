import Vue from 'vue'
import VueRouter from 'vue-router'

import { localUrls, routes } from './globals/urls'

import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import RegisterPage from './components/auth/containers/RegisterPage'
import LoginPage from './components/auth/containers/LoginPage'
import VerifyAccountPage from './components/auth/containers/VerifyAccountPage'

import AuthorCreatePage from './components/authors/containers/AuthorCreatePage'
import AuthorDetailPage from './components/authors/containers/AuthorDetailPage'
import AuthorsListPage from './components/authors/containers/AuthorsListPage'

import BookCreatePage from './components/books/containers/BookCreatePage'
import BookDetailPage from './components/books/containers/BookDetailPage'
import BooksListPage from './components/books/containers/BooksListPage'

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
      path: localUrls.register,
      component: RegisterPage,
      name: routes.auth.register
    },
    {
      path: localUrls.verify,
      component: VerifyAccountPage,
      name: routes.auth.verify
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

    /* ============================================
     = Books routes
     ============================================= */
    {
      path: localUrls.bookCreate,
      component: BookCreatePage,
      name: routes.books.create
    },
    {
      path: localUrls.bookDetail,
      component: BookDetailPage,
      name: routes.books.detail
    },
    {
      path: localUrls.booksList,
      component: BooksListPage,
      name: routes.books.list
    },

    { path: '/', component: load('Index') }, // Default
    { path: '*', component: load('Error404') } // Not found
  ]
})
