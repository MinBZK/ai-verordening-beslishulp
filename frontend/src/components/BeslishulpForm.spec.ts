import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import BeslishulpForm from '@/components/BeslishulpForm.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

function mountForm() {
  return mountComponent(BeslishulpForm, { global: { plugins: [createPinia()] } })
}

describe('BeslishulpForm', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    sessionStorage.clear()
  })

  it('heeft geen a11y-schendingen op het disclaimerscherm', async () => {
    const wrapper = mountForm()
    await nextTick()
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen op de eerste vraag', async () => {
    sessionStorage.setItem('acceptedDisclaimer', '1')
    const wrapper = mountForm()
    await nextTick()
    await nextTick()
    expect(wrapper.find('h1').exists()).toBe(true)
    await expectNoA11yViolations(wrapper.element)
  })

  // A5: <main> stond alleen op de HomePage, juist niet op de vraagschermen.
  it('zet de vraaginhoud in een main-landmark met een werkende skip-link', async () => {
    sessionStorage.setItem('acceptedDisclaimer', '1')
    const wrapper = mountForm()
    await nextTick()
    const skipLink = wrapper.get('a.aiv-skip-link')
    const target = skipLink.attributes('href')!.replace('#', '')
    const main = wrapper.get('main')
    expect(main.attributes('id')).toBe(target)
    expect(main.attributes('tabindex')).toBe('-1')
  })

  it('laadt de beslisboom zonder validatiefout', async () => {
    sessionStorage.setItem('acceptedDisclaimer', '1')
    const wrapper = mountForm()
    await nextTick()
    await nextTick()
    expect(wrapper.text()).not.toContain('Could not validate data')
  })
})
