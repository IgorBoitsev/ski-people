const footer = (elementTag, footerClassname, parrentSelector) => {

  const footerWrapper = document.createElement(elementTag);
  footerWrapper.classList.add(footerClassname);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');



  footerWrapper.append(containerDiv);
  document.querySelector(parrentSelector).append(footerWrapper);

  return footerWrapper;

}

export { footer }