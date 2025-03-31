<script lang="ts">
	interface Link {
		title: string;
		href: string;
	}

	let { prev, next }: { prev: Link | null; next: Link | null } = $props();
</script>

<div class="mt-16 mb-16 grid w-full grid-cols-2 gap-2">
	{#if prev}
		<button
			class="border-primary rounded-md border px-8 py-2 hover:cursor-pointer"
			onclick={() => {
				window.location.href = prev.href;
			}}
		>
			<div class="text-left">上一篇</div>
			<div class="text-left underline">{prev.title}</div>
		</button>
	{/if}
	{#if next}
		<button
			class="border-primary rounded-md border px-8 py-2 hover:cursor-pointer"
			onclick={() => {
				window.location.href = next.href;
			}}
		>
			<div class="text-left">下一篇</div>
			<div class="text-left underline">{next.title}</div>
		</button>
	{/if}
</div>
