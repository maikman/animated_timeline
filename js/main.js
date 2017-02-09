$( document ).ready(function() {
  var visible_tokens = [];
  var max_visible_tokens = 4;
  var token_min_size = 64;
  var token_max_size = 128;

  var start_x = 1460;
  var position_1 = start_x * 0.116;
  var position_2 = start_x * 0.517;
  var position_3 = start_x * 0.819;
  var position_4 = start_x * 0.881;

  var duration_time = 5000;
  var token_delay_time = 900;

  var bezier_params = {
      start: {
        x: start_x,
        y: 100,
        angle: 20,
        length: 0.3
      },
      end: {
        x:60,
        y:670,
        angle: 18,
        length: 1.15
      }
    }

//create tokens
for (i = 0; i < max_visible_tokens; i++) {
    $('<img />', {
          id: 'token' + i,
          class: 'tokens',
          src: 'img/cruise_ship.png'
        }).appendTo('.container');
}

$('#start').click(function() {
  for (i = 0; i < max_visible_tokens; i++) {
    animateToken(i);
  }
});

  function animateToken(i) {
    var tokenId = "#token" + i;
    var delayTime = token_delay_time * i;

    $(tokenId).delay(delayTime).animate({path : new $.path.bezier(bezier_params)},
    {
        step: function(now, fx) {
            $(tokenId).show();
            var pos = $(tokenId).position();

            resizeToken(tokenId, pos.left);
            hideToken(tokenId, pos.left);

            stopAtPosition(tokenId, pos.left);

            $('#forward').click(function() {
              $(tokenId).animate();
            });

            /*$('#stop').click(function() {
              $(tokenId).stop();
            });*/
        },
        duration: duration_time
    }
   );
  }

  function getSize(pos) {
    return Math.floor(((start_x - pos) / start_x) * token_max_size) + token_min_size;
  }

  function hideToken(tokenId, pos) {
    if (pos <= 65) {
        $(tokenId).hide();
    }
  }

  function resizeToken(tokenId, pos) {
    var size = getSize(pos);
    $(tokenId).height(size);
    $(tokenId).width(size);
  }

  function stopAtPosition(tokenId, pos) {
    switch (true) {
      case ("#token" + 0 == tokenId && pos <= position_1) :
         $(tokenId).stop();
      case ("#token" + 1 == tokenId && pos <= position_2) :
         $(tokenId).stop();
      case ("#token" + 2 == tokenId && pos <= position_3) :
         $(tokenId).stop();
      case ("#token" + 3 == tokenId && pos <= position_4) :
         $(tokenId).stop();
   }
  }
});
