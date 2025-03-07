<script lang="ts">
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import type { Post } from '$lib/posts';
  
  export let data: { post: Post };
  
  const { post } = data;
  
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

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.description} />
</svelte:head>

<article>
  <time datetime={post.date} class="text-subtle text-sm block mb-2">{formatDate(post.date)}</time>
  
  <div class="prose prose-slate max-w-none font-wenkai">
    <svelte:component this={post.content} />
  </div>
  
  <ShareButtons title={post.title} />
</article> 