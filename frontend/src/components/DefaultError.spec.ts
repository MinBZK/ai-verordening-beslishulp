import { describe, expect, it } from 'vitest'
import DefaultError from '@/components/DefaultError.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('DefaultError', () => {
  it('heeft geen a11y-schendingen met een foutmelding', async () => {
    const wrapper = mountComponent(DefaultError, { props: { error: 'Er ging iets mis' } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('toont de foutmelding als een echte kop, niet als div met as-attribuut', () => {
    const wrapper = mountComponent(DefaultError, { props: { error: 'Er ging iets mis' } })
    expect(wrapper.find('h2').text()).toBe('Error')
    expect(wrapper.text()).toContain('Er ging iets mis')
  })

  it('rendert niets zonder fout', () => {
    const wrapper = mountComponent(DefaultError, { props: { error: null } })
    expect(wrapper.text()).toBe('')
  })
})
