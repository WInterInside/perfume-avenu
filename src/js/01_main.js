const body = document.body;
const navToggle = document.querySelector('[data-element~="navToggle"]');

const filtersControls = document.querySelector(".catalog__menu-controls");

if (filtersControls) {	
	const filtersBtns = document.querySelectorAll(".catalog__menu-toggle");
	const filtersBlocks = {
		brand: document.getElementById("brand"),
		accord: document.getElementById("accord"),
		gender: document.getElementById("gender")
	};

	// Проверяет, есть ли хотя бы одна активная кнопка
	function isAnyActive() {
		return Array.from(filtersBtns).some(button => button.classList.contains("is-active"));
	}

	// Обновляет состояние блока controls
	function updateControlsVisibility() {
		if (isAnyActive()) {
			filtersControls.classList.remove("is-hidden");
		} else {
			filtersControls.classList.add("is-hidden");
		}
	}

	filtersBtns.forEach(button => {
		button.addEventListener("click", () => {
			const blockId = button.classList.contains("brand") ? "brand" :
							button.classList.contains("accord") ? "accord" : "gender";

			if (button.classList.contains("is-active")) {
			button.classList.remove("is-active");
			filtersBlocks[blockId].classList.remove("is-active");
			} else {
			button.classList.add("is-active");
			filtersBlocks[blockId].classList.add("is-active");
			}

			updateControlsVisibility();
		});
	});

	// Изначально скрываем блок, если ни одна кнопка не активна
	updateControlsVisibility();
}

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

navToggle.addEventListener('click', toggleNav);

window.addEventListener("scroll", handleScroll);

// // Add event listener to document to close nav when clicking outside
document.addEventListener('click', (e) => {
	if (!navToggle.contains(e.target)) {
		body.classList.remove('is-nav-open');
	}
});

// // прокрутка статьи
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		let destination = document.querySelector(this.getAttribute('href'));
		const header = document.querySelector('[data-element="header"]');
		if (destination) {
			let headerHeight = (header.offsetHeight + 30);
			let topOfDestination = destination.getBoundingClientRect().top + window.scrollY - headerHeight;
			window.scrollTo({ top: topOfDestination, behavior: "smooth" });
		}
	});
});

class Tabs {
	setTabs = (tabs, id) => {
		this.clearTabs(tabs);

		tabs.querySelectorAll('[data-tab="' + id + '"]').forEach((el) => {
			el.classList.add('is-active');
		});
	}

	clearTabs = (tabs) =>{
		let tabsBtn = tabs.querySelectorAll('[data-elements ~= "tabsBtn"]'),
			tabsItems = tabs.querySelectorAll('[data-elements ~= "tabsItem"]');

		tabsBtn.forEach((el) => {
			el.classList.remove('is-active')
		});

		tabsItems.forEach((el) => {
			el.classList.remove('is-active')
		});
	}
}

document.addEventListener('click', (e) => {
	let el = e.target.closest('[data-elements~="tabsBtn"]');
	if (el) {
		let id = el.dataset.tab;
		let tabs = el.closest('[data-elements~="tabs"]');
		let tabContents = tabs.querySelectorAll('[data-tab]');

		tabContents.forEach((item) => {
			item.classList.toggle('is-active', id === item.dataset.tab);
		});

		// Example method to set the active tabs
		// function setTabs(tabsContainer, activeTabId) {
		// 	console.log(`Setting tabs for ${activeTabId} in ${tabsContainer}`);
		// }
		// setTabs(tabs, id);
	}
});

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
	createMap('contacts__map', [51.678526, 39.164103]);
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

$('.catalog-card__slider-main').slick({
	slidesToScroll: 1,
	slidesToShow: 1,
	arrows: false,
	dots: false,
	fade: true,
	cssEase: 'linear',
	asNavFor: '.slider-nav-thumbnails',
});

$('.slider-nav-thumbnails').slick({
	autoplay: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	asNavFor: '.catalog-card__slider-main',
	dots: false,
	arrows:false,
	focusOnSelect: true,
	variableWidth: true
});

// Remove active class from all thumbnail slides
$('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

// Set active class to first thumbnail slides
$('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

// On before slide change match active thumbnail to current slide
$('.catalog-card__slider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	var mySlideNumber = nextSlide;
	$('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
	$('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
});