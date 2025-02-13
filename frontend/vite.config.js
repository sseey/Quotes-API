import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet à Docker d'exposer le serveur
    port: 3000, // Port standard pour le frontend
    watch: {
      usePolling: true, // Corrige les problèmes de rechargement dans les conteneurs
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias pratique pour éviter les imports relatifs complexes
    },
  },
  build: {
    outDir: 'dist', // Dossier de sortie pour la build
    emptyOutDir: true, // Vide le répertoire avant chaque build
  }
});
