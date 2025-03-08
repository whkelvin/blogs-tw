---
title: "開始使用 SvelteKit"
date: "2023-03-15"
description: "學習如何使用 SvelteKit 建立現代網頁應用程式"
---

# 開始使用 SvelteKit

SvelteKit 是一個用於建立各種規模網頁應用程式的框架，提供優美的開發體驗和靈活的檔案系統路由。

## 為什麼選擇 SvelteKit？

SvelteKit 提供多項優勢：

1. **快速開發**：熱模組替換使開發快速且愉悅
2. **高效能**：Svelte 將您的程式碼編譯為高效能的 JavaScript
3. **絕佳的開發體驗**：直覺的 API 和優秀的文件
4. **靈活的渲染**：伺服器端渲染、客戶端渲染或兩者皆可
5. **基於檔案的路由**：基於檔案結構的簡單直覺路由系統

## 安裝

要創建新的 SvelteKit 專案，請執行：

```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

## 基本結構

一個典型的 SvelteKit 專案具有以下結構：

```
my-app/
├── src/
│   ├── lib/
│   │   └── components/
│   ├── routes/
│   │   ├── +page.svelte
│   │   └── +layout.svelte
│   └── app.html
├── static/
└── svelte.config.js
```

## 結論

SvelteKit 是一個強大的現代網頁應用程式框架。它將 Svelte 的簡潔性與一套完整的應用程式開發工具相結合。 