import * as pdfMake from 'pdfmake/build/pdfmake'
import type {Content, StyleDictionary, TDocumentDefinitions} from 'pdfmake/interfaces'
import type {UserDecision} from "@/models/DecisionTree.ts";
import type {FilteredLabels} from "@/services/labelsService";
import {stripHtml} from 'string-strip-html';
import FontService from "@/services/fontService.ts";

// Initialize VFS with our custom fonts - this will be populated by FontService
(<any>pdfMake).vfs = {};

const dutchDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

function replaceSpecificDivsWithTextContent(htmlString: string, selector: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const targetDivs = doc.querySelectorAll(selector);

  targetDivs.forEach(targetDiv => {
    let textContent = '';

    for (let i = 0; i < targetDiv.childNodes.length; i++) {
      const node = targetDiv.childNodes[i];
      if (node.nodeType === 3) {
        textContent += node.textContent?.trim() || '';
      }
    }

    const textNode = document.createTextNode(textContent);
    targetDiv.parentNode?.replaceChild(textNode, targetDiv);
  });

  return doc.body.innerHTML;
}

export async function exportToPdf(
  filename: string,
  userDecisionPath: UserDecision[],
  conclusion: string,
  sources: { source: string; url: string | undefined; }[],
  algorithmName: string,
  description: string,
  filledBy: string,
  labels: FilteredLabels
): Promise<void> {
  const dpiaStyleDictionary: StyleDictionary = {
    title: {
      fontSize: 28,
      bold: true,
      margin: [0, 0, 0, 10],
      color: '#154273', // RVO blue
    },
    subtitle: {
      fontSize: 18,
      margin: [0, 15, 0, 0],
      color: '#333333',
    },
    subsubtitle: {
      fontSize: 14,
      margin: [0, 40, 0, 0],
      color: '#666666',
      italics: true,
    },
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 0, 0, 20],
      color: '#154273', // RVO blue
    },
    subHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 15, 0, 10],
      color: '#154273', // RVO blue
    },
    subSubHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    description: {
      fontSize: 11,
      margin: [0, 0, 0, 15],
    },
    normal: {
      fontSize: 11,
    },
    tableHeader: {
      fontSize: 12,
      bold: true,
      color: '#154273',
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
  }

  try {
    const docDefinition: TDocumentDefinitions = {
      defaultStyle: {
        font: 'rijksoverheidsanstext' // Use Roboto as the default font since it's included with pdfMake by default
      },
      content: [
        // Cover page
        {
          stack: [
            {text: 'Resultaten Beslishulp', style: 'title'},
            ...(algorithmName ? [{
              text: `${algorithmName}`,
              style: 'subtitle'
            }] : []),
            ...(description ? [{
              text: description,
              style: 'description',
              margin: [0, 30, 0, 0] as [number, number, number, number],
            }] : []),
            ...(filledBy ? [{
              text: `Ingevuld door ${filledBy || 'niet vermeld'}`,
              style: 'subsubtitle'
            }] : []),
            {
              text: `Gegenereerd op ${dutchDateFormatter.format(new Date())}`,
              style: 'subsubtitle',
            },
          ],
          alignment: 'center',
          margin: [0, 150, 0, 0],
          pageBreak: 'after',
        },

        buildLabels(labels),

        buildAnswers(userDecisionPath),

        buildConclusion(conclusion),

        buildSources(sources)

      ],

      // Page numbers
      footer: function (currentPage, pageCount) {
        return {
          text: `Pagina ${currentPage} van ${pageCount}`,
          alignment: 'center',
          margin: [0, 0, 40, 0],
          color: '#999999',
          fontSize: 10,
        }
      },

      // Document metadata
      info: {
        title: 'Beslishulp',
        author: 'Beslishulp generator',
        creator: 'Beslishulp generator',
      },

      // Page styling
      pageSize: 'A4',
      pageMargins: [70, 70, 70, 70],
      styles: dpiaStyleDictionary,
    }

    // Start with default Roboto font
    const fontDefinitions: Record<string, Record<string, string>> = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };

    // Get custom fonts from FontService (now using TTF files from assets)
    const customFonts = await FontService.getFonts();

    // Add all font families from the FontService
    for (const [fontFamily, variants] of Object.entries(customFonts)) {
      fontDefinitions[fontFamily] = variants as Record<string, string>;
      console.log(`Added font family: ${fontFamily} with variants:`,
        Object.keys(variants));
    }

    const actualFilename = filename || 'beslishulp.pdf';
    const vfs = await FontService.getVFS();

    pdfMake.createPdf(
      docDefinition,
      undefined,
      fontDefinitions,
      vfs
    ).download(actualFilename);

    return Promise.resolve()
  } catch (error) {
    console.error(error)
    return Promise.reject(new Error('Failed to export PDF'))
  }
}

