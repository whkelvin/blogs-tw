<script lang="ts">
  import type { Post } from '$lib/posts';
  
  export let post: Post;
  
  // Format the date with validation
  function formatDate(dateString: string): string {
    if (!dateString) {
      console.warn('Missing date for post:', post.title);
      return 'No date';
    }
    
    try {
      const [year, month, day] = dateString.split('-').map(num => parseInt(num.replace(/^0+/, ''), 10));
      const date = new Date(year, month - 1, day); // month is 0-based in Date constructor
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    } catch (e) {
      console.error('Error formatting date:', e, { dateString, post });
      return 'Invalid date';
    }
  }
</script>

<a href="/{post.slug}" class="block group">
  <article class="px-6 ">
    <time datetime={post.date} class="text-sm text-subtle">{formatDate(post.date)}</time>
    <h2 class="text-xl font-semibold group-hover:underline">{post.title}</h2>
    <p class="text-foreground text-sm">{post.description}</p>
  </article>
</a> 