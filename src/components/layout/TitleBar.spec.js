import Vue from 'vue'
import VueRouter from 'vue-router'
import Quasar from 'quasar'

import { localUrls } from 'src/globals/urls'
import store from 'src/store/store'
import { USER } from 'src/store/mutation-types'
import { routes } from 'src/router'

import Component from 'src/components/layout/TitleBar'

Vue.use(VueRouter)
Vue.use(Quasar)

const router = new VueRouter({ routes })

/* Helper method to mount/render the test component */
function getComponent (propsData = {}, mockStore = null) {
  const Ctor = Vue.extend(Component)
  const testStore = mockStore || store
  return new Ctor({ propsData, store: testStore, router }).$mount()
}

describe('TitleBar.vue', () => {
  describe('- Basic Display', () => {
    it('should display the app\'s title', () => {
      const vm = getComponent({})
      const titleEl = vm.$el.querySelector('.toolbar-title .toolbar-title-text')
      const actualTitle = titleEl.textContent.trim()
      const expectedTitle = 'Bookly'

      expect(actualTitle).to.equal(expectedTitle)
    })

    it('should not display user links when not logged in.', () => {
      store.commit(USER.LOGOUT)
      const vm = getComponent({})
      const linksEl = vm.$el.querySelector('.toolbar-links')
      const dropdownInEl = vm.$el.querySelector('.dropdown-logged-in')
      const dropdownNotInEl = vm.$el.querySelector('.dropdown-not-logged-in')

      expect(linksEl).to.equal(null)
      expect(dropdownInEl).to.equal(null)
      expect(dropdownNotInEl).to.not.equal(null)
    })

    it('should display the appropriate links when logged in.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const linksEl = vm.$el.querySelector('.toolbar-links')
      const dropdownInEl = vm.$el.querySelector('.dropdown-logged-in')
      const dropdownNotInEl = vm.$el.querySelector('.dropdown-not-logged-in')

      expect(linksEl).to.not.equal(null)
      expect(dropdownInEl).to.not.equal(null)
      expect(dropdownNotInEl).to.equal(null)
    })
  })

  describe('- Interactivity', () => {
    it('should navigate to the Register page when link is clicked.', () => {
      store.commit(USER.LOGOUT, 'fakeAuthToken')
      const vm = getComponent({})
      const registerLink = vm.$el.querySelector('.dropdown-not-logged-in .item-link-register')

      expect(registerLink).to.not.equal(null)
      registerLink.click()
      expect(vm.$route.path).to.equal(localUrls.register)
    })

    it('should navigate to the Register page when link is clicked.', () => {
      store.commit(USER.LOGOUT, 'fakeAuthToken')
      const vm = getComponent({})
      const loginLink = vm.$el.querySelector('.dropdown-not-logged-in .item-link-login')

      expect(loginLink).to.not.equal(null)
      loginLink.click()
      expect(vm.$route.path).to.equal(localUrls.login)
    })

    it('should navigate to the Books list page when link is clicked.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const booksLink = vm.$el.querySelector('.toolbar-links .toolbar-link-books')

      expect(booksLink).to.not.equal(null)
      booksLink.click()
      expect(vm.$route.path).to.equal(localUrls.booksList)
    })

    it('should navigate to the Authors list page when link is clicked.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const booksLink = vm.$el.querySelector('.toolbar-links .toolbar-link-authors')

      expect(booksLink).to.not.equal(null)
      booksLink.click()
      expect(vm.$route.path).to.equal(localUrls.authorsList)
    })

    it('should navigate to the My Account page when link is clicked.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const accountLink = vm.$el.querySelector('.dropdown-logged-in .item-link-account')

      expect(accountLink).to.not.equal(null)
      accountLink.click()
      expect(vm.$route.path).to.equal(localUrls.account)
    })

    it('should logout and navigate to the login page when link is clicked.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const logoutLink = vm.$el.querySelector('.dropdown-logged-in .item-link-logout')

      // push a custom 'logout' method onto the component
      let logoutCalled = false
      vm.logout = function () {
        store.commit(USER.LOGOUT)
        logoutCalled = true
        return Promise.resolve()
      }

      expect(logoutLink).to.not.equal(null)
      logoutLink.click()
      expect(logoutCalled).to.be.true
    })
  })
})
