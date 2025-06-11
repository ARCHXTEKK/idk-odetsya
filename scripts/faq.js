initializeQnA();

function initializeQnA() {
  const links = document.querySelectorAll('.faq__link');

  links?.forEach(link => {
    link.addEventListener('click', function () {
      this.nextElementSibling.classList.toggle('active');
    })
  })
}