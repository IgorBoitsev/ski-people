import Navigo from "navigo";
import { renderLayout } from "../components/renderLayout.js";
import { createBreadcrumbsHtmlComponent, createProductsHtmlComponent, createHeaderHtmlComponent, createFooterHtmlComponent, createCatalogHtmlComponent, createSingleProductHtmlComponent } from "../components/innerHtmlComponents.js";
import { getFavouriteProducts, getProducts, getSingleProduct } from "./api.js";
import { addToFavourite, changeCategory, search } from "./listeners.js";
import { removeComponent } from "../components/removeComponent.js";
import { swiperSliderInit } from "./swiperSlider.js";

const router = new Navigo('/', { linksSelector: 'a[href="/"]' });

const initRouter = () => {
  router
    .on('/', async () => {
      const products = await getProducts();
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      renderLayout('div', 'catalog', ['container', 'catalog__container'], createCatalogHtmlComponent(products));
      renderLayout('section', 'products', ['container', 'products__container'], createProductsHtmlComponent(products));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent(), 'body');
      changeCategory('catalog', 'catalog__link', 'products__container');
      addToFavourite('products__list', 'products__card-like');
      search('header__search', 'header__search-input', 'products__container');
      router.updatePageLinks();
      console.log('HOME');
    },
    {
      leave(done) {
        removeComponent('.catalog');
        done();
      }
    })
    .on('/products/:productId', async ({ data }) => {
      const singleProduct = await getSingleProduct(data.productId);
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      //// renderLayout('div', 'catalog', ['container', 'catalog__container'], createCatalogHtmlComponent(products));
      renderLayout('div', 'breadcrumbs', ['container'], createBreadcrumbsHtmlComponent(singleProduct));
      renderLayout('section', 'product', ['container', 'product__container'], createSingleProductHtmlComponent(singleProduct));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent(), 'body');
      //// changeCategory('catalog', 'catalog__link', 'products__container');
      addToFavourite('product__button-wrapper', 'product__like-button');
      search('header__search', 'header__search-input', 'products__container');
      swiperSliderInit();
      router.updatePageLinks();
      console.log('SINGLE PRODUCT');
    },
    {
      leave(done) {
        removeComponent('.product');
        removeComponent('.breadcrumbs');
        done();
      }
    })
    .on('/favourite', async () => {
      const products = await getFavouriteProducts();
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      renderLayout('div', 'breadcrumbs', ['container'], createBreadcrumbsHtmlComponent());
      renderLayout('section', 'products', ['container', 'products__container'], createProductsHtmlComponent(products));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent(), 'body');
      addToFavourite('products__list', 'products__card-like');
      search('header__search', 'header__search-input', 'products__container');
      router.updatePageLinks();
      console.log('FAVOURITE');
    },
    {
      leave(done) {
        removeComponent('.products');
        done();
      }
    })
    .on('/search', async (q) => {
      const searchedProducts = await getProducts(q.params.query);
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      //// renderLayout('div', 'breadcrumbs', ['container'], breadcrumbsHtmlComponent, 'main');
      renderLayout('section', 'products', ['container', 'products__container'], createProductsHtmlComponent(searchedProducts));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent(), 'body');
      addToFavourite('products__list', 'products__card-like');
      search('header__search', 'header__search-input', 'products__container');
      router.updatePageLinks();
      console.log('SEARCH');
    },
    {
      leave(done) {
        removeComponent('.products');
        done();
      }
    })
    // .on('/cart', async () => {
    //   renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
    //   renderLayout('section', 'cart', ['container', 'cart__container'], cartHtmlComponent, 'main');
    //   renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
    //   router.updatePageLinks();
    //   console.log('CART');
    // })
    // .on('/order', async () => {
    //   renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
    //   renderLayout('div', 'order', ['container'], orderHtmlComponent, 'main');
    //   renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
    //   router.updatePageLinks();
    //   console.log('ORDER');
    // })
    .notFound(() => {
      console.log('ERROR 404. Такой страницы не существует.');
    });
    
    router.resolve();

}

export { initRouter, router }