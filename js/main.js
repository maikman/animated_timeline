$( document ).ready(function() {
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
    five:  {top: 50, left: start_x}
  }

  var duration_time = 1000;
  var runs = 1;

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
   animateForward();
});

$('#backward').click(function() {
    animateBackward();
});

$('#multiple_forward').click(function() {
  animateForward(3);
});

  function animateForward(i = 1) {

        // token zero
        $("#token_zero").remove();


        //token one
        $("#token_one").animate({left: "-=500", top: "+=50"},{
          complete: function() {
              $("#token_one").attr("id", "token_zero");
          },
          duration: duration_time
      });


      //token two
      var centerPosition = calculatePosition(points.one);
      $("#token_two").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_two")
          },
          complete: function() {
              $("#token_two").attr("id", "token_one");
          },
          duration: duration_time
      });

      //token three
      var centerPosition = calculatePosition(points.two);
      $("#token_three").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_three");
              adjustOpacity("#token_three");
          },
          complete: function() {
              $("#token_three").attr("id", "token_two");
          },
          duration: duration_time
      });

      //token four
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

        //token four
      $("#token_four").animate({path : new $.path.bezier(bezier)},
        {
          step: function(now, fx) {
              resizeToken("#token_four");
              adjustOpacity("#token_four");
          },
          complete: function() {
              $("#token_four").attr("id", "token_three");
          },
          duration: duration_time
      });


      //token five
      var centerPosition = calculatePosition(points.four);
      $("#token_five").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_five");
              adjustOpacity("#token_five");
          },
          complete: function() {
              $("#token_five").attr("id", "token_four");
              if (runs < i) {
                runs++;
                setTimeout(function(){
                 animateForward(i);
               }, 1);
             }
             addNewEndToken();
          },
          duration: duration_time
      });
  }

  function animateBackward(i = 1) {

    // token four
    var centerPosition = calculatePosition(points.five);
    $("#token_four").animate({left: centerPosition.left, top: centerPosition.top},
      {
        step: function(now, fx) {
            resizeToken("#token_four");
            adjustOpacity("#token_four");
        },
        complete: function() {
          $("#token_four").remove();
        },
        duration: duration_time
    });


    // token three
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
    $("#token_three").animate({path : new $.path.bezier(bezier)},
      {
        step: function(now, fx) {
            resizeToken("#token_three");
            adjustOpacity("#token_three");
        },
        complete: function() {
            $("#token_three").attr("id", "token_four");
        },
        duration: duration_time
    });


      // token two
      var centerPosition = calculatePosition(points.three);
      $("#token_two").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_two");
              adjustOpacity("#token_two");
          },
          complete: function() {
              $("#token_two").attr("id", "token_three");
          },
          duration: duration_time
      });


      // token one
      var centerPosition = calculatePosition(points.two);
      $("#token_one").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_one");
              adjustOpacity("#token_one");
          },
          complete: function() {
              $("#token_one").attr("id", "token_two");
          },
          duration: duration_time
      });

      // token zero
      var centerPosition = calculatePosition(points.one);
      $("#token_zero").animate({left: centerPosition.left, top: centerPosition.top},
        {
          step: function(now, fx) {
              resizeToken("#token_zero");
              adjustOpacity("#token_zero");
          },
          complete: function() {
              $("#token_zero").attr("id", "token_one");
              if (runs < i) {
                runs++;
                setTimeout(function(){
                 animateBackward();
               }, 1);
             }
              addNewFrontToken();
          },
          duration: duration_time
      });


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
