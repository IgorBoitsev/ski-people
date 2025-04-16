import { createProductsHtmlComponent } from "../components/innerHtmlComponents.js";
import { getProducts, getProductsByCategory } from "./api.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";
import { router } from "./router.js";

const changeCategory = async (targetWrapperClassname, targetClassname, changedWrapperClassname) => {

  const elementContainer = document.querySelector(`.${targetWrapperClassname}`);
  const elements = document.querySelectorAll(`.${targetClassname}`);
  const changedWrapperContainer = document.querySelector(`.${changedWrapperClassname}`);

  let activeCategory = '';
    
  elementContainer.addEventListener('click', async (event) => {
    event.preventDefault();

    if (event.target.closest(`.${targetClassname}`)) {
      elements.forEach(element => {
        element.parentNode.classList.remove('active');
      });

      event.target.parentNode.classList.add('active');

      event.target.textContent.toLowerCase() === 'все' ?
        activeCategory = '' :
        activeCategory = event.target.textContent;
    };

    const filteredData = await getProductsByCategory(activeCategory);

    changedWrapperContainer.textContent = '';
    changedWrapperContainer.append(createProductsHtmlComponent(filteredData));
  });
  
}

const addToFavourite = (targetWrapperClassname, targetClassname) => {

  const favouriteList = getFromLocalStorage('ski-people-favourite');
  const elementContainer = document.querySelector(`.${targetWrapperClassname}`);
  
  if (elementContainer) {
    elementContainer.addEventListener('click', (event) => {
      if (event.target.closest(`.${targetClassname}`)) {

        if (event.target.closest(`.${targetClassname}`).classList.contains('active')) {
          event.target.closest(`.${targetClassname}`).classList.remove('active');
          const productId = Number(event.target.parentNode.parentNode.dataset.id);

          if (productId != null) {
            const deleteItemIndex = favouriteList.findIndex(id => id === productId);
            favouriteList.splice(deleteItemIndex, 1);
            saveToLocalStorage('ski-people-favourite', favouriteList);
          }
        } else {
          event.target.closest(`.${targetClassname}`).classList.add('active');
          const productId = Number(event.target.parentNode.parentNode.dataset.id);
          
          if (productId != null) {
            favouriteList.push(productId);
            saveToLocalStorage('ski-people-favourite', favouriteList);
          }
        }

      }
    })
  }

}

const search = async (searchFormClassname, searchInputClassname, changedWrapperClassname) => {

  const formSearchContainer = document.querySelector(`.${searchFormClassname}`); 
  const searchInput = formSearchContainer.querySelector(`.${searchInputClassname}`);
  const changedWrapperContainer = document.querySelector(`.${changedWrapperClassname}`);

  let searchResults;

  if (formSearchContainer) {
    formSearchContainer.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // console.log('search submit');
      router.navigate(`/search?query=${searchInput.value}`);
      // console.log('redirecting');
      
      const products = await getProducts();
      searchResults = products.filter(p => p.title === searchInput.value);
      console.log('searchResults: ', searchResults);
      
      if (searchResults.length !== 0) {
        changedWrapperContainer.textContent = '';
        // console.log('changedWrapperContainer: ', changedWrapperContainer);
        changedWrapperContainer.append(createProductsHtmlComponent(searchResults));
      } else {
        changedWrapperContainer.textContent = 'Мы ничего не нашли:(';
      }

    })
  }

}

export { changeCategory, addToFavourite, search }