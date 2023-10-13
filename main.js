import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/Header/Header,';
import { Main } from './modules/Main/main';
import { Footer } from './modules/Footer/footer';
import { Order } from './modules/Order/Order';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService } from './services/StorageService';
import { Pagination } from './modules/features/Pagination/Pagination';
import { BreadCrumbs } from './modules/features/BreadCrumbs/BreadCrumbs';

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
export const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });


const init = () => {
  const api = new ApiService();
  // const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

  new Header().mount()
  new Main().mount()
  new Footer().mount()

  // api.getProductCategories().then(data => {
  //   new Catalog().mount(new Main().element, data);
  //   router.updatePageLinks();

  // })

  productSlider();

  router
  .on('/', async () => {
    new Catalog().mount(new Main().element);
    const products = await api.getProducts();
    new ProductList().mount(new Main().element, products);
    router.updatePageLinks();
  }, {
    leave(done,match) {
      new ProductList().unmount();
      new Catalog().unmount;
      done();
    },
    already(match) {
      match.route.handler(match);
    }
  })
  .on('/category', async ({params: {slug, page = 1}}) => {
    new Catalog().mount(new Main().element);
    const {data: products, pagination} = await api.getProducts({
      category: slug,
      page: page || 1,
    });
    new BreadCrumbs().mount(new Main().element, [{text: slug}])
    new ProductList().mount(new Main().element, products, slug);
    new Pagination().mount(new ProductList().containerElement).update(pagination);
    router.updatePageLinks();

  }, {
    leave(done,match) {
      new BreadCrumbs().unmount();
      new ProductList().unmount();
      new Catalog().unmount;
      done();
    }
  })
  .on('/favorite', async ({params}) => {
    new Catalog().mount(new Main().element);
    const favorite = new FavoriteService().get();
    const {data: product, pagination} = await api.getProducts({
      list: favorite.join(','),
      page: params?.page || 1,
    });
    new BreadCrumbs().mount(new Main().element, [{text: 'Избранное'}])
    new ProductList().mount(
      new Main().element,
      product, 
      'Избранное', 'Вы ничего не добавили в избранное, пожалуйста добавьте что-нибудь'
    );
    new Pagination().mount(new ProductList().containerElement).update(pagination)
    router.updatePageLinks();

  }, {
    leave(done,match) {
      new BreadCrumbs().unmount();
      new ProductList().unmount();
      new Catalog().unmount;
      done();
    },
    already(match) {
      match.route.handler(match);
    }
  })
  .on('/search', () => {
    console.log('поиск');
  })
  .on('/product/:id', async (obj) => {
    new Catalog().mount(new Main().element);
    const data = await api.getProductById(obj.data.id);

    new BreadCrumbs().mount(new Main().element, [
      {
        text: data.category,
        href: `/category?slug=${data.category}`,
      },
      {
        text: data.name,
      }
    ]);
    console.log('data: ', data);

    new ProductCard().mount(new Main().element, data);

  }, {
    leave(done) {
      new Catalog().unmount();
      new BreadCrumbs().unmount();
      new ProductCard().unmount();
      done();
    }
  })
  .on('/order', () => {
    new Order().mount(new Main().element);
  })
  .on('/cart', () => {
    console.log('козина');
  })
  .notFound( () => {
    new Main().element.innerHTML = `
      <h2>Страница не найдена</h2>
      <p>Через 5 секунд вы будете перенаправлены 
        <a href="/" >на главную страницу</a>
      </p>
    `;

    setTimeout(() => {
      router.navigate('/');
      new Main().element.textContent = '';

    }, 5000)
  })

  router.resolve();

}
init();