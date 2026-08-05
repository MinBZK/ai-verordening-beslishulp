import { describe, expect, it } from 'vitest'
import HomePage from '@/components/HomePage.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('HomePage', () => {
  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountComponent(HomePage)
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft een main-landmark met een skip-link die daarheen wijst', () => {
    const wrapper = mountComponent(HomePage)
    const skipLink = wrapper.get('a.aiv-skip-link')
    const target = skipLink.attributes('href')!.replace('#', '')
    expect(wrapper.get('main').attributes('id')).toBe(target)
  })

  it('begint de koppenhiërarchie bij h1', () => {
    const wrapper = mountComponent(HomePage)
    expect(wrapper.get('h1').text()).toContain('Beslishulp AI-verordening')
  })

  it('stuurt acceptDisclaimer bij een klik op de startknop', async () => {
    const wrapper = mountComponent(HomePage)
    const start = wrapper.findAll('button').find((b) => b.text().includes('Akkoord'))!
    await start.trigger('click')
    expect(wrapper.emitted('acceptDisclaimer')).toHaveLength(1)
  })
})
