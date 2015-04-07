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
