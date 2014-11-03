;(function($){

	// 'use strict';


	/**
	 * <h3>jQueryプロタイプオブジェクト拡張</h3>
	 * version: 0.2
	 *
	 * @class jQuery.fn
	 * @module jQuery.fn
	 */


	/**
	 * <h4>cssをアニメーションqueueで管理します</h4>
	 *
	 * @method qCss
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
	 * @return {jQuery}
	 */
	/**
	 * <h4>attrをアニメーションqueueで管理します</h4>
	 *
	 * @method qAttr
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
	 * @return {jQuery}
	 */
  $.each({
		css : 'qCss',
		attr: 'qAttr'
	}, function(orig, fix){

		$.fn[fix] = function(prop, val, callback){
			var self = this;

			if($.isFunction(val)){
				callback = val;
				val = undefined;
			}

			return self.queue(function(){
				self[orig](prop, val).dequeue();
				if($.isFunction(callback)){
					callback(self);
				}
			});
		};
	});


	/**
	 * <h4>addClassをアニメーションqueueで管理します</h4>
	 *
	 * @method qAddClass
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
	 * @return {jQuery}
	 */
	/**
	 * <h4>removeClassをアニメーションqueueで管理します</h4>
	 *
	 * @method qRemoveClass
	 * @param  {String} prop クラス名
	 * @param  {Function} val コールバック関数
	 * @return {jQuery}
	 */
  $.each({
		addClass   : 'qAddClass',
		removeClass: 'qRemoveClass'
	}, function(orig, fix){

		$.fn[fix] = function(val, callback){
			var self = this;
			return self.queue(function(){
				self[orig](val).dequeue();
				if($.isFunction(callback)){
					callback(self);
				}
			});
		};
	});


	/**
	 * <h4>コールバック関数をアニメーションqueueで管理します</h4>
	 *
	 * @method qCall
	 * @param  {Function} fn コールバック関数
	 * @return {jQuery}
	 */
	$.fn.qCall = function(fn){
		var self = this;
		return self.queue(function(){
			fn();
			self.dequeue();
		});
	};


	/**
	 * <h4>属性値のreplace処理</h4>
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
   *
   * @static
   * @method getExt
   * @param  {String} attr 取得属性名
   * @return {String} 拡張子を返す
   */
  $.fn.getExt = function(attr){
    var val = this.attr(attr);
    if(val.indexOf('.') > -1){
      // var last = val.lastIndexOf('?') > -1 ? val.lastIndexOf('?') : val.length;
      // return val.substring(val.lastIndexOf('.'), val.length);
      return val.substring(val.lastIndexOf('.'));
    }
  };



}(jQuery));
