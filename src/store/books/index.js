import env from '../../globals/env'
import BookModel from '../../models/book'
import { BOOKS } from '../mutation-types'
import actions from './actions'
// import mockActions from './actions-mock'

function sortBooks (books) {
  books.sort((a, b) => {
    return a.title > b.title ? 1 : -1
  })
}

export default {
  state: {
    booksAjaxPending: false,
    books: []
  },

  getters: {
    booksAjaxPending (state) {
      return state.booksAjaxPending
    },

    /** Returns the list of Books sorted alphabetically */
    books (state) {
      return state.books
    }
  },

  mutations: {
    [BOOKS.CLEAR_ALL] (state, books) {
      state.books = []
    },

    /* =============================================
     = Books fetching
     ============================================= */
    [BOOKS.AJAX_BEGIN] (state) {
      state.booksAjaxPending = true
    },

    [BOOKS.AJAX_END] (state) {
      state.booksAjaxPending = false
    },

    [BOOKS.FETCH_SUCCESS] (state, books) {
      state.books = []
      for (let book of books) {
        state.books.push(BookModel.fromAPI(book))
      }
      sortBooks(state.books)
    },

    /* =============================================
     = Books creating/editing
     ============================================= */
    [BOOKS.CREATE_SUCCESS] (state, book) {
      state.books.push(BookModel.fromAPI(book))
      sortBooks(state.books)
    },

    [BOOKS.UPDATE_SUCCESS] (state, book) {
      state.books = [...state.books.filter(
        s => Number(s.id) !== Number(book.id)
      ), BookModel.fromAPI(book)]
      sortBooks(state.books)
    },

    [BOOKS.DELETE_SUCCESS] (state, bookId) {
      state.books = state.books.filter(
        p => Number(p.id) !== Number(bookId)
      )
      sortBooks(state.books)
    }
  },

  actions
  // actions: env.useMockApi() ? mockActions : actions
}
