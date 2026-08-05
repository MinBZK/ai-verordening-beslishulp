import { describe, expect, it } from 'vitest'
import DefaultLoader from '@/components/DefaultLoader.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('DefaultLoader', () => {
  it('heeft geen a11y-schendingen tijdens het laden', async () => {
    const wrapper = mountComponent(DefaultLoader, { props: { loading: true } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('rendert niets als er niet geladen wordt', () => {
    const wrapper = mountComponent(DefaultLoader, { props: { loading: false } })
    expect(wrapper.find('.ai-decisiontree-loader').exists()).toBe(false)
  })
})
