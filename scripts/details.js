initializeSliders();

function initializeSliders() {
  const detailsSlider = new Swiper('.details__slider', {
    loop: true,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });
}