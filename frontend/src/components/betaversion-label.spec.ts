import { describe, it } from 'vitest'
import BetaversionLabel from '@/components/betaversion-label.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('betaversion-label', () => {
  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountComponent(BetaversionLabel)
    await expectNoA11yViolations(wrapper.element)
  })
})
