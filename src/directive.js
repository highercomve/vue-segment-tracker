
const getPath = (obj, path, defaultReturn = undefined) => {
  const [p, ...rest] = path.split('.')
  if (!obj[p]) { return defaultReturn }
  return rest.length <= 0 ? obj[p] : getPath(obj[p], rest.join('.'))
}

const clickHandler = ($segment, ...args) => () => $segment.click(...args)
const inputHandler = ($segment, ...args) => () => $segment.input(...args)

export default function (mixinName) {
  return {
    bind (el, binding, vnode) {
      const $segment = vnode.context[mixinName]
      const properties = typeof binding.value === 'object' && binding.value.properties ? binding.value.properties : undefined
      const options = typeof binding.value === 'object' && binding.value.options ? binding.value.options : undefined
      const name = typeof binding.value === 'object' && binding.value.value ? binding.value.value : binding.value

      if (binding.modifiers.view || binding.arg === 'view' || getPath(binding.value, 'modifiers.view')) {
        return $segment.view(name, properties, options)
      }

      if (binding.modifiers.click || binding.arg === 'click' || getPath(binding.value, 'modifiers.click')) {
        el.addEventListener('click', clickHandler($segment, name, properties, options))
        return
      }

      if (binding.modifiers.input || binding.arg === 'input' || getPath(binding.value, 'modifiers.input')) {
        el.addEventListener('keyup', inputHandler($segment, name, properties, options))
        return
      }

      $segment.trackEvent(name, properties, options)
    }
  }
}
