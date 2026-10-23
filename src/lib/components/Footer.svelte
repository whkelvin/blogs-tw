<script lang="ts">
	import { PROFILE, SOCIAL_LINKS } from '$lib/constants';
</script>

<footer class="mt-12 border-t border-gray-200 py-8">
	<div class="container mx-auto max-w-3xl px-4">
		<div class="flex flex-col items-center gap-6 md:flex-row">
			<img src={PROFILE.image} alt={PROFILE.name} class="h-24 w-24 rounded-full object-cover" />

			<div class="text-center md:text-left">
				<div class="mb-2 flex flex-row">
					<h3 class="my-auto mb-2 text-xl font-semibold">{PROFILE.name}</h3>
				</div>

				<div class="flex justify-center gap-4 md:justify-start">
					<a
						href={SOCIAL_LINKS.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-github"
						>
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							></path>
						</svg>
					</a>

					<a href={SOCIAL_LINKS.email} aria-label="Email">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-mail"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
							></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
