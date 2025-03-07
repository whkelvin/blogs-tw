import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	
	// Preprocess components with mdsvex and vite
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: {
				dashes: 'oldschool'
			}
		})
	],

	kit: {
		adapter: adapter(),
		
		// Customize page options
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s from missing markdown posts
				if (path.startsWith('/') && message.includes('Not found')) {
					return;
				}
				throw new Error(`${path} ${message}`);
			}
		}
	}
};

export default config;
