import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';

const productSlider = () => {
  Promise.all([
    import("swiper/modules"),
    import("swiper"),
    import("swiper/css"),
  ]).then(([{Navigation, Thumbs}, Swiper]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    new Swiper.default(".product__slider-main", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  })
}

const init = () => {
  productSlider();

  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

  router
  .on('/', () => {
    console.log('Главная');
  })
  .on('/category', () => {
    console.log('Категория');
  })
  .on('/favorite', () => {
    console.log('избранное');
  })
  .on('/search', () => {
    console.log('поиск');
  })
  .on('/product/:id', (obj) => {
    console.log('obj: ', obj);
    console.log('продукт');
  })
  .on('/order', () => {
    console.log('заказ');
  })
  .on('/cart', () => {
    console.log('козина');
  })
  .notFound(() => {
    document.body.innerHTML = `<h2>Страница не найдена</h2>`
  })

  router.resolve();

}
init();