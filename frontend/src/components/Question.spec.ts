import { beforeEach, describe, expect, it } from 'vitest'
import Question from '@/components/Question.vue'
import type { Answer } from '@/models/DecisionTree'
import { UserDecisionsService } from '@/services/userDecisionsService'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

function answer(text: string): Answer {
  return {
    answer: text,
    nextQuestionId: '1.2',
    nextConclusionId: undefined,
    subresult: undefined,
    labels: undefined,
    redirects: undefined,
    explanation: undefined
  }
}

const TWO_ANSWERS = [answer('Ja'), answer('Nee')]
const MANY_ANSWERS = [answer('Ja'), answer('Nee'), answer('Weet ik niet'), answer('Deels')]

const SOURCES = [{ source: 'Artikel 6 AI-verordening', url: 'https://example.org/artikel-6' }]
const LABELS = [{ category: 'Risicogroep', assigned_labels: 'hoog-risico' }]

type Overrides = {
  answers?: Answer[]
  question_category?: string
  sources?: typeof SOURCES | undefined
  labels?: typeof LABELS | undefined
  id?: string
}

function mountQuestion(overrides: Overrides = {}, globalProperties = {}) {
  return mountComponent(
    Question,
    {
      props: {
        id: overrides.id ?? '1.1',
        question: 'Gebruik je een <strong>algoritme</strong>?',
        explanation: 'Een toelichting bij de vraag.',
        sources: 'sources' in overrides ? overrides.sources : SOURCES,
        answers: overrides.answers ?? TWO_ANSWERS,
        category: 'Geldt de AI-verorderning voor mij?',
        question_category: overrides.question_category ?? 'vraag',
        labels: 'labels' in overrides ? overrides.labels : LABELS,
        userDecisions: UserDecisionsService()
      }
    },
    globalProperties
  )
}

describe('Question — toegankelijkheid', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('heeft geen a11y-schendingen met twee antwoorden', async () => {
    const wrapper = mountQuestion()
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen met meer dan twee antwoorden', async () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen zonder opmerkingenveld', async () => {
    const wrapper = mountQuestion({}, { showExplanationField: false })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen op een tussenscherm', async () => {
    const wrapper = mountQuestion({ question_category: 'tussenscherm' })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen zonder bronnen en labels', async () => {
    const wrapper = mountQuestion({ sources: undefined, labels: undefined })
    await expectNoA11yViolations(wrapper.element)
  })
})

describe('Question — semantiek van de antwoordgroep', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  // A2: de fieldset had geen legend, dus de groep antwoordopties had geen naam.
  it('geeft de antwoordgroep een toegankelijke naam via een legend', () => {
    const wrapper = mountQuestion()
    const legend = wrapper.get('fieldset > legend')
    expect(legend.text()).not.toBe('')
    // Screenreader-only, niet display:none — dat zou hem ook bij hulpsoftware weghalen.
    expect(legend.classes()).toContain('aiv-visually-hidden')
  })

  // A3: een harde pixelbreedte breekt reflow op 320px en bij 400% zoom.
  it('gebruikt nergens een harde pixelbreedte in een inline style', () => {
    const wrapper = mountQuestion()
    const widths = wrapper
      .findAll('[style]')
      .map((element) => element.attributes('style') ?? '')
      .filter((style) => /(^|[^-])width:\s*\d+px/.test(style))
    expect(widths).toEqual([])
  })

  // A4: de selectie was alleen zichtbaar via een CSS-class.
  it('markeert het geselecteerde antwoord met aria-pressed', async () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS })
    const buttons = wrapper.findAll('fieldset button')
    expect(buttons.map((b) => b.attributes('aria-pressed'))).toEqual([
      'false',
      'false',
      'false',
      'false'
    ])

    await buttons[2]!.trigger('click')

    const pressed = wrapper
      .findAll('fieldset button')
      .filter((b) => b.attributes('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0]!.text()).toBe('Weet ik niet')
  })

  // B1: aria-roledescription="button" op een native <button> overschreef de eigen rol.
  it('zet geen aria-roledescription op native knoppen', () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS })
    expect(wrapper.html()).not.toContain('aria-roledescription')
  })

  // B2: id="0", id="1" — betekenisloos en botsingsgevoelig.
  it('geeft de antwoordknoppen unieke, betekenisvolle id\'s', () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS, id: '2.4' })
    const ids = wrapper.findAll('fieldset button').map((b) => b.attributes('id'))
    expect(ids).toEqual([
      'antwoord-2.4-0',
      'antwoord-2.4-1',
      'antwoord-2.4-2',
      'antwoord-2.4-3'
    ])
    expect(new Set(ids).size).toBe(ids.length)
  })

  // B4: .no-list zet list-style:none, waardoor Safari/VoiceOver de lijstsemantiek laat vallen.
  it('houdt de lijstsemantiek van de antwoordlijst expliciet overeind', () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS })
    expect(wrapper.get('ul.no-list').attributes('role')).toBe('list')
  })

  it('geeft de vraagkop een id en tabindex zodat de focus erheen kan', () => {
    const wrapper = mountQuestion({ id: '3.2' })
    const heading = wrapper.get('h1')
    expect(heading.attributes('id')).toBe('vraag-3.2-titel')
    expect(heading.attributes('tabindex')).toBe('-1')
  })
})

describe('Question — gedrag', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('stuurt bij één antwoord direct het antwoord door', async () => {
    const wrapper = mountQuestion({ answers: [answer('Verder')] })
    await wrapper.get('fieldset button').trigger('click')
    expect(wrapper.emitted('answered')).toHaveLength(1)
  })

  it('wacht op "Volgende vraag" als het opmerkingenveld aan staat', async () => {
    const wrapper = mountQuestion()
    await wrapper.get('fieldset button').trigger('click')
    expect(wrapper.emitted('answered')).toBeUndefined()

    const next = wrapper
      .findAll('button')
      .find((b) => b.text().includes('Volgende vraag'))!
    await next.trigger('click')
    expect(wrapper.emitted('answered')).toHaveLength(1)
  })

  it('stuurt zonder opmerkingenveld het antwoord meteen door', async () => {
    const wrapper = mountQuestion({ answers: MANY_ANSWERS }, { showExplanationField: false })
    await wrapper.findAll('fieldset button')[1]!.trigger('click')
    expect(wrapper.emitted('answered')).toHaveLength(1)
  })

  it('toont het opmerkingenveld niet op een tussenscherm', () => {
    const wrapper = mountQuestion({ question_category: 'tussenscherm' })
    expect(wrapper.find('#explanation-field').exists()).toBe(false)
  })

  it('toont geen "Vorige vraag" op de eerste vraag', () => {
    const wrapper = mountQuestion({ id: '1.1' })
    expect(wrapper.findAll('button').some((b) => b.text().includes('Vorige vraag'))).toBe(false)
  })
})
