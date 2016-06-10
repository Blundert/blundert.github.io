$(document).ready(function(){
  var $elem = $('.center-my-face');

  MotionUI.animateIn($elem, 'scale-in-up', function() {
    console.log('Transition finished!');
  });
});
