---
title: 'PM 叫你做權限管理嗎？ 試試 Casbin 吧'
date: '2025-03-22'
description: 'Handle RBAC (角色權限管理) like a PRO'
---

在成為工程師這幾年裡，每當小組在分派任務的時候，我都會下意識的閃躲這個類型的任務。只要它出現在 Sprint Board 上面，我就會把頭埋進土裡裝忙，能躲一時就是一時。但能躲得了一時，躲不了一世。出來混，遲早要還的。緣分來了，誰也擋不住。

這禮拜來和大家分享一下應用 Casbin 來做角色權限管制系統 (RBAC - Role Based Access Control)，也就是用來管理權限的一個常見架構。

# RBAC 是什麼？

RBAC 就是以`角色`來管理以及分配`權限`的一種管理取用權限的模型。在一個有很多`使用者`的系統裡，每個`使用者`可能會扮演多個`角色`，而每個`角色`都有不同的`權限`。當`使用者`即將對一個`資源`進行一個需要`權限`的`行動`時，我們可以透過這個`使用者`的角色來判別他是否有足夠的`權限`去執行這個行動。

用 FB 的社團舉個例子。這邊只是舉例用，實際上 FB 社團的權限管理和這邊舉的例子應該不一樣。

社團裡的角色：

- 社團擁有者 (groupOwner)
- 社團管理員 (groupManager)
- 社團成員 (groupMember)
- 訪客 (visitor)

這是社團裡的資源

- 社團成員名單 (groupMembers)
- 版規 (groupRules)
- 貼文 (posts)

這是社團裡的權限清單：
權限可以用 `行動 ＋ 資源` 來定義

- 新增社團成員
- 編輯社團成員名單
- 刪除社團成員
- 閱讀社團成員名單
- 新增版規
- 編輯版規
- 刪除版規
- 閱讀版規
- 新增貼文
- 編輯貼文
- 刪除貼文
- 閱讀貼文

這是每個角色有的權限：

| 權限/角色    | 社團擁有者 | 社團管理員 | 社團成員 | 訪客 |
| ------------ | ---------- | ---------- | -------- | ---- |
| 新增社團成員 | ✅         | ❌         | ❌       | ❌   |
| 編輯社團成員 | ✅         | ❌         | ❌       | ❌   |
| 刪除社團成員 | ✅         | ❌         | ❌       | ❌   |
| 閱讀社團成員 | ✅         | ✅         | ✅       | ✅   |
| 新增版規     | ✅         | ✅         | ❌       | ❌   |
| 編輯版規     | ✅         | ✅         | ❌       | ❌   |
| 刪除版規     | ✅         | ✅         | ❌       | ❌   |
| 閱讀版規     | ✅         | ✅         | ✅       | ✅   |
| 新增貼文     | ✅         | ✅         | ✅       | ❌   |
| 編輯貼文     | ✅         | ✅         | ✅       | ❌   |
| 刪除貼文     | ✅         | ✅         | ✅       | ❌   |
| 閱讀貼文     | ✅         | ✅         | ✅       | ✅   |

## 更加細分角色

定義角色其實就是定義一組權限。定義角色的時候，我們可以直接用權限來定義：

```
社團擁有者 = 新增社團成員 + 編輯社團成員 + 刪除社團成員 + 閱讀社團成員
			+ 新增版規 + 編輯版規 + 刪除版規 + 閱讀版規
			+ 新增貼文 + 編輯貼文 + 刪除貼文 + 閱讀貼文

社團管理員 =  閱讀社團成員
			+ 新增版規 + 編輯版規 + 刪除版規 + 閱讀版規
			+ 新增貼文 + 編輯貼文 + 刪除貼文 + 閱讀貼文

社團成員 ＝	閱讀社團成員 +  閱讀版規
			+ 新增貼文 + 編輯貼文 + 刪除貼文 + 閱讀貼文

訪客 ＝閱讀社團成員 + 閱讀版規 + 閱讀貼文
```

也可以先把權限分組 (建立分工更細的角色)，再讓一個大角色繼承多個小角色的權限，能者多勞的概念？

```
// 以權限組合定義角色
社團成員 Reader = 閱讀社團成員
社團成員 Writer = 新增社團成員 + 編輯社團成員 + 刪除社團成員
版規 Reader = 閱讀版規
版規 Writer = 新增版規 + 編輯版規 + 刪除版規
貼文 Reader = 閱讀貼文
貼文 Writer = 新增貼文 + 編輯貼文 + 刪除貼文

// 以多個角色組合定義角色
社團擁有者 =  社團成員 Reader + 社團成員 Writer
	         + 版規 Reader + 版規 Writer
	         + 貼文 Reader + 貼文 Writer

社團管理員 = 社團成員 Reader
	         + 版規 Reader + 版規 Writer
	         + 貼文 Reader + 貼文 Writer

社團成員 = 社團成員 Reader + 版規 Reader + 貼文 Reader + 貼文 Writer

訪客 = 社團成員 Reader + 版規 Reader + 貼文 Reader
```

