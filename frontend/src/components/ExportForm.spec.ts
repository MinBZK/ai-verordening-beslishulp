import { describe, expect, it } from 'vitest'
import ExportForm from '@/components/ExportForm.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

describe('ExportForm', () => {
  it('heeft geen a11y-schendingen als de dialoog open staat', async () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('is een benoemde dialoog', () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    const dialog = wrapper.get('#modal')
    expect(dialog.attributes('role')).toBe('dialog')
    expect(dialog.attributes('aria-modal')).toBe('true')
    const labelId = dialog.attributes('aria-labelledby')!
    expect(wrapper.get(`#${labelId}`).text()).toContain('Exporteer')
  })

  it('sluit met een echte knop in plaats van een div met klik-handler', async () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    const close = wrapper.get('button.modal-content-close')
    expect(close.attributes('aria-label')).toBeTruthy()
    await close.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('sluit met Escape', async () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('reageert niet op Escape als de dialoog dicht is', () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: false } })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('houdt de underlay buiten de toegankelijkheidsboom', () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    expect(wrapper.get('.modal-underlay').attributes('aria-hidden')).toBe('true')
  })

  it('koppelt elk invoerveld aan zijn label', () => {
    const wrapper = mountComponent(ExportForm, { props: { isOpen: true } })
    const labels = wrapper.findAll('label')
    expect(labels.length).toBeGreaterThan(0)
    for (const label of labels) {
      const control = wrapper.find(`#${label.attributes('for')}`)
      expect(control.exists()).toBe(true)
    }
  })
})
