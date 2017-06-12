import axios from 'axios'

import { cleanErrors, parseError } from '../../globals/errors'
import { apiUrls } from '../../globals/urls'
import apiHelper from '../../utils/apiHelper'
import { BOOKS } from '../mutation-types'

export default {
  /**
   * Fetches the full list of user's Books from the API.
   */
  fetchBooks ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      // make sure we have a valid auth token
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(apiUrls.books, authToken)
      commit(BOOKS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const books = res.data
          commit(BOOKS.FETCH_SUCCESS, books)
          commit(BOOKS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(BOOKS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Returns the list of user's Books. If the Books have already loaded,
   * this cached version will be returned. Otherwise, a chained call will be
   * made to the API.
   *
   * This is useful for operations that need to make sure the Books have been
   * loaded before proceeding (e.g. 'find by ID').
   */
  getCachedOrFetchBooks ({ state, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (state.books.length) {
        resolve()
      } else {
        dispatch('fetchBooks')
          .then(() => {
            resolve()
          }, err => {
            reject(err)
          })
      }
    })
  },

  /**
   * Reqeusts an individual Book with the specified ID from the API.
   */
  fetchBookById ({ getters, commit }, id) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(`${apiUrls.books}${id}`, authToken)
      commit(BOOKS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          commit(BOOKS.AJAX_END)
          resolve(res.data)
        })
        .catch(err => {
          commit(BOOKS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Finds and returns an individual Book based on the specified ID.
   * Note that if the Book cannot be found in the local list, a call to
   * the API will be made requesting the single Book instance.
   */
  findBook ({ state, dispatch, commit }, bookId) {
    return new Promise((resolve, reject) => {
      dispatch('getCachedOrFetchBooks')
        .then(() => {
          // check for a copy of this Book in our local data
          let book = apiHelper.findRecordById(state.books, bookId)
          if (book) {
            resolve(book)
          } else {
            // if the Book is not stored locally, make a call to the API
            dispatch('fetchBookById', bookId)
              .then(bookRes => {
                resolve(bookRes)
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
   * Sends a request to the server to create a new Book instance.
   */
  createBook ({ getters, commit }, book) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPost(apiUrls.books, book, authToken)
      commit(BOOKS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const book = res.data
          commit(BOOKS.CREATE_SUCCESS, book)
          commit(BOOKS.AJAX_END)
          resolve(book)
        })
        .catch(err => {
          commit(BOOKS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to update an existing Book instance.
   */
  updateBook ({ getters, commit }, book) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPut(
        `${apiUrls.books}${book.id}`, book, authToken)
      commit(BOOKS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const book = res.data
          commit(BOOKS.UPDATE_SUCCESS, book)
          commit(BOOKS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(BOOKS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to delete an existing Book instance.
   */
  deleteBook ({ getters, commit }, bookId) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axDelete(
        `${apiUrls.books}${bookId}`, {}, authToken)
      commit(BOOKS.AJAX_BEGIN)

      axios(request)
        .then(() => {
          commit(BOOKS.DELETE_SUCCESS, bookId)
          commit(BOOKS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(BOOKS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /** Simply clears the local list of Books; should be called when logging out */
  clearLocalBooks ({ commit }) {
    commit(BOOKS.CLEAR_ALL)
  }
}
