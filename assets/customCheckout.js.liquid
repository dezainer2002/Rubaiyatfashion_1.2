$(document).on('page:load page:change', function () {
  replaceCityField();

  $('#checkout_shipping_address_country').on('change', function () {
    try {
      replaceCityField();
    }
    catch ( err ) {
      console.log ( 'ERROR #checkout_shipping_address_country', err.message );
    }
  });

  if ( Shopify.Checkout.step == 'contact_information' ) {
    try {

      const selectedCountry   =   $( '.section--shipping-address #checkout_shipping_address_country' ).val();

      console.log ( 'selectedCountry', selectedCountry );

      if ( selectedCountry == 'Saudi Arabia' ) {
        activateRegionField( $( '.section--shipping-address #checkout_shipping_address_country' ), 'onLoad' );

        selectRegionAccordingToCity( 'onLoad' );

      }

    }
    catch ( err ) {

      console.log ( `ERROR Shopify.Checkout.step == 'contact_information'`, err.message );

    }

    $( document )
    .on('change', '.section--shipping-address #checkout_shipping_address_country', function() {
      try {
        activateRegionField( this );
      }
      catch ( err ) {
        console.log ( 'ERROR .section--shipping-address #checkout_shipping_address_country', err.message );
      }
    })

    .on('change', '#checkout_shipping_address_region', function() {
      try {
        const regionObj     =   $( this ).val();
        sessionStorage.setItem('shippingAddressRegion', regionObj);

        if ( regionObj != '' ) {
          $( '#continue_button' ).prop( 'disabled', false ).find( '.clickableBtn' ).remove();
        } else {
          $( '#continue_button' ).prop( 'disabled', true ).prepend( '<div class="clickableBtn"></div>' );
        }
      }
      catch ( err ) {
        console.log ( 'ERROR #checkout_shipping_address_region', err.message );
      }
    })

    .on('click', '#continue_button[disabled] .clickableBtn', function( e ) {
      try {
        e.stopImmediatePropagation();

        console.log ( 'chaaaaaa' );

        $( '.contactRegionIs' ).addClass( 'field--error' );
      }
      catch ( err ) {
        console.log ( 'ERROR #checkout_shipping_address_region', err.message );
      }
    })

    .on('change', '#checkout_shipping_address_city', function() {
      try {
        selectRegionAccordingToCity();
      }
      catch ( err ) {
        console.log ( 'ERROR #checkout_shipping_address_city', err.message );
      }
    })
    ;

  }

});

function activateRegionField( this_, loadType = '' ) {
  try {
    const getCountry        =    $( this_ ).val();

    let selectedRegion      =   '';

    if ( loadType == 'onLoad' ) {
        selectedRegion    =   sessionStorage.getItem( 'shippingAddressRegion' );
    }

    console.log ( 'selectedRegion', selectedRegion );

    if ( getCountry == 'Saudi Arabia' ) {

        const arrayLength           =   regionArr.length;

        let regionOptions           =   '';

        for ( let i = 0; i < arrayLength; i++ ) {
            const r         =   regionArr[i];
            regionOptions   +=  `<option value="${ r }" ${ loadType == 'onLoad' && selectedRegion == r ? 'selected' : '' }>${ r }</option>`;
        }

        const isAvailableRegion     =   $( '.contactCityIs' ).length;

        if ( isAvailableRegion > 0 ) {
          $( '.contactCityIs' ).addClass( 'field--half' );
          $( '.contactRegionIs' ).show();
        } else {
          $( 'label[for="checkout_shipping_address_city"]' ).closest( '.field.field--show-floating-label' ).addClass( 'field--half contactCityIs' );
          $( '.contactCityIs' ).after( `
            <div class="field field--required ${ loadType == 'onLoad' && selectedRegion == '' ? 'field--error' : '' } field--show-floating-label field--half contactRegionIs">
              <div class="field__input-wrapper field__input-wrapper--select">
                <label class="field__label field__label--visible" for="checkout_shipping_address_region">${ lang__region }</label>
                <select class="field__input field__input--select" name="checkout[attributes][region]" id="checkout_shipping_address_region">
                  <option selected value="">${ lang__selectRegion }</option>
                  ${ regionOptions }
                </select>
                <div class="field__caret shown-if-js">
                  <svg class="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg" role="presentation"><use xlink:href="#caret-down"></use></svg>
                </div>
              </div>
              <p class="field__message field__message--error" id="error-for-address1">${ lang__selectRegion }</p>
            </div>
          ` );

          selectRegionAccordingToCity();
          // $( '#continue_button' ).prop( 'disabled', true ).prepend( '<div class="clickableBtn"></div>' );

        }

        if ( selectedRegion != '' ) {
          // console.log ( 'it should be active' );
          $( '#continue_button' ).prop( 'disabled', false ).find( '.clickableBtn' ).remove();
        }

    } else {

      $( '#continue_button' ).prop( 'disabled', false ).find( '.clickableBtn' ).remove();
      $( '#continue_button' ).prop( 'disabled', false );
      $( '.contactCityIs' ).removeClass( 'field--half' );
      const isAvailableRegion     =   $( '.contactRegionIs' ).length;

      if ( isAvailableRegion > 0 ) {
        $( '.contactRegionIs' ).hide();
      }
    }
  }
  catch ( err ) {
    console.log ( 'ERROR activateRegionField', err.message );
  }
}

