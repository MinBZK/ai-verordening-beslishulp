import { test, expect } from '@playwright/test'
import {
  answerButtons,
  currentQuestionId,
  isOnConclusion,
  startBeslishulp,
  walkToConclusion
} from './helpers'

/**
 * A6/A7 — precies het soort fout dat geen scanner vangt.
 *
 * Bij een vraagovergang verdween de knop waar de focus op stond uit de DOM en viel de focus
 * terug naar <body>; daar bovenop scrollde een setTimeout(…, 200) de gebruiker weg. Er was ook
 * geen enkele aankondiging van de nieuwe vraag.
 */

async function activeElementInfo(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const el = document.activeElement
    return {
      tag: el?.tagName ?? null,
      id: el?.id ?? null,
      text: el?.textContent?.trim().slice(0, 60) ?? null
    }
  })
}

test('de focus verhuist naar de kop van de nieuwe vraag', async ({ page }) => {
  await startBeslishulp(page)
  const eersteVraag = await currentQuestionId(page)

  // Bedien de knop met het toetsenbord, zoals een toetsenbordgebruiker dat zou doen.
  await answerButtons(page).first().focus()
  await page.keyboard.press('Enter')

  const volgende = page.getByRole('button', { name: 'Volgende vraag' })
  if ((await volgende.count()) > 0 && (await volgende.isEnabled())) {
    await volgende.focus()
    await page.keyboard.press('Enter')
  }

  await expect.poll(() => currentQuestionId(page)).not.toBe(eersteVraag)
  const tweedeVraag = await currentQuestionId(page)

  await expect
    .poll(async () => (await activeElementInfo(page)).id)
    .toBe(`vraag-${tweedeVraag}-titel`)

  const actief = await activeElementInfo(page)
  expect(actief.tag, 'de focus mag niet terugvallen naar <body>').toBe('H1')
})

test('de nieuwe vraag wordt aangekondigd in een aria-live-regio', async ({ page }) => {
  await startBeslishulp(page)

  const live = page.locator('#beslishulp-statusbericht')
  // De regio moet er al staan vóór de tekst verandert, anders kondigt een schermlezer niets aan.
  await expect(live).toHaveAttribute('aria-live', 'polite')
  await expect(live).toHaveAttribute('role', 'status')
  await expect(live).toHaveText('')

  const eersteVraag = await currentQuestionId(page)
  await answerButtons(page).first().click()
  const volgende = page.getByRole('button', { name: 'Volgende vraag' })
  if ((await volgende.count()) > 0 && (await volgende.isEnabled())) {
    await volgende.click()
  }
  await expect.poll(() => currentQuestionId(page)).not.toBe(eersteVraag)

  await expect(live).not.toHaveText('')
})

test('de focus verhuist naar de kop van het resultaat', async ({ page }) => {
  await walkToConclusion(page)
  expect(await isOnConclusion(page)).toBe(true)

  await expect
    .poll(async () => {
      const actief = await activeElementInfo(page)
      return `${actief.tag}:${actief.text}`
    })
    .toBe('H1:Resultaat')
})

test('een antwoord kiezen verplaatst de focus niet uit zichzelf', async ({ page }) => {
  await startBeslishulp(page)

  // Zoek een vraag met meer dan één antwoord én een opmerkingenveld, zodat de keuze niet
  // meteen doorschakelt naar de volgende vraag.
  await expect(page.locator('#explanation-field')).toBeVisible()

  const eerste = answerButtons(page).first()
  await eerste.focus()
  await page.keyboard.press('Enter')

  // WCAG 3.2.2: de focus mag na een keuze niet ongevraagd naar het opmerkingenveld springen.
  const actief = await activeElementInfo(page)
  expect(actief.id).not.toBe('explanation-field')
  expect(actief.tag).toBe('BUTTON')
})
