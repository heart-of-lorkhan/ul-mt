import Swiper, { Navigation } from "swiper";

export const providersSlider = (function () {
  const init = function () {
    const providersSwiper = new Swiper(".js-providers-slider", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 8,
      navigation: {
        nextEl: ".js-providers-slider-next",
        prevEl: ".js-providers-slider-prev",
      },
      breakpoints: {
        360: {
          slidesPerView: 2,
          spaceBetween: 11,
        },
        620: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1025: {
          slidesPerView: 5,
          spaceBetween: 16,
        }
      }
    });
  };

  return {
    init,
  };
})();
