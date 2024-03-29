/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * <p>jQueryオブジェクトを拡張し、Pluginとして使用します</p>
	 *
	 * @class jQuery
	 */


	/**
	 * <h4>cssをアニメーションqueueで管理します</h4>
	 * <p><a href="../../demo/$.other.html#sec01">DEMO</a></p>
	 *
	 * @method qCss
	 * @param  {String|Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String} val プロパティ値
	 * @return {jQuery}
	 */
	/**
	 * <h4>attrをアニメーションqueueで管理します</h4>
	 * <p><a href="../../demo/$.other.html#sec01">DEMO</a></p>
	 *
	 * @method qAttr
	 * @param  {String|Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String} val プロパティ値
	 * @return {jQuery}
	 */
  $.each({
		css : 'qCss',
		attr: 'qAttr'
	}, function(orig, fix){

		$.fn[fix] = function(prop, val){
			var self = this;
			return self.queue(function(){
				return self[orig](prop, val).dequeue();
			});
		};
	});


	/**
	 * <h4>addClassをアニメーションqueueで管理します</h4>
	 * <p><a href="../../demo/$.other.html#sec01">DEMO</a></p>
	 *
	 * @method qAddClass
	 * @param  {String} val 付与するクラス名
	 * @return {jQuery}
	 */
	/**
	 * <h4>removeClassをアニメーションqueueで管理します</h4>
	 * <p><a href="../../demo/$.other.html#sec01">DEMO</a></p>
	 *
	 * @method qRemoveClass
	 * @param  {Function} val 削除するクラス名
	 * @return {jQuery}
	 */
  $.each({
		addClass   : 'qAddClass',
		removeClass: 'qRemoveClass'
	}, function(orig, fix){

		$.fn[fix] = function(val){
			var self = this;
			return self.queue(function(){
				return self[orig](val).dequeue();
			});
		};
	});


	/**
	 * <h4>コールバック関数をアニメーションqueueで管理します</h4>
	 * <p><a href="../../demo/$.other.html#sec01">DEMO</a></p>
	 *
	 * @method qCall
	 * @param  {Function} fn コールバック関数
	 * @return {jQuery}
	 */
	$.fn.qCall = function(fn){
		var self = this;
		return self.queue(function(){
			fn();
			return self.dequeue();
		});
	};


	/**
	 * <h4>属性値のreplace処理</h4>
	 * <p><a href="../../demo/$.other.html#sec02">DEMO</a></p>
	 *
	 * @method replaceAttr
	 * @param  {String} attr 属性名
	 * @param  {String} del  削除する文字列
	 * @param  {String} add  追加する文字列
	 * @return {jQuery}
	 */
	$.fn.replaceAttr = function(attr, del, add){
		var	val = this.attr(attr);

		if(val){
			add = add ? add : '';
			return this.attr(attr, val.replace(del, add));
		} else {
			return this;
		}
	};


  /**
   * <h4>ファイルの拡張子を取得</h4>
   * <p><a href="../../demo/$.other.html#sec03">DEMO</a></p>
   *
   * @method getExt
   * @param {String} attr 取得属性名
   * @param {Boolean} isQuery 拡張子 + queryで値を返すか 初期値： false
   * @return {String} 拡張子を返す
   */
  $.fn.getExt = function(attr, isQuery){
    var str = this.attr(attr),
    val;

    if(str.indexOf('.') > -1){
      val = str.substring(str.lastIndexOf('.'));

			if(!isQuery){
				val = val.split('?')[0].split('#')[0];
			}
    }

    return val;
  };


}(jQuery));
