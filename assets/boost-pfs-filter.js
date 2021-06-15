// Override Settings
var boostPFSFilterConfig = {
	general: {
		limit: parseInt($('.label-text').html()),
		// Optional
		loadProductFirst: true,
		filterTreeMobileStyle: 'style1'
	},
};
var boostPFSTemplate = {
	'gridBorderClass': 'grid-item-border',
	'onSaleClass': 'on-sale',
	'soldOutClass': 'sold-out',

	'quickViewHtml': '<a class="quickview-button h-mobile h-desktop" href="javascript:void(0)" id="{{itemHandle}}" title="' + boostPFSConfig.label.quick_view + '"><span>' + boostPFSConfig.label.quick_view + '</span></a>',
	'reviewHtml': '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>',

	// Grid Template
	'productGridItemHtml': '<div class="grid-item col-xs-6 ' + boostPFSConfig.custom.grid_item_width + ' {{itemGridBorderClass}} {{itemCropImageClass}}">' +
								'<div class="inner product-item {{itemSoldOutClass}} {{itemSaleClass}} wow fadeIn" data-wow-delay="{{delayTime}}ms" id="product-{{itemId}}">' +
									'<div class="inner-top">' +
										'<div class="product-top">' +
											'<div class="product-image {{itemFlipImageLabel}}" data-collections-related="{{itemCollectionRelated}}">' +
												'<a href="{{itemUrl}}" class="product-grid-image" data-collections-related="{{itemCollectionRelated}}">' +
													'<img src="{{itemThumbUrl}}" alt="{{itemTitle}}" class="{{itemImageClass}}">' +
													'{{itemImageTwo}}' +
												'</a>' +
											'</div>' +
											'{{itemLabels}}' +
											'<div class="product-des abs-center" data-url="{{itemUrl}}">' +
												'{{itemWishlist}}' +
												'{{itemAddToCart}}' +
											'</div>' +
											'<div class="product-des abs-bottom">' +
												'{{itemSizeSwatches}}' +
												'{{itemQuickView}}' +
											'</div>' +
										'</div>' +
										// Product Bottom
										'<div class="product-bottom">' +
											'{{itemVendor}}' +
											'<a class="product-title" href="{{itemUrl}}">{{itemTitle}}</a>' +
											'{{itemReview}}' +
											'<div class="price-box">{{itemPrice}}</div>' +
											'<a href="{{itemUrl}}" style="text-decoration: none;"></a>' +
											'{{itemColorSwatches}}' +
										'</div>' +
										// Product Detail
										'<div class="product-details">' +
											'{{itemVendor}}' +
											'<a class="product-title" href="{{itemUrl}}">{{itemTitle}}</a>' +
											'{{itemReview}}' +
											'<div class="short-description">{{itemDescription}}</div>' +
											'<div class="price-box">{{itemPrice}}</div>' +
											'{{itemColorSwatches}}' +
											'<div class="action">{{itemAddToCart}}</div>' +
											'{{itemWishlist}}' +
										'</div>' +
										// End Product Detail
									'</div>' +
								'</div>' +
							'</div>',

	// List Template
	'productListItemHtml':  '<div class="grid-item product-item {{itemSoldOutClass}} {{itemSaleClass}} wow fadeIn" data-wow-delay="{{delayTime}}ms" id="product-{{itemId}}">' +
								'<div class="product-image">' +
									'<a href="{{itemUrl}}" class="product-list-thumb product-grid-image">' +
										'<img src="{{itemThumbUrl}}" alt="{{itemTitle}}">' +
									'</a>' +
									'{{itemLabels}}' +
								'</div>' +

								'<div class="product-details">' +
									'<a class="product-title" href="{{itemUrl}}">{{itemTitle}}</a>' +
									'{{itemVendor}}' +
									'{{itemReview}}' +
									'<div class="short-description">{{itemDescription}}</div>' +
									'{{itemColorSwatches}}' +
									'<div class="price-box">{{itemPrice}}</div>' +
									'<div class="action">{{itemAddToCart}}</div>' +
									'{{itemWishlist}}' +
								'</div>' +
							'</div>',

	// Pagination Template
	'previousActiveHtml': '<li class="text"><a href="{{itemUrl}}" title="' + boostPFSConfig.label.toolbar_previous + '"><i class="fa fa-angle-left" aria-hidden="true"></i><span></span></a></li>',
	'previousDisabledHtml': '<li class="disabled"><i class="fa fa-angle-left" aria-hidden="true"></i><span></span></li>',
	'nextActiveHtml': '<li class="text"><a href="{{itemUrl}}" title="' + boostPFSConfig.label.toolbar_next + '"><span></span><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>',
	'nextDisabledHtml': '<li class="disabled"><i class="fa fa-angle-right" aria-hidden="true"></i><span></span></li>',
	'pageItemHtml': '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
	'pageItemSelectedHtml': '<li class="active"><span>{{itemTitle}}</span></li>',
	'pageItemRemainHtml': '<li><span>{{itemTitle}}</span></li>',
	'paginateHtml': '{{previous}}{{pageItems}}{{next}}',
	// Sorting Template
	'sortingHtml': '<span class="boost-pfs-filter-sorting-label">' + boostPFSConfig.label.sorting + '</span><label><span><span class="boost-pfs-filter-top-sorting-label">' + boostPFSConfig.label.sorting + '</span></span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="4" viewBox="0 0 6 4" fill="none">\n' +
		'<path d="M5.71057 0.333252H0.289413C0.0328762 0.333252 -0.0978124 0.643032 0.0861198 0.826965L2.7967 3.53754C2.90803 3.64887 3.09196 3.64887 3.20333 3.53754L5.91391 0.826965C6.0978 0.643032 5.96711 0.333252 5.71057 0.333252Z" fill="#181818"/>\n' +
		'</svg></label><ul class="boost-pfs-filter-filter-dropdown">{{sortingItems}}</ul>',
	
	
};

