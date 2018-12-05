import Loader from './loader'

export default class SegmentTracker {
  constructor ({ key, options = {}, integrations = { 'All': true }, config = {}, store, router } = {}) {
    if (!key) {
      throw new Error('Segment key need to be set on install options.')
    }
    this.store = store
    this.router = router
    this.config = config
    this.options = options
    this.integrations = integrations
    this.analytics = Loader(key)
    this.analytics.debug(Boolean(this.options.debug))
  }

  click (obj) {

  }

  view (obj) {

  }

  fire (obj) {

  }

  input (obj) {

  }

  trackEvent (obj) {

  }

  addTransaction () {

  }

  addItem () {

  }

  trackTransaction () {

  }

  clearTransactions () {

  }

  identity () {

  }

  reset () {

  }

  setAlias () {

  }

  setSuperProperties () {

  }
}
