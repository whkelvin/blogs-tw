---
title: 'In'
date: '2026-10-18'
description: 'A keyboard-driven browser start page'
---

As a 10x developer, I avoid the mouse like the plague. I use Niri for window management, tmux in the terminal, Neovim for writing code. But every time I opened a new tab in the browser, I had to reach for the mouse. So I built [in](https://github.com/whkelvin/in), a browser start page that lets me go to a URL, open a bookmark, or search without leaving the keyboard.

![in start page](https://raw.githubusercontent.com/whkelvin/in/master/dist/Home.png)

## How It Works

Press `Space` on the start page. Like the leader key in Vim, it opens a "Which Key?" menu listing the available actions:

- `/` to search Google
- `u` to go to a URL
- `b` to search your bookmarks and open one
- `c` to import bookmarks from your browser

Press `Esc` to close any dialog.

It's built with Svelte and runs straight from disk, so you can point your browser's home page or new-tab page at it with no server needed.

## Try It

[GitHub repo](https://github.com/whkelvin/in).
