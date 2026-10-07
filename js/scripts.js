/*-----------------------------------------------------------------------------------

    Theme Name: Fontannaz Consulting
    Description: Fontannaz Consulting Services 
    Author: Fontannaz Benjamin
    Version: 1.0
        
---------------------------------- */
/* ============ Preloader FUNCTION ============ START === */
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
/* ============ Preloader FUNCTION ============ END === */



/* ============ SCROLLIT FUNCTION ============ START === */
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

  // Projects filter: the items that are not in the selected filter are hidden (.is-filtered-out, _07-projects.scss),
  // so the visible ones are laid out and centred by the browser (3, 2 or 1 per line)
  document.addEventListener("click", function (e) {
    var span = e.target.closest && e.target.closest(".section-projects .filtering span");
    if (!span) return;
    var filter = span.getAttribute("data-filter");
    document.querySelectorAll(".section-projects .gallery .items").forEach(function (item) {
      item.classList.toggle("is-filtered-out", filter !== "*" && !item.matches(filter));
    });
  });

  $(window).on("load", function () {
    var wind = $(window);
    wind.stellar();
    // fitWidth (isotope v3) / isFitWidth (isotope v2): the grid is as wide as its columns, so it can be centred (_07-projects.scss, tablet sizes)
    $(".gallery").isotope({ itemSelector: ".items", masonry: { fitWidth: true, isFitWidth: true } });
    var $gallery = $(".gallery").isotope({});
    $(".filtering").on("click", "span", function () {
      var filterValue = $(this).attr("data-filter");
      $gallery.isotope({ filter: filterValue });
    });
    $(".filtering").on("click", "span", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
    // default Projects view = the filter marked "active" in index.html (Business Strategy).
    // Native click so the filter handlers of both jQuery copies (this file and js/preloader.js) run.
    var defaultFilter = document.querySelector(".section-projects .filtering span.active");
    if (defaultFilter) defaultFilter.click();
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

// ==========================================


/* ============ Animate.css - add required class and remove classes after animation ends ============ START === */
const element = document.querySelector(".header__ben-only");
element.classList.add("animate__animated", "animate__fadeInLeftBig");

element.addEventListener("animationend", function () {
  // element.classList.remove("animated", "fadeInLeft")
  element.classList.remove("animate__animated", "animate__fadeInLeftBig");

  // element.classList.add(".header__ben-only-scroll", "fadeInLeft")
  // element.classList.add(".header__ben-only-scroll")
				  
});
/* ============ Animate.css - add required class and remove classes after animation ends ============ END === */																
// ------------------------------------------
//   On scroll Animations with Animate.css
// ------------------------------------------
// ==========================================

// ----------- function wScroll -> START -> function wScroll to know how far from the Top the scroll currently is

var imageHeight = parseInt($(".header__ben-only").css("height")),
  stopHeight = imageHeight / 2,
  marginHeight = parseInt($(".header").css("margin-top"));
stopMargin = marginHeight / 2;

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  // scroll speed divided by 80
  $(".header__ben-only").css({
    transform: "translate(0px, -" + wScroll / 80 + "%)",
  });

  // ------------------------------------------
  //   Services - Expertise Cards - FadeInRight Animation [WORKING]
  // ------------------------------------------
  // start counting scrolling when class ".services-heading-2-areas" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".services-heading-2-areas" is visible in the viewport
  // ------------------------------------------

  if (
    wScroll >
    $(".services-heading-2-areas").offset().top - $(window).height() / 1.2
  ) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

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
  //  About Me Apple Bundle Mockup animation MEDIUM and UP [WORKING]
  // ------------------------------------------

  if (wScroll > $(".services-scroll-1").offset().top - $(window).height()) {
    //  -860
    var offset = Math.min(
      0,
      wScroll - $(".services-scroll-1").offset().top + $(window).height() - 1360
    );

    // $('bundle-macbookpro').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.5) + 'px)'});
    $(".bundle-macbookpro").css({
      transform: "translate(" + offset * 1.4 + "px, " + offset * 0 + "px)",
    });
  }

  if (wScroll > $(".services-scroll-1").offset().top - $(window).height()) {
    //  -880
    var offset = Math.min(
      0,
      wScroll - $(".services-scroll-1").offset().top + $(window).height() - 1380
    );

    $(".bundle-ipad").css({
      transform: "translate(" + offset * -1.4 + "px, " + offset * 0.44 + "px)",
    });
  }

  if (wScroll > $(".services-scroll-1").offset().top - $(window).height()) {
    //  -900
    var offset = Math.min(
      0,
      wScroll - $(".services-scroll-1").offset().top + $(window).height() - 1400
    );

    $(".bundle-iphone").css({
      transform: "translate(" + offset * -1.5 + "px, " + offset * 1 + "px)",
    });
  }

  // ------------------------------------------
  //  About Me hand with iPhone Mockup animation
  // ------------------------------------------

  if (wScroll > $(".services-scroll-1").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".services-scroll-1").offset().top + $(window).height() - 640
    );

    $(".services-scroll-3").css({
      transform: "translate(" + offset * -0.2 + "px, " + offset * -0.1 + "px)",
    });
  }

  // ------------------------------------------
  //   Services - About Me  - Certified logos Up Animation [WORKING]
  // ------------------------------------------
  // start counting scrolling when class ".about-scroll-5" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".about-scroll-5" is visible in the viewport
  // ------------------------------------------

  if (
    wScroll >
    $(".services-scroll-7").offset().top - $(window).height() / 1.2
  ) {
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
  // EXPERIENCES - Timeline elements on scroll animation SMALL ONLY  [WORKING]
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
  // EXPERIENCES - Timeline elements on scroll animation MEDIUM & UP [WORKING]
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

  if (wScroll > $(".time-scroll-5").offset().top - $(window).height()) {
    var offset = Math.min(
      0,
      wScroll - $(".time-scroll-5").offset().top + $(window).height() - 900
    );

    $(".time-scroll-6").css({
      transform:
        "translate(" + offset + "px, " + Math.abs(offset * 0.1) + "px)",
    });
  }

  // ------------------------------------------
  //   EDUCATION - Professional Studies Animation [WORKING]
  // ------------------------------------------
  // start counting scrolling when class ".education-scroll-0" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".education-scroll-0" is visible in the viewport

  if (
    wScroll >
    $(".education-scroll-3").offset().top - $(window).height() / 1.2
  ) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".section-education .pro-studies").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".section-education .pro-studies").eq(i).addClass("is-showing");
      }, 50 * (i + 1)); // affichage rapide de tous les logos
      // }, 700 * Math.exp(i * 0.14) - 700);  // affichage qui ralenti au-delà 10 items
    });
  }

  // ------------------------------------------
  //   EDUCATION - Certifications Animation [WORKING]
  // ------------------------------------------
  // start counting scrolling when class ".portfolio" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".portfolio" is visible in the viewport

  if (
    wScroll >
    $(".education-scroll-5").offset().top - $(window).height() / 1.2
  ) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".section-education .pro-certifications").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".section-education .pro-certifications")
          .eq(i)
          .addClass("is-showing");
        // }, 150 * (i+1));
      }, 700 * Math.exp(i * 0.14) - 700);
    });
  }

  // ------------------------------------------
  //   PROJECTS - GRID - Projects Animation [WORKING]
  // ------------------------------------------
  // start counting scrolling when class ".services" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".services" is visible in the viewport

  // start counting scrolling when class ".portfolio" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".portfolio" is visible in the viewport

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

  // ------------------------------------------
  //   RESOURCES - Tools Animation
  // ------------------------------------------
  // start counting scrolling when class ".portfolio" reaches the top of the viewport - (vh / 1.2)
  // starting to count scrolls when 20% of class ".portfolio" is visible in the viewport

  if (
    wScroll >
    $(".resources-scroll-0").offset().top - $(window).height() / 1.2
  ) {
    //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
    // console.log("Hi");

    //for each .items in the .gallery class
    $(".resources-scroll-2 .tools").each(function (i) {
      //for each element "i" found
      setTimeout(function () {
        $(".resources-scroll-2 .tools").eq(i).addClass("is-showing");
      }, 20 * (i + 1));
      // }, (700 * (Math.exp(i * 0.14))) - 700);
    });
  }
});

// ----------- function linked to the wScroll -> END
											   
/* ============ MagnificPopup FUNCTION ============ START === */
$(".image-popup-services").magnificPopup({
  type: "image",
  // other options
});
/* ============ MagnificPopup FUNCTION ============ END === */	

// Toggle Tooltip for the header phone & xs-sm-contact phone addy and email pre-footer START -------

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Toggle Tooltip for the header phone & xs-sm-contact phone addy and email pre-footer END -------
