/**
 * Section heights follow their content.
 *
 * The page sections are absolutely positioned in dvh (sass/pages/_home.scss), but their
 * content is sized in rem, so depending on the window height the content either ran past
 * the bottom of a section or left a large empty space. This script measures the content
 * and sets CSS variables used in _home.scss / _variables.scss:
 *
 * --services-extra:    height missing in the Services section (>= 0). The space between the
 *                      certification logos and the Testimonials = the logos' margin-top.
 * --experiences-extra: height to add (or remove, if negative) to the Experiences section.
 *                      The space between the last Experience (or the end of the timeline line)
 *                      and the Education section edge = the same space as at the end of the
 *                      Services section (the logos' margin-top, 6dvh).
 * --education-extra:  the Education section follows its content in every view (in the tablet view,
 *                      481px - 1024px wide, Certificates and Professional Studies are hidden), with twice
 *                      the end space of the Services section after the last row (12dvh).
 * --projects-extra:    same for the Projects section and its grid, with the Resources section.
 *                      Measured again after a filter click (the grid height changes).
 * --resources-extra:   the Resources section follows its content (the books grid has 3, 2 or 1 books
 *                      per line depending on the width), with the same end space as the Services section.
 *
 * Each section's height, its bottom clip-path and the top of every following section move
 * by these amounts.
 */
