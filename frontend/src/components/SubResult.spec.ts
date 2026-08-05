import { describe, expect, it } from 'vitest'
import SubResult from '@/components/SubResult.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

const LABELS = [
  { category: 'Risicogroep', assigned_labels: 'hoog-risico' },
  { category: 'Verantwoordelijkheid', assigned_labels: 'aanbieder' }
]

describe('SubResult', () => {
  it('heeft geen a11y-schendingen als tussenresultaat', async () => {
    const wrapper = mountComponent(SubResult, {
      props: { category: 'Risicogroep', labels: LABELS, title: 'Tussenresultaten', conclusion: '' }
    })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen als eindresultaat', async () => {
    const wrapper = mountComponent(SubResult, {
      props: {
        category: 'Risicogroep',
        labels: LABELS,
        title: 'AI-verordening Profiel',
        conclusion: 'Een conclusie'
      }
    })
    await expectNoA11yViolations(wrapper.element)
  })

  it('rendert niets zonder labels', () => {
    const wrapper = mountComponent(SubResult, {
      props: { category: undefined, labels: undefined, title: 'Tussenresultaten', conclusion: '' }
    })
    expect(wrapper.text()).toBe('')
  })

  it('gebruikt h2 voor de accordion-kop zodat er geen kopniveau wordt overgeslagen', () => {
    const wrapper = mountComponent(SubResult, {
      props: { category: 'Risicogroep', labels: LABELS, title: 'Tussenresultaten', conclusion: '' }
    })
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(false)
  })
})
