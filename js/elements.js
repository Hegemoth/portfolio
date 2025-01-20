export const el = {
  header: document.querySelector('.header'),
  hamburger: document.querySelector('.hamburger'),
  navigation: document.querySelector('.navigation'),
  popup: document.querySelector('.popup'),
  popupCloseButton: document.querySelector('.popup__close-button'),
  arrowLeftButton: document.querySelector('.popup__arrow-button--left'),
  arrowRightButton: document.querySelector('.popup__arrow-button--right'),
  popupContent: document.querySelector('.popup__content'),
  navigationAnchors: document.querySelectorAll('.navigation__anchor'),
  popupTemplates: document.querySelectorAll('.popup-template'),
  showPopupButtons: document.querySelectorAll('.project-card__button'),
  disableTabindexElements: document.querySelectorAll(
    'a, area, input, select, textarea, button:not(.popup__button), iframe, object, embed, [tabindex="0"], [contenteditable]'
  ),
};
