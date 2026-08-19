/**
 * Getagde PDF-export op basis van pdfkit.
 *
 * pdfmake kan dit niet: het geeft `tagged: true` wel door aan pdfkit, maar
 * roept nergens struct() aan. Het resultaat is een document dat via
 * /Marked true belooft een leesvolgorde te hebben, met een lege
 * structuurboom (/Nums [], nul /StructElem). Een screenreader vertrouwt op
 * die belofte in plaats van terug te vallen op zijn eigen heuristiek, dus
 * die vlag maakt het resultaat slechter dan geen vlag.
 *
 * Hier bouwen we de structuurboom zelf op: elk stuk tekst wordt met
 * markStructureContent() aan een structuurelement gekoppeld, zodat de PDF
 * echte koppen, alinea's, lijsten en tabellen krijgt (WCAG 1.3.1, 1.3.2).
 */

/*
 * De standalone-build en niet 'pdfkit': de gewone ES-build importeert Node's
 * zlib, fs en buffer, die Vite in de browser leeg externaliseert. Het laden
 * strandde daardoor op kMaxLength uit browserify-zlib. De standalone-build
 * bundelt die polyfills zelf en bevat dezelfde tagging-API.
 */
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js'
import blobStream from 'blob-stream'

/** Structuurtypen die dit document gebruikt. */
type StructType =
  | 'Document'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'P'
  | 'L'
  | 'LI'
  | 'LBody'
  | 'Table'
  | 'TR'
  | 'TH'
  | 'TD'
  | 'Link'

export interface TaggedPdfOptions {
  title: string
  language?: string
  author?: string
  subject?: string
  /** Base64 (zonder data-URL-prefix) van het logo voor de kopregel. */
  logoBase64?: string | undefined
  fonts?: {
    normal?: Uint8Array
    bold?: Uint8Array
    italic?: Uint8Array
  }
}

const PAGE_SIZE = 'A4'
/* De bovenmarge houdt ruimte vrij voor het logo, dat op y=30 begint en bij
   LOGO_WIDTH 420 zo'n 58pt hoog is. */
const MARGIN = { top: 110, bottom: 70, left: 70, right: 70 }
/* Het logo is een brede banner (4000x552): het beeldmerk beslaat maar een
   klein deel van die breedte, dus moet de banner zelf ruim zijn om het
   embleem leesbaar te houden. Op 420pt is het beeldmerk ongeveer 58pt hoog. */
const LOGO_WIDTH = 420
/*
 * Alle kleuren zijn nagerekend tegen wit (WCAG 1.4.3 voor tekst, 1.4.11 voor
 * lijnen). De ratio staat erbij zodat een wijziging niet ongemerkt onder de
 * norm zakt.
 */
const COLOR_RVO_BLUE = '#154273' // 10,20:1
const COLOR_TEXT = '#000000' // 21,00:1
const COLOR_MUTED = '#666666' // 5,74:1
const COLOR_LINK = '#154273' // 10,20:1
const COLOR_FOOTER = '#767676' // 4,54:1 — was #999999 met 2,85:1
const COLOR_RULE = '#8C8C8C' // 3,36:1 — was #CCCCCC met 1,61:1

/**
 * Bouwt een getagde PDF op. De aanroeper voegt inhoud toe via de methodes
 * hieronder; elk daarvan schrijft zowel de zichtbare tekst als het
 * bijbehorende structuurelement.
 */
export class TaggedPdf {
  private doc: PDFKit.PDFDocument
  private root: PDFKit.PDFStructureElement
  private stream: ReturnType<typeof blobStream>
  private fontNormal = 'Helvetica'
  private fontBold = 'Helvetica-Bold'
  private fontItalic = 'Helvetica-Oblique'
  private logoBase64: string | undefined
  private pageNumber = 0

  constructor(options: TaggedPdfOptions) {
    this.doc = new PDFDocument({
      pdfVersion: '1.7',
      lang: options.language ?? 'nl-NL',
      tagged: true,
      displayTitle: true,
      autoFirstPage: false,
      size: PAGE_SIZE,
      margins: MARGIN,
      info: {
        Title: options.title,
        Author: options.author ?? 'AI-verordening Beslishulp',
        Subject: options.subject ?? '',
        Creator: 'AI-verordening Beslishulp',
      },
    })

    this.logoBase64 = options.logoBase64

    if (options.fonts?.normal) {
      this.doc.registerFont('Body', options.fonts.normal as never)
      this.fontNormal = 'Body'
      this.fontBold = 'Body'
      this.fontItalic = 'Body'
    }
    if (options.fonts?.bold) {
      this.doc.registerFont('BodyBold', options.fonts.bold as never)
      this.fontBold = 'BodyBold'
    }
    if (options.fonts?.italic) {
      this.doc.registerFont('BodyItalic', options.fonts.italic as never)
      this.fontItalic = 'BodyItalic'
    }

    this.stream = this.doc.pipe(blobStream())
    this.root = this.doc.struct('Document')
    this.doc.addStructure(this.root)
  }

