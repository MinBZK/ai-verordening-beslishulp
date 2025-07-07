import * as pdfMake from 'pdfmake/build/pdfmake'
import type {Content, StyleDictionary, TDocumentDefinitions} from 'pdfmake/interfaces'
import { PDF_DISCLAIMER_ITEMS, PDF_INTRO_TEXT, SOURCE_INFO, CONTACT_INFO } from '@/components/Disclaimer.vue'
import type {UserDecision} from '@/models/DecisionTree.ts'
import type {FilteredLabels} from '@/services/labelsService'
import {stripHtml} from 'string-strip-html'
import FontService from '@/services/fontService.ts'
import {getAsset} from '@/services/assetsRegistry'

const dutchDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

// Helper function to generate ISO 8601 timestamps in different formats
function getISOFormat(format: 'full' | 'date' = 'full'): string {
  const now = new Date()

  if (format === 'full') {
    // Full ISO format with time and timezone: YYYY-MM-DDTHH:mm:ss.sssZ
    return now.toISOString()
  } else {
    // ISO 8601 date-only format: YYYY-MM-DD
    return now.toISOString().split('T')[0]
  }
}

function buildDisclaimers(): Content {
  const contentElements: Content = [
    {
      text: 'Belangrijke informatie',
      style: 'header'
    },
    {
      text: PDF_INTRO_TEXT.plain,
      style: 'normal',
      margin: [0, 0, 0, 10]
    },
    {
      ul: PDF_DISCLAIMER_ITEMS.map(item => ({
        text: item.plainText,
        style: 'normal',
        margin: [0, 0, 0, 5]
      })),
      style: 'normal',
      margin: [0, 0, 0, 20]
    }
  ]

  return {
    stack: contentElements,
    pageBreak: 'after'
  }
}

function replaceSpecificDivsWithTextContent(htmlString: string, selector: string): string {
  if (!htmlString || htmlString.trim() === '') {
    return ''
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    const targetDivs = doc.querySelectorAll(selector)

    targetDivs.forEach((targetDiv) => {
      // Remove any definition spans completely
      const definitionSpans = targetDiv.querySelectorAll('.aiv-definition-text')
      definitionSpans.forEach((span) => span.remove())

      // Get the remaining text (just the term)
      let mainTerm = targetDiv.textContent?.trim() || ''

      // Create a text node with just the term
      const textNode = document.createTextNode(mainTerm)
      targetDiv.parentNode?.replaceChild(textNode, targetDiv)
    })

    return doc.body.innerHTML
  } catch (error) {
    console.error('Error in replaceSpecificDivsWithTextContent:', error)
    return htmlString
  }
}

