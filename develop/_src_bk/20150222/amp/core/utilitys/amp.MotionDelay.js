(function(root){

  // 'use strict';

  var MotionDelay, p;


  /*--------------------------------------------------------------------------

  --------------------------------------------------------------------------*/
  MotionDelay = function(motion, duration, len, split){
  };


  //
  // Slied
  // Alternate
  MotionDelay.types = [
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
  MotionDelay.random = function(){
  };




  // order
  MotionDelay.orderIn = function(){};
  MotionDelay.orderOut = function(){};
  MotionDelay.orderSideIn = function(){};
  MotionDelay.orderSideOut = function(){};
  MotionDelay.orderAltIn = function(){};
  MotionDelay.orderAltOut = function(){};






  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.motionDelay = MotionDelay;
  root.amp.motionDelay = new MotionDelay();


}(window));
