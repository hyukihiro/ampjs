# AMPjs JavaScript Library


<<<<<<< HEAD
DATE: 2015.07.29
=======
[TOC]
>>>>>>> v3_develop


---


<<<<<<< HEAD
[TOC]
=======
## 概要
AMPjsは、 MIT ライセンスの元で配布しています。  
HTMLベースのフロントエンド開発を効率よくする為に、豊富な機能を備えています。  
AMPjsは、大きく分けて3つのモジュールに分けて設計しています。

1. 外部依存関係なく、ユーティリティ機能を提供するコア機能群。
1. jQueryやユーティリティーライブラリーに依存する、AMP.$モジュール。
1. createjsやユーティリティーライブラリーに、依存するAMP.cjsモジュール (現在、準備中)

AMPjsの使用方法については、docsフォルダのAPIリファレンスやdemoフォルダページを参照してご使用してください。
>>>>>>> v3_develop


---


<<<<<<< HEAD
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
=======
## サポートブラウザについて
AMPjs VERSION 3系では以下のブラウザサポート対象として開発しています。
>>>>>>> v3_develop

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
<<<<<<< HEAD
=======
リポジトリのディレクトリは、以下の構成になっています。

>>>>>>> v3_develop
```
root/
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


<<<<<<< HEAD
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

=======
---


## 配布ファイル構成について
配布ファイルは、distフォルダに格納していますので、distフォルダ内のファイルを使用してください。  
圧縮版ファイルは、ファイル名にminをつけて同階層保管しています。


---

>>>>>>> v3_develop

##　ファイルインストール

### AMPjsコアファイル
AMPjsコアファイルは、外部依存関係の無く単体で動作し、数多くのユーティリティー機能を提供するコアファイルです。
AMP.$、AMP.cjsのネームスペース以外は、AMPjsのコア機能です。

```
<script src="/dist/js/amp/amp.3.x.x.js"></script>
```
#### AMPjs ユーティリティクラス
AMPjs ユーティリティクラス(/dist/amp/utils/amp.*.js)のディレクトリファイルは、ユーティリティ機能を提供します。  
外部ユーティリティ系ライブラリに依存します。
使用の際は、上記のファイルに加え以下のファイルをインストールしてください。


```
// 外部ライブラリ
<script src="/dist/js/libs/utils.js"></script>

// AMPjsファイル
<script src="/dist/js/amp/utils/amp.{filename}.js"></script>
```



### AMPjs jQueryモジュール
AMPjs jQueryモジュール(AMP.$ ネームスペース)の機能群は、jQueryを使用し豊富な機能を提供します。  
jQueryやjQueryPluginに依存して動作します。  
jQueryコアファイルは、1.8.3以上のバージョンを推奨します。  
以下のファイルをインストールファイルして下さい。

```
// 外部ライブラリ
<script src="/dist/libs/jquery.1.8.3.min.js"></script>
<script src="/dist/libs/jquery.plugins.min.js"></script>

// AMPjsファイル
<script src="/dist/amp/amp.3.x.x.min.js"></script>
<script src="/dist/amp/amp.jquery.plugins.3.x.x.min.js"></script>
<script src="/dist/amp/amp.jquery.3.x.x.min.js"></script>
```


#### AMPjs jQueryユーティリティクラス
AMPjs jQueryユーティリティクラス(/dist/amp/utils/amp.jquery.*.js)のディレクトリファイルは、ユーティリティ機能を提供します。  
jQuery以外の外部ユーティリティ系ライブラリに依存します。
使用の際は、上記のファイルに加え以下のファイルをインストールしてください。


```
// 外部ライブラリ
<script src="/dist/js/libs/utils.js"></script>

// AMPjsファイル
<script src="/dist/js/amp/utils/amp.jquery.{filename}.js"></script>
```


<<<<<<< HEAD
### ▼ amp.createjs.js
準備中
=======
### AMPjs createjsモジュール
現在、作成中です。



---

## 追加予定ライブラリ
```
chroma
createjs
TweenMax
box2dweb
React  
Flux  
```
>>>>>>> v3_develop
