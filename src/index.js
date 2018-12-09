import SegmentTracker from './segment_tracker'
import DirectiveFactory from './directive'

function mixin (Vue, tracker) {
  Vue.prototype[tracker.mixinName] = tracker
}

function install (Vue, opts = {}) {
  const tracker = new SegmentTracker(opts)
  const directive = DirectiveFactory(tracker.mixinName)
  Vue.directive(tracker.directiveName, directive)
  mixin(Vue, tracker)
}

export {
  install
}
