import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'

const app = createApp(App)

function parseBoolean(str: string | null | undefined): boolean {
  if (!str) return false;
  return str.toLowerCase() === 'true';
}

/**
 * Gets a configuration value from either a script tag attribute or URL parameter
 * with URL parameters taking precedence over script attributes.
 * @param name - The name of the configuration parameter to look for
 * @param defaultValue - The default value to return if the parameter is not found
 * @returns The value of the parameter or the default value with the same type as defaultValue
 */
function getConfiguration(name: string, defaultValue: boolean | string): boolean | string {
  const URLParam = new URLSearchParams(window.location.search).get(name);
  if (URLParam !== null) {
    return typeof defaultValue === 'boolean'
      ? parseBoolean(URLParam)
      : URLParam;
  }
  if (document?.currentScript?.hasAttribute('data-' + name)) {
    const attrValue = document.currentScript.getAttribute('data-' + name);
    if (attrValue !== null) {
      return typeof defaultValue === 'boolean'
        ? parseBoolean(attrValue)
        : attrValue;
    }
  }
  return defaultValue;
}

app.config.globalProperties.showCloseOnEnd = getConfiguration('showCloseOnEnd', false)
app.config.globalProperties.showCloseOnEndMsg = getConfiguration('showCloseOnEndMsg', "Resultaten overnemen en afsluiten")
app.config.globalProperties.showExportPDF = getConfiguration('showExportPDF', true)
app.config.globalProperties.showExplanationField = getConfiguration('showExplanationField', true)

app.use(createPinia())

app.mount('#app')
