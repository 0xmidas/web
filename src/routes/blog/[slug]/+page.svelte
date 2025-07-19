<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: ({ post } = data);

	onMount(async () => {
		// Syntax highlighting
		const Prism = await import('prismjs');
		await import('prismjs/components/prism-javascript.js');
		await import('prismjs/components/prism-typescript.js');
		await import('prismjs/components/prism-python.js');
		await import('prismjs/components/prism-bash.js');
		await import('prismjs/components/prism-json.js');
		
		Prism.highlightAll();

		// Math rendering
		const katex = await import('katex');
		
		// Render display math ($$...$$)
		const displayMathElements = document.querySelectorAll('p');
		displayMathElements.forEach((element) => {
			const text = element.textContent || '';
			const displayMathRegex = /\$\$(.*?)\$\$/gs;
			if (displayMathRegex.test(text)) {
				element.innerHTML = text.replace(displayMathRegex, (match, math) => {
					try {
						return katex.renderToString(math.trim(), {
							displayMode: true,
							throwOnError: false
						});
					} catch (e) {
						return match;
					}
				});
			}
		});

		// Render inline math ($...$)
		const inlineMathElements = document.querySelectorAll('p, li, td, th');
		inlineMathElements.forEach((element) => {
			const text = element.textContent || '';
			const inlineMathRegex = /\$([^$]+)\$/g;
			if (inlineMathRegex.test(text) && !text.includes('$$')) {
				element.innerHTML = text.replace(inlineMathRegex, (match, math) => {
					try {
						return katex.renderToString(math.trim(), {
							displayMode: false,
							throwOnError: false
						});
					} catch (e) {
						return match;
					}
				});
			}
		});
	});
</script>

<div class="container mx-auto max-w-3xl px-4 py-12">
	<div class="relative mb-10 flex items-center">
		<a
			href="/blog"
			class="absolute left-0 text-2xl text-blue-500 hover:text-blue-700"
			aria-label="Go back to Home"
		>
			<span>&larr;</span>
		</a>
		<h1 class="flex-grow text-center text-4xl font-extrabold text-gray-800">
			{post.title}
		</h1>
	</div>
	<article class="prose lg:prose-xl dark:prose-invert mx-auto p-4 py-8">
		{@html post.html_content}
	</article>
</div>

<style>
	/* You can add component-specific styles here if needed */
</style>
