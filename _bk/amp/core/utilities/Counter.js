var AMP = AMP || {};


(function(root){


  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>カウントを管理します</h4>
   *
   * @class AMP.Counter
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Number} current 現在値
   * @param {Number} length カウントレングス
   * @param {Boolean} isLoop ループしてカウントをするか
   */
	function Counter(current, length, isLoop){
		this._current = current || 0;
		this._length = length || 0;
		this.isLoop = isLoop || false;
	}

  // 基底クラスを継承
  AMP.inherits(Counter, AMP.BASE_CLASS);

	// prototype
	var p = Counter.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Counter.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Counter';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

	/**
	 * <h4>現在値を返す</h4>
	 *
	 * @method getCount
	 * @return {Number} 現在値を返す
	 */
	p.getCount = function(){
		return this._current;
	};


	/**
	 * <h4>カウントのセット</h4>
	 *
	 * @method setCount
	 * @param {Number} num セットする値
	 * @return {Counter} インスタンス
	 */
	p.setCount = function(num){
		if(num === 0) {
			this._current = num;
		} else if(num < 0){
			this._current = this.isLoop ? this._length - 1 : 0;
		} else if(this._length <= num){
			this._current = this.isLoop ? 0 : this._length - 1;
		} else {
			this._current = num;
		}
		return this;
	};


	/**
	 * <h4>次へ</h4>
	 *
	 * @method next
	 * @return {Counter} インスタンス
	 */
	p.next = function(){
		this.setCount(this._current + 1);
		return this;
	};


	/**
	 * <h4>前へ</h4>
	 *
	 * @method prev
	 * @return {Counter} インスタンス
	 */
	p.prev = function(){
		this.setCount(this._current - 1);
		return this;
	};


	/**
	 * <h4>カウントレングスを設定</h4>
	 *
	 * @method setLength
	 * @param {Number} num カウントレングス
	 * @return {Counter} インスタンス
	 */
	p.setLength = function(num){
		this._length = num;
		this.setCount(this._current);
		return this;
	};


	/**
	 * <h4>カウントレングスの取得</h4>
	 * @method getLength
	 * @return {Number}
	 */
	p.getLength = function(){
		return this._length;
	};


	/**
	 * <h4>Loopモードをセットする</h4>
	 *
	 * @method loop
	 * @param  {Boolean} flag Loopモードのフラグ
	 * @return {Counter} インスタンス
	 */
	p.setLoop = function(flag){
		if(AMP.isBoolean(flag)){
			this.isLoop = flag;
		}
		return this;
	};



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	AMP.Counter = Counter;



}(window));