function selectRegionAccordingToCity( loadType = '' ) {
  try {
    let sessionCity;
    if ( loadType == 'onLoad' ) {
      sessionCity       =     sessionStorage.getItem( 'shippingAddressCity' );
      if ( sessionCity != '' ) {
        $( `#checkout_shipping_address_city` ).val( sessionCity ).trigger( 'change' );
      }
    }

    const getCity       =     loadType == 'onLoad' && sessionCity != '' ? sessionCity : $( '#checkout_shipping_address_city' ).val();

    let getCityMatched  =     false;
    let regionIs        =     '';
    if ( getCity == 'Makkah Al Mukarramah' || getCity == 'Al Madinah Al Munawwarah' || getCity == 'Jeddah' || getCity == 'At Taif' || getCity == 'Khaybar' || getCity == 'Rabigh' || getCity == 'Yanbu' || getCity == 'Badr' || getCity == 'Al Khurmah' || getCity == 'Al Jumum' || getCity == 'Al Qunfidhah' || getCity == 'Thuwal' || getCity == 'Turbah' || getCity == 'Sharurah' || getCity == 'Najran' || getCity == 'King Abdullah Economic City' ) {
      getCityMatched  =     true;
      regionIs        =     'Western';
    } else if ( getCity == 'Riyadh' || getCity == 'Hail' || getCity == 'Buraydah' || getCity == 'Al Majmaah' || getCity == 'Unayzah' || getCity == 'Az Zulfi' || getCity == 'Al Ghat' || getCity == 'Afif' || getCity == 'Thadiq' || getCity == 'Shaqra' || getCity == 'Ad Duwadimi' || getCity == 'Ad Diriyah' || getCity == 'Quwayiyah' || getCity == 'Al Muzahimiyah' || getCity == 'Al Kharj' || getCity == 'Ad Dilam' || getCity == 'Ash Shinan' || getCity == 'As Sulayyil' || getCity == 'Ar Rass' || getCity == 'Al Midhnab' || getCity == 'Riyad Al Khabra' || getCity == 'Al Badai' || getCity == 'Al Bukayriyah' || getCity == 'Ash Shimasiyah' || getCity == 'Al Hariq' || getCity == 'Hawtat Bani Tamim' || getCity == 'Layla' ) {
      getCityMatched  =     true;
      regionIs        =     'Central';
    } else if ( getCity == 'Tabuk' || getCity == 'Al Wajh' || getCity == 'Umluj' || getCity == 'Duba' || getCity == 'Turaif' || getCity == 'Arar' || getCity == 'Al Qurayyat' || getCity == 'Sakaka' || getCity == 'Rafha' || getCity == 'Dawmat Al Jandal' || getCity == 'Tabarjal' ) {
      getCityMatched  =     true;
      regionIs        =     'Northern';
    } else if ( getCity == 'Al Hufuf' || getCity == 'Ad Dammam' || getCity == 'Al Khubar' || getCity == 'Hafar Al Batin' || getCity == 'Al Qatif' || getCity == 'Qaryat Al Ulya' || getCity == 'Al Jubail' || getCity == 'An Nuayriyah' || getCity == 'Dhahran' || getCity == 'Buqayq' || getCity == 'Sayhat' || getCity == 'Tarut' || getCity == 'Safwa' || getCity == 'Inak' || getCity == 'Al Khafji' || getCity == 'Ras Tannurah' ) {
      getCityMatched  =     true;
      regionIs        =     'Eastern';
    } else if ( getCity == 'Abha' || getCity == 'Jazan' || getCity == 'Khamis Mushayt' || getCity == 'Ahad Rifaydah' || getCity == 'Al Majardah' || getCity == 'Tathilith' || getCity == 'Bishah' || getCity == 'Al Baha' || getCity == 'Muhayil' || getCity == 'Billasmar' || getCity == 'Sabya' || getCity == 'Abu Arish' || getCity == 'Samtah' || getCity == 'Ahad Al Musarihah' ) {
      getCityMatched  =     true;
      regionIs        =     'Southern';
    }

    if ( getCityMatched === true && regionIs != '' ) {
      $( `#checkout_shipping_address_region` ).val( regionIs ).trigger( 'change' );
    }
    sessionStorage.setItem('shippingAddressCity', getCity);
  }
  catch ( err ) {
    console.log ( 'ERROR selectRegionAccordingToCity', err.message );
  }
}

