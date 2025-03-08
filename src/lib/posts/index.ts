import { dev } from '$app/environment';
import type { SvelteComponent } from 'svelte';

export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	content: SvelteComponent;
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/src/posts/*.md');

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

	const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
		const modules = import.meta.glob('/src/posts/*.md');
		const path = `/src/posts/${slug}.md`;

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
