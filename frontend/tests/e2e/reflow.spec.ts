import { test, expect, type Page } from '@playwright/test'
import { PADEN, expectNoViolations, walkPad, walkToConclusion } from './helpers'

/**
 * WCAG 1.4.10 Reflow: bij 320 CSS-pixels breed (of 400% zoom op 1280px, wat op hetzelfde
 * neerkomt) mag er geen horizontale scrollbalk zijn en mag er geen content wegvallen.
 * Dit is de test die de verwijderde `width: 600px` op de fieldset permanent afdekt.
 */

const REFLOW_VIEWPORT = { width: 320, height: 640 }

/** Steekt de pagina horizontaal buiten het venster? Een paar pixels afrondingsruis is oké. */
async function horizontaalOverloop(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    return {
      overflow: doc.scrollWidth - doc.clientWidth,
      breedsteElementen: Array.from(document.querySelectorAll<HTMLElement>('body *'))
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 2)
        .slice(0, 5)
        .map((el) => `${el.tagName}.${el.className}`.slice(0, 120))
    }
  })
}

test.describe('reflow op 320px', () => {
  test.use({ viewport: REFLOW_VIEWPORT })

  test('de homepage past zonder horizontale scrollbalk', async ({ page }) => {
    await page.goto('/')
    const { overflow, breedsteElementen } = await horizontaalOverloop(page)
    expect(overflow, `te breed op 320px: ${breedsteElementen.join(', ')}`).toBeLessThanOrEqual(2)
  })

  test('elke stap van de beslisboom past zonder horizontale scrollbalk', async ({ page }) => {
    for (const pad of PADEN) {
      await walkPad(page, pad, async (label) => {
        const { overflow, breedsteElementen } = await horizontaalOverloop(page)
        expect(
          overflow,
          `"${label}" is te breed op 320px: ${breedsteElementen.join(', ')}`
        ).toBeLessThanOrEqual(2)
      })
    }
  })

  test('de antwoordknoppen worden niet afgekapt', async ({ page }) => {
    // Verticaal scrollen mag (1.4.10 verbiedt alleen scrollen in twee richtingen), dus
    // toetsen we of de knoppen binnen de paginabreedte vallen, niet of ze in beeld staan.
    await walkPad(page, PADEN[0]!, async (label) => {
      const buitenBeeld = await page.evaluate(() => {
        const breedte = document.documentElement.clientWidth
        return Array.from(document.querySelectorAll<HTMLElement>('fieldset button'))
          .filter((knop) => {
            const box = knop.getBoundingClientRect()
            return box.left < -2 || box.right > breedte + 2
          })
          .map((knop) => knop.textContent?.trim().slice(0, 40))
      })
      expect(buitenBeeld, `antwoordknoppen vallen buiten het venster op "${label}"`).toEqual([])
    })
  })

  test('het exportformulier past op 320px', async ({ page }) => {
    await walkToConclusion(page)
    await page.getByRole('button', { name: /Exporteer naar PDF/ }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    const { overflow, breedsteElementen } = await horizontaalOverloop(page)
    expect(
      overflow,
      `exportformulier te breed op 320px: ${breedsteElementen.join(', ')}`
    ).toBeLessThanOrEqual(2)
    await expectNoViolations(page, 'exportformulier op 320px')
  })
})

test.describe('400% zoom', () => {
  // 400% zoom op een venster van 1280x1024 komt neer op een viewport van 320x256 CSS-pixels.
  test.use({ viewport: { width: 320, height: 256 } })

  test('de eerste vraag blijft bruikbaar bij 400% zoom', async ({ page }) => {
    await walkPad(page, PADEN[0]!, async (label) => {
      const { overflow, breedsteElementen } = await horizontaalOverloop(page)
      expect(
        overflow,
        `"${label}" is te breed bij 400% zoom: ${breedsteElementen.join(', ')}`
      ).toBeLessThanOrEqual(2)
    })
  })
})
