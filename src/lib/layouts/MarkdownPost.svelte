<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<div class="prose prose-slate max-w-none">
  <slot />
</div>

<style>
  :global(.prose pre) {
    padding: 0 !important;
    margin: 0 !important;
    background-color: transparent !important;
  }
  
  :global(.prose code) {
    background-color: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
</style> 