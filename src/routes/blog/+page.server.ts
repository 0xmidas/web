import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/posts';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();

	return {
		posts: posts.map(post => ({
			title: post.title,
			slug: post.slug,
			createdAt: post.createdAt,
			description: post.description,
			tags: post.tags
		}))
	};
};
