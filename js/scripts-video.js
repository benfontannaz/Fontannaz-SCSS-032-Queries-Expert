// -------------------------------------------------
//   Elements into view when scrolled - Animation
// -------------------------------------------------
// ---------- Scott Dowding Scroll function -> START -> Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

$(document).ready(function () {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }
  // If element is scrolled into view, fade it in

  // Services cards slideInRight
  // $(window).scroll(function () {
  //     $(".services .svc-box").each(function () {
  //         if (isScrolledIntoView(this) === true) {
  //         $(this).addClass("animate__animated", "animate__fadeInRight").css("visibility", "visible");
  //         }
  //     });
  // });

  /* Video Promo - Text Animation configuration */

  $(window).scroll(function () {
    $(".videoClick .spacer7").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("zoomIn").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer5").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInRight").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer8").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInLeft").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer9").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInLeft").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer10").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInUp").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer1").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("slideInRight").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer2").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("slideInRight").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".div-spacer3 .spacer3").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("bounceInRight").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer4").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("zoomIn").css("visibility", "visible");
      }
    });
  });

  /* Video Promo "POSTER" - Text Animation configuration */

  $(window).scroll(function () {
    $(".videoClicksm .spacer7sm").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("zoomIn").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer5sm").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInRight").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer8sm").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInLeft").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer9sm").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInLeftBig").css("visibility", "visible");
      }
    });
  });

  $(window).scroll(function () {
    $(".videoMessage .spacer10sm").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("fadeInUp").css("visibility", "visible");
      }
    });
  });
});

// ----------- Scott Dowding Scroll function -> END
