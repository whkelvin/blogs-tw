---
title: "理解 JavaScript 閉包"
date: "2023-10-05"
description: "深入探討 JavaScript 閉包及其運作原理"
---

# 理解 JavaScript 閉包

閉包是 JavaScript 中的一個基本概念。它允許函式存取外部作用域的變數，即使該作用域已經執行完畢。

## 閉包如何運作

當一個函式在另一個函式內部被定義時，就會創建閉包，使內部函式能夠存取外部函式的變數。

```js
function outerFunction() {
  const outerVariable = 'hello world';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closure = outerFunction();
closure(); // hello world
```

## 結論

閉包是 JavaScript 中的一個強大特性，能夠實現更靈活和模組化的程式碼。理解閉包是掌握 JavaScript 的關鍵。 