import env from './env'

const DEV_API_ROOT_URL = 'http://localhost:3030'
const STAGING_API_ROOT_URL = ''
const PROD_API_ROOT_URL = ''

let apiRoot
let restApiRoot

(function setUrls () {
  if (env.isProd()) {
    apiRoot = PROD_API_ROOT_URL
  } else if (env.isStaging()) {
    apiRoot = STAGING_API_ROOT_URL
  } else {
    apiRoot = DEV_API_ROOT_URL
  }
  restApiRoot = `${apiRoot}/api/v1`
})()

// named constants for local routes
export let routes = {
  auth: {
    login: 'auth-login',
    create: 'auth-create',
    detail: 'auth-detail'
  },
  authors: {
    list: 'authors-list',
    create: 'author-create',
    detail: 'author-detail'
  },
  books: {
    list: 'books-list',
    create: 'book-create',
    detail: 'book-detail'
  }
}

// URLs for AJAX calls to the API
export let apiUrls = {
  // auth URLS
  login: `${apiRoot}/rest-auth/login/`,
  logout: `${apiRoot}/rest-auth/logout/`,
  register: `${apiRoot}/rest-auth/registration/`,
  user: `${apiRoot}/rest-auth/user/`,
  profiles: `${apiRoot}/rest-auth/user/profile/`,
  // REST resource URLS
  authors: `${restApiRoot}/authors/`,
  books: `${restApiRoot}/books/`
}

// URLs for local routing (i.e. vue-router)
export let localUrls = {
  // auth routes
  account: '/account',
  accountCreate: '/account/new',
  login: '/account/login',
  // authors routes
  authorsList: '/authors',
  authorCreate: '/authors/new',
  authorDetail: '/authors/:id',
  // books routes
  booksList: '/books',
  bookCreate: '/books/new',
  bookDetail: '/books/:id'
}
