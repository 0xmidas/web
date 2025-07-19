<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	export let data;
</script>

<svelte:head>
	<title>Posts</title>
	<meta name="description" content="List of all posts" />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12">
	<div class="relative mb-10 flex items-center">
		<a
			href="/"
			class="absolute left-0 text-2xl text-blue-500 hover:text-blue-700"
			aria-label="Go back to Home"
		>
			<span>&larr;</span>
		</a>
		<h1 class="flex-grow text-center text-4xl font-extrabold text-gray-800">Posts</h1>
	</div>

	{#if data.posts && data.posts.length > 0}
		<ul class="space-y-8">
			{#each data.posts as post}
				<li class="list-none">
					<BlogPostCard
						slug={post.slug}
						title={post.title}
						date={post.createdAt?.toISOString() || ''}
						description={post.description || ''}
						tags={post.tags?.split(',') || []}
					/>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-xl text-gray-500">
			No posts found at the moment. Check back soon!
		</p>
	{/if}
</div>
