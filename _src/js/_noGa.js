/* eslint-disable no-use-before-define */
const blog = blog || {};
/* eslint-enable no-use-before-define */

blog.noGa = (function () {
	if (location.search.indexOf('a=0') !== -1) {
		$('a').filter('[href^="/"]').each(function () {
			const url = $(this).attr('href');
			$(this).attr('href', url + '?a=0');
		});
	}
})();
