import { mount } from '@vue/test-utils'
import type { Component } from 'vue'

/**
 * De globale properties worden in main.ts gezet vanaf `data-`attributen op het script-element.
 * In tests bestaan die niet, dus zonder deze defaults is `showExplanationField` `undefined` en
 * test je stilzwijgend maar één tak van de templates.
 */
export const DEFAULT_GLOBAL_PROPERTIES = {
  showCloseOnEnd: false,
  showCloseOnEndMsg: 'Resultaten overnemen en afsluiten',
  showExportPDF: true,
  showExplanationField: true
}

type GlobalProperties = Partial<typeof DEFAULT_GLOBAL_PROPERTIES>

/* eslint-disable @typescript-eslint/no-explicit-any -- de mount-opties van VTU zijn generiek
   over het componenttype; die generics hier doorvoeren levert geen extra veiligheid op in de
   specs zelf, want die typeren hun props al via het component. */

/**
 * Mount een component in het echte document (axe heeft een element in de DOM nodig voor
 * regels die naar zichtbaarheid en context kijken) met de globale properties gezet.
 */
export function mountComponent<C extends Component>(
  component: C,
  options: Record<string, any> = {},
  globalProperties: GlobalProperties = {}
) {
  return mount(component as any, {
    attachTo: document.body,
    ...options,
    global: {
      ...options.global,
      config: {
        globalProperties: { ...DEFAULT_GLOBAL_PROPERTIES, ...globalProperties }
      }
    }
  })
}
