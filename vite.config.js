import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Base path for GitHub Pages - update 'Draw-App-V1.1' to your actual repo name
    base: '/Draw-App-V1.1/',
})
