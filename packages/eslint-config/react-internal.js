import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export const config = [
  { ignores: ['dist', 'node_modules', '*.config.*'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      curly: ['error', 'all'],
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-useless-catch': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_|^args$' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'],
            ['^react$', '^@?\\w'],
            ['^@pages/*', '^@shared/*'],
            ['^\\u0000'],
            ['^\\.'],
            ['^.+\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  prettierConfig,
];
