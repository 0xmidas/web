export interface Post {
	slug: string;
	title: string;
	content: string;
	html_content: string;
	description?: string;
	tags?: string;
	published_at?: Date;
	createdAt: Date;
}
