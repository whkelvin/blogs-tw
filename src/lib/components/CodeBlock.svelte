<script lang="ts">
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github.css';
  
  let highlighted = '';
  let copied = false;
  let timeoutId: ReturnType<typeof setTimeout>;
  
  onMount(() => {
    // Find all code blocks and highlight them
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    // Add copy buttons to code blocks
    document.querySelectorAll('pre').forEach((pre) => {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.innerHTML = 'Copy';
      button.addEventListener('click', () => copyCode(pre.querySelector('code') as HTMLElement));
      pre.appendChild(button);
    });
  });
  
  async function copyCode(element: HTMLElement) {
    const code = element.textContent || '';
    await navigator.clipboard.writeText(code);
    
    const button = element.parentElement?.querySelector('.copy-button');
    if (button) {
      button.innerHTML = 'Copied!';
      
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        button.innerHTML = 'Copy';
      }, 2000);
    }
  }
</script>

<slot />

<style>
  :global(pre) {
    position: relative;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #f8f9fa;
    overflow-x: auto;
  }
  
  :global(pre code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  :global(pre:hover .copy-button) {
    opacity: 1;
  }
  
  :global(.copy-button) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    background-color: #374151;
    color: white;
    border: none;
    border-radius: 0.375rem;
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
  }
  
  :global(.copy-button:hover) {
    background-color: #4B5563;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
</svelte:head> 