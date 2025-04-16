import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperSliderInit = () => {
  
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 14,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  
  const swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    modules: [Navigation]
  });
  
}


export { swiperSliderInit }