function replaceCityField() {
  try {

    if ($('#checkout_shipping_address_country').val() == 'Saudi Arabia') {
      var field = new DropdownField({
        name   : 'city',
        options: [
          {text: 'Riyadh', value: 'Riyadh'},
          {text: 'Tabuk', value: 'Tabuk'},
          {text: 'At Taif', value: 'At Taif'},
          {text: 'Makkah Al Mukarramah', value: 'Makkah Al Mukarramah'},
          {text: 'Hail', value: 'Hail'},
          {text: 'Buraydah', value: 'Buraydah'},
          {text: 'Al Hufuf', value: 'Al Hufuf'},
          {text: 'Ad Dammam', value: 'Ad Dammam'},
          {text: 'Al Madinah Al Munawwarah', value: 'Al Madinah Al Munawwarah'},
          {text: 'Abha', value: 'Abha'},
          {text: 'Jeddah', value: 'Jeddah'},
          {text: 'Jazan', value: 'Jazan'},
          {text: 'Al Majmaah', value: 'Al Majmaah'},
          {text: 'Al Khubar', value: 'Al Khubar'},
          {text: 'Hafar Al Batin', value: 'Hafar Al Batin'},
          {text: 'Khamis Mushayt', value: 'Khamis Mushayt'},
          {text: 'Ahad Rifaydah', value: 'Ahad Rifaydah'},
          {text: 'Al Qatif', value: 'Al Qatif'},
          {text: 'Unayzah', value: 'Unayzah'},
          {text: 'Qaryat Al Ulya', value: 'Qaryat Al Ulya'},
          {text: 'Al Jubail', value: 'Al Jubail'},
          {text: 'An Nuayriyah', value: 'An Nuayriyah'},
          {text: 'Dhahran', value: 'Dhahran'},
          {text: 'Al Wajh', value: 'Al Wajh'},
          {text: 'Buqayq', value: 'Buqayq'},
          {text: 'Az Zulfi', value: 'Az Zulfi'},
          {text: 'Khaybar', value: 'Khaybar'},
          {text: 'Al Ghat', value: 'Al Ghat'},
          {text: 'Umluj', value: 'Umluj'},
          {text: 'Rabigh', value: 'Rabigh'},
          {text: 'Afif', value: 'Afif'},
          {text: 'Thadiq', value: 'Thadiq'},
          {text: 'Sayhat', value: 'Sayhat'},
          {text: 'Tarut', value: 'Tarut'},
          {text: 'Yanbu', value: 'Yanbu'},
          {text: 'Shaqra', value: 'Shaqra'},
          {text: 'Ad Duwadimi', value: 'Ad Duwadimi'},
          {text: 'Ad Diriyah', value: 'Ad Diriyah'},
          {text: 'Quwayiyah', value: 'Quwayiyah'},
          {text: 'Al Muzahimiyah', value: 'Al Muzahimiyah'},
          {text: 'Badr', value: 'Badr'},
          {text: 'Al Kharj', value: 'Al Kharj'},
          {text: 'Ad Dilam', value: 'Ad Dilam'},
          {text: 'Ash Shinan', value: 'Ash Shinan'},
          {text: 'Al Khurmah', value: 'Al Khurmah'},
          {text: 'Al Jumum', value: 'Al Jumum'},
          {text: 'Al Majardah', value: 'Al Majardah'},
          {text: 'As Sulayyil', value: 'As Sulayyil'},
          {text: 'Tathilith', value: 'Tathilith'},
          {text: 'Bishah', value: 'Bishah'},
          {text: 'Al Baha', value: 'Al Baha'},
          {text: 'Al Qunfidhah', value: 'Al Qunfidhah'},
          {text: 'Muhayil', value: 'Muhayil'},
          {text: 'Thuwal', value: 'Thuwal'},
          {text: 'Duba', value: 'Duba'},
          {text: 'Turbah', value: 'Turbah'},
          {text: 'Safwa', value: 'Safwa'},
          {text: 'Inak', value: 'Inak'},
          {text: 'Turaif', value: 'Turaif'},
          {text: 'Arar', value: 'Arar'},
          {text: 'Al Qurayyat', value: 'Al Qurayyat'},
          {text: 'Sakaka', value: 'Sakaka'},
          {text: 'Rafha', value: 'Rafha'},
          {text: 'Dawmat Al Jandal', value: 'Dawmat Al Jandal'},
          {text: 'Ar Rass', value: 'Ar Rass'},
          {text: 'Al Midhnab', value: 'Al Midhnab'},
          {text: 'Al Khafji', value: 'Al Khafji'},
          {text: 'Riyad Al Khabra', value: 'Riyad Al Khabra'},
          {text: 'Al Badai', value: 'Al Badai'},
          {text: 'Ras Tannurah', value: 'Ras Tannurah'},
          {text: 'Al Bukayriyah', value: 'Al Bukayriyah'},
          {text: 'Ash Shimasiyah', value: 'Ash Shimasiyah'},
          {text: 'Al Hariq', value: 'Al Hariq'},
          {text: 'Hawtat Bani Tamim', value: 'Hawtat Bani Tamim'},
          {text: 'Layla', value: 'Layla'},
          {text: 'Billasmar', value: 'Billasmar'},
          {text: 'Sharurah', value: 'Sharurah'},
          {text: 'Najran', value: 'Najran'},
          {text: 'Sabya', value: 'Sabya'},
          {text: 'Abu Arish', value: 'Abu Arish'},
          {text: 'Samtah', value: 'Samtah'},
          {text: 'Ahad Al Musarihah', value: 'Ahad Al Musarihah'},
          {text: 'King Abdullah Economic City', value: 'King Abdullah Economic City'},
          {text: 'Tabarjal', value: 'Tabarjal'}
        ],
        label: 'City',
      });

      //Insert before Phone field
      if (!jQuery('select#checkout_shipping_address_city').length) {
        $(field).insertAfter('.section--shipping-address [data-address-fields]');
      }

      // console.log(jQuery("div[data-address-field='city']"));
      // jQuery("div[data-address-field='city']").remove();

      jQuery('input#checkout_shipping_address_city').parent().next('.field__message').remove();

      jQuery('input#checkout_shipping_address_city').parent().remove();

      // $('#checkout_shipping_address_city').attr('disabled', 'disabled');
    } else {
      if (jQuery('select#checkout_shipping_address_city').length) {
        jQuery('select#checkout_shipping_address_city').closest('.field').remove();
      }

      if (!jQuery('input#checkout_shipping_address_city').length) {
        var city = document.createElement('div');
        city = jQuery(city).html('<div data-address-field="city" data-autocomplete-field-container="true" class="field field--required">\n' +
            '    \n' +
            '    <div class="field__input-wrapper"><label class="field__label field__label--visible" for="checkout_shipping_address_city">City</label>\n' +
            '      <input placeholder="City" autocomplete="shipping address-level2" autocorrect="off" data-backup="city" class="field__input" aria-required="true" size="30" type="text" name="checkout[shipping_address][city]" id="checkout_shipping_address_city">\n' +
            '    </div>\n' +
            '</div>');
        city.insertAfter('.section--shipping-address [data-address-fields]');
      }
    }
  }
  catch ( err ) {
    console.log ( 'ERROR replaceCityField', err.message );
  }
}
