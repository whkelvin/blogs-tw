---
title: 'Goldfish'
date: '2026-10-21'
description: 'Autocomplete in the Terminal'
---

I love spending time in the terminal, but I have the memory of a goldfish. The only commands I can remember are the easy ones like `ls` and `cd`. So I built [Goldfish](https://github.com/whkelvin/goldfish) `<><`, a tool that lets me document the commands I've learned and brings them back as autocomplete in the terminal.

I can document commands per project or globally. It's just like npm scripts, but I can use it anywhere.

![Goldfish demo](https://raw.githubusercontent.com/whkelvin/goldfish/main/assets/goldfishdemo.gif)

## How It Works

Each command gets a line in a `goldfish.config` file, with a description on the left and the command on the right:

```
Git: Stage All <>< git add -A
Git: Commit <>< git commit -m "{commit message here}"
Git: Show Repo Status <>< git status
```

- **Global commands** live in `~/.config/goldfish/goldfish.config`. Press `alt+g` to search them.
- **Project commands** live in a `goldfish.config` in the current folder. Press `alt+h` to search them.

Pick one, and Goldfish puts the command on your prompt, ready to edit or run.

Under the hood it's just a few lines of shell: [fzf](https://github.com/junegunn/fzf) for fuzzy search and `awk` to split the description from the command. It works in fish and zsh.

## Try It

Setup instructions are in the [GitHub repo](https://github.com/whkelvin/goldfish).
