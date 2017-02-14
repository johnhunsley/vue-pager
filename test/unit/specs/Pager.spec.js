import Vue from 'vue'
import Pager from 'src/components/Pager'

describe('ExamplePager.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Pager)
    })
    // expect(vm.$el.querySelector('.pager h1').textContent)
    //  .to.equal('Welcome to Your Vue.js App')
  })
})
