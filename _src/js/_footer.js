/* global ga */

var blog = blog || {};

blog.footer = (function () {
	if (typeof ga !== 'undefined') {
		$('.footer').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Rodapé', $(this).text());
		});
	}
})();
