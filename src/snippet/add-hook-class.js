/**
 * AMP JavaScript Library
 *
 * Author: Yoshihito Fujiwara
 * Source: https://bitbucket.org/cutupworks/ampjs
 *
 * @licence MIT Licence
 *
 * Copyright (c) 2015 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function(){
	/**
	 * add hook class
	 * version: 1.1
	 *
	 * html要素にフックとなるクラスを割り当てます。
	 * head内に記述しcssより先に読み込ませます。
	 *
	 * namelist 以下は参考です。参考のクラス全て割り当てないこと。必要最小限のクラスを割り当てること。
	 * osType: ['os-win', 'os-mac', 'os-ios', 'os-android']
	 * deviceType: ['device-pc', 'device-sd', 'device-tb', 'device-sp']
	 * browserType: ['browser-ie', 'browser-old-ie', 'browser-chrome', 'browser-firefox', 'browser-safari', 'browser-mobile-safari', 'browser-android']
	 */
	var ua, html, addClass, preClass;

	ua = navigator.userAgent.toLowerCase();
	html = document.getElementsByTagName('html')[0];

	// ここで必要なクラスの割り振りをします。
	// 以下のように処理内容（クラス割り振った理由）はコメントで残してください。

	// デバイスは	、PCとSPのみで切り分け(タブレットはpc判定)
	addClass = ua.match(/iphone|ipod|android/) && ua.indexOf('mobile') > -1 ? 'device-sp' : 'device-pc';
	// 古いIE（8以下）のハック用
	addClass += ua.indexOf('msie 8') > -1 ? ' browser-old-ie' : '';

	// addClass
	preClass = html.getAttribute('class');
	if(preClass){
		addClass = preClass + ' ' + addClass;
	}
	html.setAttribute('class', addClass);

}());
