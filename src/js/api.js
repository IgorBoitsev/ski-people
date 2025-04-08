import { API_URL } from './const.js';

const getData = async () => {

  const response = await fetch(API_URL);
  const obj = await response.json();

  return obj;

}

export { getData }