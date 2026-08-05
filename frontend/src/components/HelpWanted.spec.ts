import { describe, it } from 'vitest'
import HelpWanted from '@/components/HelpWanted.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('HelpWanted', () => {
  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountComponent(HelpWanted)
    await expectNoA11yViolations(wrapper.element)
  })
})
