import { describe, expect, it } from 'vitest'
import Disclaimer from '@/components/Disclaimer.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('Disclaimer', () => {
  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountComponent(Disclaimer)
    await expectNoA11yViolations(wrapper.element)
  })

  it('rendert de disclaimerpunten als een lijst', () => {
    const wrapper = mountComponent(Disclaimer)
    expect(wrapper.findAll('li').length).toBeGreaterThan(0)
  })
})
