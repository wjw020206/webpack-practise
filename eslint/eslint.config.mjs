import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended, // 推荐的 React 规则
  pluginReact.configs.flat['jsx-runtime'], // 支持新 JSX 转换
  {
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },
])
