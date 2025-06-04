initializeSliders();
initializeModals();
initializeTabs();

function initializeSliders() {
  const productCarousel = new Swiper('.product-carousel', {
    loop: true,

    navigation: {
      nextEl: '.product-carousel__button-next',
      prevEl: '.product-carousel__button-prev',
    },

    slidesPerView: 3,
    breakpoints: {
      320: {
        slidesPerView: 2.85
      },
      664: {
        slidesPerView: 2.7
      }
    }
  });

}

function initializeModals() {

  const modalWrapper = document.querySelector('.modal-wrapper');
  sectionsModal();
  searchModal();

  function sectionsModal() {
    const modalSections = document.querySelector('.modal-sections');

    const modalSectionsClose = document.querySelector('.modal-sections__close');

    const burger = document.querySelector('[data-js-burger-btn]');

    burger.addEventListener('click', () => {
      modalWrapper.classList.toggle('active');
      modalSections.classList.toggle('active');
    })

    modalSectionsClose.addEventListener('click', () => {
      modalWrapper.classList.toggle('active');
      modalSections.classList.toggle('active');
    });
  }

  function searchModal() {
    const searchBtn = document.querySelector('[data-js-search-btn]');
    const modalSearch = document.querySelector('.modal-search');
    const modalSearchClose = document.querySelector('.modal-search__close');

    searchBtn.addEventListener('click', () => {
      modalWrapper.classList.toggle('active');
      modalSearch.classList.toggle('active');
    })

    modalSearchClose.addEventListener('click', () => {
      modalWrapper.classList.toggle('active');
      modalSearch.classList.toggle('active');
    })

  }

}

function initializeTabs() {
  const tabBtn1 = document.querySelector('[data-js-women]');
  const tabBtn2 = document.querySelector('[data-js-men]');

  const tabs = document.querySelectorAll('.modal-sections__tab');

  tabBtn1.addEventListener('click', () => {
    tabBtn1.classList.add('active');
    tabBtn2.classList.remove('active');
    tabs[1].classList.remove('active');
    tabs[0].classList.add('active');
  })
  tabBtn2.addEventListener('click', () => {
    tabBtn2.classList.add('active');
    tabBtn1.classList.remove('active');
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
  })
}