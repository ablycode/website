jQuery(document).ready(function ($) {
	$('form.contactForm').submit(function (e) {
		e.preventDefault()

		$('.contactForm__response').slideUp();

		const $this = $(this);
		const name = $(this).find('[name="name"]');
		const email = $(this).find('[name="email"]');
		const project = $(this).find('[name="project"]');
		const message = $(this).find('[name="messsage"]');

		let approve = true;

		if (name.val() < 1) {
			name.addClass('error')
			approve = false;
		}

		if (!isValidEmail(email.val())) {
			email.addClass('error')
			approve = false;
		}

		if (!approve) return;

		let formData = new FormData();
		formData.append('action', 'contact_form_submission');
		formData.append('name', name.val());
		formData.append('email', email.val());
		formData.append('project', JSON.stringify(project.val()));
		formData.append('message', message.val());
		formData.append('url', window.location.href);

		$.ajax({
			url: variables.ajaxUrl,
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',

			success: function (data) {
				try {
					window.dataLayer.push({
						"event": "form_submit",
						"formId": window.location.href,
						"response": {
							name: name.val(),
							email: email.val(),
							project: JSON.stringify(project.val()),
							message: message.val()
						}
					});
				} catch (e) {
				}

				name.val('')
				email.val('')
				message.val('')
				project.val('').trigger('change')

				$this.find('.contactForm__response').slideDown();
			}
		})
	})

	$(document).on('change keyup keydown', 'form.contactForm input[name="name"]', function () {
		if (!$(this).hasClass('error')) return;
		if ($(this).val().length >= 1) $(this).removeClass('error')
	})

	$(document).on('change keyup keydown', 'form.contactForm input[name="email"]', function () {
		if (!$(this).hasClass('error')) return;
		if (isValidEmail($(this).val())) $(this).removeClass('error')
	})
})

function isValidEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}