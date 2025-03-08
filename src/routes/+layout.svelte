<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="container mx-auto max-w-3xl flex-grow px-4 py-8">
		<slot />
	</main>

	<Footer />
</div>

<svelte:head>
	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="82057102-eeba-458e-b5b0-c95b93b657e2"
	></script>
</svelte:head>
