// burger
const page = document.querySelector('.js-page');
const mobileMenu = document.querySelector('.js-header__menu');
const burgerBtn = document.querySelector('.js-icon-burger');

burgerBtn.addEventListener('click', openMobileMenu);
mobileMenu.addEventListener('click', closeMobileMenu);

function resizeWindowBurger() {
  if ((document.body.clientWidth > 768) && (page.classList.contains('page-hidden'))) {
    burgerBtn.classList.remove('icon-burger-active');
    mobileMenu.classList.remove('header__menu-active');
    page.classList.remove('page-hidden');
    window.removeEventListener('resize', resizeWindowBurger);
  };
};

function toggleMobileMenu() {
  burgerBtn.classList.toggle('icon-burger-active');
  mobileMenu.classList.toggle('header__menu-active');
  page.classList.toggle('page-hidden');
}

function openMobileMenu() {
  toggleMobileMenu();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  window.addEventListener('resize', resizeWindowBurger);
}

function closeMobileMenu(e) {
  if (window.innerWidth < 769) {
    if (!e.target.closest("li")) {
      return;
    }
    toggleMobileMenu();
  }
}