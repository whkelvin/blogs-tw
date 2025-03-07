import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/posts';

export const load = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    throw error(404, {
      message: 'Post not found'
    });
  }
  
  return {
    post
  };
}; 