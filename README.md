# AMPjs JavaScript Library


DATE: 2015.07.29


---


[TOC]


---


## 概要
AMPjsは、 MIT ライセンスの元で配布しています。  
HTMLベースのフロントエンド開発を効率よくする為に、豊富な機能を備えています。  
AMPjsは、大きく分けて3つのセクションに分けて設計しています。
1. 外部依存関係なく、ユーティリティ機能を提供するコア機能群。
2. jQueryやユーティリティーライブラリーに依存する、AMP.$モジュール。
3. createjsやユーティリティーライブラリーに、依存するAMP.cjsモジュール (現在、準備中)

AMPjsの使用方法については、docsフォルダのAPIリファレンスやdemoフォルダページを参照してご使用してください。


---


## サポートブラウザについて
AMPjs VERSION 3.xでは以下のブラウザサポート対象として開発しています。

```
InternetExplorer 8++
Microsoft Edge
FireFox (windows & Mac) 最新版 2015.7現在
Chrome (windows & Mac) 最新版 2015.7現在
Mac Safari 8++
ios Safari 7++
Android Browser 4.1++
```


---


## ディレクトリ構成について
```
├ _bk/         (一時バックアップデータ)
├ demo/        (DEMOページ)
├ develop/     (開発コード)
├ dist/        (配布コード)
├ docs/        (yuidoc / AMPjs APIリファレンス)
├ test/        (開発時用テストコード)
├ gulpfile.js  (gulpタスクファイル)
├ LICENCE      (ライセンス文言)
├ README.md    (本ファイル)
└ yuidoc.json  (yuidoc設定ファイル)
```


---


## 配布ファイル構成について
配布ファイルは、distフォルダに格納していますので、distフォルダ内のファイルを使用してください。
圧縮版ファイルは、ファイル名にminをつけて同階層保管しています。


---


##　ファイルインストール


---


##　外部ライブラリファイル詳細


---


---

## 追加予定ライブラリ
```
chroma
createjs / TweenMax
box2dweb
React  
Flux  
```


---
---
---


ここまで

```
dist/
├ amp/ (AMPjsライブラリフォルダ)
| ├ amp.js　(AMPjsコアファイル)
| ├ amp.min.js (AMPjsコアファイル圧縮版)
| ├ jquery.plugins.js (jQueryプラグイン)
| ├ jquery.plugins.min.js (jQueryプラグイン圧縮版)
| ├ amp.jquery.js (AMPjs jQueryモジュール)
| ├ amp.jquery.min.js (AMPjs jQueryモジュール圧縮版)
| └ jquery.utilities/ (AMPjs jQueryユーティリティモジュール)
|   ├ Float3d.js
|   ├ Float3d.min.js
|   ├ Slider.js
|   └  Slider.min.js
|
└ lib/ (外部ライブラリフォルダ)
  ├ jquery-1.8.3.min.js
  ├ jquery.plugins.js
  ├ utilities.pack.js
  └ createjs/
    ├ createjs-2014.12.12.min.js
    ├ easeljs-0.8.0.min.js
    ├ preloadjs-0.6.0.min.js
    ├ tweenjs-0.6.0.min.js
    └ soundjs-0.6.0.min.js

```

---




## For Use JS File


### ▼ amp.js
amp.jsのコアファイル。
コアファイルは、外部ライブラリの依存なく単体で動作します。
```
dist/amp/amp.min.js
```


### ▼ amp.jquery.js
jQueryベースのクラスファイルです。

```
dist/amp/jquery.plugins.min.js
  ├ jquery.event.flick.js
  ├ jquery.event.slip.js
  ├ jquery.event.stop.js
  ├ jquery.extend.js
  └ jquery.fn.extend.js
(AMPオリジナルjQuery機能拡張ファイル)

dist/amp/amp.jquery.min.js

dist/amp/jquery.utilities/*.js
（使用する際は必要なファイルをインストールしてください）
```

以下の外部jsライブラリ、プラグインに依存しますので、インストールして使用してください。
```
dist/lib/jquery-1.8.3.min.js
(バージョン1.8.3以上推奨)

dist/lib/jquery.plugins.js
  ├ jquery.easing.1.3.min.js
  └ jquery.mousewheel.min.js

dist/lib/utilities.pack.js
  ├ hogan-3.0.2.min.js
  ├ imagesloaded.pkgd.min.js
  ├ underscore-min.js
  ├ velocity.min.js
  └ velocity.easeplus.min.js
```


### ▼ amp.createjs.js
準備中
