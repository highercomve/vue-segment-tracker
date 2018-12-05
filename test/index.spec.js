import { createLocalVue } from '@vue/test-utils'
import * as VueSegment from '../src/index'

const localVue = createLocalVue()

describe('Package load', () => {
  beforeAll(() => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://algo.com'
    document.body.appendChild(script)
  })
  it('Throw error if token is not on options', () => {
    expect(() => {
      localVue.use(VueSegment)
    }).toThrow()
  })

  it('Loads with only token', () => {
    const options = { key: 'algo' }
    localVue.use(VueSegment, options)
    expect(localVue.prototype.$segment).toBeDefined()
  })
})
