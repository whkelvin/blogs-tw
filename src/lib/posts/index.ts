import { dev } from '$app/environment';
import type { SvelteComponent } from 'svelte';

export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	content: SvelteComponent;
	tag: string;
}

export type Series =
	| 'kelvins-dev-note'
	| 'fantastic-dreams-and-where-to-find-them'
	| '100-startups';
export type SortOpt = 'asc' | 'desc';
export async function getAllPosts(filter?: Series, sort: SortOpt = 'desc'): Promise<Post[]> {
	let modules = import.meta.glob('/src/posts/**/*.md');

	if (filter) {
		if (filter == 'kelvins-dev-note') {
			modules = import.meta.glob('/src/posts/kelvins-dev-note/*.md');
		}

		if (filter == 'fantastic-dreams-and-where-to-find-them') {
			modules = import.meta.glob('/src/posts/fantastic-dreams-and-where-to-find-them/*.md');
		}

		if (filter == '100-startups') {
			modules = import.meta.glob('/src/posts/100-startups/*.md');
		}
	}

	if (dev) {
		console.log('Found post files:', Object.keys(modules));
	}

	const posts: Post[] = [];

	for (const [path, resolver] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '');

		if (slug) {
			try {
				const post = (await resolver()) as {
					metadata: Omit<Post, 'slug' | 'content'>;
					default: SvelteComponent;
				};

				if (dev) {
					console.log(`Loading post ${slug}:`, {
						hasMetadata: !!post?.metadata,
						metadata: post?.metadata
					});
				}

				// Check if metadata exists
				if (!post?.metadata) {
					console.error(`Post ${slug} has no metadata`);
					continue;
				}

				// Validate required fields
				const { title, date, description } = post.metadata;

				if (!title || !date || !description) {
					console.error(`Post ${slug} is missing required fields:`, {
						title,
						date,
						description,
						hasTitle: !!title,
						hasDate: !!date,
						hasDescription: !!description
					});
					continue;
				}

				posts.push({
					slug,
					...post.metadata,
					content: post.default
				});
			} catch (error) {
				console.error(`Error loading post ${slug}:`, error);
			}
		}
	}

	const sortedPosts =
		sort === 'desc'
			? posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			: posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	if (dev) {
		console.log('Total posts loaded:', sortedPosts.length);
		console.log(
			'Posts:',
			sortedPosts.map((p) => ({ slug: p.slug, date: p.date }))
		);
	}

	return sortedPosts;
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const modules = import.meta.glob('/src/posts/**/*.md');
		const paths = Object.keys(modules).filter((path) => path.endsWith(`${slug}.md`));
		const path = paths.length > 0 ? paths[0] : null;
		if (path === null) {
			throw null;
		}

		if (!modules[path]) {
			return null;
		}

		const post = (await modules[path]()) as {
			metadata: Omit<Post, 'slug' | 'content'>;
			default: SvelteComponent;
		};

		return {
			slug,
			...post.metadata,
			content: post.default
		};
	} catch (error) {
		if (dev) {
			console.error(`Error loading post ${slug}:`, error);
		}
		return null;
	}
}
