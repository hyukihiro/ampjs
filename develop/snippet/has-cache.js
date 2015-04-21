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
