import { test, expect, type Page } from '@playwright/test'
import { answerButtons, currentQuestionId, isOnConclusion, startBeslishulp } from './helpers'

/** Beschrijving van het element dat nu focus heeft. */
async function focusInfo(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null
    if (!el || el === document.body) {
      return { tag: 'BODY', key: 'BODY', visible: false, focusRing: false }
    }
    const style = getComputedStyle(el)
    const box = el.getBoundingClientRect()
    return {
      tag: el.tagName,
      key: `${el.tagName}#${el.id}.${el.className}:${el.textContent?.trim().slice(0, 40)}`,
      visible: box.width > 0 && box.height > 0,
      // WCAG 2.4.11/2.4.13: er moet iets zichtbaars gebeuren bij focus. De RVO-componenten
      // gebruiken outline of box-shadow; we accepteren beide.
      focusRing:
        (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== 'none'
    }
  })
}

test('de skip-link is het eerste focusbare element en springt naar de inhoud', async ({ page }) => {
  await startBeslishulp(page)
  await page.keyboard.press('Tab')

  const eerste = await focusInfo(page)
  expect(eerste.key).toContain('aiv-skip-link')

  await page.keyboard.press('Enter')
  const doel = await page.evaluate(() => document.activeElement?.id ?? location.hash)
  expect(doel).toContain('beslishulp-inhoud')
})

test('elke interactieve stap is met alleen het toetsenbord te bereiken en heeft een focusindicator', async ({
  page
}) => {
  await startBeslishulp(page)

  const gezien = new Set<string>()
  for (let tab = 0; tab < 40; tab++) {
    await page.keyboard.press('Tab')
    const info = await focusInfo(page)
    if (info.tag === 'BODY') {
      // De focus is uit de pagina gelopen (naar de browserchrome): einde van de volgorde.
      break
    }
    if (gezien.has(info.key)) {
      break // volledige ronde gemaakt, geen focus-val
    }
    gezien.add(info.key)
    expect(info.visible, `focus staat op een onzichtbaar element: ${info.key}`).toBe(true)
    expect(info.focusRing, `geen zichtbare focusindicator op: ${info.key}`).toBe(true)
  }

  // De antwoordknoppen moeten in die ronde zitten.
  const antwoorden = await answerButtons(page).allTextContents()
  for (const antwoord of antwoorden) {
    expect(
      [...gezien].some((key) => key.includes(antwoord.trim())),
      `antwoord "${antwoord.trim()}" is niet met Tab te bereiken`
    ).toBe(true)
  }
})

test('de hele beslishulp is muisloos te doorlopen', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => sessionStorage.clear())
  await page.reload()

  // Disclaimer accepteren met het toetsenbord.
  await page.getByRole('button', { name: /Akkoord en begin/ }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  for (let stap = 0; stap < 25 && !(await isOnConclusion(page)); stap++) {
    const vraag = await currentQuestionId(page)
    await answerButtons(page).first().focus()
    await page.keyboard.press('Space')

    const volgende = page.getByRole('button', { name: 'Volgende vraag' })
    if ((await volgende.count()) > 0 && (await volgende.isEnabled())) {
      await volgende.focus()
      await page.keyboard.press('Enter')
    }
    await expect
      .poll(async () => ((await isOnConclusion(page)) ? 'conclusie' : await currentQuestionId(page)))
      .not.toBe(vraag)
  }

  expect(await isOnConclusion(page), 'de conclusie is niet met het toetsenbord bereikt').toBe(true)
})

test('de exportdialoog is met het toetsenbord te sluiten', async ({ page }) => {
  await startBeslishulp(page)
  for (let stap = 0; stap < 25 && !(await isOnConclusion(page)); stap++) {
    const vraag = await currentQuestionId(page)
    await answerButtons(page).first().click()
    const volgende = page.getByRole('button', { name: 'Volgende vraag' })
    if ((await volgende.count()) > 0 && (await volgende.isEnabled())) {
      await volgende.click()
    }
    await expect
      .poll(async () => ((await isOnConclusion(page)) ? 'conclusie' : await currentQuestionId(page)))
      .not.toBe(vraag)
  }

  await page.getByRole('button', { name: /Exporteer naar PDF/ }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
})
