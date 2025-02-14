import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'

const app = createApp(App);

function injectCSS(css: string) {
  let el = document.createElement('style');
  el.type = 'text/css';
  el.innerText = css;
  document.head.appendChild(el);
}

(function () {
  if (document?.currentScript?.hasAttribute("data-showCloseOnEnd")) {
    app.config.globalProperties.showCloseOnEnd = document.currentScript.getAttribute('data-showCloseOnEnd') === 'true';
  } else {
    app.config.globalProperties.showCloseOnEnd = new URLSearchParams(window.location.search).get('showCloseOnEnd') === 'true';
  }
  if (document?.currentScript?.hasAttribute("data-showCloseOnEndMsg")) {
    app.config.globalProperties.showCloseOnEndMsg = document.currentScript.getAttribute('data-showCloseOnEndMsg');
  } else {
    const closeOnEndMsg = new URLSearchParams(window.location.search).get('showCloseOnEndMsg');
    if (closeOnEndMsg) {
      app.config.globalProperties.showCloseOnEndMsg = closeOnEndMsg;
    }
  }
  let fontPath;
  if (document?.currentScript?.hasAttribute("data-fontPath")) {
    fontPath = document.currentScript.getAttribute('data-fontPath');
  } else {
    fontPath = new URLSearchParams(window.location.search).get('fontPath');
  }
  if (fontPath) {
    const css = "@font-face {" +
      "font-family: RijksoverheidSansWebText;" +
      "font-stretch: 75% 125%;font-style:normal;" +
      "font-weight:200 800;" +
      "src:url(" + fontPath + ")" +
      "format(\"woff2-variations\")}"
    injectCSS(css);
  }

})();

app.use(createPinia())

app.mount('#app')
