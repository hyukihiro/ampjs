(function(){
	/**
	 * add hook class
	 * version: 1.2.0
	 */
	var ua, html, addClass, preClass;

	ua = navigator.userAgent.toLowerCase();
	html = document.getElementsByTagName('html')[0];

	// デバイスクラス追加
	if(ua.match(/iphone|ipod|android/)){
		addClass = 'device_smartdevice';

		if(ua.indexOf('mobile') > -1){
			addClass += 'device_sp';
		} else {
			addClass += 'device_tablet';
		}
	} else {
		addClass = 'device_pc';
	}

	// ブラウザクラス追加
	if(ua.indexOf('msie 8') > -1){
		addClass += ' browser-ie8';
	} else if(ua.indexOf('msie 9') > -1){
		addClass += ' browser_ie9';
	} else {
		addClass += ' browser_modern';
	}

	// addClass
	preClass = html.getAttribute('class');

	if(preClass){
		addClass = preClass + ' ' + addClass;
	}
	html.setAttribute('class', addClass);

}());
