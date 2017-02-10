$( document ).ready(function() {
  var visible_tokens = [];
  var token_min_size = 64;
  var token_max_size = 128;

  var start_x = 1460;
  var points = {
    one:   {top: 760, left: 162},
    two:   {top: 632, left: 720},
    three: {top: 464, left: 1187},
    four:  {top: 138, left: 1460}
  }

  var duration_time = 1000;
  var token_delay_time = 900;



//create tokens
jQuery.each(points, function(index) {
  var tokenId = "#token_" + index;
    $('<img />', {
          id: "token_" + index,
          class: 'tokens',
          src: 'img/cruise_ship.png'
        }).appendTo('.container');

        positionAndResizeToken(tokenId, this);
});





$('#start').click(function() {
  jQuery.each(points, function(index) {
    animateToken(index);
  });
});

  function animateToken(i) {
    var tokenId = "#token_" + i;

  if (i == "one") {
      $(tokenId).animate({left: "-=500", top: "+=50"}, duration_time);
  }

  if (i == "two") {
    var centerPosition = calculatePosition(points.one);
    $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
      {
        step: function(now, fx) {
            resizeToken(tokenId)
        },
        duration: duration_time
    });
  }

  if (i == "three") {
    var centerPosition = calculatePosition(points.two);
    $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
      {
        step: function(now, fx) {
            resizeToken(tokenId)
        },
        duration: duration_time
    });
  }

  if (i == "four") {
    var bezier = {
      center: [100,100],
          radius: 250,
          start: 180,
          end: 190,
          dir: 1
    }
    var centerPosition = calculatePosition(points.three);
    $(tokenId).animate({path : new $.path.bezier(bezier)},
      {
        step: function(now, fx) {
            resizeToken(tokenId)
        },
        duration: duration_time
    });
  }

    /*$(tokenId).animate({path : new $.path.arc(arc_1)},
    {
        step: function(now, fx) {

        },
        duration: duration_time
    }
  );*/
  }

  function getSize(pos) {
    return Math.floor(((start_x - pos) / start_x) * token_max_size) + token_min_size;
  }

  function hideToken(tokenId, pos) {
    if (pos <= 65) {
        $(tokenId).hide();
    }
  }

  function positionAndResizeToken(tokenId, pos) {
    var size = getSize(pos.left);
    var left = pos.left - size / 2;
    var top = pos.top - size / 2;
    $(tokenId).css({ top: top + 'px', left: left + 'px' }).height(size).width(size);
  }

  function calculatePosition(point) {
    var size = getSize(point.left);
    var left = point.left - size / 2;
    var top = point.top - size / 2;

    return {left: left, top: top};
  }

  function resizeToken(tokenId) {
    pos = $(tokenId).position();
    var size = getSize(pos.left);
    $(tokenId).height(size).width(size);
  }
});
