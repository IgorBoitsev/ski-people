import { createProductsHtmlComponent } from "../components/innerHtmlComponents.js";
import { getData } from "./api.js";

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
      activeCategory = event.target.textContent;
    };

    const data = await getData();
    let filteredData = '';

    if (activeCategory === 'Все') {
      filteredData = data.filter(item => item.category);
    } else {
      filteredData = data.filter(item => item.category === activeCategory);
    }
    
    changedWrapperContainer.textContent = '';
    changedWrapperContainer.append(createProductsHtmlComponent(filteredData, activeCategory));
  });
  
}

export { changeCategory }