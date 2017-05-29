import Vue from 'vue'
import Quasar from 'quasar'

import Component from 'src/components/layout/TitleBar'

Vue.use(Quasar)

/* Helper method to mount/render the test component */
function getComponent (propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('TitleBar.vue', () => {
  describe('Basic Display', () => {
    it('should display the app\'s title', () => {
      const vm = getComponent({})
      const titleEl = vm.$el.querySelector('.toolbar-title')
      const title = titleEl.textContent.trim()
      expect(title).to.equal('Bookly')
    })
  })
})
