jQuery(($) => {
	const rekos = {
		/** Front Page Intro */
		async initHomepageIntro() {
			const $body = $('body.home');

			if (!$body.length) return;

			const logoHref = $('#masthead .dark-scheme-logo').attr('src');
			const bgSpotHref = $('img[src*="/Background-element-"]').attr('src');

			await preloadImage(logoHref);
			await preloadImage(bgSpotHref);

			$body.append(
					`<div class="introAnimation">
        <div class="introAnimation__inner">
            <div class="introAnimation__bgImage" style="background-image: url('${bgSpotHref}')"></div>
            <div class="introAnimation__logo">
                <div class="introAnimation__logoPart">
                    <img width="130" height="25" src="${logoHref}">
                </div>
                <div class="introAnimation__logoPart">
                    <img width="130" height="25" src="${logoHref}">
                </div>
            </div>
        </div>
      </div>`
			);

			$body.addClass('intro-animation-started');

			const $intro = $('.introAnimation');
			const parts = $intro.find('.introAnimation__logoPart').toArray();

			setTimeout(() => {
				parts.forEach((part, i) => {
					setTimeout(() => {
						part.classList.add('active');
					}, (i + 1) * 400);
				});

				setTimeout(() => {
					parts.forEach((part, i) => {
						setTimeout(() => {
							part.classList.remove('active');
							part.classList.add('fade');
						}, (i + 1) * 100);
					});
				}, 2000);

				setTimeout(() => {
					$intro.css('top', '-100vh');
				}, 2300);
			});
		},

		/** Set the maximum width for the homepage subheading and partners carousel. */
		setProportionsForHomepageHeroElements() {
			if ($('body.home').length) {
				const heading = document.querySelector('#home-heading h1'),
						subheading = document.getElementById('home-subheading'),
						carousel = document.getElementById('home-partners-carousel');

				if (!heading) return;

				heading.innerHTML = '<span>' + heading.innerHTML + '</span>';

				const setMaxWidth = () => {
					if (window.innerWidth > 1281) {
						const headingTextWidth = heading.querySelector('span').offsetWidth;
						subheading.style.maxWidth = headingTextWidth - 100 + 'px';
						carousel.style.maxWidth = headingTextWidth - 160 + 'px';
					} else {
						subheading.style.maxWidth = null;
						carousel.style.maxWidth = null;
					}
				};

				setMaxWidth();
				new ClassWatcher(
						document.getElementById('home-heading'),
						'animated',
						setMaxWidth,
						() => {
						}
				);
				$(window).on('resize', debounce(setMaxWidth));
			}
		},

		/** HTML5 video behavior on the desktop and mobile */
		handleHtml5Videos() {
			/** @type {NodeListOf<HTMLVideoElement>} */
			const $videos = document.querySelectorAll('.hover-video video');

			if (!$videos.length) return;

			const videoTimers = {};

			/**
			 *
			 * @param {HTMLVideoElement} video
			 * @returns {string}
			 */
			const getVideoId = (video) => video.getAttribute('src');

			/**
			 *
			 * @param {HTMLVideoElement} video
			 * @returns {number}
			 */
			const getVideoTimer = (video) => videoTimers[getVideoId(video)];

			/**
			 * Play the video.
			 *
			 * @param {HTMLVideoElement} video
			 */
			const playVideo = (video) => {
				if (video.hasAttribute('data-playing')) return;

				video.setAttribute('data-playing', '');

				if (video.hasAttribute('data-preloaded')) {
					video.play();
				} else {
					videoTimers[getVideoId(video)] = setTimeout(function () {
						video.setAttribute('data-preloaded', '');
						video.play();
					}, 300);
				}
			};

			/**
			 * Stop the video and rewind it to the beginning.
			 *
			 * @param {HTMLVideoElement} video
			 */
			const stopVideo = (video) => {
				// if (!video.hasAttribute('data-playing')) return;

				video.removeAttribute('data-playing', '');
				video.pause();

				if(isSafari()) {
					video.load();
				}
				
				video.currentTime = 0;

				if (!video.hasAttribute('data-preloaded') && getVideoTimer(video)) {
					clearTimeout(getVideoTimer(video));
				}

			};

			const isSafari = () => {
				return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			}

			// /**
			//  * Play the video.
			//  *
			//  * @param {HTMLVideoElement} video
			//  */
			// const playVideo = async (video) => {
			//   if (video.hasAttribute('data-starting-play') || video.hasAttribute('data-playing')) return;

			//   try {
			//     if (!video.hasAttribute('src')) {
			//       video.setAttribute('src', video.getAttribute('data-src'));
			//     }

			//     video.setAttribute('data-starting-play', '');
			//     await video.play();
			//     video.removeAttribute('data-starting-play');
			//     video.setAttribute('data-playing', '');

			//     if (video.hasAttribute('data-should-stop')) {
			//       video.removeAttribute('data-should-stop');
			//       stopVideo(video);
			//     }
			//   } catch (error) {
			//     console.log(error);
			//     releaseVideoResource(video);
			//     video.removeAttribute('data-starting-play');
			//     video.removeAttribute('data-should-stop');
			//   }
			// };

			// /**
			//  * Stop the video and rewind it to the beginning.
			//  *
			//  * @param {HTMLVideoElement} video
			//  */
			// const stopVideo = (video) => {
			//   if (video.hasAttribute('data-starting-play')) {
			//     video.setAttribute('data-should-stop', '');
			//     return;
			//   }

			//   if (!video.hasAttribute('data-playing')) {
			//     return;
			//   }

			//   video.removeAttribute('data-playing');
			//   releaseVideoResource(video);
			// };

			// /**
			//  * Release the video resource.
			//  *
			//  * @param {HTMLVideoElement} video
			//  */
			// const releaseVideoResource = (video) => {
			//   video.removeAttribute('src');
			//   video.load();
			// };

			// /**
			//  * @param {IntersectionObserverEntry[]} entries
			//  */
			// const intersectionObserverCallback = (entries) => {
			//   console.log('intersectionObserver');

			//   if (window.innerWidth > 767) return;

			//   entries.forEach((entry) => {
			//     const video = entry.target;
			//     if (entry.isIntersecting) {
			//       playVideo(video);
			//     } else {
			//       stopVideo(video);
			//     }
			//   });
			// };
			// const intersectionObserver = new IntersectionObserver(
			//   debounce(intersectionObserverCallback, 300),
			//   {
			//     rootMargin: '-70px 0px 0px 0px',
			//     threshold: 1.0,
			//   }
			// );

			$videos.forEach((video) => {
				// For iOS, this attribute ensures that video don't expand to full screen automatically
				video.setAttribute('playsinline', '');

				videoTimers[getVideoId(video)] = undefined;

				// // Just to be sure
				// video.muted = true;

				// video.setAttribute('data-src', video.src);
				// releaseVideoResource(video);

				// Mobile
				// intersectionObserver.observe(video);

				// Desktop
				// video.addEventListener('mouseover', function () {
				//   if (window.innerWidth <= 767) return;

				//   this.setAttribute('data-hovered', '');
				//   setTimeout(() => {
				//     if (this.hasAttribute('data-hovered')) playVideo(this);
				//   }, 300);
				// });
				// video.addEventListener('mouseout', function () {
				//   if (window.innerWidth <= 767) return;

				//   this.removeAttribute('data-hovered');
				//   stopVideo(this);
				// });
				video.addEventListener('mouseenter', function () {
					if (window.innerWidth <= 767) return;
					playVideo(this);
				});
				video.addEventListener('mouseleave', function () {
					if (window.innerWidth <= 767) return;
					stopVideo(this);
				});
			});

			const playVideoOnMobileIfVisible = () => {
				if (window.innerWidth > 767) return;

				$videos.forEach((video) => {
					const rect = video.getBoundingClientRect();
					const height = rect.height;
					const visible = Math.max(
							0,
							rect.top > 0
									? Math.min(height, window.innerHeight - rect.top)
									: Math.min(rect.bottom, height)
					);

					if (visible / height >= 0.9) {
						playVideo(video);
					} else {
						stopVideo(video);
					}
				});
			};
			playVideoOnMobileIfVisible();
			$(window).on('scroll', debounce(playVideoOnMobileIfVisible));
		},

		/** Initialize the multi-select over the native multi-select element */
		initCustomMultiSelect() {
			$('select[multiple]').each(function () {
				const $select = $(this),
						label = $select.find('option:first-child').text(),
						$parent = $select.parent();

				$parent.append(
						`<div class="multiSelect">
            <div class="multiSelect__inner">
              <div class="multiSelect__label">${label}</div>
              <div class="multiSelect__selections"></div>
            </div>
            <div class="multiSelect__dropdown"></div>
        </div>`
				);

				const $select2 = $parent.find('.multiSelect'),
						$select2Inner = $select2.find('.multiSelect__inner'),
						$select2Selections = $select2.find('.multiSelect__selections'),
						$select2Dropdown = $select2.find('.multiSelect__dropdown');

				// Create the dropdown items
				$select.find('option:not(:first-child)').each(function () {
					$select2Dropdown.append(
							`<div class="multiSelect__dropdownItem" data-value="${$(this).val()}">
              ${$(this).text()}
            </div>`
					);
				});

				// Handle click on the lable
				$select2Inner.on('click', () => {
					$select2.toggleClass('multiSelect_active');
				});

				// Hide the dropdown when clicking outside of it
				document.addEventListener('click', (e) => {
					if (!e.composedPath().includes($select2[0])) {
						$select2.removeClass('multiSelect_active');
					}
				});

				// Handle click on a dropdown item
				$select2Dropdown.on('click', '.multiSelect__dropdownItem', function () {
					const $dropdownItem = $(this),
							value = $dropdownItem.data('value');

					$dropdownItem.toggleClass('multiSelect__dropdownItem_checked');

					if ($dropdownItem.hasClass('multiSelect__dropdownItem_checked')) {
						// Add the item to the selections
						$select2Selections.append(
								`<div class="multiSelect__selectionsItem" data-value="${value}">
                ${$dropdownItem.text().trim()}
              </div>`
						);
					} else {
						// Remove the item from the selections
						$select2Selections.children().each(function () {
							if ($(this).data('value') === value) {
								$(this).remove();
							}
						});
					}

					if ($select2Selections.children().length) {
						$select2.addClass('multiSelect_hasSelections');
					} else {
						$select2.removeClass('multiSelect_hasSelections');
					}

					// Select/deselect the item in the HTML select
					$select.find('option:not(:first-child)').each(function () {
						if (this.value === value) {
							this.selected = $dropdownItem.hasClass('multiSelect__dropdownItem_checked');
						}
					});
				});

				// Mark the multi-select on error
				new ClassWatcher(
						$select[0],
						'wpcf7-not-valid',
						() => {
							$select2.addClass('wpcf7-not-valid');
						},
						() => {
							$select2.removeClass('wpcf7-not-valid');
						}
				);
			});
		},

		/**
		 * Mark form input when it's focused or changed.
		 */
		markDirtyFormInput() {
			if ($('form').length) {
				$('input, textarea')
						.on('focus', function () {
							$(this).parents('label').addClass('dirty');
						})
						.on('blur', function () {
							const $input = $(this);
							if ($input.val()) {
								$input.parents('label').addClass('dirty');
							} else {
								$input.parents('label').removeClass('dirty');
							}
						});
			}
		},

		/**
		 * Set fixed height for contact section's left column.
		 */
		setFixedHeightForContactSectionLeftColumn() {
			const $col = $('.contactSection__left');
			if ($col.length) {
				const setHeight = () => {
					$col.each(function () {
						$(this).css('height', '');
						$(this).css('height', $(this).outerHeight());
					});
				};

				setTimeout(setHeight, 1000);
				$(window).on('resize', debounce(setHeight));
			}
		},

		init() {
			// this.initHomepageIntro();
			// this.setProportionsForHomepageHeroElements();
			this.handleHtml5Videos();
			this.initCustomMultiSelect();
			this.markDirtyFormInput();
			this.setFixedHeightForContactSectionLeftColumn();
		},
	};

	rekos.init();
});

