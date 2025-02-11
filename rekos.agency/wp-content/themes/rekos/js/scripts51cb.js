jQuery(document).ready(function ($) {
  // Homepage
  const carouselSwiper = new Swiper('.carousel__swiper .swiper', {
    slidesPerView: 4,
    spaceBetween: 16,

    speed: 3000,
    loop: true,

    allowTouchMove: false,
    preventClicks: true,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    breakpoints: {
      650: {
        slidesPerView: 4,
        spaceBetween: 18,
        speed: 3200,
      },

      850: {
        slidesPerView: 5,
        spaceBetween: 22,
        speed: 3500,
      },

      991: {
        slidesPerView: 8,
        spaceBetween: 42,
        speed: 3800,
      },
    },
  });

  const clientsSwiper = new Swiper('.clients__review .swiper', {
    slidesPerView: 1,
    spaceBetween: 16,

    loop: true,

    allowTouchMove: false,
    preventClicks: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // Header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 10) {
      $('header').addClass('header--sticky');
    } else {
      $('header').removeClass('header--sticky');
    }
  });

  // About Us
  $(document).ready(function () {
    const $videos = $('.aboutUs__hero--block--video');
    let videosPlayed = 0;
    let videosLoaded = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio >= 0.8 &&
            videosPlayed !== 3 &&
            videosLoaded === 3
          ) {
            entry.target.play();
            videosPlayed += 1;
          }
        });
      },
      { threshold: 0.8 }
    );

    $videos.each(function () {
      const video = this;

      // Load
      var url = video.dataset.url;

      var xhr = new XMLHttpRequest();
      xhr.open('GET.html', url, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function (oEvent) {
        var blob = new Blob([oEvent.target.response], { type: 'video/webm' });

        video.src = URL.createObjectURL(blob);
        videosLoaded++;

        if (videosLoaded === $videos.length) {
          $videos.each(function () {
            videosPlayed++;

            if (videosPlayed <= 3) {
              this.play();
            }
          });
        }
      };

      xhr.send();

      // Observe
      observer.observe(video);

      $(video).on('timeupdate', function () {
        if (this.currentTime >= 0.95 * this.duration) {
          this.pause();
        }
      });
    });
  });

  // $(document).ready(function () {
  // 	const $videos = $('.aboutUs__hero--block--video');
  // 	let videosPlayed = 0;
  // 	let videosLoaded = 0;

  // 	const observer = new IntersectionObserver(entries => {
  // 		entries.forEach(entry => {
  // 			if (entry.intersectionRatio >= 0.8 && videosPlayed !== 3 && videosLoaded === 3) {
  // 				entry.target.play();
  // 				videosPlayed += 1;
  // 			}
  // 		});
  // 	}, {threshold: 0.8});

  // 	$videos.each(function () {
  // 		const video = this;
  // 		observer.observe(video);

  // 		$(video).on('timeupdate', function () {
  // 			if (this.currentTime >= 0.95 * this.duration) {
  // 				this.pause();
  // 			}
  // 		});
  // 	});
  // });

  $('.aboutUs__services--menuItem').click(function () {
    if ($(this).hasClass('aboutUs__services--menuItem--active')) return;

    $('.aboutUs__services--menuItem').removeClass(
      'aboutUs__services--menuItem--active'
    );
    $(this).addClass('aboutUs__services--menuItem--active');

    const key = $(this).data('id');

    // Set inactive
    $('.aboutUs__services--block--active').removeClass(
      'aboutUs__services--block--transition'
    );

    setTimeout(() => {
      $('.aboutUs__services--block--active').removeClass(
        'aboutUs__services--block--active'
      );

      // Set active
      $(`.aboutUs__services--block[data-id="${key}"]`).addClass(
        'aboutUs__services--block--active'
      );

      setTimeout(() => {
        $(`.aboutUs__services--block[data-id="${key}"]`).addClass(
          'aboutUs__services--block--transition'
        );
      }, 100);
    }, 300);
  });

  const sliderWrapper = new Swiper('.aboutUs__partners--swiper .swiper', {
    slidesPerView: 4,
    spaceBetween: 24,

    speed: 6000,
    loop: true,

    allowTouchMove: false,
    preventClicks: true,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    breakpoints: {
      650: {
        slidesPerView: 5,
        spaceBetween: 32,
        speed: 6000,
      },

      850: {
        slidesPerView: 6,
        spaceBetween: 40,
        speed: 7000,
      },

      991: {
        slidesPerView: 7,
        spaceBetween: 48,
        speed: 8000,
      },
    },
  });

  $('.service__faq--item--toggle').click(function () {
    $(this).parent().toggleClass('service__faq--item--active');
    $(this).siblings('.service__faq--item--answerWrapper').slideToggle();
  });

  $('.header__menuItem--dropdownItem').on('mouseover', function () {
    const key = $(this).data('id');

    if (
      $(`.header__menuItem--visual--item[data-id="${key}"]`).hasClass(
        'header__menuItem--visual--item--active'
      )
    )
      return;

    $('.header__menuItem--visual--item').removeClass(
      'header__menuItem--visual--item--active'
    );
    $(`.header__menuItem--visual--item[data-id="${key}"]`).addClass(
      'header__menuItem--visual--item--active'
    );
  });

  $('.header__hamburger').click(function () {
    $('.mobile').toggleClass('mobile--active');

    setTimeout(() => {
      $('body').toggleClass('body-lock');
    }, 300);
  });

  $('.mobile__close').click(function () {
    $('.mobile').toggleClass('mobile--active');
    $('body').toggleClass('body-lock');
  });

  $('.mobile').click(function (e) {
    if (e.target === this) {
      $('.mobile').toggleClass('mobile--active');
      $('body').toggleClass('body-lock');
    }
  });

  $('.mobile .withChildren').click(function (e) {
    if (!$(this).hasClass('expanded')) e.preventDefault();

    $(this).toggleClass('expanded');
    $(this).siblings().slideToggle();
  });
});
