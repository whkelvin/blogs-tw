<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllPosts } from '$lib/posts';
	import type { Post } from '$lib/posts';
	import PostCard from '$lib/components/PostCard.svelte';
	import { SITE_DESCRIPTION } from '$lib/constants';

	let allPosts: Post[] = $state([]);
	let visiblePosts: Post[] = $state([]);
	const postsPerPage = 5;
	let loading = $state(true);
	let hasMore = $state(true);
	type Series =
		| undefined
		| 'kelvins-dev-note'
		| 'fantastic-dreams-and-where-to-find-them'
		| '100-startups';
	type SortOpt = 'asc' | 'desc';
	let selectedSeries: Series = $state(undefined);

	onMount(async () => {
		allPosts = await getAllPosts(selectedSeries);
		loading = false;
		const initialPosts = allPosts.slice(0, postsPerPage);
		visiblePosts = initialPosts;
		hasMore = allPosts.length > postsPerPage;
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

	async function onSelectSeries(series: Series, sort: SortOpt = 'desc') {
		selectedSeries = series;
		loading = true;
		allPosts = await getAllPosts(selectedSeries, sort);
		loading = false;
		// Initial load of first page
		const initialPosts = allPosts.slice(0, postsPerPage);
		visiblePosts = initialPosts;
		hasMore = allPosts.length > postsPerPage;
	}
</script>

<svelte:head>
	<title>Kelvin 的部落格</title>
	<meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<section>
	<h1 class="font-wenkai text-primary mb-2 px-6 text-xl font-bold">Kelvin 的部落格</h1>
	<div class="mb-8 space-x-2 px-6">
		<button
			class="underline hover:cursor-pointer {selectedSeries === undefined ? 'font-bold' : ''}"
			onclick={async () => {
				await onSelectSeries(undefined);
			}}>全部文章</button
		>
		<button
			class="underline hover:cursor-pointer {selectedSeries === 'kelvins-dev-note'
				? 'font-bold'
				: ''}"
			onclick={async () => {
				await onSelectSeries('kelvins-dev-note');
			}}>Kelvin 的開發筆記</button
		>
		<button
			class="underline hover:cursor-pointer {selectedSeries ===
			'fantastic-dreams-and-where-to-find-them'
				? 'font-bold'
				: ''}"
			onclick={async () => {
				await onSelectSeries('fantastic-dreams-and-where-to-find-them', 'asc');
			}}>夢想與他們的產地</button
		>

		<!--
		<button
			class="underline hover:cursor-pointer {selectedSeries === '100-startups' ? 'font-bold' : ''}"
			onclick={async () => {
				await onSelectSeries('100-startups', 'asc');
			}}>創業的 100 種嘗試</button
		>
        -->
	</div>

	<div class="space-y-6">
		{#if loading}
			<div class="py-4 text-center">
				<div
					class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
					role="status"
				>
					<span class="sr-only">Loading...</span>
				</div>
			</div>
		{:else if visiblePosts.length > 0}
			{#each visiblePosts as post (post.slug)}
				<PostCard {post} />
			{/each}

			{#if hasMore}
				<div class="mt-8 flex justify-center">
					<button
						class="text-primary rounded-lg px-6 py-2 underline transition-colors"
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
