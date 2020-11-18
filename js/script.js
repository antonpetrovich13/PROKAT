

$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').
			toggleClass('active');
		$('body').toggleClass('lock');
	});
});

$(document).ready(function () {
	$('.header__link').click(function (event) {
		$('.header__burger, .header__menu').removeClass('active');
		$('body').removeClass('lock')
	});
});


$(document).ready(function () {
	$('.slider').slick({
		autoplay: true,
		speed: 3000,
		autoplaySpeed: 6000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
		draggable: false,
		swipe: false,
	});
});

function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

$(document).ready(function () {
	$('.categories__slider').slick({
		slidesToShow: 3,
		speed: 500,
		cssEase: 'ease-out',
		touchThreshold: 10,
		centerMode: true,
		centerPadding: '1px',
		responsive: [
			{
				breakpoint: 630,
				settings: {
					slidesToShow: 2,
					centerMode: false,
				}
			}, {
				breakpoint: 420,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
});

$(window).on("load resize", function () {

	function ibg() {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
				let picture = ibg[i].querySelector('picture');
				picture.insertAdjacentHTML('afterEnd', '<img src="' + ibg[i].querySelector('img').getAttribute('src') + '">');
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
			else {
				if (ibg[i].querySelector('.bg')) {
					ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('.bg').currentSrc + ')';
				}
			}
		}
	}
	ibg();
});


$('form').submit(function (e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function () {
		$(this).find("input").val("");
		$('form').trigger('reset');
	});
	return false;
});



$(function () {
	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" }, 1000);
		return false;
	});
});


$(function () {
	$('.footer__logo').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
});



const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
document.addEventListener("DOMContentLoaded", function () {
	var lazyloadImages;
	if ("IntersectionObserver" in window) {
		lazyloadImages = document.querySelectorAll(".lazy");
		var imageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var image = entry.target;
					image.src = image.dataset.src;
					image.classList.remove("lazy");
					imageObserver.unobserve(image);
				}
			});
		});
		lazyloadImages.forEach(function (image) {
			imageObserver.observe(image);
		});
	} else {
		var lazyloadThrottleTimeout;
		lazyloadImages = document.querySelectorAll(".lazy");
		function lazyload() {
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}
			lazyloadThrottleTimeout = setTimeout(function () {
				var scrollTop = window.pageYOffset;
				lazyloadImages.forEach(function (img) {
					if (img.offsetTop < (window.innerHeight + scrollTop)) {
						img.src = img.dataset.src;
						img.classList.remove('lazy');
					}
				});
				if (lazyloadImages.length == 0) {
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
					window.removeEventListener("orientationChange", lazyload);
				}
			}, 20);
		}
		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);
		window.addEventListener("orientationChange", lazyload);
	}
})




