$(".mobile a").click(function(e){
    e.preventDefault();
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        $(".mobile-nav-wrapper").velocity("slideUp");
        $(".mobile nav").addClass("inactive");
    } else {
        $(this).addClass("active");
        $(".mobile-nav-wrapper").velocity("slideDown");
        $(".mobile nav").removeClass("inactive");
    }
});
