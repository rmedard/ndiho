/**
 * @file
 * Global utilities.
 *
 */
(function () {

  'use strict';

  Drupal.behaviors.ndiho_theme = {
    attach: function (context, settings) {

      AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet',
                        // 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the
                                        // document, that AOS should initialize
                                        // on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as
                              // classes on scroll
        disableMutationObserver: false, // disables automatic mutations'
                                        // detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window
                           // (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the
                           // page (advanced)

        // Settings that can be overridden on per-element basis, by
        // `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease-in', // default easing for AOS animations
        once: true, // whether animation should happen only once - while
                    // scrolling down
        mirror: false, // whether elements should animate out while scrolling
                       // past them
        anchorPlacement: 'top-bottom', // defines which position of the element
                                       // regarding to window should trigger
                                       // the animation
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
            form.querySelectorAll('label').forEach((el) => {
              el.classList.remove('btn-dark');
              el.classList.add('btn-outline-dark');
            });
            const selectedInput = form.querySelector(`input[value="${selectedValue}"]`);
            const selectedInputLabel = form.querySelector(`label[for="${selectedInput.id}"]`)
            selectedInputLabel.classList.remove('btn-outline-dark');
            selectedInputLabel.classList.add('btn-dark');
            if (selectedValue === 'other') {
              donation = 0;
              freeDonationField.removeAttribute('hidden');
              freeDonationField.querySelector('input').focus();
            }
            else {
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

      /**
       * Dropdown menu
       */
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach((menu) => {
        const id = Math.random().toString(36).slice(2, 7);
        menu.setAttribute('id', `drop-down-${id}`);
        let dropdownMenu = menu.parentElement.querySelector('ul.dropdown-menu');
        dropdownMenu.setAttribute('aria-labelledby', `drop-down-${id}`);
        let dropdown = new mdb.Dropdown(menu);
        let itemHovered = false;
        let menuHovered = false;
        const cursorTimeout = 100;
        menu.addEventListener('mouseover', function () {
          menuHovered = true;
          dropdown.show();
        });
        menu.addEventListener('mouseleave', function () {
          menuHovered = false;
          setTimeout(function () {
            if (itemHovered === false && menuHovered === false) {
              dropdown.hide();
            }
          }, cursorTimeout);
        });
        dropdownMenu.querySelectorAll('li').forEach(item => {
          item.addEventListener('mouseover', function () {
            itemHovered = true;
          });
          item.addEventListener('mouseleave', function () {
            itemHovered = false;
            setTimeout(function () {
              if (itemHovered === false && menuHovered === false) {
                dropdown.hide();
              }
            }, cursorTimeout);
          });
        });
      });
      /**
       * End of dropdown menu
       */
    }
  };

})();
