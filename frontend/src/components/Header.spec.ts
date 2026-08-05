import { describe, expect, it } from 'vitest'
import Header from '@/components/Header.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('Header', () => {
  it('heeft geen a11y-schendingen met de resetknop zichtbaar', async () => {
    const wrapper = mountComponent(Header, {
      props: { questionId: '2.3', disclaimerScreen: '1' }
    })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen op het disclaimerscherm', async () => {
    const wrapper = mountComponent(Header, {
      props: { questionId: '1.1', disclaimerScreen: '0' }
    })
    await expectNoA11yViolations(wrapper.element)
  })

  it('gebruikt voor "Begin opnieuw" een knop, niet een link zonder href', () => {
    const wrapper = mountComponent(Header, {
      props: { questionId: '2.3', disclaimerScreen: '1' }
    })
    const button = wrapper.get('button.header-reset-button')
    expect(button.attributes('type')).toBe('button')
    expect(wrapper.findAll('a')).toHaveLength(0)
  })

  it('stuurt reset-event bij een klik', async () => {
    const wrapper = mountComponent(Header, {
      props: { questionId: '2.3', disclaimerScreen: '1' }
    })
    await wrapper.get('button.header-reset-button').trigger('click')
    expect(wrapper.emitted('reset-event')).toHaveLength(1)
  })
})
