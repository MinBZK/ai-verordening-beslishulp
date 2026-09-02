/// <reference types="vite/client" />

/** De standalone-build heeft geen eigen types; de API is gelijk aan pdfkit. */
declare module 'pdfkit/js/pdfkit.standalone.js' {
  const PDFDocument: typeof import('pdfkit')
  export default PDFDocument
}
