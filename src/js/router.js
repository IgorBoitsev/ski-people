import Navigo from "navigo";
import { renderLayout } from "../components/renderLayout.js";
import { breadcrumbsHtmlComponent, catalogHtmlComponent, footerHtmlComponent, headerHtmlComponent, productsHtmlComponent, productHtmlComponent, cartHtmlComponent, orderHtmlComponent } from "../components/innerHtmlComponents.js";

const initRouter = () => {

  const router = new Navigo('/', { linksSelector: 'a[href="/"]' });
  router
    .on('/', () => {
      renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
      renderLayout('div', 'catalog', ['container', 'catalog__container'], catalogHtmlComponent, 'main');
      renderLayout('section', 'products', ['container', 'products__container'], productsHtmlComponent, 'main');
      renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
      console.log('HOME');
    })
    .on('/favourite', () => {
      renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
      renderLayout('div', 'breadcrumbs', ['container'], breadcrumbsHtmlComponent, 'main');
      renderLayout('section', 'product', ['container'], productHtmlComponent, 'main');
      renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
      console.log('FAVOURITE');
    })
    .on('/cart', () => {
      renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
      renderLayout('section', 'cart', ['container', 'cart__container'], cartHtmlComponent, 'main');
      renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
      console.log('CART');
    })
    .on('/order', () => {
      renderLayout('header', 'header', ['container'], headerHtmlComponent, 'main');
      renderLayout('div', 'order', ['container'], orderHtmlComponent, 'main');
      renderLayout('footer', 'footer', ['container'], footerHtmlComponent, 'main');
      console.log('ORDER');
    })
    .notFound(() => {
      console.log('ERROR 404');
    });
    
    router.resolve();

}

export { initRouter }