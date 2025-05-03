import { defineConfig, loadEnv } from 'vite';
import { componentTagger } from 'lovable-tagger';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), mode === 'development' && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
  };
});
