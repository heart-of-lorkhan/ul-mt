import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const repertoireSlider = (function () {
  const init = function () {
    const swiper = new Swiper(".repertoire-slider", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: "true",
        type: "bullets",
        bulletElement: "button",
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 640px
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1366: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  };

  return {
    init,
  };
})();
