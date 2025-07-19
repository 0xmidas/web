import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Computer Modern Typewriter"', 'monospace'],
				mono: ['"Computer Modern Typewriter"', 'monospace'] // Also add it as a mono option
			}
		}
	},
	plugins: []
} satisfies Config;