/* Utilities */

function preloadImage(src) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = src;
	});
}

/** Simple implementation of the "debounce" concept. */
function debounce(func, time) {
	var time = time || 100;
	var timer;
	return function (...arguments) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(func, time, ...arguments);
	};
}

/** Tracking the appearance or disappearance of a class in an element. */
class ClassWatcher {
	constructor(targetNode, classToWatch, onClassAddedCallback, onClassRemovedCallback) {
		this.targetNode = targetNode;
		this.classToWatch = classToWatch;
		this.onClassAddedCallback = onClassAddedCallback;
		this.onClassRemovedCallback = onClassRemovedCallback;
		this.lastClassState = targetNode.classList.contains(this.classToWatch);
		this.observer = new MutationObserver(this.mutationCallback);
		this.observe();
	}

	observe() {
		this.observer.observe(this.targetNode, {attributes: true});
	}

	disconnect() {
		this.observer.disconnect();
	}

	mutationCallback = (mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
				const currentClassState = mutation.target.classList.contains(this.classToWatch);
				if (this.lastClassState !== currentClassState) {
					this.lastClassState = currentClassState;
					if (currentClassState) {
						this.onClassAddedCallback();
					} else {
						this.onClassRemovedCallback();
					}
				}
			}
		}
	};
}
