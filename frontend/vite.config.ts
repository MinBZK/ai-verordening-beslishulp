import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from 'node:path';
import type { Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const SVG_ALLOW_LIST = [
  'logo.svg',
  'info.svg',
  'terug.svg',
  'delta-omhoog.svg',
  'delta-omlaag.svg',
  'bewerken.svg',
  'progress-tracker-', // This allows all SVGs starting with 'progress-tracker-'
];

// Create a minimal empty SVG data URL
const EMPTY_SVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E';

function createSvgFilterPlugin(): Plugin {
  return {
    name: 'svg-filter-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (id.endsWith('.svg')) {
        const svgFileName = path.basename(id);
        const isAllowed = SVG_ALLOW_LIST.some(allowedSvg =>
          svgFileName === allowedSvg || svgFileName.includes(allowedSvg)
        );
        if (!isAllowed) {
          console.info(`Filtering disallowed SVG import: ${svgFileName}`);
          return `\0empty-svg:${id}`;
        } else {
          console.info(`Using SVG import: ${svgFileName}`);
        }
      }
      return null;
    },
    load(id) {
      if (id.startsWith('\0empty-svg:')) {
        return `export default "${EMPTY_SVG}";`;
      }
      return null;
    },
    transform(code, id) {
      if (!/\.(css|scss|less|styl|postcss)$/.test(id)) {
        return null;
      }

      let modified = false;
      let newCode = code;

      // Match all url() patterns in CSS
      const urlRegex = /url\(['"]?([^'")]+\.svg)['"]?\)/g;
      let match;

      while ((match = urlRegex.exec(code)) !== null) {
        const fullUrl = match[0];
        const svgPath = match[1];
        const svgFileName = path.basename(svgPath);

        const isAllowed = SVG_ALLOW_LIST.some(allowedSvg =>
          svgFileName === allowedSvg || svgFileName.includes(allowedSvg)
        );

        if (!isAllowed) {
          console.info(`Filtering CSS reference to disallowed SVG: ${svgFileName}`);
          newCode = newCode.replace(fullUrl, `url('${EMPTY_SVG}')`);
          modified = true;
        } else {
          console.info(`Using SVG import: ${svgFileName}`);
        }
      }
      return modified ? newCode : null;
    }
  };
}

function createSvgOutputFilter(): Plugin {
  return {
    name: 'svg-output-filter',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const file = bundle[fileName];
        if (file.type === 'asset') {
          if (fileName.toLowerCase().endsWith('.svg')) {
            const svgFileName = path.basename(fileName);
            const isAllowed = SVG_ALLOW_LIST.some(allowedSvg =>
              svgFileName === allowedSvg || svgFileName.includes(allowedSvg)
            );
            if (!isAllowed) {
              console.info(`Removing SVG from final output: ${svgFileName}`);
              delete bundle[fileName];
            } else {
              console.info(`Using SVG import: ${svgFileName}`);
            }
          }
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgFilterPlugin(),
    vue(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
    createSvgOutputFilter(),
  ],
  build: {
    assetsInlineLimit: 1024 * 1024, // inline everything
    rollupOptions: {
      output: {
        dir: './dist',
        entryFileNames: 'index.js',
        assetFileNames: `assets/[name].[ext]`,
        manualChunks(id) {
          if (id.endsWith('.svg')) {
            const svgFileName = path.basename(id);
            const isAllowed = SVG_ALLOW_LIST.some(allowedSvg =>
              svgFileName === allowedSvg || svgFileName.includes(allowedSvg)
            );
            if (!isAllowed) {
              // console.info(`Excluding SVG from chunks: ${svgFileName}`);
              return 'empty-svgs';
            } else {
              console.info(`Using SVG import: ${svgFileName}`);
            }
          }
          return null;
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
      ]
    }
  },
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.eot', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})
