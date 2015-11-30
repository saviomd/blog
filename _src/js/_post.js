/* global ga */

var blog = blog || {};

blog.post = (function () {
	if (typeof ga !== 'undefined') {
		$('.post__title').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Título: ' + $(this).text().trim());
		});

		$('.post__content').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Link: ' + $(this).attr('href'));
		});

		$('.link-post-next').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Próximo: ' + $(this).text().trim());
		});

		$('.link-post-previous').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Anterior: ' + $(this).text().trim());
		});

		$('.js-btn-archive').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Arquivo');
		});
	}
})();
