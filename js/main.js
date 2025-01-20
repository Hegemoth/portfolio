import { el } from './elements.js';
import { scrollToSection, stickHeader, toggleHamburgerMenu } from './nav.js';
import { closePopup, showNextPopup, showPopup, showPreviousPopup } from './popup.js';
import { removeClassName, setTabIndex } from './utils.js';

window.addEventListener('scroll', stickHeader);
el.hamburger.addEventListener('click', toggleHamburgerMenu);
el.navigation.addEventListener('click', scrollToSection);

el.navigation.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') scrollToSection(event);
});

el.arrowLeftButton.addEventListener('click', showPreviousPopup);
el.arrowRightButton.addEventListener('click', showNextPopup);
el.popupCloseButton.addEventListener('click', closePopup);

el.showPopupButtons.forEach((button, i) => {
  button.addEventListener('click', () => showPopup(i));
});

document.addEventListener('keydown', (event) => {
  if (!el.popup.classList.contains('popup--hidden')) {
    if (event.code === 'ArrowRight') showNextPopup();
    if (event.code === 'ArrowLeft') showPreviousPopup();
    if (event.code === 'Escape') closePopup();
  }
});

el.popup.addEventListener('click', (event) => {
  if (event.target === el.popup) closePopup();
});

new ResizeObserver((entries) => {
  const isMobile = entries[0].contentRect.width < 900;  
  setTabIndex(el.navigationAnchors, isMobile ? -1 : 0);

  if (isMobile) {
    removeClassName(el.navigation, 'navigation--active');
    removeClassName(el.hamburger, 'hamburger--active');
  }
}).observe(document.body);

document.querySelector('#current-year').textContent = new Date().getFullYear();
