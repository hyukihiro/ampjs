(function($){

	// 'use strict';


	/**
	 * <h3>jQueryオブジェクト拡張</h3>
	 * VERSION: 1.0
	 *
	 * @class jQuery
	 */


	/*--------------------------------------------------------------------------
		@sequence
	--------------------------------------------------------------------------*/
	/**
	 * <h4>コールバック関数管理 </h4>
	 * Deferred resolve通知を受けたら次の関数へ移る
	 *
	 * @static
	 * @method sequence
	 * @param  {Functions or Array} arguments 関数か関数を格納した配列を渡す
	 * @return {jQuery.Deferred}
	 */
	$.sequence = function(){
		/*jslint loopfunc: true */
		var $def = new $.Deferred(),
		$Def = new $.Deferred(),
		callbacks,
		piped;

		if($.isArray(arguments[0])){
			callbacks = arguments[0];
		} else {
			callbacks = [].slice.apply(arguments);
		}

		callbacks[callbacks.length] = $def.resolve;

		var i = 0,
		l = callbacks.length;

		for(; i < l; i += 1){
			if($.isFunction(callbacks[i])){
				piped = (piped ? piped : $Def).pipe($.proxy(function(){
					return this();
				}, callbacks[i])).fail($def.reject);
			}
		}

		$Def.resolve();

		return $def.promise();
	};


  /**
   * <h4>引数に渡した関数を縦列処理します</h4>
   * 実行した関数の戻り値は、次の関数の引数とproglessに渡します。
   *
   * @static
   * @method stream
   * @param {Function} argments 関数、もしくは配列に格納した関数
   * @return {jQuery.Deferred}
   */
  $.stream = function(){
    var $defer = new $.Deferred(),
    count = 0,
    callbacks;

    if($.isArray(arguments[0])){
      callbacks = arguments[0];
    } else {
      callbacks = [].slice.apply(arguments);
    }

    callbacks[callbacks.length] = $defer.resolve;

    // callbacksを再帰的に縦列処理する
    var stream = function(fn, args){
      $.when(fn(args))
      .fail($defer.reject)
      .done(function(returns){
        $defer.notify(returns);
        count += 1;
        if(count !== callbacks.length){
          stream(callbacks[count], returns);
        }
      });
    };

    stream(callbacks[count]);

    return $defer.promise();
  };



}(jQuery));
