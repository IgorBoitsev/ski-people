const renderLayout = (elementTag, elementClassname, containerClassnames = ['container'], innerElement, parrentSelector = 'main') => {

  if (document.querySelector(`.${elementClassname}`)) {
    return;
  } else {
    const elementWrapper = document.createElement(elementTag);
    elementWrapper.classList.add(elementClassname);
  
    const containerDiv = document.createElement('div');
    containerDiv.classList.add(...containerClassnames);
  
    containerDiv.append(innerElement);
  
    elementWrapper.append(containerDiv);
    document.querySelector(parrentSelector).append(elementWrapper);
  }

  // console.log(`${elementTag} was created`);

}

export { renderLayout }