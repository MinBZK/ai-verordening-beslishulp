/**
 * Export van het beslishulp-rapport naar een getagde PDF.
 *
 * De opbouw loopt via TaggedPdf (pdfkit) en niet via pdfmake: pdfmake maakt
 * geen structuurelementen aan, waardoor de PDF wel meldt dat hij een
 * leesvolgorde heeft zonder er een te hebben. Zie pdfTagged.ts.
 */

import { PDF_DISCLAIMER_ITEMS, PDF_INTRO_TEXT, SOURCE_INFO } from '@/components/Disclaimer.vue'
import type { UserDecision } from '@/models/DecisionTree.ts'
import type { FilteredLabels } from '@/services/labelsService'
import { stripHtml } from 'string-strip-html'
import FontService from '@/services/fontService.ts'
import { getAsset } from '@/services/assetsRegistry'
import { TaggedPdf, base64ToBytes } from '@/services/pdfTagged'

const dutchDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

/** ISO 8601-datum (YYYY-MM-DD) voor in de bestandsnaam. */
function getISODate(): string {
  return new Date().toISOString().split('T')[0] || ''
}

async function getAppVersion(): Promise<string> {
  const appVersion = import.meta.env.VITE_APP_VERSION
  if (appVersion && appVersion !== 'unknown') {
    return appVersion
  }
  return 'development'
}

/**
 * Haalt de definitie-tooltips uit de vraagtekst: in de PDF blijft alleen de
 * term over, want de tooltip is een schermmechanisme.
 */
function replaceSpecificDivsWithTextContent(htmlString: string, selector: string): string {
  if (!htmlString || htmlString.trim() === '') {
    return ''
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    const targetDivs = doc.querySelectorAll(selector)

    targetDivs.forEach((targetDiv) => {
      const definitionSpans = targetDiv.querySelectorAll('.aiv-definition-text')
      definitionSpans.forEach((span) => span.remove())

      const mainTerm = targetDiv.textContent?.trim() || ''
      const textNode = document.createTextNode(mainTerm)
      targetDiv.parentNode?.replaceChild(textNode, targetDiv)
    })

    return doc.body.innerHTML
  } catch (error) {
    console.error('Error in replaceSpecificDivsWithTextContent:', error)
    return htmlString
  }
}

/** Eén blok uit de conclusie- of verplichtingen-HTML. */
type HtmlBlock = { kind: 'paragraph'; text: string } | { kind: 'list'; items: string[] }

/**
 * Zet de HTML uit de beslisboom om in blokken die als alinea of lijst getagd
 * kunnen worden. Alleen die twee vormen komen in deze teksten voor.
 */
export function htmlToBlocks(html: string): HtmlBlock[] {
  if (!html || html.trim() === '') return []

  const processed = replaceSpecificDivsWithTextContent(html, '.aiv-definition')
  const doc = new DOMParser().parseFromString(processed, 'text/html')
  const blocks: HtmlBlock[] = []
  let paragraph: string[] = []

  const flush = () => {
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim()
    if (text) blocks.push({ kind: 'paragraph', text })
    paragraph = []
  }

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text) paragraph.push(text)
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return

    const element = node as Element
    const tag = element.tagName.toUpperCase()

    if (tag === 'UL' || tag === 'OL') {
      flush()
      const items = Array.from(element.querySelectorAll('li'))
        .map((li) => li.textContent?.trim() || '')
        .filter(Boolean)
      if (items.length) blocks.push({ kind: 'list', items })
      return
    }

    if (tag === 'BR' || tag === 'P' || tag === 'DIV') {
      flush()
    }

    Array.from(element.childNodes).forEach(walk)

    if (tag === 'P' || tag === 'DIV') {
      flush()
    }
  }

  walk(doc.body)
  flush()
  return blocks
}

function addHtmlSection(pdf: TaggedPdf, title: string, html: string): void {
  pdf.addPage()
  pdf.heading(title, 2)
  const blocks = htmlToBlocks(html)
  if (blocks.length === 0) {
    pdf.paragraph('Geen informatie beschikbaar.')
    return
  }
  for (const block of blocks) {
    if (block.kind === 'list') {
      pdf.list(block.items)
    } else {
      pdf.paragraph(block.text)
    }
  }
}

function addTitlePage(
  pdf: TaggedPdf,
  algorithmName: string,
  description: string,
  filledBy: string,
  releaseTag: string
): void {
  pdf.addPage()
  pdf.moveDown(4)
  pdf.heading('Resultaten AI-verordening Beslishulp', 1)

  if (algorithmName) {
    pdf.paragraph(algorithmName, { size: 16 })
  }
  if (description) {
    pdf.paragraph(description)
  }
  if (filledBy) {
    pdf.paragraph(`Ingevuld door ${filledBy}`, { italic: true, muted: true })
  }

  pdf.paragraph(`Gegenereerd op ${dutchDateFormatter.format(new Date())}`, {
    italic: true,
    muted: true
  })
  pdf.paragraph(`Bron: ${SOURCE_INFO.name}`, { italic: true, muted: true })
  if (SOURCE_INFO.url) {
    pdf.link(SOURCE_INFO.url, SOURCE_INFO.url)
  }
  pdf.paragraph(`Versie: ${releaseTag}`, { italic: true, muted: true })
}

