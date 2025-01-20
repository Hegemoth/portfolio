import { el } from './elements.js';
import { addClassName, removeClassName, setTabIndex } from './utils.js';

let currentPopupIndex = 0;

export const updatePopupContent = (index) => {
  const popupTemplate = document.querySelector(`#popup-template-${index}`).content.cloneNode(true);
  el.popupContent.textContent = '';
  el.popupContent.appendChild(popupTemplate);
};

export const showPopup = (index) => {
  currentPopupIndex = index;
  updatePopupContent(index);
  removeClassName(el.popup, 'popup--hidden');
  addClassName(document.documentElement, 'html--popup');
  addClassName(document.body, 'body--popup');
  setTabIndex(el.disableTabindexElements, -1);
};

export const closePopup = () => {
  removeClassName(document.documentElement, 'html--popup');
  removeClassName(document.body, 'body--popup');
  addClassName(el.popup, 'popup--fade-out');
  setTabIndex(el.disableTabindexElements, 0);

  setTimeout(() => {
    addClassName(el.popup, 'popup--hidden');
    removeClassName(el.popup, 'popup--fade-out');
    el.popupContent.textContent = '';
  }, 300);
};

export const showNextPopup = () => {
  currentPopupIndex = (currentPopupIndex + 1) % el.popupTemplates.length;
  updatePopupContent(currentPopupIndex);
};

export const showPreviousPopup = () => {
  currentPopupIndex = (currentPopupIndex - 1 + el.popupTemplates.length) % el.popupTemplates.length;
  updatePopupContent(currentPopupIndex);
};
