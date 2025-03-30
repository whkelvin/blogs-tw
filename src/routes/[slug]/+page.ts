import { error } from '@sveltejs/kit';
import { getPostBySlug, type Post } from '$lib/posts';

export const load = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const post: Post | null = await getPostBySlug(slug);

	if (!post) {
		throw error(404, {
			message: 'Post not found'
		});
	}

	return {
		post
	};
};
