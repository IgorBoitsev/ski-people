import { createProductsHtmlComponent } from "../components/innerHtmlComponents.js";
import { getProductsByCategory } from "./api.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";

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
    changedWrapperContainer.append(createProductsHtmlComponent(filteredData, activeCategory));
  });
  
}

const addToFavourite = (targetWrapperClassname, targetClassname) => {

  const favouriteList = getFromLocalStorage('ski-people-favourite');
  console.log('favouriteList: ', favouriteList);
  const elementContainer = document.querySelector(`.${targetWrapperClassname}`);
  
  if (elementContainer) {
    elementContainer.addEventListener('click', (event) => {
      if (event.target.closest(`.${targetClassname}`)) {

        if (event.target.closest(`.${targetClassname}`).classList.contains('active')) {
          event.target.closest(`.${targetClassname}`).classList.remove('active');
          const productId = Number(event.target.parentNode.parentNode.dataset.id);
          const deleteItemIndex = favouriteList.findIndex(id => id === productId);
          favouriteList.splice(deleteItemIndex, 1);
          saveToLocalStorage('ski-people-favourite', favouriteList);
        } else {
          event.target.closest(`.${targetClassname}`).classList.add('active');
          const productId = Number(event.target.parentNode.parentNode.dataset.id);
          favouriteList.push(productId);
          saveToLocalStorage('ski-people-favourite', favouriteList);
        }

      }
    })
  }

}

export { changeCategory, addToFavourite }