(function() {
	BoostPFS.inject(this);

	ProductGridItem.prototype.compileTemplate = function(data, index, totalProduct) {
		if (!data) data = this.data;
		if (!index) index = this.index;
		if (!totalProduct) totalProduct = this.totalProduct;

		/*** Prepare data ***/
		var images = data.images_info;
		// Displaying price base on the policy of Shopify, have to multiple by 100
		var soldOut = !data.available; // Check a product is out of stock
		var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
		var priceVaries = data.price_min != data.price_max; // Check a product has many prices
		// Get First Variant (selected_or_first_available_variant)
		var firstVariant = data['variants'][0];
		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
			var paramVariant = data.variants.filter(function(e) { return e.id == Utils.getParam('variant'); });
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
		for (var i = 0; i < data['variants'].length; i++) {
			if (data['variants'][i].available) {
				firstVariant = data['variants'][i];
				break;
			}
		}
		}
		/*** End Prepare data ***/

		// Get Template
		var itemHtml = boostPFSTemplate.productGridItemHtml;

		// Add class
		itemHtml = boostPFSConfig.custom.product_image_border ? itemHtml.replace(/{{itemGridBorderClass}}/g, boostPFSTemplate.gridBorderClass) : itemHtml.replace(/{{itemGridBorderClass}}/g, '');
		itemHtml = boostPFSConfig.custom.product_image_crop ? itemHtml.replace(/{{itemCropImageClass}}/g, 'crop_image') : itemHtml.replace(/{{itemCropImageClass}}/g, 'no_crop_image');
		itemHtml = soldOut ? itemHtml.replace(/{{itemSoldOutClass}}/g, boostPFSTemplate.soldOutClass) : itemHtml.replace(/{{itemSoldOutClass}}/g, '');
		itemHtml = onSale ? itemHtml.replace(/{{itemSaleClass}}/g, boostPFSTemplate.onSaleClass) : itemHtml.replace(/{{itemSaleClass}}/g, '');
		itemHtml = itemHtml.replace(/{{delayTime}}/g, boostPFSConfig.custom.time_lazy_load * index);

		// Add Thumbnail
		//     var itemThumbUrl = images.length > 0 ? Utils.optimizeImage(images[0]['src'], '1024x1024') : boostPFSConfig.general.no_image_url;
		//     var itemFlipImageUrl = images.length > 1 ? Utils.optimizeImage(images[1]['src'], '1024x1024') : itemThumbUrl;
		
		// Add Thumbnail
		var itemThumbUrl = images.length > 0 ? images[0]['src'] : boostPFSConfig.general.no_image_url;
		var itemFlipImageUrl = images.length > 1 ? Utils.optimizeImage(images[1]['src'], '1024x1024') : itemThumbUrl;
		if (Globals.queryParams.hasOwnProperty('pf_opt_color')) {
			//var selectedColor = Globals.queryParams.pf_opt_color[0].toLowerCase();
			var selectedColors = Globals.queryParams.pf_opt_color;
			for (var k = 0; k < selectedColors.length; k++) {
				var selectedColor = selectedColors[k].toLowerCase();
				for (var i = 0; i < data.variants.length; i++) {
					var variant = data['variants'][i];
					if (variant.hasOwnProperty('merged_options') && variant['merged_options'].length > 0) {
						for (var j = 0; j < variant['merged_options'].length; j++) {
							var mergeValue = variant['merged_options'][j].toLowerCase();
							if (mergeValue.indexOf(selectedColor) > -1 && variant['image']) {
								var itemThumbUrl = variant['image'];
								break;
							}
						}
					}
				}
			}
		}
		itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

		var itemFlipImageLabel = images.length > 1 ? 'image-swap ' : '';
		itemHtml = itemHtml.replace(/{{itemFlipImageLabel}}/g, itemFlipImageLabel);

		itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);
		itemHtml = itemHtml.replace(/{{itemFlipImageUrl}}/g, itemFlipImageUrl);

		// Add Label
		var itemLabelsHtml = '';
		if (onSale || soldOut) {
			itemLabelsHtml += '<div class="product-label">';
			if (onSale) {
				itemLabelsHtml += '<strong class="label sale-label">' + boostPFSConfig.label.sale + '</strong>';
			}
			if (soldOut) {
				itemLabelsHtml += '<strong class="label sold-out-label">' + boostPFSConfig.label.sold_out + '</strong>';
			}
			itemLabelsHtml += '</div>';
		}
		itemHtml = itemHtml.replace(/{{itemLabels}}/g, itemLabelsHtml);

		// Add Price
		var itemPriceHtml = '';
		if (onSale) {
			itemPriceHtml += '<p class="sale">';
			itemPriceHtml += '<span class="old-price"> ' + Utils.formatMoney(data.compare_at_price_min) + '</span>';
			itemPriceHtml += '<span class="special-price">';
			if (priceVaries) {
				itemPriceHtml += '<em>' + boostPFSConfig.label.from_price + ' </em>';
			}
			itemPriceHtml += Utils.formatMoney(data.price_min);
			itemPriceHtml += '</span>';
			itemPriceHtml += '</span></p>';
		} else {
			itemPriceHtml += '<p class="regular-product"><span>';
			if (priceVaries) {
				itemPriceHtml += '<em>' + boostPFSConfig.label.from_price + ' </em>'
			}
			itemPriceHtml += Utils.formatMoney(data.price_min, Globals.moneyFormat);
			itemPriceHtml += '</span></p>';
		}
		itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

		// Add Vendor
		var itemVendorHtml = '';
		if (boostPFSConfig.custom.show_vendor) {
			itemVendorHtml = '<div class="product-vendor">' + data.vendor + '</div>';
		}
		itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

		// Add to cart
		var itemAddToCartHtml = '';
		if (boostPFSConfig.custom.display_button) {
			var itemAddToCartHtml = '<div class="action"><form action="/cart/add" method="post" class="variants" id="product-actions-{{itemId}}" enctype="multipart/form-data" style="padding:0px;">';
			if (soldOut) {
				itemAddToCartHtml += '<input class="btn add-to-cart-btn" type="submit" value="' + boostPFSConfig.label.unavailable + '" disabled="disabled"/>';
			} else {
				if (data.variants.length > 1) {
					itemAddToCartHtml += '<input class="btn" type="button" onclick="window.location.href=\'{{itemUrl}}\'" value="' + boostPFSConfig.label.select_options + '" />';
				} else {
					itemAddToCartHtml += '<input type="hidden" name="id" value="' + firstVariant.id + '" />';
					itemAddToCartHtml += '<button data-btn-addtocart="" class="btn add-to-cart-btn" type="submit" data-form-id="#product-actions-{{itemId}}" data-translate="products.product.add_to_cart">' + boostPFSConfig.label.add_to_cart + '</button>';
				}
			}
			itemAddToCartHtml += '</form></div>';
		}
		itemHtml = itemHtml.replace(/{{itemAddToCart}}/g, itemAddToCartHtml);

		//collection related
		var relatedCollection = window.location.pathname + '?view=related';
		itemHtml = itemHtml.replace(/{{itemCollectionRelated}}/g, relatedCollection);


		//{{itemSwatch}}
		// Add item swatch
		itemHtml = itemHtml.replace(/{{itemSizeSwatches}}/g, buildSizeSwatches(data));

		// Add Quick view
		var itemQuickViewHtml = '';
		if (boostPFSConfig.custom.enable_quick_view) {
			itemQuickViewHtml = boostPFSTemplate.quickViewHtml;
		}
		itemHtml = itemHtml.replace(/{{itemQuickView}}/g, itemQuickViewHtml);

		// Add Review
		var itemReviewHtml = boostPFSConfig.custom.display_product_reviews ? boostPFSTemplate.reviewHtml : '';
		itemHtml = itemHtml.replace(/{{itemReview}}/g, itemReviewHtml);

		// Add Color Swatches
		itemHtml = itemHtml.replace(/{{itemColorSwatches}}/g, buildColorSwatches(data));

		// Add Wishlist
		itemHtml = itemHtml.replace(/{{itemWishlist}}/g, buildWishlist(data));

		// Image Swap
		// Image Swap
		var itemImageTwoHtml = '';  
		var itemImageClassHtml = '';
		if (images.length > 1) {
			itemImageClassHtml = 'images-one lazyload';
			itemImageTwoHtml = '<span class="images-two"><img src="' + itemFlipImageUrl + '" alt="{{itemTitle}}" /></span>';
		}
		itemHtml = itemHtml.replace(/{{itemImageClass}}/g, itemImageClassHtml);
		itemHtml = itemHtml.replace(/{{itemImageTwo}}/g, itemImageTwoHtml);

		// Add Description
		var itemDescription = '';
		if (data.body_html != '') {
			itemDescription = jQ('<p>' + data.body_html + '</p>').text();
			var tempArr = itemDescription.split('[/countdown]');
			itemDescription = tempArr.pop();
			itemDescription = Utils.truncateByWord(itemDescription, 50);
		}
		itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);

		// Add main attribute
		itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
		itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
		itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
		itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));

		return itemHtml;
	}

	ProductListItem.prototype.compileTemplate = function(data, index, totalProduct) {
		if (!data) data = this.data;
		if (!index) index = this.index;
		if (!totalProduct) totalProduct = this.totalProduct;

		/*** Prepare data ***/
		var images = data.images_info;
		// Displaying price base on the policy of Shopify, have to multiple by 100
		var soldOut = !data.available; // Check a product is out of stock
		var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
		var priceVaries = data.price_min != data.price_max; // Check a product has many prices
		// Get First Variant (selected_or_first_available_variant)
		var firstVariant = data['variants'][0];
		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
		var paramVariant = data.variants.filter(function(e) { return e.id == Utils.getParam('variant'); });
		if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
		for (var i = 0; i < data['variants'].length; i++) {
			if (data['variants'][i].available) {
			firstVariant = data['variants'][i];
			break;
			}
		}
		}
		/*** End Prepare data ***/

		// Get Template
		var itemHtml = boostPFSTemplate.productListItemHtml;

		// Add class
		itemHtml = soldOut ? itemHtml.replace(/{{itemSoldOutClass}}/g, boostPFSTemplate.soldOutClass) : itemHtml.replace(/{{itemSoldOutClass}}/g, '');
		itemHtml = onSale ? itemHtml.replace(/{{itemSaleClass}}/g, boostPFSTemplate.onSaleClass) : itemHtml.replace(/{{itemSaleClass}}/g, '');
		itemHtml = itemHtml.replace(/{{delayTime}}/g, boostPFSConfig.custom.time_lazy_load * index);

		// Add Thumbnail
		var itemThumbUrl = images.length > 0 ? Utils.optimizeImage(images[0]['src']) : boostPFSConfig.general.no_image_url;
		itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

		// Add Label
		var itemLabelsHtml = '';
		if (onSale || soldOut) {
			itemLabelsHtml += '<div class="product-label">';
			if (onSale) {
				itemLabelsHtml += '<strong class="label">' + boostPFSConfig.label.sale + '</strong>';
			}
			if (soldOut) {
				itemLabelsHtml += '<strong class="sold-out-label">' + boostPFSConfig.label.sold_out + '</strong>';
			}
			itemLabelsHtml += '</div>';
		}
		itemHtml = itemHtml.replace(/{{itemLabels}}/g, itemLabelsHtml);

		// Add Price
		var itemPriceHtml = '';
		if (onSale) {
			itemPriceHtml += '<p class="sale">';
			itemPriceHtml += '<span class="old-price money"> ' + Utils.formatMoney(data.compare_at_price_min) + '</span>';
			if (priceVaries) {
				itemPriceHtml += '<span class="special-price"><em>' + boostPFSConfig.label.from_price + ' </em>';
			} else {
				itemPriceHtml += '<span class="special-price">';
			}
			itemPriceHtml += Utils.formatMoney(data.price_min, Globals.moneyFormat);
			itemPriceHtml += '</span></p>';
		} else {
			itemPriceHtml += '<p class="regular-product">';
			if (priceVaries) {
				itemPriceHtml += '<span class="money"><em>' + boostPFSConfig.label.from_price + ' </em>' + Utils.formatMoney(data.price_min) + '</span>';
			} else {
				itemPriceHtml += '<span class="money">' + Utils.formatMoney(data.price_min) + '</span>';
			}
			itemPriceHtml += '</p>';
		}
		itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

		// Add Vendor
		var itemVendorHtml = '';
		if (boostPFSConfig.custom.show_vendor) {
			itemVendorHtml = '<div class="product-vendor">' + data.vendor + '</div>';
		}
		itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

		// Add to cart
		var itemAddToCartHtml = '<form action="/cart/add" method="post" class="variants" id="product-actions-{{itemId}}" enctype="multipart/form-data" style="padding:0px;">';
		if (soldOut) {
			itemAddToCartHtml += '<input class="btn add-to-cart-btn" type="submit" value="' + boostPFSConfig.label.unavailable + '" disabled="disabled"/>';
		} else {
			if (data.variants.length > 1) {
				itemAddToCartHtml += '<input class="btn" type="button" onclick="window.location.href=\'{{itemUrl}}\'" value="' + boostPFSConfig.label.select_options + '" />';
			} else {
				itemAddToCartHtml += '<input type="hidden" name="id" value="' + firstVariant.id + '" />';
				itemAddToCartHtml += '<input class="btn add-to-cart-btn" data-form-id="#product-actions-{{itemId}}" type="submit" value="' + boostPFSConfig.label.add_to_cart + '" />';
			}
		}
		itemAddToCartHtml += '</form>';
		itemHtml = itemHtml.replace(/{{itemAddToCart}}/g, itemAddToCartHtml);

		// Add Quick view
		var itemQuickViewHtml = '';
		if (boostPFSConfig.custom.enable_quick_view) {
			itemQuickViewHtml = boostPFSTemplate.quickViewHtml;
		}
		itemHtml = itemHtml.replace(/{{itemQuickView}}/g, itemQuickViewHtml);

		// Add Review
		var itemReviewHtml = boostPFSConfig.custom.display_product_reviews ? boostPFSTemplate.reviewHtml : '';
		itemHtml = itemHtml.replace(/{{itemReview}}/g, itemReviewHtml);

		// Add Color Swatches
		itemHtml = itemHtml.replace(/{{itemColorSwatches}}/g, buildColorSwatches(data));

		// Add Wishlist
		itemHtml = itemHtml.replace(/{{itemWishlist}}/g, buildWishlist(data));

		// Add Description
		var itemDescription = '';
		if (data.body_html.indexOf('[countdown]') !== -1) {
			itemDescription = jQ('<p>' + data.body_html + '</p>').text();
			var tempArr = itemDescription.split('[/countdown]');
			itemDescription = tempArr.pop();
			itemDescription = Utils.truncateByWord(itemDescription, 50);
		}
		itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);

		// Add main attribute
		itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
		itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
		itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
		itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));

		return itemHtml;
	}

	// Build Wishlist
	function buildWishlist(data) {
		if (!data) data = this.data;

		// Add Wishlist
		var wishlistHtml = '';
		if (boostPFSConfig.custom.enable_wishlist) {
			var value = (data.id).toString();
			var productId = (data.id).toString();
			for (var k = 0; k < boostPFSConfig.customer.tags.length; k++) {

				var tagID = boostPFSConfig['customer']['tags'][k];
				if (tagID.indexOf(productId) > -1) {
				value = 'x' + tagID;
				}
				if (value.length == 0) value = productId;
			}
			if (value.length > 0) {
				var check = ((value.length - productId.length) / 2).toString();
				check = check.split('.');
				var display = check.length > 1 && check[1].indexOf('5') > -1 ? false : true;
			}

			wishlistHtml += '<a class="search-product" href="#" id="'+data.handle+'" title="Quick View">\n' +
				'          <svg class="stroke-none" style="max-width: 100%; max-height: 100%" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M15.3333 14.7499L11.6667 11.0833C12.6667 9.99994 13.25 8.49994 13.25 6.91661C13.25 3.41661 10.4167 0.499939 6.83333 0.499939C3.33333 0.499939 0.5 3.33327 0.5 6.91661C0.5 10.4999 3.33333 13.3333 6.91667 13.3333C8.5 13.3333 10 12.7499 11.0833 11.7499L14.75 15.4166C14.8333 15.4999 14.9167 15.5833 15.0833 15.5833C15.25 15.5833 15.3333 15.4999 15.4167 15.4166C15.5 15.1666 15.5 14.9166 15.3333 14.7499ZM1.41667 6.91661C1.41667 3.91661 3.91667 1.41661 6.91667 1.41661C9.91667 1.41661 12.4167 3.91661 12.4167 6.91661C12.4167 9.91661 9.91667 12.4166 6.91667 12.4166C3.83333 12.4166 1.41667 9.91661 1.41667 6.91661Z" fill="white"></path>\n' +
				'</svg>\n' +
				'\n' +
				'        </a><a class="wishlist" data-icon-wishlist href="#" data-product-handle="' + data.handle + '"title="' + boostPFSConfig.label.wishlist_note + '" data-id="' + data.id + '">' +
				'<svg class="stroke-none" style="max-width: 100%; max-height: 100%" width="17" height="14" viewBox="0 0 17 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M12.205 0.333625C10.8616 0.326445 9.58441 0.916464 8.71903 1.94409C7.85907 0.90944 6.57836 0.317744 5.23304 0.333625C2.71107 0.333625 0.666626 2.37807 0.666626 4.90004C0.666626 9.22187 8.20939 13.4417 8.51519 13.6048C8.63857 13.6873 8.79949 13.6873 8.92291 13.6048C9.2287 13.4417 16.7715 9.28301 16.7715 4.90004C16.7715 2.37807 14.727 0.333625 12.205 0.333625ZM8.71903 12.7894C7.53665 12.0963 1.48206 8.40643 1.48206 4.90004C1.48206 2.82843 3.16144 1.14902 5.23308 1.14902C6.50169 1.13236 7.6889 1.77225 8.37249 2.84104C8.51129 3.03243 8.779 3.07508 8.97039 2.93625C9.00696 2.90971 9.03911 2.8776 9.0656 2.84104C10.1993 1.10719 12.524 0.620693 14.2578 1.75441C15.3192 2.44846 15.9581 3.63181 15.956 4.9C15.956 8.44717 9.90141 12.1166 8.71903 12.7894Z" fill="currentColor"></path>\n' +
				'</svg>' +
				'<span class="wishlist-text text-hover">' + boostPFSConfig.label.add_to_wishlist + '</span>' +
				'</a>';
		}
		return wishlistHtml;
	}

	// Build Size Swatches
	function buildSizeSwatches(data) {
		if (!data) data = this.data;

		var sizeSwatchesHtml = '';
		if (boostPFSConfig.custom.enable_size_swatch && data.available && data.variants.length > 0) {
		sizeSwatchesHtml += '<ul class="sizes-list">';

		for (var index = 0; index < data.options.length; index++) {
			var option = data['options'][index].toLowerCase();
			if (option == 'size') {
				var sizelist = '';
				var size = '';
				var totalVariants = 0;
				for (var k = 0; k < data.variants.length; k++) {
					var variant = data['variants'][k];
					size = variant['options'][index];
					if (sizelist.indexOf(size) == -1) {
						if (totalVariants < 4) {
							sizeSwatchesHtml += '<li class="size-item">';
							sizeSwatchesHtml += '<a title="' + size + '" href="' + Utils.buildProductItemUrl(data) + '?variant=' + variant.id + '">' + size + '</a>';
							sizeSwatchesHtml += '</li>';
						}
						var templist = sizelist + size + ' ';
						sizelist = templist;

						totalVariants++;
					}
				}

				if (totalVariants >= 4) {
					sizeSwatchesHtml += '<li class="item-size-more">';
					sizeSwatchesHtml += '<a href="{{itemUrl}}" title="More Size">+' + (totalVariants - 3) + '</a>';
					sizeSwatchesHtml += '</li>';
					totalVariants = 0;
				}
			}
		}

		sizeSwatchesHtml += '</ul>';
		}

		return sizeSwatchesHtml;
	}

	// Build Color Swatches
	function buildColorSwatches(data) {
		if (!data) data = this.data;

		var colorSwatchesHtml = '';
		if (boostPFSConfig.custom.display_item_swatch) {
		colorSwatchesHtml += '<ul class="item-swatch">';
		for (var index = 0; index < data.options.length; index++) {
			var option = data['options'][index].toLowerCase();
			if (option == 'color') {
				var colorlist = '';
				var color = '';
				var totalVariants = 0;
				for (var k = 0; k < data.variants.length; k++) {
					var variant = data['variants'][k];
					color = variant['options'][index];
					if (colorlist.indexOf(color) == -1) {
					if (totalVariants < 4) {
						var text = Utils.slugify(color);
						var border = text == 'white' ? 'border: 1px solid #cbcbcb;' : '';
						var backgroundImage = Utils.optimizeImage(variant.image, '24x');
						var dataImg = '';
						var dataColor = '#fff';
						if (variant.image !== null) {
							dataImg = "data-img='" + Utils.optimizeImage(variant.image) + "'";
						} else {
							var _file = variant.option_color.toLowerCase().replace(/ /g, '-');
							var dataColors = variant.option_color.toLowerCase().split(' ');
							var i = dataColors.length - 1;
							if (dataColors[i] !== '' && dataColors[i] !== 'colors') {
								dataColor = dataColors[i];
							}

							backgroundImage = boostPFSConfig.general.asset_url.replace('boost-pfs-filter.js', _file + '.png')
						}

						colorSwatchesHtml += '<li>';
						colorSwatchesHtml += '<div class="tooltip">' + color + '</div>';
						colorSwatchesHtml += '<label style="' + border + 'background-image: url(' + backgroundImage + '); background-color: ' + dataColor + ';"' + dataImg + '></label>';

						// colorSwatchesHtml += '<label style="' + border + 'background-image: url(' + Utils.optimizeImage(variant.image, '24x') + ');"' + if (variant.image !== null){ + 'data-img="' + Utils.optimizeImage(variant.image) + '"' + } '></label>';
						colorSwatchesHtml += '</li>';

					}
					var templist = colorlist + color + ' ';
					colorlist = templist;

					totalVariants++;

					}

				}

				if (totalVariants > 4) {
					colorSwatchesHtml += '<li class="item-swatch-more">';
					colorSwatchesHtml += '<a href="{{itemUrl}}" title="More Color">+' + (totalVariants - 4) + '</a>';
					colorSwatchesHtml += '</li>';
					totalVariants = 0;
				}
			}
		}
		colorSwatchesHtml += '</ul>';
		}
		return colorSwatchesHtml;
	}

	// Build Pagination
	ProductPaginationDefault.prototype.compileTemplate = function(totalProduct) {
		if (!totalProduct) totalProduct = this.totalProduct;

		// Get page info
		var currentPage = parseInt(Globals.queryParams.page);
		var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);

		if (totalPage > 1) {
			var paginationHtml = boostPFSTemplate.paginateHtml;

			// Build Previous
			var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : boostPFSTemplate.previousDisabledHtml;
			previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
			paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

			// Build Next
			var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : boostPFSTemplate.nextDisabledHtml;
			nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
			paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

			// Create page items array
			var beforeCurrentPageArr = [];
			for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
				beforeCurrentPageArr.unshift(iBefore);
			}
			if (currentPage - 4 > 0) {
				beforeCurrentPageArr.unshift('...');
			}
			if (currentPage - 4 >= 0) {
				beforeCurrentPageArr.unshift(1);
			}
			beforeCurrentPageArr.push(currentPage);

			var afterCurrentPageArr = [];
			for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
				afterCurrentPageArr.push(iAfter);
			}
			if (currentPage + 3 < totalPage) {
				afterCurrentPageArr.push('...');
			}
			if (currentPage + 3 <= totalPage) {
				afterCurrentPageArr.push(totalPage);
			}

			// Build page items
			var pageItemsHtml = '';
			var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
			for (var iPage = 0; iPage < pageArr.length; iPage++) {
				if (pageArr[iPage] == '...') {
					pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
				} else {
					pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
				}
				pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
				pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
			}
			paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

			return paginationHtml;
		}

		return '';
	};

	// Build Sorting
	ProductSorting.prototype.compileTemplate = function() {
		if (boostPFSTemplate.hasOwnProperty('sortingHtml')) {
			var self = this;
			var sortingArr = Utils.getSortingList();
			if (sortingArr) {
				// Build content
				var sortingItemsHtml = '';
				for (var k in sortingArr) {
					var activeClass = Globals.queryParams.sort == k ? 'active' : '';
					sortingItemsHtml += '<li><a data-boost-sort-value="' + sortingArr[k] + '" href="#" data-boost-sort="' + k + '" class="' + activeClass + '">' + sortingArr[k] + '</a></li>';
				}
				var html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
				return jQ.parseHTML(html);
				
			}
		}
		return '';
	};

	// Build Sorting event
	ProductSorting.prototype.bindEvents = function () {
		var _this = this;
		jQ(Selector.topSorting).find('a').click(function (e) {
			e.preventDefault();
			// Append "sort" param to url
			// Used to Scroll to the previous position after returning from Product page
			FilterApi.setParam('sort', jQ(this).data('boost-sort'));
			FilterApi.applyFilter('sort');
		})

		var sortingSelector = jQ(Selector.topSorting);
		sortingSelector.find('label').click(function(e) {
			e.preventDefault();
			if (!sortingSelector.find('.boost-pfs-filter-filter-dropdown').is(':animated')) {
			sortingSelector.find('.boost-pfs-filter-filter-dropdown').toggle();
			sortingSelector.toggleClass('boost-pfs-filter-sort-active');
			}
		});
	};

	ProductSorting.prototype.afterBindEvents = function () {
		var sortingSelector = jQ(Selector.topSorting);
		sortingSelector.removeClass('boost-pfs-filter-sort-active');
		sortingSelector.find('.boost-pfs-filter-top-sorting-label').text(sortingSelector.find('a[data-boost-sort="' + Globals.queryParams.sort + '"]').data('boost-sort-value'));
	};

	ProductList.prototype.afterRender = function(data) {
		if (!data) data = this.data; 

		/**
		 * Reinit theme function
		 * 1. Add `var bcElla;` to assets/ella.min.js
		 * 2. In assets/ella.min.js, find XXX.init(), for example: f.init()
		 * 3. Go to the end of assets/ella.min.js, replace: `}(jQuery);` by `bcElla = XXX;}(jQuery);`   * 
		 */
		if (typeof bcElla != 'undefined') {
			bcElla.initAddToCart();
			bcElla.initGroupedAddToCart();
			bcElla.changeQuantityAddToCart();
			bcElla.initStickyAddToCart();
			bcElla.initQuickView();
			bcElla.initColorSwatchGrid();
		}
		var activeClass = '';
		var activeViewAs = jQ('.view-mode').find('.active').data('col');
		switch (activeViewAs) {
			case 1: 
				activeClass = 'col-12';
				break;
			case 2:
				activeClass = 'col-6';
				break;
			case 3: 
				activeClass = 'col-6 col-md-4';
				break;
			case 4:
				activeClass = 'col-6 col-md-4 col-lg-3';
				break;
			default:
				activeClass = 'col-6 col-md-4 col-lg-3 ';
		}
		jQ(Selector.products + ' .grid-item').removeClass(boostPFSConfig.custom.grid_item_width).addClass(activeClass);
	};

	// Build Additional Elements
	FilterResult.prototype.afterRender = function(data) {
		if (!data) data = this.data;

		if (data.products.length > 0){
			$('.padding').css('display','flex')
		} else {
			$('.padding').hide()
		}

		if(jQ('.boost-pfs-filter-total-products').length > 0 && data.products.length > 0){
			var from = Globals.queryParams.page == 1 ? Globals.queryParams.page : (Globals.queryParams.page - 1) * Globals.queryParams.limit + 1;
			var to = from + data.products.length - 1;
			var totalProductsSelector = jQ('.boost-pfs-filter-total-products');
			var totalProduct = boostPFSConfig.label.toolbar_showing + ' ' + from + '-' + to + ' ' +  boostPFSConfig.label.toolbar_of + ' ' + data.total_product;
			totalProductsSelector.empty().html(totalProduct);
			$('.count-products').html(data.total_product);
		}
		var sortingSelector = jQ(Selector.topSorting);
		jQ(document).click(function (e) {
			var container = sortingSelector.find('label');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
			sortingSelector.find('.boost-pfs-filter-filter-dropdown').hide();
			sortingSelector.removeClass('boost-pfs-filter-sort-active');
			}
		});
	};

})();