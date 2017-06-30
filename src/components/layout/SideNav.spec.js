import Vue from 'vue'
import VueRouter from 'vue-router'
import Quasar from 'quasar'

import { localUrls } from 'src/globals/urls'
import store from 'src/store/store'
import { USER } from 'src/store/mutation-types'
import { routes } from 'src/router'

import Component from 'src/components/layout/SideNav'

Vue.use(VueRouter)
Vue.use(Quasar)

const router = new VueRouter({ routes })

/* Helper method to mount/render the test component */
function getComponent (propsData = {}, mockStore = null) {
  const Ctor = Vue.extend(Component)
  const testStore = mockStore || store
  return new Ctor({
    propsData,
    store: testStore,
    router
  }).$mount()
}

describe('SideNav.vue', () => {
  describe('- Basic Display', () => {
    it('should display the app\'s title', () => {
      const vm = getComponent({})
      const titleEl = vm.$el.querySelector('.drawer-title .drawer-title-text')
      const actualTitle = titleEl.textContent.trim()
      const expectedTitle = 'Bookly'

      expect(titleEl).to.not.equal(null)
      expect(actualTitle).to.equal(expectedTitle)
    })

    it('should not display user links when not logged in.', () => {
      store.commit(USER.LOGOUT)
      const vm = getComponent({})
      const authLinksEl = vm.$el.querySelector('.drawer-links-loggedin-auth')
      const navLinksEl = vm.$el.querySelector('.drawer-links-loggedin-nav')
      const loginLinksEl = vm.$el.querySelector('.drawer-links-notloggedin-login')

      expect(authLinksEl).to.equal(null)
      expect(navLinksEl).to.equal(null)
      expect(loginLinksEl).to.not.equal(null)
    })

    it('should display user links when logged in.', () => {
      store.commit(USER.LOGIN, 'fakeAuthToken')
      const vm = getComponent({})
      const authLinksEl = vm.$el.querySelector('.drawer-links-loggedin-auth')
      const navLinksEl = vm.$el.querySelector('.drawer-links-loggedin-nav')
      const loginLinksEl = vm.$el.querySelector('.drawer-links-notloggedin-login')

      expect(authLinksEl).to.not.equal(null)
      expect(navLinksEl).to.not.equal(null)
      expect(loginLinksEl).to.equal(null)
    })
  })

  describe('- Interactivity', () => {
    it('should navigate to the Login page when link is clicked.', () => {
      store.commit(USER.LOGOUT)
      const vm = getComponent({})
      const link = vm.$el.querySelector('.drawer-links-notloggedin-login .drawer-link-login')

      expect(link).to.not.equal(null)
      link.click()
      expect(vm.$route.path).to.equal(localUrls.login)
    })

    it('should navigate to the Register page when link is clicked.', () => {
      store.commit(USER.LOGOUT)
      const vm = getComponent({})
      const link = vm.$el.querySelector('.drawer-links-notloggedin-login .drawer-link-register')

      expect(link).to.not.equal(null)
      link.click()
      expect(vm.$route.path).to.equal(localUrls.register)
    })
  })
})