(function () {
  var SPACE_BELOW = 80; // px of free space below the last content (fallback when the logos row is missing)
  var CLIP_SIDE = 0.08; // 8dvh: the bottom V of the clip-paths starts 8dvh above the section bottom
  var SERVICES_HEIGHT = 2.2; // 220dvh: Services height without extra
  var EDUCATION_OFFSET = 2.9; // 290dvh: Education top - Experiences top (660dvh - 370dvh)
  var RESOURCES_OFFSET = 1.59; // 159dvh: Resources top - Projects top (1040dvh - 881dvh)
  var EDUCATION_CLIP_SIDE = 2.22; // 222dvh: Education visible bottom (sides of its clip-path) without extra
  var CONTACT_OFFSET = 2.0; // 200dvh: Contact top - Resources top (1240dvh - 1040dvh)
  var CONTACT_CLIP_SIDE = 0.83; // 83dvh: sides of the Contact angled bottom edge ($clip-path-polygon-contact)

  // top / bottom (page coordinates) of the visible content of an element
  function contentSpan(el) {
    var top = Infinity,
      bottom = 0;
    Array.prototype.forEach.call(el.querySelectorAll("*"), function (child) {
      var r = child.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // hidden (display: none) or empty
      top = Math.min(top, r.top + window.scrollY);
      bottom = Math.max(bottom, r.bottom + window.scrollY);
    });
    return { top: top, bottom: bottom };
  }

  function pageTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  // space left at the end of a section = the space above the certification logos (.certified-logo margin-top)
  function sectionEndSpace() {
    var logos = document.querySelector(".section-services .certified-logo");
    return logos ? parseFloat(getComputedStyle(logos).marginTop) : SPACE_BELOW;
  }

  function updateServices(vh) {
    var section = document.querySelector(".section-services");
    if (!section) return;

    var top = section.getBoundingClientRect().top;
    var contentBottom = 0;
    Array.prototype.forEach.call(section.children, function (child) {
      var r = child.getBoundingClientRect();
      // skip hidden children (e.g. the .mfp-hide service popups): their rect is 0 in window coordinates,
      // which gives a wrong, very large bottom once the page is scrolled down
      if (r.width === 0 || r.height === 0) return;
      var margin = parseFloat(getComputedStyle(child).marginBottom) || 0;
      contentBottom = Math.max(contentBottom, r.bottom + margin - top);
    });

    // space between the logos and the Testimonials = same as the space above the logos (.certified-logo margin-top)
    var spaceBelow = sectionEndSpace();

    var needed = contentBottom + spaceBelow + CLIP_SIDE * vh;
    var extra = Math.max(0, Math.ceil(needed - SERVICES_HEIGHT * vh));
    document.documentElement.style.setProperty("--services-extra", extra + "px");
  }

  function updateExperiences(vh) {
    var experiences = document.querySelector(".section-experiences");
    var education = document.querySelector(".section-education");
    if (!experiences || !education) return;
    if (getComputedStyle(experiences).display === "none") {
      updateEducationTopMobile(vh, education); // mobile: no Experiences at all
      return; // small screens use .section-experiences-sm
    }

    // Experiences content end (last visible element, or the end of the timeline centre line drawn by
    // .main-timeline:before, whichever is lower), relative to the Experiences top
    var expTop = pageTop(experiences);
    var expContentBottom = contentSpan(experiences).bottom;
    var line = experiences.querySelector(".main-timeline");
    if (line) expContentBottom = Math.max(expContentBottom, line.getBoundingClientRect().bottom + window.scrollY);
    expContentBottom -= expTop;

    // Education top edge without --experiences-extra = Experiences top + 290dvh
    var extra = Math.round(expContentBottom + sectionEndSpace() - EDUCATION_OFFSET * vh);
    document.documentElement.style.setProperty("--experiences-extra", extra + "px");
  }

  // Mobile (below 576px wide): both Experiences sections are hidden (.section-experiences and
  // .section-experiences-sm), which left the empty Experiences space between the Testimonials and the
  // Education. --experiences-extra (negative) then brings the Education right below the Testimonials:
  // the tip of its angled top edge (--section-sep) on the bottom of the Testimonials parallax picture,
  // so the picture fills the V and no space is visible between the two sections.
  function updateEducationTopMobile(vh, education) {
    var small = document.querySelector(".section-experiences-sm");
    var parallax = document.querySelector(".section-parallax");
    if (small && getComputedStyle(small).display !== "none") return; // 576px - 767px: Experiences shown
    if (!parallax || getComputedStyle(parallax).display === "none") return;

    var root = document.documentElement;
    var current = parseFloat(getComputedStyle(root).getPropertyValue("--experiences-extra")) || 0;
    var sep = (parseFloat(getComputedStyle(root).getPropertyValue("--section-sep")) || 8) * vh / 100;
    var target = parallax.getBoundingClientRect().bottom + window.scrollY - sep;
    var extra = Math.round(current + target - pageTop(education));
    root.style.setProperty("--experiences-extra", extra + "px");
  }

  function updateEducation(vh) {
    var education = document.querySelector(".section-education");
    if (!education) return;
    // Education is drawn above the Projects: its visible bottom (clip-path sides, 222dvh) is the edge.
    // More space after the last row of logos than at the end of the other sections: 2 x 6dvh
    var contentBottom = contentSpan(education).bottom - pageTop(education);
    var extra = Math.round(contentBottom + 2 * sectionEndSpace() - EDUCATION_CLIP_SIDE * vh);
    document.documentElement.style.setProperty("--education-extra", extra + "px");
  }

  function updateProjects(vh) {
    var projects = document.querySelector(".section-projects");
    var resources = document.querySelector(".section-resources");
    var grid = projects && projects.querySelector(".gallery");
    if (!grid || !resources) return;

    // space at the top of Resources (its top edge -> its first content)
    var spaceAbove = contentSpan(resources).top - pageTop(resources);

    // end of the grid (its height is set by isotope), relative to the Projects top
    var gridBottom = grid.getBoundingClientRect().bottom + window.scrollY - pageTop(projects);

    // Resources top edge without --projects-extra = Projects top + 159dvh
    var extra = Math.round(gridBottom + spaceAbove - RESOURCES_OFFSET * vh);
    document.documentElement.style.setProperty("--projects-extra", extra + "px");
  }

  function updateResources(vh) {
    var resources = document.querySelector(".section-resources");
    if (!resources) return;
    // the Contact section is drawn above the Resources: its top edge is the end of the Resources
    var contentBottom = contentSpan(resources).bottom - pageTop(resources);
    var extra = Math.round(contentBottom + sectionEndSpace() - CONTACT_OFFSET * vh);
    document.documentElement.style.setProperty("--resources-extra", extra + "px");
  }

  // All screens: the Contact section ends a fixed space below the SEND button (the end space of the other
  // sections, the logos' margin-top: 6dvh). Its height is in dvh but the form in rem, so the space below the
  // button went from 18px to 200px depending on the screen. --contact-extra (negative: shorter) adjusts the
  // section height; <main> (the page) changes by the same amount, so at the end of the page the angled edge
  // stays at the same place above the map: only the space above the edge changes.
  // On phones, the section also goes --contact-cover (dvh) further down over the map.
  function updateContact(vh) {
    var contact = document.querySelector(".section-contact");
    var button = contact && contact.querySelector(".boutton-contact");
    if (!button) return;
    var root = document.documentElement;
    var cover = (parseFloat(getComputedStyle(root).getPropertyValue("--contact-cover")) || 0) * vh / 100;
    var buttonBottom = button.getBoundingClientRect().bottom + window.scrollY - pageTop(contact);
    var extra = Math.ceil(buttonBottom + sectionEndSpace() - CONTACT_CLIP_SIDE * vh - cover);
    root.style.setProperty("--contact-extra", extra + "px");
  }

  // All screens: the footer map is fixed at the bottom of the window, below the page.
  // At the end of the page, the bottom of the Contact section still covers its upper part, so the location
  // (always in the middle of the Google map) was hidden. The map gets the height of its visible part: from the
  // tip of the Contact angled bottom edge (in the middle of the width, above the location) to the icons row.
  function updateMap(vh) {
    var map = document.querySelector(".map-responsive");
    var contact = document.querySelector(".section-contact");
    if (!map || !contact) return;

    var footer = map.closest("footer") || map.parentNode;
    var belowMap = footer.getBoundingClientRect().bottom - map.getBoundingClientRect().bottom; // icons row
    var sep = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--section-sep")) || 8) * vh / 100;
    var contactExtra = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--contact-extra")) || 0;
    // phones: the Contact section goes further down over the map (--contact-cover, in dvh)
    var cover = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--contact-cover")) || 0) * vh / 100;
    var contactTip = pageTop(contact) + CONTACT_CLIP_SIDE * vh + contactExtra + cover + sep; // page coordinates
    // at the end of the page, the bottom of the window is the bottom of the document
    var visible = document.documentElement.scrollHeight - contactTip - belowMap; // below the tip of the V
    // the map box starts at the sides of the V (no black triangles beside it): sep higher than the tip.
    // The Google map inside is sep taller, from the top of the box (its bottom part hidden below the box), so its
    // middle (the address) is in the middle of the part visible below the tip
    var box = Math.max(80, Math.round(visible + sep)); // 80px minimum (very short phones)
    map.style.height = box + "px";
    var iframe = map.querySelector("iframe");
    if (iframe) {
      iframe.style.top = "0";
      iframe.style.bottom = "auto";
      iframe.style.height = Math.round(box + sep) + "px";
    }
  }

  function update() {
    var vh = window.innerHeight;
    updateServices(vh);
    updateExperiences(vh);
    updateEducation(vh);
    updateProjects(vh);
    updateResources(vh);
    updateContact(vh);
    updateMap(vh);
  }

  var timer;
  function onResize() {
    clearTimeout(timer);
    timer = setTimeout(update, 150);
  }

  document.addEventListener("DOMContentLoaded", update);
  window.addEventListener("load", update); // again once images (mockup, logos) have their real size
  window.addEventListener("load", function () {
    setTimeout(update, 1000); // and once isotope has laid out the Projects grid
  });
  window.addEventListener("resize", onResize);

  // Projects filter (All / Business Strategy / ...): isotope animates the grid to its new height,
  // then the sections below are resized. While this happens, the filter bar is kept at the same
  // place on screen so the view stays on the Projects section.
  document.addEventListener("click", function (e) {
    var span = e.target.closest && e.target.closest(".section-projects .filtering span");
    if (!span) return;
    setTimeout(update, 900);
    if (!e.isTrusted) return; // default filter applied by script on load: don't touch the scroll position

    var bar = span.parentNode;
    var barTop = bar.getBoundingClientRect().top;
    var end = Date.now() + 1500; // isotope animation (0.4s) + update (0.9s) + margin
    (function keepView() {
      var shift = bar.getBoundingClientRect().top - barTop;
      if (Math.abs(shift) > 1) window.scrollBy(0, shift);
      if (Date.now() < end) requestAnimationFrame(keepView);
    })();
  });
})();
