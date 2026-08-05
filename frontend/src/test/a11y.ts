import { expect } from 'vitest'
import { axe } from 'vitest-axe'
import type { AxeResults, RunOptions } from 'axe-core'

/**
 * Regels die op componentniveau niets zeggen, omdat ze over een hele pagina gaan.
 * Ze worden wél gedekt door de Playwright-walk (tests/e2e), die een echte pagina scant.
 */
const PAGE_LEVEL_RULES = [
  'region', // "alle content moet in een landmark staan" — een component is geen pagina
  'page-has-heading-one',
  'landmark-one-main',
  'html-has-lang',
  'bypass'
]

/**
 * jsdom rendert geen pixels: kleurcontrast is hier per definitie niet meetbaar.
 * Die controle hoort in Laag 3 (Playwright, echte browser).
 */
export const AXE_COMPONENT_OPTIONS: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
  },
  rules: Object.fromEntries(PAGE_LEVEL_RULES.map((rule) => [rule, { enabled: false }]))
}

/** Draait axe op een gemount component en faalt met de gevonden schendingen erbij. */
export async function expectNoA11yViolations(element: Element) {
  const results = (await axe(element, AXE_COMPONENT_OPTIONS)) as AxeResults
  if (results.violations.length > 0) {
    const summary = results.violations
      .map(
        (violation) =>
          `${violation.id}: ${violation.help}\n` +
          violation.nodes.map((node) => `  ${node.html}`).join('\n')
      )
      .join('\n\n')
    expect.fail(`axe vond ${results.violations.length} schending(en):\n\n${summary}`)
  }
}
