import Navigo from "navigo";
import { renderLayout } from "../components/renderLayout.js";
import { breadcrumbsHtmlComponent, productHtmlComponent, cartHtmlComponent, orderHtmlComponent, createProductsHtmlComponent, createHeaderHtmlComponent, createFooterHtmlComponent, createCatalogHtmlComponent } from "../components/innerHtmlComponents.js";
import { getData } from "./api.js";
import { changeCategory } from "./listeners.js";

const initRouter = () => {

  const router = new Navigo('/', { linksSelector: 'a[href="/"]' });
  router
    .on('/', async () => {
      const products = await getData();
      renderLayout('header', 'header', ['container'], createHeaderHtmlComponent());
      renderLayout('div', 'catalog', ['container', 'catalog__container'], createCatalogHtmlComponent(products));
      renderLayout('section', 'products', ['container', 'products__container'], createProductsHtmlComponent(products));
      renderLayout('footer', 'footer', ['container'], createFooterHtmlComponent());
      changeCategory('catalog', 'catalog__link', 'products__container');
      console.log('HOME');
    })
    // .on('/favourite', async () => {
    //   renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
    //   renderLayout('div', 'breadcrumbs', ['container'], breadcrumbsHtmlComponent, 'main');
    //   renderLayout('section', 'product', ['container'], productHtmlComponent, 'main');
    //   renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
    //   console.log('FAVOURITE');
    // })
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
    // .notFound(() => {
    //   console.log('ERROR 404');
    // });
    
    router.resolve();

}

export { initRouter }