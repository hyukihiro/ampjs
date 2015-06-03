# AMP JavaScript Library

DATE: 2015.06.03

---


## Summary
後日書きます。


---

## Support Browser
```
InternetExplorer 8++
FireFox (windows & Mac) 最新版 2015.6現在
Chrome (windows & Mac) 最新版 2015.6現在
Mac Safari 8++
ios Safari 7++
Android Browser 4.0++
```

---

## Directory
```
├ _bk/         (一時バックアップデータ)
├ develop/     (開発コード)
├ dist/        (配布コード)
├ docs/        (yuidoc / AMP.jsリファレンス)
├ test/        (開発時用テストコード)
├ gulpfile.js  (gulpタスクファイル)
├ LICENCE      (ライセンス文言)
├ README.md    (本ファイル)
└ yuidoc.json  (yuidoc設定ファイル)
```

---

## For Use JS File
distフォルダ内のファイルを使用します。  
以下、distフォルダ内の説明。  
minファイル版は、同階層同一ファイル名にminをつけています。

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


---

## Add Planned Library
```
React  
Flux  
RxJS
BaconJS
```
