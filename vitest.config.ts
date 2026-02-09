import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '.next/**',
      'tests/e2e/**',
    ],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['node_modules', '.next', 'tests'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
