import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { shaderLoaderPlugin } from './src/plugins/shaderLoader';

// https://vite.dev/config/
export default defineConfig({
  plugins: [shaderLoaderPlugin(), vue()],
});