async function getAppVersion(): Promise<string> {
  // For Vite-vue projects, use import.meta.env instead of process.env
  const appVersion = import.meta.env.VITE_APP_VERSION;

  if (appVersion && appVersion !== 'unknown') {
    return appVersion;
  }

  // If no build version is available, return a default version string
  return 'development';
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
  const releaseTag = await getAppVersion()
  const dpiaStyleDictionary: StyleDictionary = {
    title: {
      fontSize: 28,
      bold: true,
      margin: [0, 0, 0, 10],
      color: '#154273' // RVO blue
    },
    subtitle: {
      fontSize: 18,
      margin: [0, 15, 0, 0],
      color: '#333333'
    },
    subsubtitle: {
      fontSize: 14,
      margin: [0, 40, 0, 0],
      color: '#666666',
      italics: true
    },
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 0, 0, 20],
      color: '#154273' // RVO blue
    },
    subHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 15, 0, 10],
      color: '#154273' // RVO blue
    },
    subSubHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    questionHeader: {
      fontSize: 11,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    description: {
      fontSize: 11,
      margin: [0, 0, 0, 15]
    },
    normal: {
      fontSize: 11
    },
    tableHeader: {
      fontSize: 12,
      bold: true,
      color: '#154273'
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    }
  }

  const logoImageData = await getAsset('RO_Logo_pres_pos_nl.png')
  try {
    const docDefinition: TDocumentDefinitions = {
      defaultStyle: {
        font: 'rijksoverheidsanstext' // Use Roboto as the default font since it's included with pdfMake by default
      },
      content: [
        {
          stack: [
            {text: 'Resultaten AI-verordening Beslishulp', style: 'title'},
            algorithmName
              ? [
                {
                  text: `${algorithmName}`,
                  style: 'subtitle'
                }
              ]
              : [],
            description
              ? [
                {
                  text: description,
                  style: 'description',
                  margin: [0, 30, 0, 0] as [number, number, number, number]
                }
              ]
              : [],
            filledBy
              ? [
                {
                  text: `Ingevuld door ${filledBy || 'niet vermeld'}`,
                  style: 'subsubtitle'
                }
              ]
              : [],
            {
              text: `Gegenereerd op ${dutchDateFormatter.format(new Date())}`,
              style: 'subsubtitle'
            },
            {
              text: [
                { text: 'Bron: '},
                {
                  text: SOURCE_INFO.name,
                  link: SOURCE_INFO.url,
                  decoration: 'underline',
                  color: 'blue'
                }
              ],
              style: 'subsubtitle',
              margin: [0, 10, 0, 0]
            },
            {
              text: `Versie: ${releaseTag}`,
              style: 'version',
              margin: [0, 5, 0, 0]
            },
          ],
          alignment: 'center',
          margin: [0, 150, 0, 0],
          pageBreak: 'after'
        },
        buildDisclaimers(),

        buildLabels(labels),

        buildAnswers(userDecisionPath),

        buildConclusion(conclusion),

        obligation ? buildObligation(obligation) : [],

        sources ? buildSources(sources) : []
      ],

      header: function (currentPage, pageCount, pageSize) {
        const imageWidth = 600
        const xPosition = (pageSize.width - imageWidth) / 2
        return {
          image: `data:image/png;base64,${logoImageData}`,
          width: imageWidth,
          absolutePosition: {x: xPosition, y: 0},
          margin: [0, 0, 0, 0]
        }
      },

      footer: function (currentPage, pageCount) {
        return {
          text: `Pagina ${currentPage} van ${pageCount}`,
          alignment: 'center',
          margin: [0, 0, 0, 0],
          color: '#999999',
          fontSize: 10
        }
      },

      // Document metadata
      info: {
        title: 'AI-verordening Beslishulp',
        author: 'AI-verordening Beslishulp generator',
        creator: 'AI-verordening Beslishulp generator',
        subject: `Version: ${releaseTag}`
      },

      // Page styling
      pageSize: 'A4',
      pageMargins: [70, 90, 70, 70],
      styles: dpiaStyleDictionary
    }

    // Start with default Roboto font
    const fontDefinitions: Record<string, Record<string, string>> = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    }

    const customFonts = await FontService.getFonts()

    // Add all font families from the FontService
    for (const [fontFamily, variants] of Object.entries(customFonts)) {
      fontDefinitions[fontFamily] = variants as Record<string, string>
    }

    // Get ISO 8601 date for the filename (date only: YYYY-MM-DD)
    const isoDate = getISOFormat('date')

    // Build filename with proper format
    let prefixFilename = 'AI-verordening beslishulp'
    let baseFilename;

    if (filename && filename.trim() !== '') {
      // Format with filename: AI-verordening beslishulp - NAME - DATE.pdf
      baseFilename = `${prefixFilename} - ${filename}`
    } else {
      baseFilename = prefixFilename
    }
    // Create the actual filename with date
    const actualFilename = `${baseFilename} - ${isoDate}.pdf`

    const vfs = await FontService.getVFS()

    pdfMake.createPdf(docDefinition, undefined, fontDefinitions, vfs).download(actualFilename)

    return Promise.resolve()
  } catch (error) {
    console.error(error)
    return Promise.reject(new Error('Failed to export PDF'))
  }
}

