import { API_URL } from './const.js';
import { getFromLocalStorage } from './localStorage.js';

const getProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/categories/`);
      const products = await response.json();
      return products;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
}

const getSingleProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();
  
    return product;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/categories/${category}`);
    const products = await response.json();
  
    return products;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const getFavouriteProducts = async () => {
  const favouriteProductsId = getFromLocalStorage('ski-people-favourite');
  const products = await getProducts();

  const favouriteProducts = [];

  products.forEach(p => {
    if (favouriteProductsId.find(id => id == p.id)) {
      favouriteProducts.push(p);
    }
  });

  return favouriteProducts;
}

export { getProducts, getSingleProduct, getProductsByCategory, getFavouriteProducts }