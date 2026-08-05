import { beforeEach, describe, expect, it } from 'vitest'
import Conclusion from '@/components/Conclusion.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

const LABELS = [{ category: 'Risicogroep', assigned_labels: 'hoog-risico' }]
const SOURCES = [{ source: 'Artikel 6 AI-verordening', url: 'https://example.org/artikel-6' }]

function mountConclusion(props: Record<string, unknown> = {}, globalProperties = {}) {
  return mountComponent(
    Conclusion,
    {
      props: {
        conclusion: 'De AI-verordening is op jou van toepassing.',
        obligation: 'Registreer het systeem in het algoritmeregister.',
        sources: SOURCES,
        category: 'Risicogroep',
        labels: LABELS,
        ...props
      }
    },
    globalProperties
  )
}

describe('Conclusion', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    sessionStorage.clear()
  })

  it('heeft geen a11y-schendingen', async () => {
    const wrapper = mountConclusion()
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen zonder verplichtingen en bronnen', async () => {
    const wrapper = mountConclusion({ obligation: null, sources: undefined })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen met de afsluitknop aan', async () => {
    const wrapper = mountConclusion({}, { showCloseOnEnd: true })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen met het gelopen pad erbij', async () => {
    sessionStorage.setItem(
      'userDecisionPath',
      JSON.stringify([
        { questionId: '1.1', question: 'Gebruik je een algoritme?', answer: 'Ja', explanation: '' }
      ])
    )
    const wrapper = mountConclusion()
    await expectNoA11yViolations(wrapper.element)
  })

  it('gebruikt een echte h1 voor "Resultaat" in plaats van een div', () => {
    const wrapper = mountConclusion()
    expect(wrapper.get('h1').text()).toBe('Resultaat')
    expect(wrapper.find('[as="h3"]').exists()).toBe(false)
  })

  it('stuurt back bij "Vorige vraag"', async () => {
    const wrapper = mountConclusion()
    const back = wrapper.findAll('button').find((b) => b.text().includes('Vorige vraag'))!
    await back.trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })
})
