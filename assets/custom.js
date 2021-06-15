$(document).ready(function (){
    $(window).on('load',function (){
        if($('body').hasClass('template-collection') && window.location.search === "" && parseInt(boostPFSConfig.custom.products_per_page) !== parseInt($('.label-text').html())){
            $('[data-boost-sort="manual"]')[0].click()
        }
    })
    $(document).on('change','.list-tags',function (){
        let filter = $(this).attr('data-filter'),
            val = $(this).val();
        $('.sidebar-tags').each(function () {
            if ($(this).attr('data-filter') === filter) {
                $(this).find('input[value="'+val+'"]').next().click();
            }
        })
    })
    $(document).on('click','.product-des',function (e){
        if (e.target !== this) return
        window.location = $(this).attr('data-url');
    })
    $(document).on('click','.clear-filter',function (){
        $('.clear-all').click()
    })
    $(document).on('click','.btn.close',function (){
        $('.close-sidebar').click();
    })
    $(document).on('click','.form-error a',function (e){
        if(Shopify.locale === 'ar'){
            if(!$(this).attr('href').includes('/ar')){
                e.preventDefault();
                window.location = "/"+Shopify.locale+$(this).attr('href');
            }
        }
    })
    $('.product-grid-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    centerPadding: '10%',
                }
            }
        ]
    })
})
 
// Shopify Como Gift Integration Script : Please don't touch

$(document).ready( function() {
  $('a[href^="/account/logout"]').on("click", function() {
    $.ajax({
        type: "POST",
        url: '/cart/clear.js',
        success: function(){
           window.location.href =  'https://www.rubaiyatfashion.com/account/logout'
        },
        dataType: 'json'
      });
    return false;
  });
});

// The main menu display based on the top menu items

$(document).ready(function(){
  $('.menu-top-item:first-child a').on('click', function(e){
    $('.nav-bar .site-nav:first-child').hide();
    $('.nav-bar .site-nav:nth-child(2)').css('display', 'flex');
    $('.nav-bar .site-nav:nth-child(3)').hide();
    $('.nav-bar .site-nav:nth-child(4)').hide();
    e.preventDefault();
  });
  $('.menu-top-item-2 a').on('click', function(e){
    $('.nav-bar .site-nav:first-child').hide();
    $('.nav-bar .site-nav:nth-child(2)').hide();
    $('.nav-bar .site-nav:nth-child(4)').hide();
    $('.nav-bar .site-nav:nth-child(3)').css('display', 'flex');
    e.preventDefault();
  });
  $('.menu-top-item-3 a').on('click', function(e){
    $('.nav-bar .site-nav:first-child').hide();
    $('.nav-bar .site-nav:nth-child(2)').hide();
    $('.nav-bar .site-nav:nth-child(3)').hide();
    $('.nav-bar .site-nav:nth-child(4)').css('display', 'flex');
    e.preventDefault();
  });
  
});
