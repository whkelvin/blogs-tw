---
title: Building a Responsive Navbar with Tailwind CSS
date: 2023-10-10
description: Learn how to create a responsive navigation bar using Tailwind CSS.
---

# Building a Responsive Navbar with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that makes it easy to build responsive designs. In this tutorial, we'll create a responsive navbar.

## Creating the Navbar

Here's a simple example of a responsive navbar using Tailwind CSS:

```html
<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="#" class="text-white text-lg font-bold">Logo</a>
    <div class="hidden md:flex space-x-4">
      <a href="#" class="text-gray-300 hover:text-white">Home</a>
      <a href="#" class="text-gray-300 hover:text-white">About</a>
      <a href="#" class="text-gray-300 hover:text-white">Contact</a>
    </div>
  </div>
</nav>
```

## Conclusion

With Tailwind CSS, building responsive components is straightforward and efficient. Experiment with different styles to create your unique design. 