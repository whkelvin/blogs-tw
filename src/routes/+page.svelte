<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllPosts } from '$lib/posts';
  import type { Post } from '$lib/posts';
  import PostCard from '$lib/components/PostCard.svelte';
  import { SITE_DESCRIPTION } from '$lib/constants';
  
  let allPosts: Post[] = [];
  let visiblePosts: Post[] = [];
  let page = 1;
  const postsPerPage = 5;
  let loading = false;
  let hasMore = true;
  
  onMount(() => {
    const loadPosts = async () => {
      allPosts = await getAllPosts();
      loadMorePosts();
      
      // Set up intersection observer for infinite scroll
      const observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      }, {
        rootMargin: '100px'
      });
      
      const sentinel = document.getElementById('sentinel');
      if (sentinel) {
        observer.observe(sentinel);
      }
      
      return () => {
        if (sentinel) {
          observer.unobserve(sentinel);
        }
      };
    };
    
    loadPosts();
  });
  
  function loadMorePosts() {
    if (loading || !hasMore) return;
    
    loading = true;
    
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const newPosts = allPosts.slice(start, end);
    
    if (newPosts.length > 0) {
      visiblePosts = [...visiblePosts, ...newPosts];
      page += 1;
    }
    
    if (end >= allPosts.length) {
      hasMore = false;
    }
    
    loading = false;
  }
</script>

<svelte:head>
  <title>Kelvin 的開發筆記</title>
  <meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<section>
  <h1 class="text-xl font-bold mb-8 px-6">Kelvin 的開發筆記</h1>
  
  <div class="space-y-6">
    {#each visiblePosts as post (post.slug)}
      <PostCard {post} />
    {:else}
      <p>No posts found. Check back soon!</p>
    {/each}
    
    {#if loading}
      <div class="py-4 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    {/if}
    
    {#if hasMore}
      <div id="sentinel" class="h-4"></div>
    {/if}
  </div>
</section>
