const body = document.body;
const navToggle = document.querySelector('[data-element~="navToggle"]');

// const navMore = document.querySelector('.header__nav-more');
// const orderBtn = document.querySelector('[data-element="orderBtn"]');
// const modal = document.querySelector('[data-element="orderForm"]');
// const closeBtn = document.querySelector('[data-element="popupClose"]');
// const overlay = modal.querySelector('.popup__overlay');
// const swipeBtn = document.querySelector('[data-element="popupSwipe"]');

const toggleNav = () => {
	if (!body.classList.contains('is-nav-open')) {
		body.classList.add('is-nav-open');
	} else {
		body.classList.remove('is-nav-open');
	}
};

const handleScroll = () => {
	(window.scrollY > 0) ?  body.classList.add('is-scrolled') : body.classList.remove('is-scrolled');
}

// const closeModal = () => {
// 	modal.classList.remove('is-open');
// 	body.classList.remove('is-popup-open');
// }

// const openModal = () => {
// 	modal.classList.add('is-open');
// 	body.classList.add('is-popup-open');
// }

navToggle.addEventListener('click', toggleNav);
// navMore.addEventListener('click', toggleNav);
window.addEventListener("scroll", handleScroll);

// // Add event listener to document to close nav when clicking outside
// document.addEventListener('click', (e) => {
// 	if (!navToggle.contains(e.target) && !navMore.contains(e.target) && !e.target.closest('.header__nav-more')) {
// 		body.classList.remove('is-nav-open');
// 	}
// });

// // прокрутка статьи
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 	anchor.addEventListener('click', function(e) {
// 		e.preventDefault();
// 		let destination = document.querySelector(this.getAttribute('href'));
// 		const header = document.querySelector('[data-element="header"]');
// 		if (destination) {
// 			let headerHeight = (header.offsetHeight + 30);
// 			let topOfDestination = destination.getBoundingClientRect().top + window.scrollY - headerHeight;
// 			window.scrollTo({ top: topOfDestination, behavior: "smooth" });
// 		}
// 	});
// });

// if (orderBtn) {
// 	orderBtn.addEventListener('click', () => {
// 		openModal();
// 	});

// 	closeBtn.addEventListener('click', () => {
// 		closeModal();
// 	});

// 	// Закрыть модальное окно при нажатии клавиши Escape
// 	document.addEventListener('keydown', (e) => {
// 		if (e.key === 'Escape' && modal.classList.contains('is-open')) {
// 			closeModal();
// 		}
// 	});

// 	// Закрыть модальное окно при клике на overlay
// 	overlay.addEventListener('click', () => {
// 		closeModal();
// 	});
// 	// Обработка свайпа по кнопке
// 	let touchstartY = 0;
// 	let touchendY = 0;

// 	swipeBtn.addEventListener('touchstart', e => {
// 		touchstartY = e.changedTouches[0].screenX;
// 	});

// 	swipeBtn.addEventListener('touchend', e => {
// 		touchendY = e.changedTouches[0].screenX;
// 		handleSwipe();
// 	});

// 	// Функция для обработки свайпа
// 	function handleSwipe() {
// 		if (touchendY < touchstartY) {
// 			closeModal();
// 		}
// 	}
// }

// class Tabs {
// 	setTabs = (tabs, id) => {
// 		this.clearTabs(tabs);

// 		tabs.querySelectorAll('[data-tab="' + id + '"]').forEach((el) => {
// 			el.classList.add('is-active');
// 		});
// 	}

// 	clearTabs = (tabs) =>{
// 		let tabsBtn = tabs.querySelectorAll('[data-elements ~= "tabsBtn"]'),
// 			tabsItems = tabs.querySelectorAll('[data-elements ~= "tabsItem"]');

// 		tabsBtn.forEach((el) => {
// 			el.classList.remove('is-active')
// 		});

// 		tabsItems.forEach((el) => {
// 			el.classList.remove('is-active')
// 		});
// 	}
// }

// document.addEventListener('click', (e) => {
// 	let el = e.target.closest('[data-elements~="tabsBtn"]');
// 	if (el) {
// 		let id = el.dataset.tab;
// 		let tabs = el.closest('[data-elements~="tabs"]');
// 		let tabContents = tabs.querySelectorAll('[data-tab]');

// 		tabContents.forEach((item) => {
// 			item.classList.toggle('is-active', id === item.dataset.tab);
// 		});

// 		// Example method to set the active tabs
// 		// function setTabs(tabsContainer, activeTabId) {
// 		// 	console.log(`Setting tabs for ${activeTabId} in ${tabsContainer}`);
// 		// }
// 		// setTabs(tabs, id);
// 	}
// });


[].forEach.call( document.querySelectorAll('.form__input--tel'), function(input) {
	var keyCode;
	function mask(event) {
		event.keyCode && (keyCode = event.keyCode);
		var pos = this.selectionStart;
		if (pos < 3) event.preventDefault();
		var matrix = "+7 (___) ___ __ __",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, ""),
			new_value = matrix.replace(/[_\d]/g, function(a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			});
		i = new_value.indexOf("_");
		if (i != -1) {
			i < 5 && (i = 3);
			new_value = new_value.slice(0, i)
		}
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
			function(a) {
				return "\\d{1," + a.length + "}"
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
		if (event.type == "blur" && this.value.length < 5) this.value = ""
	}
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false)
});

document.addEventListener("DOMContentLoaded", function () {
	// Функция создания карты
	function createMap(xID, coords) {
		const mapContainer = document.getElementById(xID);
		if (mapContainer) {
			ymaps.ready(function () {
				const myMap = new ymaps.Map(xID, {
					center: coords,
					zoom: 17,
					controls: []
				});

				const myPlacemark = new ymaps.Placemark(coords,
					{
						hintContent: 'г. Воронеж, ул. Солнечная, 13 «Е», помещение 2',
						balloonContent: 'г. Воронеж, ул. Солнечная, 13 «Е», помещение 2'
					},
					{
						iconLayout: 'default#image',
						iconImageHref: 'img/pin.svg',
						iconImageSize: [32, 43],
						iconImageOffset: [80, 0]
					}
				);

				myMap.geoObjects.add(myPlacemark);
				myMap.behaviors.disable('scrollZoom');
			});
		} else {
			console.error("Элемент с ID", xID, "не найден.");
		}
	}

	// Вызов функции создания карты
	createMap('footer__map', [51.678526, 39.164103]);
});

$('.hero__slider').slick({
    slidesToShow: 3, // Базовое значение по умолчанию
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1300, // Для экранов меньше 1300px
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 900, // Для экранов меньше 900px
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});