// ------------------------------------------
//   SERVICES - EXPERTISES - CARDS Animation
// ------------------------------------------
// start counting scrolling when class ".services" reaches the top of the viewport - (vh / 1.2)
// starting to count scrolls when 20% of class ".services" is visible in the viewport

if (wScroll > $(".services-scroll-4").offset().top - $(window).height() / 1.2) {
  //Starts counting scrolls with a the Hi log (to check it in the viewer) can be commented after successfully working
  // console.log("Hi");

  //for each .items in the .gallery class
  $(".ligne .services-scroll-5").each(function (i) {
    //for each element "i" found
    setTimeout(function () {
      $(".ligne .services-scroll-4").eq(i).addClass("is-showing");
      // }, 150 * (i+1));
    }, 700 * Math.exp(i * 0.14) - 700);
  });
}
