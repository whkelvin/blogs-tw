---
title: "使用 Tailwind CSS 建立響應式導航欄"
date: "2023-10-10"
description: "學習如何使用 Tailwind CSS 創建響應式導航欄"
---

# 使用 Tailwind CSS 建立響應式導航欄

Tailwind CSS 是一個實用優先的 CSS 框架，使建立響應式設計變得容易。在本教程中，我們將創建一個響應式導航欄。

## 創建導航欄

以下是使用 Tailwind CSS 創建響應式導航欄的簡單示例：

```html
<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="#" class="text-white text-lg font-bold">Logo</a>
    <div class="hidden md:flex space-x-4">
      <a href="#" class="text-gray-300 hover:text-white">首頁</a>
      <a href="#" class="text-gray-300 hover:text-white">關於</a>
      <a href="#" class="text-gray-300 hover:text-white">聯絡</a>
    </div>
  </div>
</nav>
```

## 結論

使用 Tailwind CSS，建立響應式元件變得直接且高效。嘗試不同的樣式來創建您獨特的設計。 