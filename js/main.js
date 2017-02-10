$( document ).ready(function() {
  var visible_tokens = [];
  var token_min_size = 64;
  var token_max_size = 128;

  var start_x = 1460;
  var points = {
    1:{top: 768, left: 162},
    2:{top: 642, left: 720},
    3:{top: 476, left: 1187},
    4:{top: 148, left: 1460}
  }

  var duration_time = 5000;
  var token_delay_time = 900;

  var arc_1 = {
    center: [285,185],
        radius: 100,
        start: 1460,
        end: 200,
        dir: -1
  }

//create tokens
jQuery.each(points, function(index) {
  var tokenId = "#token" + index;
    $('<img />', {
          id: tokenId,
          class: 'tokens',
          src: 'img/cruise_ship.png'
        }).appendTo('.container');
        $(tokenId).hide();
  $(tokenId).css({ top: this.top + 'px', left: this.left + 'px' });
  resizeToken(tokenId, this.left);
});





$('#start').click(function() {
  //$("#token1").animate(point_1, 1000);
  /*for (i = 0; i < max_visible_tokens; i++) {
    animateToken(i);
  }*/
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
});
