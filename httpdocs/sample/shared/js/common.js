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


/**
 * <h4>common</h4>
 *
 * @class amp
 * @type {Object}
 */
var common = common || {};


(function($){

	/**
	 * <h4>CONFIG</h4>
	 *
	 * @config
	 * @type {Object}
	 */
	common.CONFIG = {
		$window: $(window),
		breaks : {
			tb: 1023,
			sp: 767
		}
	};


	/**
	 * <h4>表示の状態</h4>
	 * pc, tb, sp
	 *
	 * @property state
	 * @type {String}
	 */
	common.state = null;


	/**
	 * <h4>ページの状態をセットする</h4>
	 *
	 * @private
	 * @method _setState
	 */
	common._setState = (function(){
		common.CONFIG.$window.resize(function(){

			var width = common.CONFIG.$window.width();

			if (width < common.CONFIG.breaks.sp) {
				common.state = 'sp';
			} else if (width < common.CONFIG.breaks.tb) {
				common.state = 'tb';
			} else {
				common.state = 'pc';
			}
		}).trigger('resize');

	}());


	/**
	 * <h4>表示の状態を調べる</h4>
	 *
	 * @method isState
	 * @param  {String}  str デバイスタイプ名
	 * @return {Boolean} 状態と引数名がマッチするか
	 */
	common.isState = function(str){
		return common.state === str;
	};


	/**
	 * <h4>現在のデバイスタイプを返す</h4>
	 *
	 * @method getState
	 * @return {String} 現在のデバイスタイプを返す
	 */
	common.getState = function(){
		return common.state;
	};





	/*----------------------------------------------------------------------
		DOM READY
	----------------------------------------------------------------------*/
	jQuery(function($){
	});



}(jQuery));
