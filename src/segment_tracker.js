import Loader from './loader'

const defaultOptions = {
  integrations: {
    'All': true
  }
}

function defaultOptionsMapper (options) {
  return options
}

function extendProperties (properties) {
  return properties
}

export default class SegmentTracker {
  constructor (opts = {}) {
    const {
      key,
      mixinName = '$segment',
      directiveName = 'segment',
      propertiesMapper = extendProperties,
      optionsMapper = defaultOptionsMapper,
      options = defaultOptions,
      config = {},
      routing = {},
      store
    } = opts
    if (!key) {
      throw new Error('Segment key need to be set on install options.')
    }
    this.store = store
    this.routing = routing
    this.config = config
    this.mixinName = mixinName
    this.directiveName = directiveName
    this.options = options
    this.optionsMapper = optionsMapper.bind(this)
    this.propertiesMapper = propertiesMapper.bind(this)
    Loader(key, this.options)
    window.analytics.debug(Boolean(this.options.debug))
    this.initVueRouterGuard()
  }

  initVueRouterGuard () {
    if (!this.routing.vueRouter) {
      return
    }

    if (this.routing.ignoredViews) {
      this.routing.ignoredViews = this.routing.ignoredViews.map(view => view.toLowerCase())
    }

    if (!this.routing.preferredProperty) {
      this.routing.preferredProperty = 'path'
    }

    this.routing.vueRouter.afterEach(to => {
      if (this.routing.ignoredViews && this.routing.ignoredViews.indexOf(to[this.routing.preferredProperty].toLowerCase()) !== -1) {
        return
      }
      this.view(to.meta.analytics || to[this.routing.preferredProperty], this.routing.ignoredModules)
    })

    return this.routing.ignoredViews
  }

  extendProperties (opts) {
    return this.optionsMapper({
      ...this.options,
      ...opts
    })
  }

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

  setSuperProperties (opts) {
    this.options = opts
  }
}
