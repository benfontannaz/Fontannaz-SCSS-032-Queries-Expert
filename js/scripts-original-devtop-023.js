/*-----------------------------------------------------------------------------------

    Theme Name: Fontannaz Consulting
    Description: Fontannaz Consulting Services 
    Author: Fontannaz Benjamin
    Version: 1.0
        
    ---------------------------------- */

$(function () {
  "use strict";
  var wind = $(window);
  $("#preloader").fadeOut("normall", function () {
    $(this).remove();
  });

  $.scrollIt({
    upKey: 38,
    downKey: 40,
    easing: "swing",
    scrollTime: 600,
    activeClass: "active",
    onPageChange: null,
    topOffset: -70,
  });

  wind.on("scroll", function () {
    if (wind.width() > 600) {
      if (wind.scrollTop() > 600) {
        $("#back-to-top").addClass("reveal");
      } else {
        $("#back-to-top").removeClass("reveal");
      }
    }
  });

  $("#back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  if ($("#sidebar_toggle").length) {
    $("body").addClass("sidebar-menu");
    $("#sidebar_toggle").on("click", function () {
      $(".sidebar-menu").toggleClass("active");
      $(".side-menu").addClass("side-menu-active"),
        $("#close_sidebar").fadeIn(700);
    }),
      $("#close_sidebar").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
          $(this).fadeOut(200),
          $(".sidebar-menu").removeClass("active");
      }),
      $("#btn_sidebar_colse").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
          $("#close_sidebar").fadeOut(200),
          $(".sidebar-menu").removeClass("active");
      });
  }

  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar"),
      navbloglogo = $(".blog-nav .logo> img"),
      darkbg = $(".bg-black .logo> img"),
      whitebg = $(".bg-white .logo> img"),
      lightbg = $(".bg-light-gray .logo> img"),
      scrollbg = $(".bg-black-scroll .logo> img"),
      logo = $(".navbar .logo> img");
    if (bodyScroll > 100) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "img/logo-dark.svg");
      darkbg.attr("src", "img/logo-light.svg");
      whitebg.attr("src", "img/logo-dark.svg");
      scrollbg.attr("src", "img/logo-light.svg");
      lightbg.attr("src", "img/logo-dark.svg");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "img/logo-light.svg");
      lightbg.attr("src", "img/logo-dark.svg");
      navbloglogo.attr("src", "img/logo-dark.svg");
    }
  });

  var windowsize = wind.width();
  if (windowsize <= 991) {
    $(".navbar-nav .nav-link").on("click", function () {
      $(".navbar-collapse.show").removeClass("show");
    });
  }
  wind.on("scroll", function () {
    $(".skills-progress span").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({ width: myVal });
      }
    });
  });

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  $(".testimonials .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 15,
    autoplay: true,
    smartSpeed: 500,
  });

  $(".gallery").magnificPopup({
    delegate: ".popimg",
    type: "image",
    gallery: { enabled: true },
  });
  if ($(".numbers").length !== 0) {
    $(".numbers").appear(function () {
      $(".count").countTo({
        speed: 4000,
        refreshInterval: 60,
        formatter: function (value, options) {
          return value.toFixed(options.decimals);
        },
      });
    });
  }

  $(window).on("load", function () {
    var wind = $(window);
    wind.stellar();
    $(".gallery").isotope({ itemSelector: ".items" });
    var $gallery = $(".gallery").isotope({});
    $(".filtering").on("click", "span", function () {
      var filterValue = $(this).attr("data-filter");
      $gallery.isotope({ filter: filterValue });
    });
    $(".filtering").on("click", "span", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  });

  $(window).resize(function (event) {
    setTimeout(function () {
      SetResizeContent();
    }, 500);
    event.preventDefault();
  });
  function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $(window).height();
    element.css("min-height", $minheight);
  }
  function SetResizeContent() {
    fullScreenHeight();
  }
  SetResizeContent();
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 500,
    });
    if ($(".countdown").length !== 0) {
      $(".countdown").countdown({ date: "01 Jan 2021 00:01:00", format: "on" });
    }
  });
});

// ------------------------------------------
//   On scroll Animations
// ------------------------------------------

