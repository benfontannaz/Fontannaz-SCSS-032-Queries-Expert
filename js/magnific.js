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

// Services popups - "Contact Enquiry" button: close the popup, then scroll to the contact form
$(document).on("click", ".boutton-popup-close", function (e) {
  e.preventDefault();
  var target = $(this).attr("href");
  $.magnificPopup.close();
  // wait for the removalDelay (500ms) so the popup has gone and the page can scroll again
  setTimeout(function () {
    $("html, body").animate({ scrollTop: $(target).offset().top }, 600);
  }, 550);
});

// ==== Magnific Popup CSS3-based animation effects ==== END

// ==== Projects gallery popup: grey overlay with the project details ==== START
// js/scripts.js and js/preloader.js (another jQuery copy) also initialise .gallery; their options are stored on the
// element itself, so this initialisation runs on document ready AND on window load to be the last one applied.
// The texts come from the hidden .project-details block of each gallery item (index.html, Projects section).
function initProjectsPopup() {
  $(".section-projects .gallery").magnificPopup({
    delegate: ".popimg",
    type: "image",
    mainClass: "mfp-projects", // scopes the projects popup styles (_07-projects.scss)
    gallery: { enabled: true },
    image: {
      markup:
        '<div class="mfp-figure">' +
        '<div class="mfp-close"></div>' +
        "<figure>" +
        '<div class="mfp-img"></div>' +
        '<div class="mfp-project-details">' +
        '<div class="mfp-project-col">' +
        '<h4 class="mfp-project-heading">Challenges &amp; Pains</h4>' +
        '<div class="mfp-challenges"></div>' +
        "</div>" +
        '<div class="mfp-project-col">' +
        '<h4 class="mfp-project-heading">Accomplishments &amp; Results</h4>' +
        '<div class="mfp-results"></div>' +
        "</div>" +
        "</div>" +
        "<figcaption>" +
        '<div class="mfp-bottom-bar">' +
        '<div class="mfp-title"></div>' +
        '<div class="mfp-counter"></div>' +
        "</div>" +
        "</figcaption>" +
        "</figure>" +
        "</div>",
    },
    callbacks: {
      markupParse: function (template, values, item) {
        var details = item.el.siblings(".project-details");
        values.challenges = details.find(".project-challenges").html() || "";
        values.results = details.find(".project-results").html() || "";
        // project name under the image, on one line ("Assura · Enterprise Architecture · ...")
        values.title = (item.el.siblings("h6").html() || "").split(/<br\s*\/?>/i).map($.trim).join(" &middot; ");
        // no details block -> no overlay (class, not .toggle(): .toggle() would force display: block over the flex layout)
        template.find(".mfp-project-details").toggleClass("mfp-project-details--empty", details.length === 0);
      },
    },
  });
}
$(initProjectsPopup);
$(window).on("load", initProjectsPopup);

// a click on the details overlay goes to the next project, like a click on the picture (gallery
// navigateByImgClick): the overlay covers the lower part of the picture and caught the clicks
$(document).on("click", ".mfp-projects .mfp-project-details", function (e) {
  e.preventDefault();
  e.stopPropagation();
  $.magnificPopup.instance.next();
});
// ==== Projects gallery popup: grey overlay with the project details ==== END

// ==== Services detail popups: a click outside the card closes the popup ==== START
// The popup content (.carte-details-section-row) is almost as wide as the window, with the card in the middle:
// a click beside the card hits the popup content, not the dark background, so Magnific does not close by itself.
$(document).on("click", ".mfp-content .carte-details-section-row", function (e) {
  if (!$(e.target).closest(".carte-details__side").length) {
    $.magnificPopup.close();
  }
});
// ==== Services detail popups: a click outside the card closes the popup ==== END
