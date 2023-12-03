import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      '@app': '/src',
      '@modules': '/src/modules',
      '@appcomponents': '/src/app/app_components'
    }
  }
})
