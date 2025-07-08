

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione a seção 'css' aqui
  css: {
    postcss: './postcss.config.js', // Aponta para o seu arquivo de configuração PostCSS
  },
})