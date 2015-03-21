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
