var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    locationオブジェクト
  ======================================================================*/

  /**
   * <h4>locationオブジェクト</h4>
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
   * <h4>location.hashの取得し、配列にして返す</h4>
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
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   * パラメータがない場合、空のオブジェクトを返す
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



}(window));
