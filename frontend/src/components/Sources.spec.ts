import { describe, expect, it } from 'vitest'
import Sources from '@/components/Sources.vue'
import { mountComponent } from '@/test/mount'
import { expectNoA11yViolations } from '@/test/a11y'

const SOURCES = [
  { source: 'Artikel 6 AI-verordening', url: 'https://example.org/artikel-6' },
  { source: 'Bijlage III zonder link', url: undefined }
]

describe('Sources', () => {
  it('heeft geen a11y-schendingen met en zonder url', async () => {
    const wrapper = mountComponent(Sources, { props: { sources: SOURCES } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('heeft geen a11y-schendingen zonder bronnen', async () => {
    const wrapper = mountComponent(Sources, { props: { sources: undefined } })
    await expectNoA11yViolations(wrapper.element)
  })

  it('maakt alleen een link van een bron met url', () => {
    const wrapper = mountComponent(Sources, { props: { sources: SOURCES } })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0]!.attributes('href')).toBe('https://example.org/artikel-6')
  })
})
