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
        slidesPerView: 3,
        spaceBetween: 13
      },
      480: {
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
  const modalSections = document.querySelector('.modal-sections');
  const modalSearch = document.querySelector('.modal-search');
  const modalCart = document.querySelector('.modal-cart');
  sectionsModal();
  searchModal();
  cartModal();
  closeOnClickOutside();

  let scroll = 0;

  function initializeScrollBlock() {
    scroll = window.scrollY;
    document.body.style.top = `-${scroll}px`;
  }

  function resetScroll() {
    window.scroll({ top: scroll, left: 0, behavior: 'instant' });
  }

  function closeOnClickOutside() {
    modalWrapper.addEventListener('click', (e) => {
      let modals = [modalSearch, modalSections, modalCart]
      if (!modals.some(x => x.contains(e.target))) {
        modalWrapper.classList.remove('active');
        modalSections.classList.remove('active');
        modalSearch.classList.remove('active');
        modalCart.classList.remove('active');
        resetScroll();
      }
    })
  }

  function sectionsModal() {

    const modalSectionsClose = document.querySelector('.modal-sections__close');

    const burger = document.querySelector('[data-js-burger-btn]');

    burger.addEventListener('click', () => {
      initializeScrollBlock();
      modalWrapper.classList.add('active');
      modalSections.classList.add('active');

    })

    modalSectionsClose.addEventListener('click', () => {
      modalWrapper.classList.remove('active');
      modalSections.classList.remove('active');
      resetScroll();
    });
  }

  function searchModal() {
    const searchBtn = document.querySelector('[data-js-search-btn]');
    const modalSearchClose = document.querySelector('.modal-search__close');

    searchBtn.addEventListener('click', () => {
      initializeScrollBlock();
      modalWrapper.classList.add('active');
      modalSearch.classList.add('active');
    })

    modalSearchClose.addEventListener('click', () => {
      modalWrapper.classList.remove('active');
      modalSearch.classList.remove('active');
      resetScroll();
    })

  }

  function cartModal() {
    const cartBtn = document.querySelector('[data-js-cart-btn]');
    const cartClose = document.querySelector('.modal-cart__close');

    cartBtn.addEventListener('click', () => {
      initializeScrollBlock();
      modalWrapper.classList.add('active');
      modalCart.classList.add('active');
    })

    cartClose.addEventListener('click', () => {
      modalWrapper.classList.remove('active');
      modalCart.classList.remove('active');
      resetScroll();
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
