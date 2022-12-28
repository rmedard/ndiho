/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal, once) {

  'use strict';

  Drupal.behaviors.ndiho_theme = {
    attach: function (context, settings) {
      initAos();
      initDropDownMenus();

      const form = once.find('donation-form', context)[0];
      if (form !== undefined) {
        console.log(form.localName);
        const donationButton = once.find('submit-donation-btn', form).at(0);
        const donationInput = once.find('donation-amount', form).at(0);
        let donation = donationInput.value;
        const freeDonationField = once.find('free-donation-field', form).at(0);
        const radios = once('fetch_radios', 'input[type=radio]', form);
        radios.forEach(function (radio) {
          radio.addEventListener('change', function (event) {
            const checkedInput = event.currentTarget;
            if (checkedInput instanceof Element) {
              const checkedLabel = form.querySelector(`label[for="${checkedInput.id}"]`);
              if (checkedInput.checked) {
                donation = parseInt(checkedInput.value);
                checkedLabel.classList.add('btn-dark');
                checkedLabel.classList.remove('btn-outline-dark');
                if (checkedInput.value === 'other') {
                  donationInput.value = 0;
                  freeDonationField.removeAttribute('hidden');
                  freeDonationField.querySelector('input').focus();
                }
                else {
                  freeDonationField.setAttribute('hidden', 'true');
                }
              }

              radios
                .filter(radio => radio.id !== checkedInput.id)
                .forEach(uncheckedRadio => {
                  if (uncheckedRadio.id !== checkedInput.id) {
                    const uncheckedLabel = form.querySelector(`label[for="${uncheckedRadio.id}"]`);
                    uncheckedLabel.classList.remove('btn-dark');
                    uncheckedLabel.classList.add('btn-outline-dark');
                  }
                });
            }
          });
        });
        donationInput.addEventListener('keyup', function () {
          donation = parseInt(this.value);
        });
        donationButton.addEventListener('click', function (e) {
          if (donation > 0) {
            window.open('https://www.paypal.com/paypalme/rebero/' + donation);
          }
        });
      }
    }
  };

  function initAos() {
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
  }

  function initDropDownMenus() {
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
  }

}(Drupal, once));
