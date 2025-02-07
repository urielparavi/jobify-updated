import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // So all the requests in our application in our front-end that will go to this path '/api', will directed to this
      // URL - http://localhost:5100/api
      '/api': {
        target: 'http://localhost:5100/api',
        // We change the origin which actually is going to fix the cors issue
        changeOrigin: true,
        // We rewrite the path and remove the api, so we're modify the path with the regular expression to remove the api prefix
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
