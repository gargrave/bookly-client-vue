// import env from '../../globals/env'
import AuthorModel from '../../models/author'
import { AUTHORS } from '../mutation-types'
import actions from './actions'
// import mockActions from './actions-mock'

function sortAuthors (authors) {
  authors.sort((a, b) => {
    return a.lastName > b.lastName ? 1 : -1
  })
}

export default {
  state: {
    authorsAjaxPending: false,
    authors: []
  },

  getters: {
    authorsAjaxPending (state) {
      return state.authorsAjaxPending
    },

    /** Returns the list of Authors sorted alphabetically */
    authors (state) {
      return state.authors
    }
  },

  mutations: {
    [AUTHORS.CLEAR_ALL] (state, authors) {
      state.authors = []
    },

    /* =============================================
     = Authors fetching
     ============================================= */
    [AUTHORS.AJAX_BEGIN] (state) {
      state.authorsAjaxPending = true
    },

    [AUTHORS.AJAX_END] (state) {
      state.authorsAjaxPending = false
    },

    [AUTHORS.FETCH_SUCCESS] (state, authors) {
      state.authors = []
      for (let author of authors) {
        state.authors.push(AuthorModel.fromAPI(author))
      }
      sortAuthors(state.authors)
    },

    /* =============================================
     = Authors creating/editing
     ============================================= */
    [AUTHORS.CREATE_SUCCESS] (state, author) {
      state.authors.push(AuthorModel.fromAPI(author))
      sortAuthors(state.authors)
    },

    [AUTHORS.UPDATE_SUCCESS] (state, author) {
      state.authors = [...state.authors.filter(
        a => Number(a.id) !== Number(author.id)
      ), AuthorModel.fromAPI(author)]
      sortAuthors(state.authors)
    },

    [AUTHORS.DELETE_SUCCESS] (state, authorId) {
      state.authors = state.authors.filter(
        a => Number(a.id) !== Number(authorId)
      )
      sortAuthors(state.authors)
    }
  },

  actions
  // actions: env.useMockApi() ? mockActions : actions
}
