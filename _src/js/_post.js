/* global ga */

/* eslint-disable no-use-before-define */
var blog = blog || {};
/* eslint-enable no-use-before-define */

blog.post = (function () {
	if (typeof ga !== 'undefined') {
		$('.js-post-content').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Link: ' + $(this).attr('href'));
		});
	}
})();
