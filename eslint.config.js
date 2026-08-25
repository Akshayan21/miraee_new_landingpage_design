import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Retained design explorations are not part of the shipped application.
  globalIgnores([
    'dist',
    '.claude/**',
    '.codex/**',
    '.agents/**',
    'src/pages/Home.tsx',
    'src/pages/Product.tsx',
    'src/pages/Solutions.tsx',
    'src/pages/Technology.tsx',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/components/LegalFormKit.tsx', 'src/components/V2Kit.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['src/pages/Terms.tsx'],
    rules: { 'no-irregular-whitespace': 'off' },
  },
])
