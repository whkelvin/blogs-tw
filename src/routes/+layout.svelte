<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<Navbar />
	
	<main class="flex-grow container mx-auto max-w-3xl px-4 py-8">
		<slot />
	</main>
	
	<Footer />
</div>

<svelte:head>
	<!-- Umami Analytics Script -->
	<script async src="https://analytics.umami.is/script.js" data-website-id="your-umami-website-id"></script>
</svelte:head>
