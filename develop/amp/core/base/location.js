/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    locationオブジェクト
  ======================================================================*/

  /**
   * <h4>locationオブジェクト</h4>
   * <p><a href="../../demo/AMP.Base.html#location">DEMO</a></p>
   *
   * @class AMP.Location
   */



  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var url = root.location;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>hashを取得し、配列にして返す</h4>
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  AMP.getHash = function(){
    var ary = url.hash.split('#').slice(1);
    if(ary.length){
      AMP.each(ary, function(item, i){
        ary[i] = '#' + item;
      });
    }
    return ary;
  };


  /**
   * <h4>リクエストパラメータ値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object}
   */
  AMP.queryHashMap = function(){
    var map = {},
    array = [],
    param = url.search.slice(1).split('&');

    if(param[0] !== ''){
      var i = 0,
      l = param.length;

      for(; i < l; i += 1){
        array = param[i].split('=');
        map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
      }
    }

    return map;
  };


}(window, AMP));
