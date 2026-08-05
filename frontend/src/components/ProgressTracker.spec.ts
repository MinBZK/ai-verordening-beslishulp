import { describe, expect, it } from 'vitest'
import ProgressTracker from '@/components/ProgressTracker.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

const STATE = [
  { category: 'Geldt de AI-verorderning voor mij?', state: 'doing' as const },
  { category: 'Risicogroep', state: 'incomplete' as const }
]

describe('ProgressTracker', () => {
  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountComponent(ProgressTracker, { props: { categoryState: STATE } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('toont een stap per categorie', () => {
    const wrapper = mountComponent(ProgressTracker, { props: { categoryState: STATE } })
    expect(wrapper.findAll('.rvo-progress-tracker__step-link')).toHaveLength(2)
  })
})