# RBAC 實作

看到這麼多無聊繁瑣的東西開始懷疑人生了嗎？那假設老闆今天要求我們搭建這樣的一套權限認證系統該怎麼辦呢？~~果斷離職~~ 當然是站在巨人的肩膀上用其他人已經寫好的 Library。

Casbin 就是一個支援多種權限管制 (RBAC 只是其中一種)的框架。他也支援所有常見程式語言。
連結在這：
https://casbin.org/

為什麼上面的例子要寫的這麼詳細？ 因為 Casbin 的文件我是有看沒有懂，越看頭越大。所以先把目標定出來：

目標是得到類似這樣的一個 function ，可以在程式碼裡確認一個`角色`有沒有`權限`可以對某項`資源`行使某項`行動`。

```typescript
function isAuthorized(role: Role, action: Action: resource: Resoruce): boolean {
	return casbinMagic(role, action, resource);
}
```

Model 和 Policy 是 Casbin 用來判別應該允許或拒絕 Request 的參數。

### Model

就是權限管理的模型，RBAC 就是其中一個模型。 RBAC 的 Model 長這樣。照抄 Casbin 官網上的就行了。

```
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

以下是我試圖理解裡面在寫什麼的筆記，但這邊有點一知半解，大家就將就的看一下吧：

Request Definition - 定義所有來自使用者的請求都必須提供三樣資訊：

- sub - 角色
- obj - 想對資源
- act - 做出什麼行動

Policy Definition - 定義角色與權限的關係

- sub - 角色能夠
- obj - 對資源
- act - 做出什麼行動

Role Definition

用來讓角色A 可以繼承角色B 的權限

Policy Effect

如果使用者的擁有的權限裡如果包含了請求裡需要的權限，就批准 Request，否則就拒絕。

Matcher

Policy 裡可以找到 Request 裡相對應的角色、資源、以及行動。找得到 Match 就代表 Request 裡的叫色可以對資源做出相應的行動。

### Policy

Policy 用來定義角色以及每個角色擁有的權限，也用來定義角色如何繼承其他角色的權限。依照 FB 社團的例子還有 Model 裡定義的格式，我們可以這樣定義 Policy。

```
p, groupMembers.reader, groupMembers, read
p, groupMembers.writer, groupMembers, edit
p, groupMembers.writer, groupMembers, create
p, groupMembers.writer, groupMembers, delete

p, groupRules.reader, groupRules, read

p, groupRules.writer, groupRules, edit
p, groupRules.writer, groupRules, create
p, groupRules.writer, groupRules, delete

p, posts.reader, posts, read

p, posts.writer, posts, edit
p, posts.writer, posts, create
p, posts.writer, posts, delete

g, groupOwner, groupMember.reader
g, groupOwner, groupMember.writer
g, groupOwner, groupRules.reader
g, groupOwner, groupRules.writer
g, groupOwner, posts.reader
g, groupOwner, posts.writer

g, groupManager, groupMember.reader
g, groupManager, groupRules.reader
g, groupManager, groupRules.writer
g, groupManager, posts.reader
g, groupManager, posts.writer

g, groupMember, groupMembers.reader
g, groupMember, groupRules.reader
g, groupMember, posts.reader
g, groupMember, posts.writer

g, visitor, groupMembers.reader
g, visitor, groupRules.reader
g, visitor, posts.reader
```

# 測試 Casbin 權限管理

在把 Model 與 Policy 轉化成程式碼之前，可以用 Casbin Editor (https://casbin.org/editor/) 測試一下寫好的 Model 以及 Policy 有沒有問題。

左上角選擇 RBAC (或貼入上面的 Model)，右上角填入 Policy，左下角填入想要測試的角色有沒有權限能夠對某項資源執行某項行動。

下圖測試的是 `visitor` 是否有權限 `read` `groupRules`，右下角顯示 true ，因為可以在 Policy 裡面找到相應的權限，訪客可以閱讀版規。
![image](https://blog.yizy.dev/rbac.png)

下圖測試的是 `visitor` 是否有權限 `edit` `groupRules`，右下角顯示 false ，因為不能在 Policy 裡面找到相應的權限，訪客無法編輯版規。
![image](https://blog.yizy.dev/rbac-false.png)

# 程式碼

我使用 node-casbin and typescript 來實作，但其他語言大概都大同小異 (應該吧？)。

```typescript
import { Enforcer, Model, newEnforcer } from 'npm:casbin';

