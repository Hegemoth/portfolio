import { el } from './elements.js';
import { addClassName, removeClassName, setTabIndex, toggleClassName } from './utils.js';

export const toggleHamburgerMenu = () => {
  toggleClassName(el.hamburger, 'hamburger--active');
  toggleClassName(el.navigation, 'navigation--active');

  const tabIndexValue = el.navigation.classList.contains('navigation--active') ? 0 : -1;
  setTabIndex(el.navigationAnchors, tabIndexValue);
};

export const stickHeader = () => {
  if (window.scrollY > 0) {
    addClassName(el.header, 'header--sticky');
  } else {
    removeClassName(el.header, 'header--sticky');
  }
};

export const scrollToSection = (event) => {
  if (event.target.tagName === 'A') {
    const sectionAnchor = event.target.dataset.sectionAnchor;

    if (el.navigation.classList.contains('navigation--active')) {
      removeClassName(el.navigation, 'navigation--active');
      removeClassName(el.hamburger, 'hamburger--active');
      setTabIndex(el.navigationAnchors, -1);
    }

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionAnchor === 'home-section') {
      scrollToTop();
    } else {
      const targetSection = document.querySelector(`.${sectionAnchor}`);
      const offset = targetSection.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
};
