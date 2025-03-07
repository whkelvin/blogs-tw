# Personal Blog

A minimalist blog built with SvelteKit, MDsveX, and Tailwind CSS.

## Features

- Markdown-based blog posts
- Responsive design
- Infinite scroll post feed
- Social sharing buttons
- Umami analytics integration
- Minimalist theme

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Writing Posts

Create new posts in the `src/posts` directory using Markdown format. Each post should include frontmatter with the following fields:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
description: A brief description of your post
---
```

## Deployment

This blog is configured to deploy to Cloudflare Pages. Set up your Cloudflare Pages project and connect it to your repository for automatic deployments.

## Analytics

To enable analytics:
1. Create an account at [Umami](https://umami.is/)
2. Create a new website in your Umami dashboard
3. Replace the `data-website-id` in `src/routes/+layout.svelte` with your website ID
