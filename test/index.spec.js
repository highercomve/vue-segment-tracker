import { createLocalVue } from '@vue/test-utils'
import * as VueSegment from '../src/index'
import SegmentTracker from '../src/segment_tracker'

describe('Package load', () => {
  let localVue
  beforeAll(() => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://algo.com'
    document.body.appendChild(script)
  })
  beforeEach(() => {
    localVue = createLocalVue()
  })
  it('Throw error if token is not on options', () => {
    expect(() => {
      localVue.use(VueSegment)
    }).toThrow()
  })

  it('Loads with only token and is typeof SegmentTracker', () => {
    const options = { key: 'algo' }
    localVue.use(VueSegment, options)
    window.analytics.methods.forEach((method) => {
      window.analytics[method] = (...args) => args
    })
    expect(localVue.prototype.$segment).toBeDefined()
    expect(localVue.prototype.$segment).toBeInstanceOf(SegmentTracker)
  })

  it('Loads with store', () => {
    const store = {
      state: {
        something: true
      }
    }
    const options = {
      key: 'algo',
      store
    }
    localVue.use(VueSegment, options)
    expect(localVue.prototype.$segment).toBeDefined()
    expect(localVue.prototype.$segment).toBeInstanceOf(SegmentTracker)
    expect(localVue.prototype.$segment.store).toBe(store)
  })

  it('Loads with store', () => {
    const routing = {
      vueRouter: {
        afterEach (...args) { return args }
      }
    }
    const options = {
      key: 'algo',
      routing
    }
    localVue.use(VueSegment, options)
    expect(localVue.prototype.$segment).toBeDefined()
    expect(localVue.prototype.$segment).toBeInstanceOf(SegmentTracker)
    expect(localVue.prototype.$segment.routing).toBe(routing)
  })

  it('Load options with mapper', (done) => {
    const installOptions = {
      key: 'algo',
      options: {
        something: true
      },
      optionsMapper (options) {
        expect(options).toEqual({ something: true, somethingElse: true })
        done()
      }
    }
    localVue.use(VueSegment, installOptions)
    localVue.prototype.$segment.trackEvent('something', {}, { somethingElse: true })
  })

  it('Load properties from propertiesMapper', () => {
    const store = {
      state: {
        app: {
          name: 'appName',
          version: '1.1.1'
        }
      }
    }
    const options = {
      key: 'algo',
      store,
      propertiesMapper (properties) {
        return {
          app: this.store.state.app.name,
          version: this.store.state.app.version,
          ...properties
        }
      }
    }
    localVue.use(VueSegment, options)
    const config = {
      integrations: {
        'All': false,
        'Google': true
      }
    }
    expect(localVue.prototype.$segment).toBeDefined()
    const args = ['nodejs', { label: 'testing' }, config]
    const argumentsResults = localVue.prototype.$segment.trackEvent(...args)
    expect(argumentsResults).toEqual([
      'nodejs',
      {
        'app': 'appName',
        'label': 'testing',
        'version': '1.1.1'
      },
      {
        'integrations': {
          'All': false,
          'Google': true
        }
      },
      undefined
    ])
  })

  it('Load properties from propertiesMapperm on vie should be merge with options', () => {
    const store = {
      state: {
        app: {
          name: 'appName',
          version: '1.1.1'
        }
      }
    }
    const options = {
      key: 'algo',
      store,
      propertiesMapper (properties) {
        return {
          app: this.store.state.app.name,
          version: this.store.state.app.version,
          ...properties
        }
      }
    }
    localVue.use(VueSegment, options)
    const config = {
      integrations: {
        'All': false,
        'Google': true
      }
    }
    expect(localVue.prototype.$segment).toBeDefined()
    const args = ['nodejs', { label: 'testing' }, config]
    const argumentsResults = localVue.prototype.$segment.view(...args)
    expect(argumentsResults).toEqual([
      'nodejs',
      {
        'app': 'appName',
        'label': 'testing',
        'version': '1.1.1',
        'integrations': {
          'All': false,
          'Google': true
        }
      },
      undefined
    ])
  })

  it('Support extend property', () => {
    localVue.use(VueSegment, {
      key: 'algo',
      extend: {
        myNewAwesomeMethod () {
          return this
        }
      }
    })
    expect(localVue.prototype.$segment.myNewAwesomeMethod).toBeDefined()
  })
})
