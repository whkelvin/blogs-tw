---
title: 'Yizy'
date: '2026-10-22'
description: 'Schema Driven API Development Made Easy'
---

[Yizy](https://yizy.dev) lets you write an API spec in the browser with code completion, then instantly generates type-safe server and client code with zero config.

## Why I Built It

I've spent most of my career building HTTP JSON APIs. It always bothered me that the server and the client didn't share types. They're often written in different languages, so a change on one side could quietly break the other.

The OpenAPI Specification fixed that for me. It describes every endpoint in a machine-readable way, so code generators can write the client for you. I fell in love with building APIs this way: type safety across the server and client, and no client code to write by hand.

At first I generated the spec from code annotations. That worked until I needed clients in multiple languages. Most generators only support a subset of OpenAPI, and I kept debugging two steps at once: how the spec was generated from my code, and how the client was generated from the spec.

So I switched to a schema-first approach: write the spec by hand first, then generate both the server and the client from it. It's by far my favorite way to build APIs. The spec becomes a contract, so frontend and backend developers can work in parallel with a lot less back-and-forth, and breaking changes are easy to spot.

The catch is that setting up a schema-first toolchain takes so much tedious work that it rarely feels worth it, let alone convincing a team to write OpenAPI by hand. That's why I built Yizy: to make schema-first design so easy even your grandma could do it.

## What It Does

- **Write the spec in the browser** with code completion, then save and generate.
- **Get type-safe server and client code instantly**, with no toolchain to set up.
- **Export the spec as JSON** so you can track it alongside your code.
- **Chat with Claude** about your spec using your own Anthropic API key.

Yizy is opinionated. It's built for RPC-style JSON APIs:

- Action-based routes instead of resource-based ones
- POST requests, with input in the request body instead of query or path parameters
- Headers for auth
- One uniform response model across status codes

You can find the docs and try it out at [yizy.dev](https://yizy.dev).
