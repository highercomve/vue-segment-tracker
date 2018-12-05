import Vue from 'Vue'
import * as VueSegmentTracker from '../src/index'

Vue.use(VueSegmentTracker, { key: 'algo' })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render (h) {
    return (
      <h1>Hello world!</h1>
    )
  }
})
