const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export { saveToLocalStorage, getFromLocalStorage }