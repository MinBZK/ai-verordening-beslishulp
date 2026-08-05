import js from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}']
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']),
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    // De build-configuratiebestanden in frontend/ zijn CommonJS en gebruiken `module`.
    // Zonder deze globals meldt no-undef daar een valse fout.
    name: 'app/commonjs-config-files',
    files: ['*.config.js'],
    languageOptions: {
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly'
      }
    }
  },
  {
    name: 'app/rule-overrides',
    rules: {
      // UIT: de componentnamen (Question, Header, Conclusion, ...) zijn onderdeel van de
      // publieke structuur van deze app. Hernoemen raakt elk importpad en levert geen
      // functionele winst op. Bewuste keuze, geen tijdelijke uitzondering.
      'vue/multi-word-component-names': 'off',
      // WARN (tijdelijk): er staan nog `any`-types in pdfExport.ts, QuestionStore.ts en
      // Conclusion.vue. Die stapsgewijs typeren is aparte scope; als error zou de CI-poort
      // meteen rood staan en daarmee waardeloos worden.
      '@typescript-eslint/no-explicit-any': 'warn',
      // De standaardinstelling eist zowel een `for`-attribuut als nesting van de control
      // in het label. Eén van beide is genoeg om het label programmatisch te koppelen;
      // deze app gebruikt overal `for` + `id`.
      'vuejs-accessibility/label-has-for': [
        'error',
        { required: { some: ['nesting', 'id'] } }
      ],
      // `role="list"` op een <ul> is formeel redundant, maar niet als de CSS
      // `list-style: none` zet (.no-list): Safari/VoiceOver laat de lijstsemantiek dan vallen.
      // Alleen voor ul toegestaan, de rest van de regel blijft actief.
      'vuejs-accessibility/no-redundant-roles': ['error', { ul: ['list'] }],
      // WARN (bewust): vraag-, uitleg- en conclusietekst komt als HTML uit de YAML en moet
      // als HTML gerenderd worden. De inhoud is redactioneel beheerd in deze repo, niet door
      // gebruikers aangeleverd. Het a11y-risico (een redacteur breekt de semantiek) staat als
      // handmatig controlepunt in CONTRIBUTING.md.
      'vue/no-v-html': 'warn'
    }
  }
)
