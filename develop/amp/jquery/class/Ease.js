/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   *
   * @class AMP.Ease
   * @extends AMP.Ease
   * @constructor
   */
  function Ease(){}

  // AMP.Easeクラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;


  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>jQuery Easing用ネームスペース</h4>
   * <p><a href="http://easings.net/ja" target="_blank">Easing一覧</a></p>
   *
   * @property $
   * @type {Object}
   */
  Ease.$ = {};


  /**
   * <h4>バージョン情報</h4>
   *
   * @property $.VERSION
   * @type {String}
   */
  Ease.$.VERSION = '3.0.0';


  // extend easing
  AMP.each(Ease.COMPLETION, function(item, key){
    $.easing[item] =
    $.easing[key] =
    $.Velocity.Easings[item] =
     $.Velocity.Easings[key] = Ease[item];
  });



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;



}(window, AMP, jQuery));