function buildAnswers(userDecisionPath: UserDecision[]): Content {
  const contentElements: Content = [
    {
      text: "Antwoorden",
      style: 'header',
    },
    userDecisionPath.map(userDecision => buildAnswer(userDecision)),
  ]
  return {
    stack: contentElements,
    pageBreak: 'after',
  }
}


function buildLabels(labels: FilteredLabels): Content {
  const tableRows = [];
  tableRows.push([
    {text: 'Categorie', style: 'tableHeader'},
    {text: 'Resultaat', style: 'tableHeader'}
  ]);

  // Add data rows
  for (const [key, value] of Object.entries(labels)) {

    tableRows.push([
      {text: key, style: 'normal', margin: [0, 5, 0, 5]},
      {text: value.join(","), style: 'normal', margin: [0, 5, 0, 5]}
    ]);
  }

  const contentElements: Content = [
    {
      text: "AI-verordening Profiel",
      style: 'header',
    },
    {
      table: {
        headerRows: 1,
        widths: ['40%', '60%'],
        body: tableRows
      },
      layout: {
        hLineWidth: function (i: number, node: any) {
          return i === 0 || i === 1 || i === node.table.body.length ? 1 : 0;
        },
        vLineWidth: function () {
          return 0;
        },
        hLineColor: function (i: number) {
          return i === 0 || i === 1 ? '#154273' : '#aaa';
        },
        paddingLeft: function () {
          return 8;
        },
        paddingRight: function () {
          return 8;
        },
        paddingTop: function () {
          return 8;
        },
        paddingBottom: function () {
          return 8;
        }
      },
      style: 'tableExample'
    }
  ]

  return {
    stack: contentElements,
    pageBreak: 'after',
  }
}

function buildConclusion(conclusion: string): Content {
  const contentElements: Content = [
    {
      text: "Conclusie",
      style: 'header',
    },
    {
      text: stripHtml(replaceSpecificDivsWithTextContent(conclusion, ".aiv-definition")).result,
      style: "description"
    }
  ]
  return {
    stack: contentElements,
    pageBreak: "after"
  }
}

function buildAnswer(userDecision: UserDecision): Content {
  let question = stripHtml(replaceSpecificDivsWithTextContent(userDecision.question ? userDecision.question : '', ".aiv-definition")).result
  const stack = []
  stack.push({
    text: `Vraag ${userDecision.questionId}: ${question}`,
    style: 'subSubHeader'
  })
  stack.push({text: `Antwoord: ${userDecision.answer}`, style: 'description'})
  if (userDecision.explanation) {
    stack.push({text: `Toelichting: ${userDecision.explanation}`, style: 'description'})
  }
  return stack
}

function buildSources(sources: { source: string; url: string | undefined; }[]): Content {
  const stack: Content[] = [];

  stack.push({
    text: `Bronnen`,
    style: 'header',
    margin: [0, 0, 0, 10]
  });

  for (const source of sources) {
    if (source.url) {
      // Source name on one line
      stack.push({
        text: source.source,
        margin: [0, 5, 0, 0]
      });

      // URL as link on another line
      stack.push({
        text: source.url,
        link: source.url,
        decoration: 'underline',
        color: 'blue',
        margin: [0, 0, 0, 15] // Add bottom margin for spacing between sources
      });
    }
  }

  return {
    stack,
  };
}
