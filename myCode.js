const modal = document.querySelector('.modal');
const btnModal = document.querySelector('.btn--show-modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

const header = document.querySelector('.header');

const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dots = document.querySelector('.dots');

const openModal = function () {
  //Show open account window
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  //Hide open account window
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnModal.addEventListener('click', openModal);
btnModal.addEventListener('keydown', function (e) {
  //Pressing escape to close window
  if (e.key === 'Escape') closeModal();
});
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Pressing learn more button to scroll to section 1
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Scrolling to sections from navigation bar
nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(`${href}`).scrollIntoView({ behavior: 'smooth' });
  }
});

//Showing tab content
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fading

const hover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const selected = e.target;
    const siblings = selected.closest('.nav').querySelectorAll('.nav__link');
    const logo = selected.closest('.nav').querySelector('#logo');

    siblings.forEach(btn => {
      if (btn !== selected) {
        btn.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

//Sticky header

const headerCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const navHeight = header.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

//Revealing sections
const sectionCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove('section--hidden');
  }
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionCallback, {
  root: null,
  threshold: 0.15,
});

sections.forEach(sec => {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});

// Revealing Images

const imgs = document.querySelectorAll('img[data-src]');

const imageCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.src = entry.target.dataset.src;
  }
  entry.target.addEventListener('load', function (e) {
    e.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imageCallback, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach(img => imageObserver.observe(img));

//Handling reviews

let curSlide = 0;
const maxSlide = slides.length;

const goSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const prevSlide = function () {
  if (curSlide < 1) curSlide = maxSlide;
  curSlide--;
  goSlide(curSlide);
  activateDots(curSlide);
};
const nextSlide = function () {
  if (curSlide < maxSlide - 1) curSlide++;
  else curSlide = 0;
  goSlide(curSlide);
  activateDots(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

//Creating dots in reviews

const createDots = function () {
  slides.forEach((_, i) => {
    const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
    dots.insertAdjacentHTML('beforeend', dot);
  });
};

//Showing active dot

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};

dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goSlide(slide);
  }
});

//initial function
const init = function () {
  goSlide(0);
  createDots();
  activateDots(0);
};
init();
