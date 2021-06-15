(function ($) {
	var halo = {
	    initSlideShow: function() {
	        var SlideShow = $('.home-slideshow  .slideshow');

	        SlideShow.each(function () {
	            var self = $(this);

	            if (self.not('.slick-initialized')) {
	                self.slick({
	                    slidesToShow: self.data('rows'),
	                    slidesToScroll: 1,
	                    infinite: true,
                      cssEase: "ease",
                      adaptiveHeight: true,
                      dots: true,
                      arrows: true,
                      autoplay: self.data('autoplay'),
                      autoplaySpeed: self.data('autoplay-speed'),
                      prevArrow: $('.slide-action .slick-prev'),
                      nextArrow: $('.slide-action .slick-next'),
                      responsive: [{
                          breakpoint: 1280,
                          settings: {
                              arrows: false,
                              dots: true
                          }
                      },
                      {
                          breakpoint: 768,
                          settings: {
                              arrows: false,
                              dots: true
                          }
                      }
                      ]
	                });
	            }
	        });
	    }
	}
	halo.initSlideShow();
})(jQuery);
