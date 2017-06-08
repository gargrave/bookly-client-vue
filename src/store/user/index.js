import env from '../../globals/env'

import { USER } from '../mutation-types'

import actions from './actions'
// import mockActions from '../mock/user/user-actions-mock'

function getEmptyUser () {
  return {
    id: '',
    username: '',
    email: '',
    dateJoined: '',
    lastLogin: ''
  }
}

export default {
  state: {
    // whether we have any open calls to the User API
    userAjaxPending: false,

    // full user data
    user: getEmptyUser(),

    // current auth token (if any)
    authToken: null
  },

  getters: {
    userAjaxPending (state) {
      return state.userAjaxPending
    },

    /** Returns full user data for currently logged in user */
    userData (state) {
      return state.user
    },

    /** Returns just the current authToken for the user. */
    authToken (state) {
      return state.authToken
    },

    /** Returns whether the current user is logged in */
    isLoggedIn (state) {
      return true// !!state.authToken
    }
  },

  mutations: {
    /* =============================================
     = User Mutations
     ============================================= */
    /** Staring AJAX call to the User API */
    [USER.AJAX_BEGIN] (state) {
      state.userAjaxPending = true
    },

    /** Finishing AJAX call to the User API */
    [USER.AJAX_END] (state) {
      state.userAjaxPending = false
    },

    /** login authenticated user; save provided user details in the store */
    [USER.LOGIN] (state, authToken) {
      state.authToken = authToken

      // store token in localStorage (if not testing)
      if (!env.isTesting()) {
        localStorage.setItem('authToken', authToken)
      }
    },

    [USER.FETCH_SUCCESS] (state, user) {
      const userData = {
        id: user.pk,
        username: user.username,
        email: user.email,
        dateJoined: user.date_joined,
        lastLogin: user.last_login
      }
      state.user = userData
    },

    /** logout current user; simply clear existing user data */
    [USER.LOGOUT] (state) {
      state.user = getEmptyUser()
      state.authToken = ''

      if (!env.isTesting()) {
        localStorage.clear()
      }
    }
  },

  actions
  // actions: env.useMockApi() ? mockActions : actions
}
