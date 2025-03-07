import { dev } from '$app/environment';
import type { SvelteComponent } from 'svelte';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
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
        const post = await resolver() as { metadata: Omit<Post, 'slug' | 'content'>; default: SvelteComponent };
        
        if (dev) {
          console.log(`Loading post ${slug}:`, post.metadata);
        }
        
        posts.push({
          slug,
          ...post.metadata,
          content: post.default
        });
      } catch (error) {
        if (dev) {
          console.error(`Error loading post ${slug}:`, error);
        }
      }
    }
  }
  
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (dev) {
    console.log('Total posts loaded:', sortedPosts.length);
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
    
    const post = await modules[path]() as { metadata: Omit<Post, 'slug' | 'content'>; default: SvelteComponent };
    
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