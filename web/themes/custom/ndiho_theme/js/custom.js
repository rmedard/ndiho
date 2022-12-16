/**
 * @file
 * Global utilities.
 *
 */
(function() {

  'use strict';

  Drupal.behaviors.ndiho_theme = {
    attach: function(context, settings) {

      AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease-in', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });

      /**
       * Donation form
       */

      const form = document.getElementById('donation-form');
      if (form) {
        let donation = 0;
        const freeDonationField = form.querySelector('div.free-donation-field');
        const donateSubmitBtn = form.querySelector('button#donate-submit-btn');
        form.querySelectorAll('input[type=radio]').forEach(radio => {
          if (radio.hasAttribute('checked')) {
            donation = parseInt(radio.value);
          }
          radio.addEventListener('change', function (value) {
            let selectedValue = radio.value;
            if (selectedValue === 'other') {
              donation = 0;
              freeDonationField.removeAttribute('hidden');
              freeDonationField.querySelector('input').focus();
            } else {
              freeDonationField.setAttribute('hidden', "true");
              donation = parseInt(selectedValue);
            }
          })
        });
        freeDonationField.querySelector('input').addEventListener('keyup', function () {
          donation = parseInt(this.value);
        });
        donateSubmitBtn.addEventListener('click', function () {
          if (donation > 0) {
            window.open('https://www.paypal.com/paypalme/rebero/' + donation);
          }
        });
      }

      /**
       * End of donation form
       */
    }
  };

})();
