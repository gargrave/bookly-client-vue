import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import { parseError, cleanErrors } from '../../globals/errors'
import apiHelper from '../../utils/apiHelper'
import { AUTHORS, BOOKS, PROFILE, USER } from '../mutation-types'

export default {
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
   * Note that, upon successful login, an extra API call is made to fetch
   * the full user data.
   *
   * @param credentials - An object with 'username' and 'password' props
   * @returns {Promise}
   */
  login ({ dispatch, commit }, credentials) {
    return new Promise((resolve, reject) => {
      const request = apiHelper.axPost(apiUrls.login, credentials)
      commit(USER.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const userData = res.data
          const authToken = userData.token

          if (authToken) {
            commit(USER.LOGIN, authToken)
            commit(USER.FETCH_SUCCESS, userData)
            commit(USER.AJAX_END)
            resolve()
          } else {
            commit(USER.AJAX_END)
            reject(cleanErrors.INVALID_LOGIN)
          }
        })
        .catch(err => {
          commit(USER.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Attempts to log out the current user. A request will be sent to the API
   * to logout, but the local data will be cleared and the Promise will resolve
   * no matter what response the API sends.
   */
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(USER.LOGOUT)
      commit(AUTHORS.CLEAR_ALL)
      commit(BOOKS.CLEAR_ALL)
      resolve()
    })
  },

  /**
   * Attempts to create a new user with the supplied data. If a new user
   * is successfully created, the user is automatically logged in.
   */
  createUser ({ dispatch, commit }, userData) {
    return new Promise((resolve, reject) => {
      const request = apiHelper.axPost(apiUrls.register, userData)
      commit(USER.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const authToken = res.data.token

          if (authToken) {
            commit(USER.LOGIN, authToken)
            dispatch('loadUserDataFromToken', authToken)
              .then(() => {
                resolve()
              }, err => {
                reject(err)
              })
          } else {
            commit(USER.AJAX_END)
            reject(cleanErrors.INVALID_LOGIN)
          }
        })
        .catch(err => {
          commit(USER.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Attempts to fetch user data from the API with the supplied auth token.
   * If the attempt is successful, the returned data is committed to localStorage.
   */
  loadUserDataFromToken ({ dispatch, commit }, authToken) {
    return new Promise((resolve, reject) => {
      const request = apiHelper.axGet(apiUrls.users, authToken)
      commit(USER.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const userData = res.data

          if (userData.id) {
            commit(USER.LOGIN, authToken)
            commit(USER.FETCH_SUCCESS, userData)
            commit(USER.AJAX_END)
            resolve()
          } else {
            commit(USER.AJAX_END)
            return dispatch('logout')
          }
        })
        .catch(err => {
          // if error, reject with error message
          dispatch('logout')
          commit(USER.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Attempts to "re-login" from credentials stored in localStorage. Should be
   * called first upon re-loading the app.
   */
  checkForStoredLogin ({ getters, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      let storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        if (getters.userData.id) {
          resolve(getters.userData)
        } else {
          dispatch('loadUserDataFromToken', storedToken)
            .then(res => {
              resolve(res)
            }, err => {
              reject(err)
            })
        }
      } else {
        reject(cleanErrors.EMPTY)
      }
    })
  },

  async verifyAccount ({ commit }, token) {
    try {
      const request = apiHelper.axPost(apiUrls.verify, { token })
      const res = await axios(request)
      commit(USER.VERIFY_SUCCESS)
      return res.data
    } catch (err) {
      throw parseError(err)
    }
  },

  requestNewVerifyLink ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const request = apiHelper.axPost(apiUrls.verifyResend, payload)

      axios(request)
        .then(res => {
          console.log(res)
          resolve()
        })
        .catch(err => {
          console.log(err)
          resolve()
        })
    })
  },

  /**
   * Sends a request to the server to email a "password reset" email.
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
