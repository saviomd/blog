'use strict';

/* eslint-disable no-use-before-define */
var blog = blog || {};
/* eslint-enable no-use-before-define */

blog.noGa = function () {
	if (location.search.indexOf('a=0') !== -1) {
		$('a').filter('[href^="/"]').each(function () {
			var url = $(this).attr('href');
			$(this).attr('href', url + '?a=0');
		});
	}
}();
'use strict';

/* global ga */

/* eslint-disable no-use-before-define */
var blog = blog || {};
/* eslint-enable no-use-before-define */

blog.post = function () {
	if (typeof ga !== 'undefined') {
		$('.js-post-content').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Link: ' + $(this).attr('href'));
		});
	}
}();
'use strict';

/* global tags */

/* eslint-disable no-use-before-define */
var blog = blog || {};
/* eslint-enable no-use-before-define */

blog.tags = function () {
	var $tagList = $('.tag-list');
	if ($tagList.length) {
		var $tagActive = $('.js-tag-active');
		var $tagCollapse = $('#collapse-tag-list');
		tags.sort();
		var htmlTagItens = '<a href="#" ga-on="click" ga-event-category="Blog" ga-event-action="Tags" ga-event-label="Todas" class="active">Todas</a>';
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var tag = _step.value;

				htmlTagItens += ' <a href="#" ga-on="click" ga-event-category="Blog" ga-event-action="Tags" ga-event-label="' + tag + '">' + tag + '</a>';
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		$tagList.find('.card-body').append(htmlTagItens);

		$tagList.find('a').on('click', function (e) {
			e.preventDefault();
			var $a = $(this);
			var tagCurrent = $a.text();
			$tagActive.html(tagCurrent);
			$tagCollapse.collapse('hide');
			$tagList.find('a').removeClass('active');
			$a.addClass('active');
			var $posts = $('.post');
			$posts.removeClass('d-none');
			if (tagCurrent !== 'Todas') {
				$posts.each(function () {
					var $post = $(this);
					if ($post.attr('data-tags').indexOf(tagCurrent) === -1) {
						$post.addClass('d-none');
					}
				});
			}
		});
	}
}();