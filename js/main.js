// Selectors

const headerElement = document.querySelector('.header');
const hamburgerButtonElement = document.querySelector('.hamburger');
const navigationElement = document.querySelector('.navigation');
const navigationAnchorElement = document.querySelectorAll('.navigation__anchor');

// Hamburger mobile

const activateHamburgerMenu = () => {
	hamburgerButtonElement.classList.toggle('hamburger--active');
	navigationElement.classList.toggle('navigation--active');

	// Navigation tabindexes (accesibillity)

	if (navigationElement.classList.contains('navigation--active')) {
		navigationAnchorElement.forEach(anchor => anchor.setAttribute('tabindex', 0));
	} else {
		navigationAnchorElement.forEach(anchor => anchor.setAttribute('tabindex', -1));
	}
};

hamburgerButtonElement.addEventListener('click', activateHamburgerMenu);

// Sticky header

const stickHeader = () => {
	if (window.scrollY > 0) {
		headerElement.classList.add('header--sticky');
	} else {
		headerElement.classList.remove('header--sticky');
	}
};

window.addEventListener('scroll', stickHeader);

// Nav - scroll to section

const scrollToSection = event => {
	if (event.target.tagName === 'A') {
		const sectionAnchor = event.target.dataset.sectionAnchor;

		// Disable navigation if desktop resolution
		if (navigationElement.classList.contains('navigation--active')) {
			navigationElement.classList.remove('navigation--active');
			hamburgerButtonElement.classList.remove('hamburger--active');
			navigationAnchorElement.forEach(anchor => anchor.setAttribute('tabindex', -1));
		}

		if (sectionAnchor === 'home-section') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		const targetSection =
			document.querySelector(`.${sectionAnchor}`).getBoundingClientRect().top + window.scrollY - 130;

		window.scrollTo({ top: targetSection, behavior: 'smooth' });
	}
};

navigationElement.addEventListener('click', scrollToSection);

navigationElement.addEventListener('keydown', event => {
	if (event.code === 'Enter') {
		scrollToSection(event);
	}
});

// Popup operations

const popupElement = document.querySelector('.popup');
const project2ShowPopupButton = document.querySelector('#project-2-show-popup-button');
const closePopupButton = document.querySelector('.popup__close-button');

const showPopup = () => {
	popupElement.classList.remove('popup--hidden');
};

const closePopup = () => {
	popupElement.classList.add('popup--fade-out');

	setTimeout(() => {
		popupElement.classList.add('popup--hidden');
		popupElement.classList.remove('popup--fade-out');
	}, 300);
};

project2ShowPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
