/**
 * Escape-afhandeling voor de definitie-tooltips.
 *
 * WCAG 1.4.13 (Content on Hover or Focus) eist dat inhoud die bij hover of
 * focus verschijnt weg te krijgen is zonder de muis te verplaatsen of de focus
 * te verliezen. Alleen met CSS kan dat niet, vandaar deze kleine handler.
 *
 * De handler stopt de Escape alleen wanneer er echt een definitie zichtbaar is.
 * De beslishulp draait als modal in een andere applicatie; die host sluit zijn
 * modal doorgaans ook op Escape en die afhandeling moet blijven werken.
 */

const DEFINITION = '.aiv-definition'
const DISMISSED = 'aiv-definition--dismissed'

function visibleDefinitions(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(`${DEFINITION}:hover, ${DEFINITION}:focus-within`)
  ).filter((element) => !element.classList.contains(DISMISSED))
}

function clearDismissed(except?: Element | null) {
  document.querySelectorAll<HTMLElement>(`.${DISMISSED}`).forEach((element) => {
    if (element !== except) {
      element.classList.remove(DISMISSED)
    }
  })
}

export function registerDefinitionTooltips() {
  document.addEventListener(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      const open = visibleDefinitions()
      if (open.length === 0) return

      // Er stond een definitie open: die sluiten we, en de Escape gaat niet
      // door naar de modal van de omringende applicatie.
      event.stopPropagation()
      event.preventDefault()
      open.forEach((element) => element.classList.add(DISMISSED))

      const active = document.activeElement
      if (active instanceof HTMLElement && active.closest(DEFINITION)) {
        active.blur()
      }
    },
    true
  )

  // Zodra de gebruiker een andere term aanwijst of aantikt, mag de vorige
  // definitie weer gewoon verschijnen.
  const reset = (event: Event) => {
    const target = event.target
    const current = target instanceof Element ? target.closest(DEFINITION) : null
    clearDismissed(current)
  }
  document.addEventListener('mouseover', reset, true)
  document.addEventListener('focusin', reset, true)
}