  /** Begint een nieuwe pagina met kop- en voetregel als artifact. */
  addPage(): void {
    this.doc.addPage()
    this.pageNumber++
    this.drawHeaderArtifact()
    this.drawFooterArtifact()
    // Terug naar de bovenkant van het tekstgebied: de artifacts hierboven
    // hebben de cursor verplaatst.
    this.doc.x = MARGIN.left
    this.doc.y = MARGIN.top
  }

  /**
   * Het paginanummer, als artifact zodat het buiten de leesvolgorde blijft.
   * Bewust zonder totaal: dat is pas aan het eind bekend, en achteraf per
   * pagina terugspringen met switchToPage() voegde bij een al geschreven
   * pagina een nieuwe toe in plaats van terug te gaan.
   */
  private drawFooterArtifact(): void {
    /*
     * Binnen het tekstgebied blijven: een y voorbij page.maxY() laat pdfkit
     * concluderen dat de tekst niet meer past, waarna het per pagina een lege
     * extra pagina aanmaakt. Bij A4 met deze marges is maxY() 722, terwijl
     * page.height - bottom + 20 op 742 uitkwam.
     */
    const y = this.doc.page.maxY() - 12
    this.doc.markContent('Artifact')
    this.doc
      .font(this.fontNormal)
      .fontSize(9)
      .fillColor(COLOR_FOOTER)
      .text(`Pagina ${this.pageNumber}`, MARGIN.left, y, {
        width: this.doc.page.width - MARGIN.left - MARGIN.right,
        align: 'center',
        lineBreak: false
      })
    this.doc.endMarkedContent()
    this.doc.fillColor(COLOR_TEXT)
  }

  /**
   * De kopregel en het paginanummer horen niet in de leesvolgorde: het zijn
   * decoratieve herhalingen. Als artifact blijven ze buiten de structuurboom.
   */
  private drawHeaderArtifact(): void {
    if (!this.logoBase64) return
    this.doc.markContent('Artifact')
    try {
      const logo = `data:image/png;base64,${this.logoBase64}`
      const x = (this.doc.page.width - LOGO_WIDTH) / 2
      this.doc.image(logo, x, 30, { width: LOGO_WIDTH })
    } catch {
      // Een ontbrekend logo mag de export niet blokkeren.
    }
    this.doc.endMarkedContent()
  }

  /** Schrijft tekst binnen een structuurelement van het gegeven type. */
  private write(
    type: StructType,
    text: string,
    render: () => void,
    attrs?: Record<string, unknown>
  ): void {
    if (!text.trim()) return
    const element = attrs ? this.doc.struct(type, attrs) : this.doc.struct(type)
    this.root.add(element)
    element.add(this.doc.markStructureContent(type))
    render()
    this.doc.endMarkedContent()
    element.end()
  }

  heading(
    text: string,
    level: 1 | 2 | 3 = 2,
    opts: { center?: boolean } = {}
  ): void {
    const sizes = { 1: 26, 2: 18, 3: 12.5 } as const
    const spaceAfter = { 1: 0.7, 2: 0.55, 3: 0.35 } as const
    this.write(`H${level}` as StructType, text, () => {
      this.doc
        .font(this.fontBold)
        .fontSize(sizes[level])
        .fillColor(COLOR_RVO_BLUE)
        .text(text, { align: opts.center ? 'center' : 'left' })
      this.doc.moveDown(spaceAfter[level])
    })
  }

  paragraph(
    text: string,
    opts: {
      italic?: boolean
      muted?: boolean
      size?: number
      center?: boolean
      spaceAfter?: number
    } = {}
  ): void {
    this.write('P', text, () => {
      this.doc
        .font(opts.italic ? this.fontItalic : this.fontNormal)
        .fontSize(opts.size ?? 11)
        .fillColor(opts.muted ? COLOR_MUTED : COLOR_TEXT)
        .text(text, { align: opts.center ? 'center' : 'left', lineGap: 2 })
      this.doc.moveDown(opts.spaceAfter ?? 0.5)
    })
  }

  /** Een lijst als L met LI/LBody, zodat een screenreader hem als lijst meldt. */
  list(items: string[]): void {
    const visible = items.filter((item) => item.trim())
    if (visible.length === 0) return

    /*
     * De bullet wordt los van de tekst getekend, in een eigen kolom. Met
     * `• ${item}` als één tekstblok springt alleen de eerste regel in en loopt
     * elke vervolgregel terug onder de bullet; de opsomming hangt dan niet uit.
     */
    const bulletX = MARGIN.left + 6
    const textX = MARGIN.left + 22
    const textWidth = this.doc.page.width - textX - MARGIN.right

    const list = this.doc.struct('L')
    this.root.add(list)

    for (const item of visible) {
      const li = this.doc.struct('LI')
      list.add(li)
      const body = this.doc.struct('LBody')
      li.add(body)
      body.add(this.doc.markStructureContent('LBody'))

      const y = this.doc.y
      this.doc.font(this.fontNormal).fontSize(11).fillColor(COLOR_TEXT)
      this.doc.text('•', bulletX, y, { lineBreak: false })
      this.doc.text(item, textX, y, { width: textWidth, align: 'left', lineGap: 2 })

      this.doc.endMarkedContent()
      body.end()
      li.end()

      this.doc.x = MARGIN.left
      this.doc.moveDown(0.55)
    }

    list.end()
    this.doc.x = MARGIN.left
    this.doc.moveDown(0.5)
  }