function buildAnswers(userDecisionPath: UserDecision[]): Content {
  const contentElements: Content = [
    {
      text: 'Antwoorden',
      style: 'header'
    },
    userDecisionPath.map((userDecision) => buildAnswer(userDecision))
  ]
  return {
    stack: contentElements,
    pageBreak: 'after'
  }
}

function buildLabels(labels: FilteredLabels): Content {
  const tableRows = []
  tableRows.push([
    {text: 'Categorie', style: 'tableHeader'},
    {text: 'Resultaat', style: 'tableHeader'}
  ])

  for (const [key, value] of Object.entries(labels)) {
    tableRows.push([
      {text: key, style: 'normal', margin: [0, 5, 0, 5]},
      {text: value.join(', '), style: 'normal', margin: [0, 5, 0, 5]}
    ])
  }

  const contentElements: Content = [
    {
      text: 'AI-verordening Profiel',
      style: 'header'
    },
    {
      table: {
        headerRows: 1,
        widths: ['40%', '60%'],
        body: tableRows
      },
      layout: {
        hLineWidth: function (i: number, node: any) {
          return i === 0 || i === 1 || i === node.table.body.length ? 1 : 0
        },
        vLineWidth: function () {
          return 0
        },
        hLineColor: function (i: number) {
          return i === 0 || i === 1 ? '#154273' : '#aaa'
        },
        paddingLeft: function () {
          return 8
        },
        paddingRight: function () {
          return 8
        },
        paddingTop: function () {
          return 8
        },
        paddingBottom: function () {
          return 8
        }
      },
      style: 'tableExample'
    }
  ]

  return {
    stack: contentElements,
    pageBreak: 'after'
  }
}

function buildHtmlSection(title: string, htmlContent: string): Content {
  const headerElement: Content = {
    text: title,
    style: 'header'
  }
  const contentElements = convertHtmlToPdfMake(htmlContent)
  return {
    stack: [headerElement, ...contentElements],
    pageBreak: 'after'
  }
}

function buildConclusion(conclusion: string): Content {
  return buildHtmlSection('Conclusie', conclusion)
}

function buildAnswer(userDecision: UserDecision): Content {
  let question = stripHtml(
    replaceSpecificDivsWithTextContent(
      userDecision.question ? userDecision.question : '',
      '.aiv-definition'
    )
  ).result
  const stack = []
  stack.push({
    text: `Vraag ${userDecision.questionId}: ${question}`,
    style: 'questionHeader'
  })
  stack.push({text: `Antwoord: ${userDecision.answer}`, style: 'description'})
  if (userDecision.explanation) {
    stack.push({text: `Opmerking: ${userDecision.explanation}`, style: 'description'})
  }
  return stack
}

function buildSources(sources: { source: string; url: string | undefined }[]): Content {
  const stack: Content[] = []
  stack.push({
    text: `Bronnen`,
    style: 'header',
    margin: [0, 0, 0, 10]
  })

  // Add the AI-verordening Beslishulp and the Github as the first source
  stack.push({
    text: SOURCE_INFO.name,
    margin: [0, 5, 0, 0]
  })
  stack.push({
    text: SOURCE_INFO.url,
    link: SOURCE_INFO.url,
    decoration: 'underline',
    color: 'blue',
    margin: [0, 0, 0, 15]
  })

  stack.push({
    text: [
      { text: 'AI-verordening Beslishulp Github', margin: [0, 5, 0, 0] }
    ]
  })
  stack.push({
    text: 'https://github.com/MinBZK/ai-verordening-beslishulp',
    link: 'https://github.com/MinBZK/ai-verordening-beslishulp',
    decoration: 'underline',
    color: 'blue',
    margin: [0, 0, 0, 15]
  })

  // Add the other sources
  for (const source of sources) {
    if (source.url) {
      stack.push({
        text: source.source,
        margin: [0, 5, 0, 0]
      })
      stack.push({
        text: source.url,
        link: source.url,
        decoration: 'underline',
        color: 'blue',
        margin: [0, 0, 0, 15]
      })
    }
  }

  return {
    stack
  }
}

