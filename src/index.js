import SegmentTracker from './segment_tracker'

function mixin (Vue, tracker, mixinName = '$segment') {
  Vue.prototype[mixinName] = tracker
}

function install (Vue, opts = {}) {
  const tracker = new SegmentTracker(opts)
  mixin(Vue, tracker)
}

export {
  install
}
