/* global ga */

var blog = blog || {};

blog.header = (function () {
	if (typeof ga !== 'undefined') {
		$('.header__title').on('click', function () {
			ga('send', 'event', 'Blog', 'Cabeçalho', 'Home');
		});
	}
})();
