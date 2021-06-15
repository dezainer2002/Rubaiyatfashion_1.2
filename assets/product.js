$('document').ready(function () {
    // console.log(222);

    $('document').on('change', $('#add-to-cart-form .single-option-selector'), function () {
        // console.log(11);
        var className = $(this).data('filter');
        var optionIndex = $(this).closest('.swatch').attr('data-option-index');
        var optionValue = $(this).val();

        $(this)
            .closest('form')
            .find('.single-option-selector')
            .eq(optionIndex)
            .val(optionValue)
            .trigger('change');

        if (className == undefined) {
            if ($('input[data-filter]').is(':checked')) {
                var checked = $('input[data-filter]:checked').data('filter');
                className = checked;
            }
        }

        if (window.color_swatch_style === "variant_grouped" && window.use_color_swatch && className !== undefined) {
            var productShop = $(swatchSlt).closest('.product-shop');

            if (productShop.closest('.product-slider').length) {
                var productImgs = productShop.closest('.product-slider').find('[data-moreview-product-slider]'),
                    sliderFor = productImgs.find('.slider-for');

                sliderFor.slick('slickUnfilter');

                if (sliderFor.find(className).length) {
                    sliderFor.slick('slickFilter', className).slick('refresh');
                }

            } else {

                // if(variant.featured_image != null && variant.featured_image.alt !=null){
                //     $('[data-thumbnail-color]').hide();
                //     var selected_color = variant.featured_image.alt;
                //     var thumbnail_selector = '[data-thumbnail-color="' + selected_color + '"]';
                //     $(thumbnail_selector).show();
                // }
                // else{
                //     $('[data-thumbnail-color]').show();
                // }

                var productImgs = productShop.prev('[data-more-view-product]');

                if (productImgs.length) {
                    var sliderNav = productImgs.find('.slider-nav'),
                        sliderFor = productImgs.find('.slider-for');

                    sliderNav.slick('slickUnfilter');
                    sliderFor.slick('slickUnfilter');

                    if (sliderNav.find(className).length && sliderFor.find(className).length) {
                        sliderNav.slick('slickFilter', className).slick('refresh');
                        sliderFor.slick('slickFilter', className).slick('refresh');
                    }
                }
            }

            ella.initZoom();
        }
    });
});