import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { codeToHtml } from 'shiki/bundle/full';
import { addCopyButton } from 'shiki-transformer-copy-button';

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
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = await codeToHtml(code, {
						lang,
						theme: 'everforest-dark',
						transformers: [addCopyButton()]
					});
					return `{@html ${JSON.stringify(html)}}`;
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: undefined,
				environment: undefined,
				persist: undefined
			}
		}),

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
