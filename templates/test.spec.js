import Vue from 'vue'
import VueRouter from 'vue-router'
import Quasar from 'quasar'

import store from 'src/store/store'
import { routes } from 'src/router'

import Component from 'src/components/COMPONENT'

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

describe('COMPONENT', () => {
  describe('- NOT IMPLEMENTED', () => {
    it('does not have any tests written yet.', () => {
      const vm = getComponent() // eslint-disable-line no-unused-vars
      expect(true).to.equal(false)
    })
  })
})
