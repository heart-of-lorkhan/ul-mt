import Swiper, { Navigation } from "swiper";

export const exploreSlider = (function () {
  const init = function () {
    const exploreSwiper = new Swiper(".js-explore-slider", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 8,
      navigation: {
        nextEl: ".js-explore-slider-next",
        prevEl: ".js-explore-slider-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
      }
    });
  };

  return {
    init,
  };
})();