function buildObligation(obligation: string): Content {
  return buildHtmlSection('Verplichtingen', obligation)
}

export function convertHtmlToPdfMake(html: string): Content[] {
  if (!html || html.trim() === '') {
    return [
      {
        text: '',
        style: 'description'
      }
    ]
  }

  const processedHtml = replaceSpecificDivsWithTextContent(html, '.aiv-definition')
  const doc = new DOMParser().parseFromString(processedHtml, 'text/html')

  const processor = new HtmlToPdfProcessor()
  processor.processNode(doc.body)

  return processor.getResult()
}

class HtmlToPdfProcessor {
  private content: Content[] = []
  private currentTextBlock: Array<{ text: string; [key: string]: any }> | null = null

  constructor() {
    this.currentTextBlock = null
  }

  getResult(): Content[] {
    this.finalizeTextBlock()
    return this.content
  }

  processNode(node: Node): void {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        this.processTextNode(node as Text)
        break
      case Node.ELEMENT_NODE:
        this.processElementNode(node as Element)
        break
      default:
        console.warn('Unknown node type:', node.nodeType)
        break
    }
  }

  private processTextNode(node: Text): void {
    const text = node.textContent?.trim()
    if (!text) return

    if (text.startsWith('- ')) {
      this.finalizeTextBlock()
      this.content.push({
        ul: [text.substring(2).trim()],
        style: 'description'
      })
      return
    }

    if (!this.currentTextBlock) {
      this.currentTextBlock = []
    }

    this.currentTextBlock.push({
      text: text
    })
  }

  private processElementNode(element: Element): void {
    const tagName = element.tagName.toUpperCase()
    if (this.isBlockElement(tagName)) {
      // Finalize any pending text block before processing a block element
      this.finalizeTextBlock()

      switch (tagName) {
        case 'UL':
        case 'OL':
          this.processListElement(element)
          break
        case 'BR':
          if (this.currentTextBlock) {
            this.currentTextBlock.push({text: '\n'})
          }
          break
        default:
          // For other block elements, create a new processor for their content
          const blockProcessor = new HtmlToPdfProcessor()
          Array.from(element.childNodes).forEach((child) => {
            blockProcessor.processNode(child)
          })

          const blockContent = blockProcessor.getResult()
          if (blockContent.length > 0) {
            this.content.push(...blockContent)
          }
          break
      }
    } else {
      // This is an inline element
      switch (tagName) {
        case 'STRONG':
        case 'B':
          this.processInlineElement(element, {bold: true})
          break
        case 'EM':
        case 'I':
          this.processInlineElement(element, {italics: true})
          break
        case 'SPAN':
        default:
          Array.from(element.childNodes).forEach((child) => {
            this.processNode(child)
          })
          break
      }
    }
  }

  private processInlineElement(element: Element, style: Record<string, boolean>): void {
    const text = element.textContent?.trim()
    if (!text) return

    if (!this.currentTextBlock) {
      this.currentTextBlock = []
    }
    this.currentTextBlock.push({
      text,
      ...style
    })
  }

  private processListElement(element: Element): void {
    const listItems: string[] = []
    const listElements = element.querySelectorAll('LI')

    listElements.forEach((item) => {
      const text = item.textContent?.trim() || ''
      if (text) {
        listItems.push(text)
      }
    })

    if (listItems.length > 0) {
      if (element.tagName.toUpperCase() === 'UL') {
        this.content.push({
          ul: listItems,
          style: 'description'
        })
      } else {
        this.content.push({
          ol: listItems,
          style: 'description'
        })
      }
    }
  }

  private finalizeTextBlock(): void {
    if (!this.currentTextBlock || this.currentTextBlock.length === 0) return
    this.content.push({
      text: this.currentTextBlock,
      style: 'description'
    })
    this.currentTextBlock = null
  }

  private isBlockElement(tagName: string): boolean {
    const blockElements = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BR']
    return blockElements.includes(tagName.toUpperCase())
  }
}
