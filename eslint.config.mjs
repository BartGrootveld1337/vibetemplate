import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      // Warn on unused variables (error in CI)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Enforce explicit return types on functions
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow empty interfaces for props
      '@typescript-eslint/no-empty-interface': 'off',
      // Prefer const assertions
      'prefer-const': 'error',
      // No console in production
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]

export default eslintConfig
