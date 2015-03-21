
module AMP {

  /*======================================================================
    locationオブジェクトを扱います
  ======================================================================*/

  // params
  var url = window.location;


  /**
   * hashの取得し、#を省いた文字列を配列に格納して返す
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  export var getHash = function (): any {
    if (url.hash.length) {
      return url.hash.split('#').slice(1);
    }
  };


  /**
   * リクエストパラメータの値を連想配列として取得
   *
   * @static
   * @method queryHashMap
   * @return {Object}
   */
  export var queryHashMap = function (){
    var map,
    array = [],
    param = url.search.slice(1).split('&');

    if (param[0] !== '') {
      var i = 0,
      l = param.length;

      map = {};

      for (; i < l; i += 1) {
        array = param[i].split('=');
        map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
      }
    }

    return map;
  };

}
