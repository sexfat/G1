    /*燈箱 -- 新手教學*/
    $("#tutorial").click(function () {
      $(".lightCover").show();
      $("#tutorialBox").show().animate({
        left: "50%"
      });
    });
    $('.closeLight').click(function () {
      $('.lightCover').hide();
      $("#tutorialBox").hide().animate({
        left: "-50%"
      });
    });
    $('.lightCover').click(function () {
      $(this).hide();
      $("#tutorialBox").hide().animate({
        left: "-50%"
      });
    });
    $('#tutorialBox').click(function (e) {
      e.stopPropagation();
    });

    /*燈箱 -- 輪播*/
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    })
  