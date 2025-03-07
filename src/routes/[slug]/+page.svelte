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
  <header class="mb-8">
    <h1 class="text-3xl font-bold mb-2">{post.title}</h1>
    <time datetime={post.date} class="text-gray-500 block mb-4">{formatDate(post.date)}</time>
  </header>
  
  <div class="prose prose-slate max-w-none">
    <svelte:component this={post.content} />
  </div>
  
  <ShareButtons title={post.title} />
</article> 