// ----------- function wScroll -> START -> function wScroll to know how far from the Top the scroll currently is
// $(window).scroll(function(){
//
//   var wScroll = $(this).scrollTop();
//
//   console.log(wScroll)
//
// });

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  // scroll speed divided by 40
  $(".ben-only").css({
    transform: "translate(0px, -" + wScroll / 80 + "%)",
  });

  // ------------------------------------------
  //   Services Grid - Animation
  // ------------------------------------------
  // start counting scrolling when class ".services" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".services" is visible in the viewport

  if (wScroll > $(".services").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    console.log("Hi");

    //for each .svc-box in the .svc-parent class
    $(".svc-parent .svc-box").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".svc-parent .svc-box").eq(i).addClass("is-showing");
        // }, 150 * (i+1));
      }, 700 * Math.exp(i * 0.14) - 700);
    });
  }

  // ------------------------------------------
  //   About Me - Certifications Animation
  // ------------------------------------------
  // start counting scrolling when class ".about-scroll-5" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".about-scroll-5" is visible in the viewport
  // ------------------------------------------

  if (wScroll > $(".about-scroll-5").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .cert in the .certified-logo class
    $(".certified-logo .cert").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".certified-logo .cert").eq(i).addClass("is-showing");
        // }, 150 * (i+1));
      }, 700 * Math.exp(i * 0.14) - 700);
    });
  }

  // ------------------------------------------
  //   About Me - Professional Studies Animation
  // ------------------------------------------
  // start counting scrolling when class ".about-scroll-6" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".about-scroll-6" is visible in the viewport

  if (wScroll > $(".about-scroll-6").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .pro-studies in the .about-scroll-7 class
    $(".about-scroll-7 .pro-studies").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".about-scroll-7 .pro-studies").eq(i).addClass("is-showing");
      }, 50 * (i + 1));
      // }, (700 * (Math.exp(i * 0.14))) - 700);
    });
  }

  // ------------------------------------------
  //   About Me - My Tools Animation
  // ------------------------------------------
  // start counting scrolling when class ".about-scroll-8" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".about-scroll-8" is visible in the viewport

  if (wScroll > $(".about-scroll-8").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".about-scroll-9 .tools").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".about-scroll-9 .tools").eq(i).addClass("is-showing");
      }, 20 * (i + 1));
      // }, (700 * (Math.exp(i * 0.14))) - 700);
    });
  }

  // ------------------------------------------
  //   PROJECTS - GRID - Projects Animation
  // ------------------------------------------
  // start counting scrolling when class ".services" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".services" is visible in the viewport

  if (wScroll > $(".projects").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".gallery .items").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".gallery .items").eq(i).addClass("is-showing");
        // }, 150 * (i+1));
      }, 700 * Math.exp(i * 0.14) - 700);
    });
  }

  // start counting scrolling when class ".portfolio" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".portfolio" is visible in the viewport

  if (wScroll > $(".portfolio").offset().top - $(window).height() / 1.2) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".gallery .items").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".gallery .items").eq(i).addClass("is-showing");
        // }, 150 * (i+1));
      }, 700 * Math.exp(i * 0.14) - 700);
    });
  }

  // ------------------------ Animation on Scroll  -------------------------
  // function added at CCS var line
  // ------------------------------------------

  // ------------------------------------------
  // Timeline elements on scroll animation SMALL ONLY
  // ------------------------------------------

  if (wScroll > $(".time-scroll-0-sm").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-0-sm").offset().top + $(window).height() - 430
    );

    $(".time-scroll-1-sm").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  if (wScroll > $(".time-scroll-1-sm").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-1-sm").offset().top + $(window).height() - 700
    );

    $(".time-scroll-2-sm").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  if (wScroll > $(".time-scroll-2-sm").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-2-sm").offset().top + $(window).height() - 700
    );

    $(".time-scroll-3-sm").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  if (wScroll > $(".time-scroll-3-sm").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-3-sm").offset().top + $(window).height() - 700
    );

    $(".time-scroll-4-sm").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  if (wScroll > $(".time-scroll-4-sm").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-4-sm").offset().top + $(window).height() - 700
    );

    $(".time-scroll-5-sm").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  // ------------------------------------------
  // Timeline elements on scroll animation MEDIUM & UP
  // ------------------------------------------

  if (wScroll > $(".time-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-0").offset().top + $(window).height() - 700
    );

    $(".time-scroll-1").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  if (wScroll > $(".time-scroll-1").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-1").offset().top + $(window).height() - 900
    );

    $(".time-scroll-2").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  if (wScroll > $(".time-scroll-2").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-2").offset().top + $(window).height() - 900
    );

    $(".time-scroll-3").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  if (wScroll > $(".time-scroll-3").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-3").offset().top + $(window).height() - 900
    );

    $(".time-scroll-4").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  if (wScroll > $(".time-scroll-4").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-4").offset().top + $(window).height() - 900
    );

    $(".time-scroll-5").css({
      transform:
        "translate(" +
        Math.abs(offset) +
        "px, " +
        Math.abs(offset * 0.1) +
        "px)",
    });
  }

  // ------------------------------------------
  //  About Me Apple Bundle Mockup animation SMALL DEVIDES ONLY
  // ------------------------------------------

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 320
    );

    $(".about-scroll-1-sm").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.01) + "px)",
    });
  }

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 340
    );

    $(".about-scroll-2-sm").css({
      transform: "translate(" + offset * -0.7 + "px, " + offset * 0.2 + "px)",
    });
  }

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 360
    );

    $(".about-scroll-3-sm").css({
      transform: "translate(" + offset * -0.75 + "px, " + offset * 0.5 + "px)",
    });
  }

  // ------------------------------------------
  //  About Me Apple Bundle Mockup animation MEDIUM and UP
  // ------------------------------------------

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 860
    );

    $(".about-scroll-1").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 880
    );

    $(".about-scroll-2").css({
      transform: "translate(" + offset * -0.7 + "px, " + offset * 0.2 + "px)",
    });
  }

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 900
    );

    $(".about-scroll-3").css({
      transform: "translate(" + offset * -0.75 + "px, " + offset * 0.5 + "px)",
    });
  }

  // ------------------------------------------
  //  About Me hand with iPhone Mockup animation
  // ------------------------------------------

  if (wScroll > $(".about-scroll-0").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".about-scroll-0").offset().top + $(window).height() - 540
    );

    $(".about-scroll-4").css({
      transform: "translate(" + offset * -0.2 + "px, " + offset * -0.1 + "px)",
    });
  }
});

// ----------- function linked to the wScroll -> END

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
        $(this).addClass("fadeInLeft").css("visibility", "visible");
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

// --------- Animate.css -> START -> add required class and remove classes after animation ends ---------------

const element = document.querySelector(".ben-only");
element.classList.add("animated", "fadeInLeft");

element.addEventListener("animationend", function () {
  element.classList.remove("animated", "fadeInLeft");
});

// --------- Animate.css -> END

// Toggle Tooltip for the header phone & xs-sm-contact phone addy and email pre-footer START -------

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Toggle Tooltip for the header phone & xs-sm-contact phone addy and email pre-footer END -------