function addDisclaimers(pdf: TaggedPdf): void {
  pdf.addPage()
  pdf.heading('Belangrijke informatie', 2)
  for (const paragraph of PDF_INTRO_TEXT.plain.split('\n\n')) {
    pdf.paragraph(paragraph.trim())
  }
  pdf.list(PDF_DISCLAIMER_ITEMS.map((item) => item.plainText))
}

function addLabels(pdf: TaggedPdf, labels: FilteredLabels): void {
  pdf.addPage()
  pdf.heading('AI-verordening Profiel', 2)
  const rows = Object.entries(labels).map(([category, values]) => [category, values.join(', ')])
  if (rows.length === 0) {
    pdf.paragraph('Geen profiel vastgesteld.')
    return
  }
  pdf.table(['Categorie', 'Resultaat'], rows)
}

function addAnswers(pdf: TaggedPdf, userDecisionPath: UserDecision[]): void {
  pdf.addPage()
  pdf.heading('Antwoorden', 2)

  if (userDecisionPath.length === 0) {
    pdf.paragraph('Geen antwoorden vastgelegd.')
    return
  }

  for (const decision of userDecisionPath) {
    const question = stripHtml(
      replaceSpecificDivsWithTextContent(decision.question ?? '', '.aiv-definition')
    ).result
    pdf.heading(`Vraag ${decision.questionId}: ${question}`, 3)
    pdf.paragraph(`Antwoord: ${decision.answer ?? 'niet beantwoord'}`)
    if (decision.explanation) {
      pdf.paragraph(`Opmerking: ${decision.explanation}`)
    }
  }
}

function addSources(
  pdf: TaggedPdf,
  sources: { source: string; url: string | undefined }[]
): void {
  pdf.addPage()
  pdf.heading('Bronnen', 2)

  pdf.paragraph(SOURCE_INFO.name)
  if (SOURCE_INFO.url) {
    pdf.link(SOURCE_INFO.url, SOURCE_INFO.url)
  }

  pdf.paragraph('AI-verordening Beslishulp Github')
  pdf.link(
    'https://github.com/MinBZK/ai-verordening-beslishulp',
    'https://github.com/MinBZK/ai-verordening-beslishulp'
  )

  for (const source of sources) {
    if (!source.url) continue
    pdf.paragraph(source.source)
    pdf.link(source.url, source.url)
  }
}

function buildFilename(filename: string): string {
  const prefix = 'AI-verordening beslishulp'
  const base = filename && filename.trim() !== '' ? `${prefix} - ${filename}` : prefix
  return `${base} - ${getISODate()}.pdf`
}

/** Start de download van de blob onder de gegeven bestandsnaam. */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  // De URL pas vrijgeven als de browser de download heeft opgepakt.
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

export async function exportToPdf(
  filename: string,
  userDecisionPath: UserDecision[],
  conclusion: string,
  sources: { source: string; url: string | undefined }[] | undefined,
  obligation: string | null,
  algorithmName: string,
  description: string,
  filledBy: string,
  labels: FilteredLabels
): Promise<void> {
  try {
    const releaseTag = await getAppVersion()
    const logoBase64 = await getAsset('RO_Logo_pres_pos_nl.png')
    const vfs = await FontService.getVFS()

    // De VFS levert de fonts als base64; pdfkit wil de ruwe bytes.
    const fontBytes = (name: string): Uint8Array | undefined => {
      const data = vfs[name]
      return data ? base64ToBytes(data) : undefined
    }

    const pdf = new TaggedPdf({
      title: algorithmName
        ? `AI-verordening Beslishulp - ${algorithmName}`
        : 'AI-verordening Beslishulp',
      language: 'nl-NL',
      subject: `Versie: ${releaseTag}`,
      logoBase64,
      fonts: {
        normal: fontBytes('rijksoverheidsanstext-regular-webfont.ttf'),
        bold: fontBytes('rijksoverheidsanstext-bold-webfont.ttf'),
        italic: fontBytes('rijksoverheidsanstext-italic-webfont.ttf')
      }
    })

    addTitlePage(pdf, algorithmName, description, filledBy, releaseTag)
    addDisclaimers(pdf)
    addLabels(pdf, labels)
    addAnswers(pdf, userDecisionPath)
    addHtmlSection(pdf, 'Conclusie', conclusion)
    if (obligation) {
      addHtmlSection(pdf, 'Verplichtingen', obligation)
    }
    addSources(pdf, sources ?? [])

    const blob = await pdf.finish()
    downloadBlob(blob, buildFilename(filename))
  } catch (error) {
    console.error(error)
    return Promise.reject(new Error('Failed to export PDF'))
  }
}
