import { getAsset } from '@/services/assetsRegistry'

/**
 * Interface for individual font variants
 */
interface PdfFontVariants {
  normal?: string
  bold?: string
  italics?: string
  bolditalics?: string
}

/**
 * Interface for font definitions per family
 */
interface PdfFonts {
  [fontFamily: string]: PdfFontVariants
}

/**
 * Virtual file system: bestandsnaam naar base64-inhoud
 */
interface VirtualFileSystem {
  [filename: string]: string
}

let initialized: boolean = false
let fonts: PdfFonts = {}
let vfs: VirtualFileSystem = {}
let isLoading: boolean = false
let loadPromise: Promise<void> | null = null

const fontAssetPaths = {
  rijksoverheidsanstext: {
    regular: 'rijksoverheidsanstext-regular-webfont.ttf',
    bold: 'rijksoverheidsanstext-bold-webfont.ttf',
    italic: 'rijksoverheidsanstext-italic-webfont.ttf'
  }
}

/**
 * Service die de fonts en hun bytes laadt voor de PDF-export
 */
const FontService = {
  /**
   * Get the available font families
   * @returns {PdfFonts} Font families with their variants
   */
  async getFonts(): Promise<PdfFonts> {
    if (!initialized) {
      await this._loadFonts()
    }
    return fonts
  },

  /**
   * Get the virtual file system with the font bytes
   * @returns {VirtualFileSystem} Virtual file system with base64 encoded fonts
   */
  async getVFS(): Promise<VirtualFileSystem> {
    if (!initialized && !isLoading) {
      await this._loadFonts()
    }
    return vfs
  },

  /**
   * Load fonts from assets folder
   * @private
   */
  async _loadFonts(): Promise<void> {
    // If already loading, return the existing promise
    if (isLoading && loadPromise) {
      return loadPromise
    }

    isLoading = true
    loadPromise = this._doLoadFonts()

    try {
      await loadPromise
      initialized = true
    } finally {
      isLoading = false
      loadPromise = null
    }
  },

  /**
   * Actual implementation of font loading
   * @private
   */
  async _doLoadFonts(): Promise<void> {
    console.log('Loading fonts...')
    const fontDefinitions: PdfFonts = {}
    const vfsDefinitions: VirtualFileSystem = {}

    for (const [family, variants] of Object.entries(fontAssetPaths)) {
      console.log(`Processing font family: ${family}`)
      fontDefinitions[family] = {}

      // Map of variant keys to PDF font keys
      const variantToPdfKey: Record<string, keyof PdfFontVariants> = {
        regular: 'normal',
        bold: 'bold',
        italic: 'italics'
      }

      // Process all font variants by iterating through the keys
      const variantEntries = Object.entries(variants)
      for (const [variantType, filename] of variantEntries) {
        const pdfKey = variantToPdfKey[variantType]
        if (pdfKey && filename) {
          fontDefinitions[family][pdfKey] = filename
          const asset = await getAsset(filename)
          if (asset) {
            vfsDefinitions[filename] = asset
          }
        }
      }
      fontDefinitions[family].bolditalics = variants.bold
    }

    console.log('Loaded font definitions:', Object.keys(fontDefinitions))
    console.log('Loaded VFS entries:', Object.keys(vfsDefinitions))

    fonts = fontDefinitions
    vfs = vfsDefinitions
  }
}

export default FontService
