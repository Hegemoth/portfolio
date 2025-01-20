export const toggleClassName = (element, className) => {
  element.classList.toggle(className);
};

export const addClassName = (element, className) => {
  element.classList.add(className);
};

export const removeClassName = (element, className) => {
  element.classList.remove(className);
};

export const setTabIndex = (elements, value) => {
  elements.forEach((element) => element.setAttribute('tabindex', value));
};
