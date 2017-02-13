$( document ).ready(function() {
  var visible_tokens = [];
  var token_min_size = 64;
  var token_max_size = 128;

  var start_x = 1660;

  // TODO: aggregate dynamic values here
  var points = {
    zero:  {left: -338, top: 810},
    one:   {top: 760, left: 162},
    two:   {top: 632, left: 720},
    three: {top: 464, left: 1187},
    four:  {top: 138, left: 1460},
    five:  {top: 50, left: 1660}
  }

  var duration_time = 1000;

//create tokens
jQuery.each(points, function(index) {
  var tokenId = getSelector(index);
  $('<img />', {
        id: "token_" + index,
        class: 'tokens',
        src: 'img/cruise_ship.png'
      }).appendTo('.container');

      positionAndResizeToken(tokenId, this);
});


$('#forward').click(function() {
    jQuery.each(points, function(index) {
      animateForward(index);
    });

   $(this).prop('disabled',true);
   setTimeout(function(){
    $('#forward').removeAttr('disabled');
  }, duration_time);

    addNewEndToken();
});

$('#backward').click(function() {
    jQuery.each(points, function(index) {
      animateBackward(index);
    });

   $(this).prop('disabled',true);
   setTimeout(function(){
    $('#backward').removeAttr('disabled');
  }, duration_time);

    addNewFrontToken();
});

  function animateForward(i) {
    var tokenId = getSelector(i);

    if (i == "zero") {
        $(tokenId).remove();
    }

    if (i == "one") {
        $(tokenId).animate({left: "-=500", top: "+=50"},{
          complete: function() {
              $(tokenId).attr("id", "token_zero");
          },
          duration: duration_time
      });
    }

    if (i == "two") {
      var centerPosition = calculatePosition(points.one);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId)
          },
          complete: function() {
              $(tokenId).attr("id", "token_one");
          },
          duration: duration_time
      });
    }

    if (i == "three") {
      var centerPosition = calculatePosition(points.two);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_two");
          },
          duration: duration_time
      });
    }

    if (i == "four") {
      var centerPositionStart = calculatePosition(points.four);
      var centerPositionEnd = calculatePosition(points.three);
      var bezier = {
          start: {
            x: centerPositionStart.left,
            y: centerPositionStart.top,
            angle: 50,
            length: 0.5
          },
          end: {
            x:centerPositionEnd.left,
            y:centerPositionEnd.top,
            angle: 18,
          }
        }
      $(tokenId).animate({path : new $.path.bezier(bezier)},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_three");
          },
          duration: duration_time
      });
    }

    if (i == "five") {
      var centerPosition = calculatePosition(points.four);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_four");
          },
          duration: duration_time
      });
    }
  }

  function animateBackward(i) {
    var tokenId = getSelector(i);

    if (i == "zero") {
      var centerPosition = calculatePosition(points.one);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_one");
          },
          duration: duration_time
      });
    }

    if (i == "one") {
      var centerPosition = calculatePosition(points.two);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_two");
          },
          duration: duration_time
      });
    }

    if (i == "two") {
      var centerPosition = calculatePosition(points.three);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_three");
          },
          duration: duration_time
      });
    }

    if (i == "three") {
      var centerPositionStart = calculatePosition(points.three);
      var centerPositionEnd = calculatePosition(points.four);
      var bezier = {
          start: {
            x: centerPositionStart.left,
            y: centerPositionStart.top,
            angle: 18,
          },
          end: {
            x:centerPositionEnd.left,
            y:centerPositionEnd.top,
            angle: 50,
            length: 0.5,
          }
        }
      $(tokenId).animate({path : new $.path.bezier(bezier)},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
              $(tokenId).attr("id", "token_four");
          },
          duration: duration_time
      });
    }


    if (i == "four") {
      var centerPosition = calculatePosition(points.five);
      $(tokenId).animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken(tokenId);
              adjustOpacity(tokenId);
          },
          complete: function() {
            $(tokenId).attr("id", "token_five");
          },
          duration: duration_time
      });
    }

    if (i == "five") {
        $(tokenId).remove();
    }
  }

  function getSize(pos) {
    return Math.floor(((start_x - pos) / start_x) * token_max_size) + token_min_size;
  }

  function getOpacity(pos) {

    return (pos <= $('.container').width()) ? 1 - ((pos - 1000) / 1000) : 0;
  }

  function hideToken(tokenId, pos) {
    if (pos <= 65) {
        $(tokenId).hide();
    }
  }

  function positionAndResizeToken(tokenId, pos) {
    newPos = calculatePosition(pos)
    var size = getSize(pos.left);
    var opacity = getOpacity(pos.left);

    $(tokenId).css({ top: newPos.top + 'px', left: newPos.left + 'px', opacity: opacity }).height(size).width(size);
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

  function adjustOpacity(tokenId) {
    pos = $(tokenId).position();
    var opacity = getOpacity(pos.left);
    $(tokenId).css({opacity: opacity});
  }

  function getSelector(i) {
    return "#token_" + i;
  }

  function addNewEndToken() {
    var hiddenPos = calculatePosition(points.five);
    var size = getSize(hiddenPos.left);


      $('<img />', {
            id: "token_five",
            class: 'tokens',
            src: 'img/cruise_ship.png'
          }).appendTo('.container')
            .css({ top: hiddenPos.top + 'px', left: hiddenPos.left + 'px', opacity: 0 })
            .height(size)
            .width(size);
  }

  function addNewFrontToken() {
    var hiddenPos = calculatePosition(points.zero);
    var size = getSize(hiddenPos.left);


      $('<img />', {
            id: "token_zero",
            class: 'tokens',
            src: 'img/cruise_ship.png'
          }).prependTo('.container')
            .css({ top: hiddenPos.top + 'px', left: hiddenPos.left + 'px', opacity: 0 })
            .height(size)
            .width(size);
  }
});
