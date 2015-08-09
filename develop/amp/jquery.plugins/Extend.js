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


	/*--------------------------------------------------------------------------
		@sequence
	--------------------------------------------------------------------------*/
	/**
	 * <h4>縦列・並列処理の管理</h4>
	 * <p>Deferred resolve通知を受けたら次の関数へ移ります</p>
	 *
	 * @static
	 * @method sequence
	 * @param  {Functions|Array} arguments 関数か関数を格納した配列を渡す
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
   * <h4>縦列・並列処理の管理</h4>
   * <p>実行した関数の戻り値は、次の関数の引数とproglessに渡します</p>
   *
   * @static
   * @method stream
   * @param {Function} argments 関数、もしくは配列に格納した関数
   * @return {jQuery.Deferred}
   */
  $.stream = function(){
  	var slice = Array.prototype.slice;
    var $defer = new $.Deferred(),
    count = 0,
    callbacks = $.isArray(arguments[0]) ? callbacks : slice.call(arguments);

    callbacks.push($defer.resolve);
    stream();

    // callbacksを再帰的に縦列処理する
		function stream(){
			$.when.call(null, callbacks[count].apply(null, arguments))
			.fail($defer.reject)
			.done(function(){
				$defer.notify.call(null, arguments);
				count += 1;
				if(count < callbacks.length){
					stream.apply(null, arguments);
				}
			});
    }

    return $defer.promise();
  };


}(jQuery));