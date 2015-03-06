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


(function(root){
	/**
	 * hasCache
	 * version: 1.1
	 *
	 * sessionStorageもしくはlocalStorageに指定キーに値があるか判定します。
	 * html要素にクラスを割り当てたり、パラメーターを引き渡すのに使います。
	 * head内に記述しcssより先に読み込ませます。
	 */
	if(('sessionStorage' in root) && ('localStorage' in root)){

		var html, hasLoaded, addClass, preClass;

		html = document.getElementsByTagName('html')[0];

		// hasValue
		hasLoaded = sessionStorage.getItem('loaded');
		addClass = hasLoaded ? 'loaded' : '';

		// add Storage ここでStorageに追加する場合は、以下コメントを外してください
		// sessionStorage.setItem('loading', new Date());

		// addClass
		preClass = html.getAttribute('class');
		if(preClass){
			addClass = preClass + ' ' + addClass;
		}
		html.setAttribute('class', addClass);

		// export
		root.common = root.common || {};
		root.common.loaded = hasLoaded ? true : false;
	}

}(window));
