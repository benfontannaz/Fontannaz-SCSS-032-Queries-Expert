/**
 * @module sidepanel nav
 */
$(function () {
  "use strict";
  var wind = $(window);
  if (wind.width() > 992) {
    $.scrollIt({
      upKey: 38,
      downKey: 40,
      easing: "swing",
      scrollTime: 600,
      activeClass: "active",
      onPageChange: null,
      topOffset: 0,
    });
  }
});
