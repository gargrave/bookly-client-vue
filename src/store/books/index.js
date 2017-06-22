import env from '../../globals/env'
import BookModel from '../../models/book'
import { AUTHORS, BOOKS } from '../mutation-types'
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
        b => Number(b.id) !== Number(book.id)
      ), BookModel.fromAPI(book)]
      sortBooks(state.books)
    },

    [BOOKS.DELETE_SUCCESS] (state, bookId) {
      state.books = state.books.filter(
        b => Number(b.id) !== Number(bookId)
      )
      sortBooks(state.books)
    },

    /*
     * When an Author is updated, we need to manually update the local Books
     * for that Author to make sure their data is in sync with the update Author.
     */
    [AUTHORS.UPDATE_SUCCESS] (state, author) {
      state.books.forEach(book => {
        if (book.author.id === author.id) {
          book.author.name = `${author.firstName} ${author.lastName}`
        }
      })
    },

    /*
     * When an Author is deleted, we need to manually "cascade"
     * the delete locally, in order to purge any books by that Author.
     */
    [AUTHORS.DELETE_SUCCESS] (state, authorId) {
      state.books = state.books.filter(
        b => Number(b.author.id) !== Number(authorId)
      )
      sortBooks(state.books)
    }
  },

  actions
  // actions: env.useMockApi() ? mockActions : actions
}
