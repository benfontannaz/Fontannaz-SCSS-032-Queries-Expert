// ==== Magnific Popup CSS3-based animation effects ==== START

// ==== Image Popup ==== START

$(document).ready(function () {
  $(".image-popup-vertical-fit").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    mainClass: "mfp-img-mobile",
    image: {
      verticalFit: true,
    },
  });

  $(".image-popup-fit-width").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    image: {
      verticalFit: false,
    },
  });

  $(".image-popup-no-margins").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });
});
// ==== Image Popup ==== END

// ==== parent container ==== START
$(".parent-container").magnificPopup({
  delegate: "a", // child items selector, by clicking on it popup will open
  type: "image",
  // other options
});
// ==== parent container ==== END

// ==== Dialog Popup ==== START
$(document).ready(function () {
  $(".popup-with-zoom-anim").magnificPopup({
    type: "inline",

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: "auto",

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
  });

  $(".popup-with-move-anim").magnificPopup({
    type: "inline",

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: "auto",

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-slide-bottom",
  });
});
// ==== Dialog Popup ==== END

// ==== Magnific Popup CSS3-based animation effects ==== START
// Inline popups
$("#inline-popups").magnificPopup({
  delegate: "a",
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function () {
      this.st.mainClass = this.st.el.attr("data-effect");
    },
  },
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

// Inline popups
$("#inline-popups-1").magnificPopup({
  delegate: "a",
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function () {
      this.st.mainClass = this.st.el.attr("data-effect");
    },
  },
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

$("#inline-popups-2").magnificPopup({
  delegate: "a",
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function () {
      this.st.mainClass = this.st.el.attr("data-effect");
    },
  },
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

$("#inline-popups-3").magnificPopup({
  delegate: "a",
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function () {
      this.st.mainClass = this.st.el.attr("data-effect");
    },
  },
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

// Image popups
$("#image-popups").magnificPopup({
  delegate: "a",
  type: "image",
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function () {
      // just a hack that adds mfp-anim class to markup
      this.st.image.markup = this.st.image.markup.replace(
        "mfp-figure",
        "mfp-figure mfp-with-anim"
      );
      this.st.mainClass = this.st.el.attr("data-effect");
    },
  },
  closeOnContentClick: true,
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

// Hinge effect popup
$("a.hinge").magnificPopup({
  mainClass: "mfp-with-fade",
  removalDelay: 1000, //delay removal by X to allow out-animation
  callbacks: {
    beforeClose: function () {
      this.content.addClass("hinge");
    },
    close: function () {
      this.content.removeClass("hinge");
    },
  },
  midClick: true,
});

// ==== Magnific Popup CSS3-based animation effects ==== END
