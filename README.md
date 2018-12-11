# vue-segment-tracker

This package seek to wrapper segment and add mixins and directives to send event trought segment

## Installation and configuration

```bash
yarn add -D vue-segment-tracker
```

```js
import Vue from 'Vue'
import * as VueSegmentTracker from 'vue-segment-tracker'

Vue.use(VueSegmentTracker, {
  key: SEGMENT_KEY, // pass your segment key
  mixinName: '$segment', // how the mixin is will be call, default: '$segment'
  directiveName: 'segment', // how the mixin is will be call, default: 'segment'
  // optional options
  options: {
    // default segment options
  },
  store: VuexStore, // optional pass VuexStore and will be accesible from propertiesMapper and optionsMapper
  // optional integration with vue router (trigger view with every router change) -> only available in history mode
  routing: {
    vueRouter: router, //  Pass the router instance to automatically sync with router (optional)
    preferredProperty: 'name', // By default 'path' and related with vueRouter (optional)
    ignoredViews: ['homepage'], // Views that will not be tracked
    ignoredModules: ['ga'] // Modules that will not send route change events. The event sent will be this.$ma.trackView({viewName: 'homepage'}, ['ga'])
  },
  /**
   * propertiesMapper [opitonal]
   * this function has access to the segment tracker `this` Context and returns the properties for segment event
   * @param {Object} properties
   * @returns {Object}
   */
  propertiesMapper (properties) {
    return {
      thisWillBeOnEveryEvent: true,
      ...properties
    }
  },
  /**
   * optionsMapper [opitonal]
   * this function has access to the segment tracker `this` Context and returns the options for segment event
   * @param {Object} options
   * @returns {Object}
   */
  optionsMapper (options) {
    return {
      thisWillBeOnEveryEvent: true,
      ...options
    }
  }
})
```

### Segment Tracket `this` Context

```js
{
  store
  routing
  config
  mixinName
  options
}
```

## How to use it

```js
import Vue from 'Vue'
import * as VueSegmentTracker from 'vue-segment-tracker'

Vue.use(VueSegmentTracker, {
  key: process.env.SEGMENT_KEY,
  propertiesMapper (properties) {
    return {
      thisWillBeOnEveryEvent: true,
      ...properties
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `
    <div id='app'>
      <h1>Hello world!</h1>
      <button v-segment:click='testing click'}>
        Test click directive
      </button>
      <button v-segment:click='{ value: 'testing 2 click', properties: { something: true } }'>
        Test click directive with properties
      </button>
    </div>
  `
})
```

and you can use the mixins

```js
export default {
  methods: {
    trackClick () {
      this.$segment.click('name', properties, options, cb)
    }
  }
}
```

the mixin has available this methods

```js
  click (name, properties, options, cb) {
    return window.analytics.track(`Click ${name}`, this.propertiesMapper(properties), this.extendProperties(options), cb)
  }

  view (name, properties, options, cb) {
    return window.analytics.page(name, { ...this.propertiesMapper(properties), ...this.extendProperties(options) }, cb)
  }

  fire (name, properties, options, cb) {
    return window.analytics.track(name, this.propertiesMapper(properties), this.extendProperties(options), cb)
  }

  input (name, properties, options, cb) {
    return window.analytics.track(`input ${name}`, this.propertiesMapper(properties), this.extendProperties(options), cb)
  }

  trackEvent (name, properties, options, cb) {
    return window.analytics.track(name, this.propertiesMapper(properties), this.extendProperties(options), cb)
  }

  identity (id, traits, options, cb) {
    return window.analytics.identity(id, traits, this.extendProperties(options), cb)
  }

  group (id, traits, options, cb) {
    return window.analytics.group(id, traits, this.extendProperties(options), cb)
  }

  alias (id, traits, options, cb) {
    return window.analytics.alias(id, traits, this.extendProperties(options), cb)
  }
```