  /**
   * Een tabel met echte tabelsemantiek: Table met TR-rijen, en TH voor de
   * koprij zodat een screenreader die als koppen aankondigt.
   */
  table(headers: string[], rows: string[][]): void {
    const table = this.doc.struct('Table')
    this.root.add(table)

    const left = MARGIN.left
    const usable = this.doc.page.width - MARGIN.left - MARGIN.right
    const colWidth = usable / headers.length
    const padding = 8

    const drawRow = (cells: string[], isHeader: boolean) => {
      const tr = this.doc.struct('TR')
      table.add(tr)
      const startY = this.doc.y
      let maxHeight = 0

      cells.forEach((cell, index) => {
        /*
         * TH tegenover TD is wat de tabel leesbaar maakt: een screenreader
         * kondigt de koprij als kop aan. Een /Scope-attribuut zou de koppeling
         * per kolom nog explicieter maken, maar pdfkit geeft alleen title,
         * lang, alt, expanded en actual door aan het structuurelement.
         */
        const type = isHeader ? 'TH' : 'TD'
        const cellStruct = this.doc.struct(type)
        tr.add(cellStruct)
        cellStruct.add(this.doc.markStructureContent(type))

        const x = left + index * colWidth
        this.doc
          .font(isHeader ? this.fontBold : this.fontNormal)
          .fontSize(11)
          .fillColor(isHeader ? COLOR_RVO_BLUE : COLOR_TEXT)
          .text(cell, x + padding, startY + padding, { width: colWidth - padding * 2 })

        maxHeight = Math.max(maxHeight, this.doc.y - startY)
        this.doc.endMarkedContent()
        cellStruct.end()
      })

      tr.end()
      const rowBottom = startY + maxHeight + padding
      this.doc
        .moveTo(left, rowBottom)
        .lineTo(left + usable, rowBottom)
        .lineWidth(isHeader ? 1 : 0.5)
        .strokeColor(isHeader ? COLOR_RVO_BLUE : COLOR_RULE)
        .stroke()
      this.doc.y = rowBottom + 2
      this.doc.x = left
    }

    drawRow(headers, true)
    rows.forEach((row) => drawRow(row, false))
    table.end()
    this.doc.moveDown(1)
  }

  /** Een link met Link-structuurelement en een leesbare beschrijving. */
  link(label: string, url: string, opts: { center?: boolean; size?: number } = {}): void {
    this.write(
      'Link',
      label,
      () => {
        this.doc
          .font(this.fontNormal)
          .fontSize(opts.size ?? 11)
          .fillColor(COLOR_LINK)
          .text(label, {
            link: url,
            underline: true,
            align: opts.center ? 'center' : 'left'
          })
        this.doc.moveDown(0.4)
      },
      { alt: `${label}: ${url}` }
    )
    this.doc.fillColor(COLOR_TEXT)
  }

  moveDown(lines = 1): void {
    this.doc.moveDown(lines)
  }

  /** Zet de cursor op een vaste hoogte, voor het uitlijnen van het voorblad. */
  moveTo(y: number): void {
    this.doc.x = MARGIN.left
    this.doc.y = y
  }

  /** Een dunne scheidingslijn, decoratief en dus een artifact. */
  rule(width = 0.6): void {
    const y = this.doc.y
    this.doc.markContent('Artifact')
    this.doc
      .moveTo(MARGIN.left, y)
      .lineTo(this.doc.page.width - MARGIN.right, y)
      .lineWidth(width)
      .strokeColor(COLOR_RULE)
      .stroke()
    this.doc.endMarkedContent()
    this.doc.x = MARGIN.left
    this.doc.y = y + 12
  }

  /**
   * Sluit het document af en levert de blob op. Paginanummers worden hier
   * toegevoegd, want pas nu is het totaal bekend; ze zijn een artifact.
   */
  /** Sluit het document af en levert de blob op. */
  async finish(): Promise<Blob> {
    this.root.end()
    this.doc.end()

    return new Promise<Blob>((resolve, reject) => {
      this.stream.on('finish', () => resolve(this.stream.toBlob('application/pdf')))
      this.stream.on('error', reject)
    })
  }
}

/** Zet een base64-string om naar de bytes die pdfkit voor een font verwacht. */
export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
