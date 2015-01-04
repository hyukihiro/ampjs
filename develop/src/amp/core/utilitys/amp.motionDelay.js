(function(root){

  // 'use strict';

  var motionDelay, p;


  /*--------------------------------------------------------------------------

  --------------------------------------------------------------------------*/
  motionDelay = function(motion, duration, len, split){
  };


  //
  // Slied
  // Alternate
  motionDelay.types = [
    // random
    'random',
    // order
    'orderIn',
    'orderOut',
    'orderSideIn',
    'orderSideOut',
    'orderAltIn',
    'orderAltOut',
    // col
    'colIn',
    'colOut',
    'colSideIn',
    'colSideOut',
    'colAltIn',
    'colAltOut',
    // row
    'rowIn',
    'rowOut',
    'rowSideIn',
    'rowSideOut',
    'rowAltIn',
    'rowAltOut',
    // circle
    'circleIn',
    'circleOut',
    'circleSideIn',
    'circleSideOut',
    'circleAltIn',
    'circleAltOut',
    // diagonal
    'diaIn',
    'diaOut',
    'diaSideIn',
    'diaSideOut',
    'diaAltIn',
    'diaAltOut',
    // reDiagonal
    'rediaIn',
    'rediaOut',
    'rediaSideIn',
    'rediaSideOut',
    'rediaAltIn',
    'rediaAltOut',
    // rotate !not supported
    'rotateIn',
    'rotateOut',
    'rotateSideIn',
    'rotateSideOut',
    'rotateAltIn',
    'rotateAltOut'
  ];


  // random
  motionDelay.random = function(){
  };




  // order
  motionDelay.orderIn = function(){};
  motionDelay.orderOut = function(){};
  motionDelay.orderSideIn = function(){};
  motionDelay.orderSideOut = function(){};
  motionDelay.orderAltIn = function(){};
  motionDelay.orderAltOut = function(){};






  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.motionDelay = motionDelay;


}(window));