export type Resource = 'groupMembers' | 'groupRules' | 'posts';

export type UserRole = 'groupOwner' | 'groupManager' | 'groupMember' | 'visitor';

export type ResourceRole =
	| 'groupMembers.reader'
	| 'groupMembers.writer'
	| 'groupRules.reader'
	| 'groupRules.writer'
	| 'posts.reader'
	| 'posts.writer';

export type Action = 'read' | 'create' | 'edit' | 'delete';

export interface CasbinPolicy {
	role: UserRole | ResourceRole;
	resource: Resource;
	action: Action;
}

export interface CasbinGroupPolicy {
	role: UserRole;
	inheritFrom: ResourceRole;
}

export const policies: CasbinPolicy[] = [
	{ role: 'groupMembers.reader', resource: 'groupMembers', action: 'read' },
	{ role: 'groupMembers.writer', resource: 'groupMembers', action: 'create' },
	{ role: 'groupMembers.writer', resource: 'groupMembers', action: 'edit' },
	{ role: 'groupMembers.writer', resource: 'groupMembers', action: 'delete' },

	{ role: 'groupRules.reader', resource: 'groupRules', action: 'read' },
	{ role: 'groupRules.writer', resource: 'groupRules', action: 'create' },
	{ role: 'groupRules.writer', resource: 'groupRules', action: 'edit' },
	{ role: 'groupRules.writer', resource: 'groupRules', action: 'delete' },

	{ role: 'posts.reader', resource: 'posts', action: 'read' },
	{ role: 'posts.writer', resource: 'posts', action: 'create' },
	{ role: 'posts.writer', resource: 'posts', action: 'edit' },
	{ role: 'posts.writer', resource: 'posts', action: 'delete' }
];

export const groupedPolicy: CasbinGroupPolicy[] = [
	{ role: 'groupOwner', inheritFrom: 'groupMembers.reader' },
	{ role: 'groupOwner', inheritFrom: 'groupMembers.writer' },
	{ role: 'groupOwner', inheritFrom: 'groupRules.reader' },
	{ role: 'groupOwner', inheritFrom: 'groupRules.writer' },
	{ role: 'groupOwner', inheritFrom: 'posts.reader' },
	{ role: 'groupOwner', inheritFrom: 'posts.writer' },

	{ role: 'groupManager', inheritFrom: 'groupMembers.reader' },
	{ role: 'groupManager', inheritFrom: 'groupRules.reader' },
	{ role: 'groupManager', inheritFrom: 'groupRules.writer' },
	{ role: 'groupManager', inheritFrom: 'posts.reader' },
	{ role: 'groupManager', inheritFrom: 'posts.writer' },

	{ role: 'groupMember', inheritFrom: 'groupMembers.reader' },
	{ role: 'groupMember', inheritFrom: 'groupRules.reader' },
	{ role: 'groupMember', inheritFrom: 'posts.reader' },
	{ role: 'groupMember', inheritFrom: 'posts.writer' },

	{ role: 'visitor', inheritFrom: 'groupMembers.reader' },
	{ role: 'visitor', inheritFrom: 'groupRules.reader' },
	{ role: 'visitor', inheritFrom: 'posts.reader' }
];

export const model = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`;

export async function isAuthorized(
	role: UserRole,
	action: Action,
	resource: Resource
): Promise<boolean> {
	const casbinModel = new Model();
	casbinModel.loadModelFromText(model);

	// Create a new enforcer
	const enforcer: Enforcer = await newEnforcer(casbinModel);

	policies.forEach((p) => {
		enforcer.addPolicy(p.role, p.resource, p.action);
	});

	groupedPolicy.forEach((g) => {
		enforcer.addGroupingPolicy(g.role, g.inheritFrom);
	});

	return enforcer.enforce(role, resource, action);
}

console.log('Visitor is trying to read group rules:');
console.log((await isAuthorized('visitor', 'read', 'groupRules')) ? 'allowed' : 'denied');

console.log('Visitor is trying to edit group rules:');
console.log((await isAuthorized('visitor', 'edit', 'groupRules')) ? 'allowed' : 'denied');

console.log('Visitor is trying to read posts:');
console.log((await isAuthorized('visitor', 'read', 'posts')) ? 'allowed' : 'denied');

console.log('Visitor is trying to edit posts:');
console.log((await isAuthorized('visitor', 'delete', 'posts')) ? 'allowed' : 'denied');

console.log('Happy Hacking!');
```

![image](https://blog.yizy.dev/test-res.png)
