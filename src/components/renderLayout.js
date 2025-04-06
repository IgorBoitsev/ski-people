const renderLayout = (elementTag, elementClassname, containerClassnames = ['container'], innerHtml, parrentSelector) => {

  const elementWrapper = document.createElement(elementTag);
  elementWrapper.classList.add(elementClassname);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add(...containerClassnames);

  containerDiv.innerHTML = innerHtml;

  elementWrapper.append(containerDiv);
  document.querySelector(parrentSelector).append(elementWrapper);

  return elementWrapper;

}

export { renderLayout }