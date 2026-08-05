import { afterEach } from 'vitest'

// De componenten worden met attachTo: document.body gemount (axe heeft elementen in de DOM
// nodig). Zonder opruimen stapelen de vorige mounts zich op en scant axe ook die.
afterEach(() => {
  document.body.innerHTML = ''
})
