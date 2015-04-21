(function(){
	/**
	 * noscript
	 * version: 1.1
	 *
	 * noscriptか判定し、html要素のidを切り替えます。
	 * html要素にフックとなるclassにoff-jsを付加してください
	 * off-jsをon-jsに書き換えます
	 * head内に記述しcssより先に読み込ませます。
	 */
	var html = document.getElementsByTagName('html')[0],
	addClass = html.getAttribute('class').replace('no-js', 'on-js');
	html.setAttribute('class', addClass);

}());
