<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllPosts } from '$lib/posts';
  import type { Post } from '$lib/posts';
  import PostCard from '$lib/components/PostCard.svelte';
  import { SITE_DESCRIPTION } from '$lib/constants';
  
  let allPosts: Post[] = $state([]);
  let visiblePosts: Post[] = $state([]);
  let page = $state(1);
  const postsPerPage = 5;
  let loading = $state(true);
  let hasMore = $state(true);
  
  onMount(async () => {
    allPosts = await getAllPosts();
    loading = false;
    // Initial load of first page
    const initialPosts = allPosts.slice(0, postsPerPage);
    visiblePosts = initialPosts;
    hasMore = allPosts.length > postsPerPage;
    console.log(hasMore);
  });
  
  function loadMorePosts() {
    if (loading || !hasMore) return;
    
    const start = visiblePosts.length;
    const end = start + postsPerPage;
    const newPosts = allPosts.slice(start, end);
    
    if (newPosts.length > 0) {
      visiblePosts = [...visiblePosts, ...newPosts];
      hasMore = visiblePosts.length < allPosts.length;
    } else {
      hasMore = false;
    }
  }
</script>

<svelte:head>
  <title>Kelvin 的開發筆記</title>
  <meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<section>
  <h1 class="text-xl font-bold mb-8 px-6 font-wenkai">Kelvin 的開發筆記</h1>
  
  <div class="space-y-6">
    {#if loading}
      <div class="py-4 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    {:else if visiblePosts.length > 0}
      {#each visiblePosts as post (post.slug)}
        <PostCard {post} />
      {/each}
      
      {#if hasMore}
        <div class="flex justify-center mt-8">
          <button 
            class="px-6 py-2 underline text-primary rounded-lg transition-colors"
            onclick={loadMorePosts}
          >
            Show More Posts
          </button>
        </div>
      {/if}

    {:else}
      <p class="text-center text-gray-600">No posts found. Check back soon!</p>
    {/if}
  </div>
</section>
