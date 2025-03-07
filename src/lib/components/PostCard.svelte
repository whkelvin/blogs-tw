<script lang="ts">
  import type { Post } from '$lib/posts';
  
  export let post: Post;
  
  // Format the date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
</script>

<a href="/{post.slug}" class="block group">
  <article class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow mb-6">
    <time datetime={post.date} class="text-sm text-gray-500">{formatDate(post.date)}</time>
    <h2 class="text-xl font-semibold mt-2 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
    <p class="text-gray-700">{post.description}</p>
    
  </article>
</a> 