$(document).ready(function () {
   // $(".fancybox").fancybox({
   //    openEffect: "none",
   //    closeEffect: "none",
   // });


   $("[data-scroll]").on("click", function (event) {
      event.preventDefault(); /*відміняємо стандартну дію ссилки*/

      var $this = $(this);
      var blockId = $this.data('scroll'); //поміщаємо id блоку в зміну
      var blockOffset = $(blockId).offset().top; //находимо відстань від верху до блоку

      //При натисканні на кнопку в неї залишається колір, 
      // при натисненні іншої колір пропадає, попередньо прописати дії при додаванні класу active 
      $("#nav-item a").removeClass("active");
      $this.addClass("active");
      $("#nav__toggle").toggleClass("active"); //перетворюємо кнопку в хрестик
      $(".navbar").toggleClass("active"); //показуємо меню
      // ---

      $("html, body").animate({
         scrollTop: blockOffset
      }, 500); //500 - час скролу
   });

   var introH = $("#intro").innerHeight();
   var header = $("#header");
   var scrollOffset = $(window).scrollTop();
   // console.log(introH);
   // console.log(scrollOffset);
   const mediaQuery = window.matchMedia('(max-width: 993px)')

   checkScroll(scrollOffset);

   $(window).on("scroll", function () {
      scrollOffset = $(this).scrollTop();
      // console.log(scrollOffset);
      checkScroll(scrollOffset);
   });

   function checkScroll(scrollOffset) {
      if (mediaQuery.matches) {
         $("#header").addClass("fixed");
      } else {
         if (scrollOffset >= introH) {
            header.addClass("fixed");
         } else {
            header.removeClass("fixed");
         }
      }
      
   }
   

   $("#nav__toggle").on("click", function (event) {    /*клік на значок бургера*/
      event.preventDefault(); /*відміняємо стандартну дію ссилки*/
      $(this).toggleClass("active"); //перетворюємо кнопку в хрестик
      $(".navbar").toggleClass("active"); //показуємо меню
   })




   // $('.carousel').carousel()
   $(".zoom").hover(function () {

      $(this).addClass('transition');
   }, function () {

      $(this).removeClass('transition');
   });
});
