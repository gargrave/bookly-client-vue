import Vue from 'vue'
import VueRouter from 'vue-router'

import { localUrls, routes as _routes } from './globals/urls'

import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import LoginPage from './components/auth/containers/LoginPage'
import PasswordResetRequestPage from './components/auth/containers/PasswordResetRequestPage'
import PasswordResetPage from './components/auth/containers/PasswordResetPage'
import RegisterPage from './components/auth/containers/RegisterPage'
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

export const routes = [
  /* ============================================
   = Auth routes
   ============================================= */
  {
    path: localUrls.login,
    component: LoginPage,
    name: _routes.auth.login
  },
  {
    path: localUrls.account,
    component: AccountDetailPage,
    name: _routes.auth.detail
  },
  {
    path: localUrls.register,
    component: RegisterPage,
    name: _routes.auth.register
  },
  {
    path: localUrls.verify,
    component: VerifyAccountPage,
    name: _routes.auth.verify
  },

  /* ============================================
   = Password reset routes
   ============================================= */
  {
    path: localUrls.pwResetRequest,
    component: PasswordResetRequestPage,
    name: _routes.auth.pwReset
  },
  {
    path: localUrls.pwResetConfirm,
    component: PasswordResetPage,
    name: _routes.auth.pwResetConfirm
  },

  /* ============================================
   = Authors routes
   ============================================= */
  {
    path: localUrls.authorCreate,
    component: AuthorCreatePage,
    name: _routes.authors.create
  },
  {
    path: localUrls.authorDetail,
    component: AuthorDetailPage,
    name: _routes.authors.detail
  },
  {
    path: localUrls.authorsList,
    component: AuthorsListPage,
    name: _routes.authors.list
  },

  /* ============================================
   = Books routes
   ============================================= */
  {
    path: localUrls.bookCreate,
    component: BookCreatePage,
    name: _routes.books.create
  },
  {
    path: localUrls.bookDetail,
    component: BookDetailPage,
    name: _routes.books.detail
  },
  {
    path: localUrls.booksList,
    component: BooksListPage,
    name: _routes.books.list
  },

  { path: '/', component: load('Index') }, // Default
  { path: '*', component: load('Error404') } // Not found
]

export default new VueRouter({ routes })
