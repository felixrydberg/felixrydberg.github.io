---
title: "Portfolio"
summary: ""
description: ""
date: "2024-05-18"
tags:
- "Astro"
- "Cloudflare Pages"
- "Github"
- "Tailwind Css"
- "Typescript"
- "Vue 3"
published: true
demoUrl: "https://felixrydberg.dev"
repoUrl: "https://github.com/felixrydberg/portfolio"
---

## Content
The content of this site is handled using [astro:content](https://docs.astro.build/en/guides/content-collections/). This allows me to write all the projects + work-life experience in an MD file and having it automatically render the content with dynamic routing. 

## Reactivity
Some components of this project requires Reactivity. The Search Component (Ctrl or CMD + K) and the [Filter Component](/projects) needs to be able to change the rendered result in the DOM. For this Im using Vue 3. There are options that would provide a smaller bundle size and or faster rendering results. The reason I choose Vue is because Im used to working with it and enjoy it.

## Styling
This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. The site supports both dark and light mode through Tailwinds dark: class operator.