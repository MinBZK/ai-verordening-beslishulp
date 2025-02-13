import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'

const app = createApp(App);

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
      app.config.globalProperties.showCloseOnEnd = closeOnEndMsg;
    }
  }
})();

app.use(createPinia())

app.mount('#app')
