import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [react(), eslint()],
	base: '/aw/',
		css: {
			devSourcemap: true
		},
		resolve: {
			alias: {
				'~assets': path.resolve(__dirname, 'src/assets'),
				'~api': path.resolve(__dirname, 'src/App/api'),
				'~components': path.resolve(__dirname, 'src/App/components'),
				'~constants': path.resolve(__dirname, 'src/App/constants'),
				'~helpers': path.resolve(__dirname, 'src/App/helpers'),
				'~hooks': path.resolve(__dirname, 'src/App/hooks'),
				'~pages': path.resolve(__dirname, 'src/App/pages'),
				'~store': path.resolve(__dirname, 'src/App/store'),
				'~styles': path.resolve(__dirname, 'src/App/styles'),
				'~types': path.resolve(__dirname, 'src/App/types'),
				'~utils': path.resolve(__dirname, 'src/App/utils'),
				'~app': path.resolve(__dirname, 'src/App'),
				'~': path.resolve(__dirname, 'src'),
			},
		},
	}
)
