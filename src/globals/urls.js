import env from './env'

const DEV_API_ROOT_URL = 'http://localhost:3001'
const STAGING_API_ROOT_URL = ''
const PROD_API_ROOT_URL = 'https://bookly.gargrave.us'

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
    register: 'auth-register',
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
  register: `${restApiRoot}/auth/register/`,
  login: `${restApiRoot}/auth/login/`,
  logout: `${restApiRoot}/auth/logout/`,
  users: `${restApiRoot}/auth/users/`,
  profiles: `${restApiRoot}/auth/profiles/`,
  // REST resource URLS
  authors: `${restApiRoot}/authors/`,
  books: `${restApiRoot}/books/`
}

// URLs for local routing (i.e. vue-router)
export let localUrls = {
  // auth routes
  account: '/account',
  login: '/account/login',
  register: '/account/register',
  // authors routes
  authorsList: '/authors',
  authorCreate: '/authors/new',
  authorDetail: '/authors/:id',
  // books routes
  booksList: '/books',
  bookCreate: '/books/new',
  bookDetail: '/books/:id'
}
