import axios from 'axios'

import { cleanErrors, parseError } from '../../globals/errors'
import { apiUrls } from '../../globals/urls'
import apiHelper from '../../utils/apiHelper'
import { AUTHORS } from '../mutation-types'

export default {
  /**
   * Fetches the full list of user's Authors from the API.
   */
  fetchAuthors ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      // make sure we have a valid auth token
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(apiUrls.authors, authToken)
      commit(AUTHORS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const authors = res.data
          commit(AUTHORS.FETCH_SUCCESS, authors)
          commit(AUTHORS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(AUTHORS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Returns the list of user's Authors. If the Authors have already loaded,
   * this cached version will be returned. Otherwise, a chained call will be
   * made to the API.
   *
   * This is useful for operations that need to make sure the Authors have been
   * loaded before proceeding (e.g. 'find by ID').
   */
  getCachedOrFetchAuthors ({ state, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (state.authors.length) {
        resolve()
      } else {
        dispatch('fetchAuthors')
          .then(() => {
            resolve()
          }, err => {
            reject(err)
          })
      }
    })
  },

  /**
   * Reqeusts an individual Author with the specified ID from the API.
   */
  fetchAuthorById ({ getters, commit }, id) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(`${apiUrls.authors}${id}`, authToken)
      commit(AUTHORS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          commit(AUTHORS.AJAX_END)
          resolve(res.data)
        })
        .catch(err => {
          commit(AUTHORS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Finds and returns an individual Author based on the specified ID.
   * Note that if the Author cannot be found in the local list, a call to
   * the API will be made requesting the single Author instance.
   */
  findAuthor ({ state, dispatch, commit }, authorId) {
    return new Promise((resolve, reject) => {
      dispatch('getCachedOrFetchAuthors')
        .then(() => {
          // check for a copy of this Author in our local data
          let author = apiHelper.findRecordById(state.authors, authorId)
          if (author) {
            resolve(author)
          } else {
            // if the Author is not stored locally, make a call to the API
            dispatch('fetchAuthorById', authorId)
              .then(authorRes => {
                resolve(authorRes)
              }, err => {
                reject(parseError(err))
              })
          }
        }, err => {
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to create a new Author instance.
   */
  createAuthor ({ getters, commit }, author) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPost(apiUrls.authors, author, authToken)
      commit(AUTHORS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const author = res.data
          commit(AUTHORS.CREATE_SUCCESS, author)
          commit(AUTHORS.AJAX_END)
          resolve(author)
        })
        .catch(err => {
          commit(AUTHORS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to update an existing Author instance.
   */
  updateAuthor ({ getters, commit }, author) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPut(
        `${apiUrls.authors}${author.id}`, author, authToken)
      commit(AUTHORS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const author = res.data
          commit(AUTHORS.UPDATE_SUCCESS, author)
          commit(AUTHORS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(AUTHORS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to delete an existing Author instance.
   */
  deleteAuthor ({ getters, commit }, authorId) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axDelete(
        `${apiUrls.authors}${authorId}`, {}, authToken)
      commit(AUTHORS.AJAX_BEGIN)

      axios(request)
        .then(() => {
          commit(AUTHORS.DELETE_SUCCESS, authorId)
          commit(AUTHORS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(AUTHORS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /** Simply clears the local list of Authors; should be called when logging out */
  clearLocalAuthors ({ commit }) {
    commit(AUTHORS.CLEAR_ALL)
  }
}
