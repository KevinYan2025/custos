import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  // },
  optimizeDeps: {
    include: ['react-oidc-context']
  },
  resolve: {
    alias: {
      'react-oidc-context': 'react-oidc-context/dist/index.js',
    },
  },
})