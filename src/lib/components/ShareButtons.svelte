<script lang="ts">
  import { SHARE_PLATFORMS } from '$lib/constants';
  
  export let title: string;
  export let url: string = '';
  
  // Get the current URL if not provided
  $: actualUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  function getShareUrl(platform: string, title: string, url: string): string {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case 'threads':
        return `https://threads.net/intent/post?text=${encodeURIComponent(title + ' ' + url)}`;
      default:
        return '#';
    }
  }
</script>

<div class="flex gap-3 mt-6">
  <span class="text-sm font-medium">Share:</span>
  {#each SHARE_PLATFORMS as platform}
    <a 
      href={getShareUrl(platform.name, title, actualUrl)} 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-gray-600 hover:text-gray-900 transition-colors"
      aria-label={`Share on ${platform.name}`}
    >
      {#if platform.icon === 'twitter'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      {:else if platform.icon === 'facebook'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      {:else if platform.icon === 'linkedin'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      {:else if platform.icon === 'threads'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8M8 12h8"></path>
        </svg>
      {/if}
    </a>
  {/each}
</div> 