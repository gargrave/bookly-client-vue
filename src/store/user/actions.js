import axios from 'axios'

import { parseError, cleanErrors } from '../../globals/errors'
import { apiUrls } from '../../globals/urls'
import apiHelper from '../../utils/apiHelper'

import { AUTHORS, BOOKS, PROFILE, USER } from '../mutation-types'

export default {
  /**
   * Attempts to fetch and return an auth-token currently stored in the Vuex store.
   * If there is none, an error will be thrown.
   */
  async getAuthTokenOrDie ({ getters }) {
    const authToken = getters.authToken
    if (!authToken) {
      throw cleanErrors.INVALID_TOKEN
    }
    return authToken
  },

  /**
   * Attempts to login the user with the provided details.
   *
   * The payload should slook like:
   *    - email - The registered User's email address
   *    - password - The registered User's password
   */
  async login ({ commit }, payload) {
    try {
      commit(USER.AJAX_BEGIN)
      const request = apiHelper.axPost(apiUrls.login, payload)
      const result = await axios(request)

      const userData = result.data
      const authToken = userData.token

      commit(USER.LOGIN, authToken)
      commit(USER.FETCH_SUCCESS, userData)
      commit(USER.AJAX_END)
      return userData
    } catch (err) {
      commit(USER.AJAX_END)
      throw parseError(err)
    }
  },

  /**
   * Logs the current User out by clearing local data. No need to send anything
   * to the API at this point, as tokens will expire automatically.
   */
  async logout ({ commit }) {
    commit(USER.LOGOUT)
    commit(AUTHORS.CLEAR_ALL)
    commit(BOOKS.CLEAR_ALL)
    return Promise.resolve()
  },

  /**
   * Attempts to create a new user with the supplied data. If a new user
   * is successfully created, the user is automatically logged in.
   *
   * The payload should look like:
   *    - email - The new User's email address
   *    - password - The password with which to register
   *    - passwordConfirm - A confirm password (must match the other password)
   */
  async register ({ dispatch, commit }, payload) {
    try {
      commit(USER.AJAX_BEGIN)
      const request = apiHelper.axPost(apiUrls.register, payload)
      const result = await axios(request)

      // if we get back a token, User has been registered; go ahead and log in
      const authToken = result.data.token
      await dispatch('loadUserDataFromToken', authToken)

      commit(USER.LOGIN, authToken)
      commit(USER.AJAX_END)
      return result
    } catch (err) {
      commit(USER.AJAX_END)
      throw parseError(err)
    }
  },

  /**
   * Attempts to fetch user data from the API with the supplied auth token.
   * If the attempt is successful, the returned data is committed to localStorage.
   */
  async loadUserDataFromToken ({ dispatch, commit }, authToken) {
    try {
      commit(USER.AJAX_BEGIN)
      const request = apiHelper.axGet(apiUrls.users, authToken)
      const result = await axios(request)

      const userData = result.data
      commit(USER.FETCH_SUCCESS, userData)
      commit(USER.LOGIN, authToken)
      commit(USER.AJAX_END)
      return userData
    } catch (err) {
      dispatch('logout')
      commit(USER.AJAX_END)
      throw parseError(err)
    }
  },

  /**
   * Attempts to "re-login" from credentials stored in localStorage. Should be
   * called first upon re-loading the app.
   */
  async checkForStoredLogin ({ getters, dispatch }) {
    try {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        if (getters.userData.id) {
          return getters.userData
        } else {
          return await dispatch('loadUserDataFromToken', storedToken)
        }
      } else {
        throw parseError(cleanErrors.EMPTY)
      }
    } catch (err) {
      throw parseError(err)
    }
  },

  /**
   * Sends a request to the server to verify the User's account based on
   * token provided via email.
   */
  async verifyAccount ({ commit }, token) {
    try {
      const request = apiHelper.axPost(apiUrls.verify, { token })
      const result = await axios(request)
      commit(USER.VERIFY_SUCCESS)
      return result.data
    } catch (err) {
      throw parseError(err)
    }
  },

  /**
   * Sends a request to the API to send a new "verify account" email.
   *
   * The payload should look like:
   *    - email - The User's email address
   */
  async requestNewVerifyLink ({ commit }, payload) {
    try {
      const request = apiHelper.axPost(apiUrls.verifyResend, payload)
      return await axios(request)
    } catch (err) {
      throw parseError(err)
    }
  },

  /**
   * Sends a request to the server to email a "password reset" email.
   *
   * The payload should look like:
   *    - email - The user's registered email address
   */
  async requestPasswordReset ({ commit }, payload) {
    try {
      const request = apiHelper.axPost(apiUrls.pwResetRequest, payload)
      return await axios(request)
    } catch (err) {
      throw parseError(err)
    }
  },

  /**
   * Submits a request to the server to actually process a password update.
   *
   * The payload should look like:
   *    - password - The first copy of the password
   *    - passwordConfirm - The second copy of the password (must match)
   */
  async submitPasswordReset ({ commit }, payload) {
    try {
      const request = apiHelper.axPost(apiUrls.pwResetConfirm, payload)
      return await axios(request)
    } catch (err) {
      throw parseError(err)
    }
  },

  /**
   * Submits a request to the API to UPDATE a User's Profile.
   *
   * The payload should look like:
   *    - id - The id of the User's Profile (note: NOT the id of the User record)
   *    - firstName - The updated User first name
   *    - lastName - The updated User last name
   */
  async updateProfile ({ dispatch, commit }, payload) {
    try {
      // build and send request
      const token = await dispatch('getAuthTokenOrDie')
      const url = `${apiUrls.profiles}${payload.id}`
      const request = apiHelper.axPut(url, payload, token)
      // parse request results
      const result = await axios(request)
      const profile = result.data
      // update local store and return updated profile
      commit(PROFILE.UPDATE_SUCCESS, profile)
      return profile
    } catch (err) {
      throw parseError(err)
    }
  }
}
