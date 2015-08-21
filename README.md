# AMPjs JavaScript Library


[TOC]


---


## 概要
AMPjsは、 MIT ライセンスの元で配布しています。  
フロントエンド開発を効率よくする為に、豊富な機能を備えています。  
AMPjsは、大きく分けて3つのモジュールに分けて設計しています。

1. 外部依存関係なく、ユーティリティ機能を提供するコア機能群
1. jQueryに依存する、AMP.$モジュール
1. createjsに依存するAMP.cjsモジュール (現在、作成中)

AMPjsの使用方法については、APIリファレンス(docs)、DEMOページを参照してご使用してください。


---


## サポートブラウザについて
AMPjs VERSION 3.x系では以下のブラウザサポート対象として開発しています。

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
リポジトリのディレクトリは、以下の構成になっています。

```
root/
├ _bk/         (一時バックアップデータ)
├ demo/        (DEMOページ)
├ develop/     (開発コード)
├ dist/        (配布コード)
├ docs/        (APIリファレンス)
├ test/        (開発時用テストコード)
├ gulpfile.js  (gulpタスクファイル)
├ LICENCE      (ライセンス文言)
├ README.md    (本ファイル)
└ yuidoc.json  (yuidoc設定ファイル)
```


---------------------------------------------


## 配布ファイル構成について
配布ファイルは、distフォルダに格納していますので、そちらを使用してください。  
圧縮版ファイルは、ファイル名にminをつけて同階層保管しています。


---------------------------------------------


## ファイルインストール

### AMPjsコアファイル
AMPjsコアファイルは、外部依存関係の無く単体で動作し、数多くのユーティリティー機能を提供するコアファイルです。
AMP.$、AMP.cjsのネームスペース以外は、AMPjsのコア機能です。

```
<script src="/dist/js/amp/amp.3.x.x.js"></script>
```


---------------------------------------------


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


---------------------------------------------


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


---------------------------------------------


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


---------------------------------------------


### AMPjs createjsモジュール
現在、作成中です。



---------------------------------------------


## アップデート予定
```
■ アップデート
$.stream (内部処理の最適化)
AMP.inherits (内部処理の最適化)
AMP.$.Render (Ajax機能削除 AMP.$.AjaxRenderに移行)


■ 追加
AMP.$.LiquedSlider
AMP.$.AjaxRender

```
1. ~~AMP.$.Modal~~
1. ~~AMP.$.Tab~~
1. ~~AMP.$.Accordion~~
1. ~~AMP.$.Matrix~~
1. ~~AMP.$.Skew~~
1. ~~AMP.$.Roll~~





---------------------------------------------


## 追加予定ライブラリ
```
chroma
createjs
TweenMax
box2dweb
React  
Flux  
```
