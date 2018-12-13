import Vue from 'Vue'
import * as VueSegmentTracker from '../src/index'

Vue.use(VueSegmentTracker, {
  key: process.env.SEGMENT_KEY,
  propertiesMapper (properties) {
    return {
      thisWillBeOnEveryEvent: true,
      ...properties
    }
  },
  extend: {
    myNewAwesomeMethod () {
      return this
    }
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render (h) {
    return (
      <div id='app'>
        <h1>Hello world!</h1>
        <button v-segment={{ value: 'testing click', modifiers: { click: true } }}>
          Test click directive
        </button>
        <button v-segment={{ value: 'testing 2 click', properties: { something: true }, modifiers: { click: true } }}>
          Test click directive with properties
        </button>
      </div>
    )
  }
})
