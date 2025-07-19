<script lang="ts">
	export let slug: string;
	export let title: string;
	export let date: string; // Or Date, adjust as needed
	export let description: string;
	export let tags: string[] | undefined = undefined; // Made tags optional
</script>

<div class="text-center">
	<a href={`/blog/${slug}`} class="text-xl font-semibold text-blue-600 hover:underline">
		{title}
	</a>
</div>
