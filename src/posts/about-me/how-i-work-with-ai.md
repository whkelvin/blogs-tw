---
title: 'How I Work as an AI-First Developer'
date: '2026-10-20'
description: 'How I work with AI across features, chores and minis'
---

The most beneficial superpower AI unlocks for software developers is parallelism. In the pre-AI era, a developer could only work on one thing at a time. Now we can work on many things at once. Here is how I run and manage multiple AI agents in parallel.

I sort my work into three categories, each with its own workflow. This lets me juggle multiple agents without feeling overwhelmed.

- **Feature**: complex tasks spanning frontend, backend and infra that need my full attention.
- **Chore**: customer requests (e.g. pulling data) and issues raised in Slack.
- **Mini**: easy bug fixes, cosmetic changes, and tasks Claude can one-shot and I can review quickly.

## Features: Git Worktree for Parallel Development

### Starting a Feature

I use a custom CLI to scaffold my development environment for each feature. One command:

1. Creates a git worktree named after the feature
2. Starts a tmux session in it with tabs for:
   - Claude
   - Neovim
   - The full stack via Docker Compose, on unused ports

Each feature gets its own ports, so I can run several versions of the app side by side and work on multiple features at once.

### Reviewing a Feature

To review a teammate's branch, the same CLI checks it out from GitHub into a new worktree and opens the same tmux layout so I can review someone's work while other agents are busy building other features.

## Chores: The Intern Slack Bot

The Intern is a Slack bot that starts Claude in a dedicated tmux session on my laptop. This injects my local Claude with context from conversations in Slack. The local Claude session also allows me to make sure it has the right skills to perform the task. Pair this with a remote session and I can chat with Claude running on my laptop with my phone.

## Minis: Ticket Slayer Agent

I label tickets Claude can one-shot as `ai-friendly`. When one is assigned to me and moved to Ready, an agent picks it up and opens a PR for me to review.

## Wrapping Up

This setup has increased my daily PR count and lets me work efficiently as an AI-first software developer.
