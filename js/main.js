// Global selectors

const headerElement = document.querySelector('.header');
const hamburgerButtonElement = document.querySelector('.hamburger');
const navigationElement = document.querySelector('.navigation');
const popupElement = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const arrowLeftButton = document.querySelector('.popup__arrow-button--left');
const arrowRightButton = document.querySelector('.popup__arrow-button--right');
const popupContentElement = document.querySelector('.popup__content');

const navigationAnchorElements = document.querySelectorAll('.navigation__anchor');
const popupTemplateElements = document.querySelectorAll('.popup-template');
const showPopupButtons = document.querySelectorAll('.project-card__button');
const toDisableTabindexElements = document.querySelectorAll(
	'a, area, input, select, textarea, button:not(.popup__button), iframe, object, embed, [tabindex="0"], [contenteditable]'
);

// Variables

let currentPopupIndex;

// Functionality

const toggleHamburgerMenu = () => {
	hamburgerButtonElement.classList.toggle('hamburger--active');
	navigationElement.classList.toggle('navigation--active');

	if (navigationElement.classList.contains('navigation--active')) {
		navigationAnchorElements.forEach((anchor) => anchor.setAttribute('tabindex', 0));
	} else {
		navigationAnchorElements.forEach((anchor) => anchor.setAttribute('tabindex', -1));
	}
};

const stickHeader = () => {
	if (window.scrollY > 0) {
		headerElement.classList.add('header--sticky');
	} else {
		headerElement.classList.remove('header--sticky');
	}
};

const scrollToSection = (event) => {
	if (event.target.tagName === 'A') {
		const sectionAnchor = event.target.dataset.sectionAnchor;

		if (navigationElement.classList.contains('navigation--active')) {
			navigationElement.classList.remove('navigation--active');
			hamburgerButtonElement.classList.remove('hamburger--active');
			navigationAnchorElements.forEach((anchor) => anchor.setAttribute('tabindex', -1));
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

// Popup operations

const showPreviousPopup = () => {
	if (currentPopupIndex === 0) {
		currentPopupIndex = popupTemplateElements.length - 1;
	} else {
		currentPopupIndex--;
	}

	const popupTemplate = document.querySelector(`#popup-template-${currentPopupIndex}`).content.cloneNode(true);

	popupContentElement.textContent = '';
	popupContentElement.appendChild(popupTemplate);
};

const showNextPopup = () => {
	if (currentPopupIndex === popupTemplateElements.length - 1) {
		currentPopupIndex = 0;
	} else {
		currentPopupIndex++;
	}

	const popupTemplate = document.querySelector(`#popup-template-${currentPopupIndex}`).content.cloneNode(true);
	popupContentElement.textContent = '';
	popupContentElement.appendChild(popupTemplate);
};

const closePopup = () => {
	document.documentElement.classList.remove('html--popup');
	document.body.classList.remove('body--popup');

	popupElement.classList.add('popup--fade-out');

	toDisableTabindexElements.forEach((element) => {
		element.setAttribute('tabindex', 0);
	});

	setTimeout(() => {
		popupElement.classList.add('popup--hidden');
		popupElement.classList.remove('popup--fade-out');

		popupContentElement.textContent = '';
	}, 300);
};

const showPopup = (index) => {
	popupElement.classList.remove('popup--hidden');
	document.documentElement.classList.add('html--popup');
	document.body.classList.add('body--popup');

	currentPopupIndex = index;

	const popupTemplate = document.querySelector(`#popup-template-${index}`).content.cloneNode(true);
	popupContentElement.appendChild(popupTemplate);

	toDisableTabindexElements.forEach((element) => {
		element.setAttribute('tabindex', -1);
	});
};

// Listeners

hamburgerButtonElement.addEventListener('click', toggleHamburgerMenu);
window.addEventListener('scroll', stickHeader);
navigationElement.addEventListener('click', scrollToSection);

navigationElement.addEventListener('keydown', (event) => {
	if (event.code === 'Enter') {
		scrollToSection(event);
	}
});

arrowLeftButton.addEventListener('click', showPreviousPopup);
arrowRightButton.addEventListener('click', showNextPopup);
popupCloseButton.addEventListener('click', closePopup);

showPopupButtons.forEach((button, index) => {
	button.addEventListener('click', () => showPopup(index));
});

document.addEventListener('keydown', (event) => {
	if (!popupElement.classList.contains('popup--hidden')) {
		if (event.code === 'ArrowRight') {
			showNextPopup();
		}

		if (event.code === 'ArrowLeft') {
			showPreviousPopup();
		}

		if (event.code === 'Escape') {
			closePopup();
		}
	}
});

popupElement.addEventListener('click', (event) => {
	if (event.target === popupElement) {
		closePopup();
	}
});

const resizeObserver = new ResizeObserver((entries) => {
	if (entries[0].contentRect.width < 900) {
		navigationAnchorElements.forEach((anchor) => anchor.setAttribute('tabindex', -1));
		navigationElement.classList.remove('navigation--active');
		hamburgerButtonElement.classList.remove('hamburger--active');
	} else {
		navigationAnchorElements.forEach((anchor) => anchor.setAttribute('tabindex', 0));
	}
});

resizeObserver.observe(document.body);
