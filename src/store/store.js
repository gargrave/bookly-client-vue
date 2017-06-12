import Vue from 'vue'
import Vuex from 'vuex'

import User from './user'
import Authors from './authors'
import Books from './books'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Authors,
    Books
  }
})
