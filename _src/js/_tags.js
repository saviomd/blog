/* global tags */

/* eslint-disable no-use-before-define */
const blog = blog || {};
/* eslint-enable no-use-before-define */

blog.tags = (function () {
	const $tagList = $('.tag-list');
	if ($tagList.length) {
		const $tagActive = $('.js-tag-active');
		const $tagCollapse = $('#collapse-tag-list');
		tags.sort();
		let htmlTagItens = '<a href="#" ga-on="click" ga-event-category="Blog" ga-event-action="Tags" ga-event-label="Todas" class="active">Todas</a>';
		for (const tag of tags) {
			htmlTagItens += ` <a href="#" ga-on="click" ga-event-category="Blog" ga-event-action="Tags" ga-event-label="${tag}">${tag}</a>`;
		}
		$tagList.find('.card-body').append(htmlTagItens);

		$tagList.find('a').on('click', function (e) {
			e.preventDefault();
			const $a = $(this);
			const tagCurrent = $a.text();
			$tagActive.html(tagCurrent);
			$tagCollapse.collapse('hide');
			$tagList.find('a').removeClass('active');
			$a.addClass('active');
			const $posts = $('.post');
			$posts.removeClass('d-none');
			if (tagCurrent !== 'Todas') {
				$posts.each(function () {
					const $post = $(this);
					if ($post.attr('data-tags').indexOf(tagCurrent) === -1) {
						$post.addClass('d-none');
					}
				});
			}
		});
	}
})();
