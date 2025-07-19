<svelte:head>
	<title>Home</title>
	<meta name="description" content="A simple posts site built with SvelteKit" />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12">
	<div class="flex items-start gap-8">
		<!-- About content (left side) -->
		<div class="flex-1">
			<p class="text-gray-600 mb-4">
				I study CSE in Ghent
			</p>
			<div class="flex space-x-4">
				<a href="/blog" class="text-blue-500 hover:text-blue-700 hover:underline">Posts</a>
				<a href="/links" class="text-blue-500 hover:text-blue-700 hover:underline">Links</a>
			</div>
  	</div>
		
		<!-- Profile picture (top right) -->
		<div class="flex-shrink-0">
			<img 
				src="/profile.webp" 
				alt="Profile picture" 
				class="w-80 h-80 object-cover"
			/>
		</div>
	</div>
</div>
