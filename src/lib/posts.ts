import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

const POSTS_DIR = path.join(process.cwd(), 'src/posts');

function generateSlug(filename: string): string {
	return filename.replace(/\.md$/, '');
}

function getPostFiles(): string[] {
	if (!fs.existsSync(POSTS_DIR)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
}

function parsePost(filename: string): Post {
	const filePath = path.join(POSTS_DIR, filename);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data: frontmatter, content: rawContent } = matter(fileContent);
	
	const slug = generateSlug(filename);
	const title = frontmatter.title || slug;
	const description = frontmatter.description;
	const tags = Array.isArray(frontmatter.tags) 
		? frontmatter.tags.join(',') 
		: frontmatter.tags;
	
	// Parse date from frontmatter
	let published_at: Date | undefined;
	if (frontmatter.date) {
		published_at = new Date(frontmatter.date);
	}
	
	// Use file modification time as fallback for createdAt
	const stats = fs.statSync(filePath);
	const createdAt = published_at || stats.mtime;
	
	const html_content = marked.parse(rawContent);
	
	return {
		slug,
		title,
		content: rawContent,
		html_content,
		description,
		tags,
		published_at,
		createdAt
	};
}

export async function getAllPosts(): Promise<Post[]> {
	const files = getPostFiles();
	const posts = files.map(parsePost);
	
	// Sort by createdAt/published_at desc (newest first)
	return posts.sort((a, b) => {
		const dateA = a.published_at || a.createdAt;
		const dateB = b.published_at || b.createdAt;
		return dateB.getTime() - dateA.getTime();
	});
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const filename = `${slug}.md`;
	const filePath = path.join(POSTS_DIR, filename);
	
	if (!fs.existsSync(filePath)) {
		return null;
	}
	
	return parsePost(filename);
}