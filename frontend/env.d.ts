/// <reference types="vite/client" />

/**
 * De standalone-build van pdfkit heeft geen eigen typedefinities. De API is
 * dezelfde als die van het pakket zelf, dus we hergebruiken @types/pdfkit.
 * Zie src/services/pdfTagged.ts voor waarom deze build nodig is.
 */
declare module 'pdfkit/js/pdfkit.standalone.js' {
  const PDFDocument: typeof import('pdfkit')
  export default PDFDocument
}
