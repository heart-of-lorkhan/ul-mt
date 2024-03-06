import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export const heroSlider = (function () {
  const init = function () {
    const swiper = new Swiper(".hero-slider", {
      modules: [Autoplay, Navigation, Pagination],
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
      spaceBetween: 0,
      autoplay: {
        delay: 6000,
      },
    });
  };

  return {
    init,
  };
})();
