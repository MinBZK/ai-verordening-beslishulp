import js from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}']
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']),
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
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
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)
