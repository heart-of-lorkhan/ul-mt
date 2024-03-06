import Swiper, { Navigation } from "swiper";

export const navSlider = (function () {
  const init = function () {
    const swiperNavSlider = new Swiper(".js-tabs-slider", {
      modules: [Navigation],
      slidesPerView: "auto",
      spaceBetween: 2,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 16,
        },
      },
    });
  };

  return {
    init,
  };
})();
