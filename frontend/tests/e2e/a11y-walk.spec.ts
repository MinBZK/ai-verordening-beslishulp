import { test, expect } from '@playwright/test'
import {
  PADEN,
  answerButtons,
  expectNoViolations,
  walkPad,
  walkToConclusion
} from './helpers'

/**
 * Laag 3: een beslishulp heeft geen "pagina" om te scannen — elke vraag is een andere
 * DOM-state. Deze suite loopt drie representatieve paden af en scant elke state.
 *
 * BEWUSTE AFBAKENING: dit is geen volledige boomdekking. decision-tree.yaml is groot en de
 * data verandert continu; de UI-componenten zijn eindig. De paden hieronder dekken samen alle
 * varianten die de templates kennen. Wat níet gedekt is, is de inhoud van elke individuele
 * vraag — "groen" betekent dus niet "alle vragen gescand".
 */

test('de homepage met de disclaimer is toegankelijk', async ({ page }) => {
  await page.goto('/')
  await expectNoViolations(page, 'homepage/disclaimer')
})

for (const pad of PADEN) {
  test(`pad "${pad.naam}" is op elke stap toegankelijk`, async ({ page }) => {
    const gescand: string[] = []
    const bezocht = await walkPad(page, pad, async (label) => {
      gescand.push(label)
      await expectNoViolations(page, label)
    })
    // Zichtbaar maken wát er gescand is, zodat "groen" niet als "alles gedekt" gelezen wordt.
    console.log(`pad "${pad.naam}" (${pad.beschrijving})\n  gescand: ${gescand.join('\n           ')}`)
    expect(bezocht.length).toBeGreaterThan(0)
  })
}

test('de paden dekken samen alle varianten van de vraagtemplate', async ({ page }) => {
  const alleBezocht = new Set<string>()
  const antwoordAantallen = new Set<number>()

  for (const pad of PADEN) {
    const bezocht = await walkPad(page, pad, async () => {
      antwoordAantallen.add(await answerButtons(page).count())
    })
    bezocht.forEach((id) => alleBezocht.add(id))
  }

  // De template vertakt op "meer dan 2 antwoorden" (lijst) versus "2 of minder" (losse knoppen).
  expect(
    [...antwoordAantallen].some((aantal) => aantal > 2),
    `geen vraag met meer dan 2 antwoorden geraakt; gezien: ${[...antwoordAantallen].join(', ')}`
  ).toBe(true)
  expect([...antwoordAantallen].some((aantal) => aantal > 0 && aantal <= 2)).toBe(true)
  // 2.0 is het enige tussenscherm: daar wordt het opmerkingenveld verborgen.
  expect([...alleBezocht], 'het tussenscherm is niet geraakt').toContain('2.0')
})

test('het exportformulier is toegankelijk', async ({ page }) => {
  await walkToConclusion(page)
  await page.getByRole('button', { name: /Exporteer naar PDF/ }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expectNoViolations(page, 'exportformulier')
})
