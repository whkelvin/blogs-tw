---
title: '開發 Rest API  前先寫文件可以加速開發效率？'
date: '2025-03-17'
description: 'API 文件就像八塊腹肌一樣，大家都想要，但沒人想花時間慢慢刻。但花時間寫 API 文件，說不定會有意外的驚喜?'
---

幾年前我在一家接案顧問公司打雜寫扣，被分派到客戶那去開發一套系統，這套系統需要能夠對接客戶的內部資料。於是我就跑去問問客戶端的 PM 有沒有 API 文件可以讓我參考，沒的話也沒關係，分享後端的程式碼讓我自己慢慢看也可以。這時候這位 PM 推了推他的眼鏡，嘴角露出了驕傲的冷笑，好像早就已經預料到我的問題。他分享了一個 Confluence 頁面的連結給我，裡面有著他寫的 API 文件。 我讀了讀內容。 哇，寫得真好，該有的資訊應有盡有。

於是我迫不及待地打開了 Postman ，想來測試一下客戶的 API 。填好了該填的參數，按下傳送。

`401 Unauthenticated`

客戶內部系統的安全性也太周全了吧， 我懷著著崇拜的心情再次去請教 PM 的意見。PM 解釋他們的 API 沒有辦法從本地端呼叫，要我把 code 部署到 dev 環境之後他們的 infra 就會讓我的程式有適當的權限去呼叫他們的內部系統，我只要照著文件依樣畫葫蘆就行了。

於是我就開始寫扣了，不只開發了一套系統，還依照文件寫了一個 Mock Server 用來測試。確定一切都萬無一失後，做了一個簡單的 Demo，大家都覺得很棒，沒什麼問題，然後我就興沖沖的部署到 dev 去了。

結果：
![image](https://blog.yizy.dev/pm-usb.png)

哇，寫得真好，下次拜託別寫了。

# 同步文件與程式碼的三個策略

有什麼辦法能夠確保後端程式碼與 API 文件內容是一致的？1. 乾脆不寫文件 2. 在後端程式碼裡加入 Annotation 並使用開源工具產出 API 文件 3. 先寫 API 文件再用從文件產程式碼

## 乾脆不寫文件

沒錯，程式碼就是最好的 API 文件！相信大家一定都遇過寫程式不寫註釋，號稱自己程式碼簡單易讀的工程師。 沒有遇過的話沒關係，我就是。我也是屬於沒事不要多寫註釋派的，除非需要特別解釋程式碼為什麼要這麼寫，而不是這段程式碼應該做什麼。不然又會回到上面的圖片，註釋裡寫 USB Type A 程式碼裡寫 USB Type C，令人懷疑人生的情況。 ~~還有另一個原因就是懶~~

小的專案不寫文件還好，但你可以想像今天你要呼叫 AWS 的 API 第一步是去看他們的原始碼嗎？那會是多麽令人崩潰的開發體驗！所以大的專題還是想想辦法產出 API 文件吧！
![image](https://blog.yizy.dev/spiderman.png)

## 使用 Code Annotation 產出 API 文件

目前最多人用的 API 規格書應該是 Open API Specification 了吧。Open API Spec 有著豐富的開源生態系。可以用來產前端的 Client SDK、Mock Server、Postman Collection、甚至是現在紅翻半邊天的 MCP Server。

![image](https://blog.yizy.dev/oapispec.png)
可以到官網看看 Open API Spec 的例子: https://editor.swagger.io/

這邊找 Open API Code Generators: https://openapi-generator.tech/docs/generators/

很多後端的框架都支援產 Open API Spec 的插件，這些插件可以透過讀取程式碼裡的 Annotation 或是 注釋去產出相應的 API 文件。舉個例子， NestJS 就有插件能夠讓你邊寫扣邊寫文件。
![image](https://blog.yizy.dev/nest.png)

缺點就是後端的程式碼看起來會比較不整潔。對我這個有潔癖的強迫症工程師(只有在程式碼裡有)，看到這些多餘的 decorator 就覺得不行，想退休了。

## 先產 API 文件，再寫程式碼

這是我個人最喜歡的 API 開發流程，而這個流程可以有幾個特別的好處。

- 前後端可以同時進行開發，前端工程師不用等後端把 API 建好
- 運用 Code Generator 產後端的 Request/Response Models 和前端的 SDK 就能有全端 Type Safety
- 把 API Spec 放在分開的 Repo，有 breaking changes 或者是想要管理 API 的風格都比較容易 Review。
- AI 能幫助產後端程式碼

我在前公司就曾經執行過這一套開發流程。那時候的 Stack 是 Typescript Express 後端、Flutter 和 Angular 做前端。 Workflow 如下：

1. 建立一個 Git Repo 用來存放 Open API Spec ， 所有 API 改動都先從寫 Spec 開始
2. 建立 CI/CD Pipeline 去產出後端的 Typescript Interfaces 以及 Dart 和 Angular 的 Client SDK
3. 將產出的程式碼發佈到 Package Registry (這樣只要 `npm install <package>` 或 `flutter pub get <package>` 就能用產出的程式碼了

但這一套流程有幾個缺點

1. 用 yaml 寫 Open API Spec 讓人懷疑人生，加速白髮生長速度，想提早回鄉種田
2. 設置還有測試程式碼產生器和八年抗戰一樣冗長，常常需要當褓母還有除錯 CI/CD pipeline

於是我決定自己來做一套工具簡化這流程，有興趣的可以到 yizy.dev 看看，目前只支援 Typescript。
目前公司的開發流程是：

1. 到 yizy.dev 用填表格的方式更新 API Spec，不用再寫 yaml
2. 用 yizy.dev 產前端 SDK 和 後端 Model
3. 複製 Spec 和 產出的程式碼到 API Spec 的 Repo
4. 讓 CI/CD 自動部署到 Package Registry
5. 指使 LLM 用產出的 Model 和 Spec 寫後端的 Boilerplate

![image](https://assets.yizy.dev/spec.png)
_用 yizy 填表格寫 API 文件 ☝🏻_

但是用了幾個月後還是有不滿意的地方，yizy.dev 上的表格沒辦法實時共同編輯，而且目前只支援 Post Request。

目前正在研究新的流程：

1. 用 Markdown 來寫 API Spec
2. 做一個 AI Linter 來檢查 API 的風格和必填資料
3. 使用 AI 來產 Server Models 和 SDK
4. 使用 AI 來加速後端開發速度

對這個流程有興趣的歡迎留下你的 email 讓我知道！來試個水溫，集滿 100 人我就來開工！

集氣連結： https://tally.so/r/mYkvvB
