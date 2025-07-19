import { getPostBySlug } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		throw error(400, 'Bad Request: Slug is missing');
	}

	const post = await getPostBySlug(slug);

	if (!post) {
		throw error(404, 'Not Found: Post not found');
	}

	return {
		post
	};
};
