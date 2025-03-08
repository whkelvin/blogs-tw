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

<div class="mt-6 flex gap-3">
	<span class="text-sm font-medium">Share:</span>
	{#each SHARE_PLATFORMS as platform}
		<a
			href={getShareUrl(platform.name, title, actualUrl)}
			target="_blank"
			rel="noopener noreferrer"
			class="text-gray-600 transition-colors hover:text-gray-900"
			aria-label={`Share on ${platform.name}`}
		>
			{#if platform.icon === 'facebook'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-facebook"
				>
					<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
				</svg>
			{:else if platform.icon === 'linkedin'}
				<svg
					class="fill-primary"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
					></path>
					<rect x="2" y="9" width="4" height="12"></rect>
					<circle cx="4" cy="4" r="2"></circle>
				</svg>
			{:else if platform.icon === 'threads'}
				<svg width="20" height="20" viewBox="0 0 450 450" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M65 1C29.7 1 1 29.7 1 65V385C1 420.3 29.7 449 65 449H385C420.3 449 449 420.3 449 385V65C449 29.7 420.3 1 385 1H65ZM295.2 213.3C314.7 222.6 328.9 236.8 336.4 254.2C346.8 278.5 347.8 318.1 316.2 349.6C292 373.7 262.7 384.6 221.1 384.9H220.9C174.1 384.6 138.1 368.8 114 338.1C92.5 310.8 81.4 272.7 81 225V224.9V224.8C81.4 177.1 92.5 139.1 114 111.7C138.2 81 174.2 65.2 220.9 64.9H221.1C268 65.2 304.4 80.9 329.3 111.5C341.6 126.6 350.6 144.8 356.3 165.9L329.4 173.1C324.7 155.9 317.5 141.2 308 129.5C288.6 105.6 259.3 93.4 221 93.1C183 93.4 154.2 105.6 135.5 129.3C118 151.6 108.9 183.7 108.6 224.8C108.9 265.9 118 298.1 135.5 320.3C154.2 344.1 182.9 356.3 221 356.5C255.3 356.2 277.9 348.1 296.8 329.2C318.3 307.7 317.9 281.3 311 265.2C307 255.8 299.6 247.9 289.7 241.9C287.3 259.9 281.8 274.1 273.2 285.1C261.8 299.6 245.5 307.5 224.8 308.6C209.1 309.5 194 305.7 182.2 297.9C168.3 288.7 160.2 274.7 159.3 258.4C157.6 226.2 183.1 203.1 222.8 200.8C236.9 200 250.1 200.6 262.3 202.7C260.7 192.8 257.4 185 252.5 179.3C245.8 171.5 235.4 167.5 221.7 167.4H221.3C210.3 167.4 195.3 170.5 185.7 185L162.7 169.2C175.5 149.8 196.3 139.1 221.2 139.1H221.8C263.6 139.4 288.4 165.4 290.9 210.9C292.3 211.5 293.7 212.1 295.1 212.8L295.2 213.3ZM223.4 280.8C240.4 279.9 259.8 273.2 263.1 232C254.3 230.1 244.5 229.1 234.1 229.1C230.9 229.1 227.7 229.2 224.5 229.4C195.9 231 186.4 244.9 187.1 257.3C188 274 206.1 281.8 223.5 280.9L223.4 280.8Z"
						class="fill-primary"
					/>
				</svg>
			{/if}
		</a>
	{/each}
</div>
