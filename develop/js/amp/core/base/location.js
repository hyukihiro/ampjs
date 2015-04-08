var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    locationオブジェクトを扱います
  ======================================================================*/


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var url = root.location;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>hashの取得し、#を省いた文字列を配列に格納して返す</h4>
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  AMP.getHash = function(){
    if(url.hash.length){
      return url.hash.split('#').slice(1);
    }
  };


  /**
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object}
   */
  AMP.queryHashMap = function(){
    var map = {};
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
