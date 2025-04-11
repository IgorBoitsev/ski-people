import Navigo from "navigo";
import { renderLayout } from "../components/renderLayout.js";
import { breadcrumbsHtmlComponent, createProductsHtmlComponent, createHeaderHtmlComponent, createFooterHtmlComponent, createCatalogHtmlComponent } from "../components/innerHtmlComponents.js";
import { getFavouriteProducts, getProducts } from "./api.js";
import { addToFavourite, changeCategory } from "./listeners.js";

const initRouter = () => {

  const router = new Navigo('/', { linksSelector: 'a[href="/"]' });
  router
    .on('/', async () => {
      const products = await getProducts();
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      renderLayout('div', 'catalog', ['container', 'catalog__container'], createCatalogHtmlComponent(products));
      renderLayout('section', 'products', ['container', 'products__container'], createProductsHtmlComponent(products));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent());
      changeCategory('catalog', 'catalog__link', 'products__container');
      addToFavourite('products__list', 'products__card-like');
      console.log('HOME');
    })
    .on('/favourite', async () => {
      const products = await getFavouriteProducts();
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent(), 'main');
      // renderLayout('div', 'breadcrumbs', ['container'], breadcrumbsHtmlComponent, 'main');
      renderLayout('section', 'product', ['container', 'products__container'], createProductsHtmlComponent(products), 'main');
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent(), 'main');
      addToFavourite('products__list', 'products__card-like');
      console.log('FAVOURITE');
    })
    // .on('/cart', async () => {
    //   renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
    //   renderLayout('section', 'cart', ['container', 'cart__container'], cartHtmlComponent, 'main');
    //   renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
    //   console.log('CART');
    // })
    // .on('/order', async () => {
    //   renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
    //   renderLayout('div', 'order', ['container'], orderHtmlComponent, 'main');
    //   renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
    //   console.log('ORDER');
    // })
    .notFound(() => {
      console.log('ERROR 404. Такой страницы не существует.');
    });
    
    router.resolve();

}

export { initRouter }