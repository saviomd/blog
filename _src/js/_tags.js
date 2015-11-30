/* global ga, tags */

var blog = blog || {};

blog.tags = (function () {
	var $tagList = $('.tag-list');
	if ($tagList.length) {
		if (typeof ga !== 'undefined') {
			$('.js-btn-tag-list').on('click', function () {
				ga('send', 'event', 'Blog', 'Tags', 'Exibir tags');
			});
		}

		var $tagActive = $('.js-tag-active');
		var $tagCollapse = $('#collapse-tag-list');
		tags.sort();
		var htmlTagItens = '<a href="#" class="active">Todas</a>';
		for (var i = 0, len = tags.length; i < len; i++) {
			htmlTagItens += ', <a href="#">' + tags[i] + '</a>';
		}
		$tagList.find('.card-block').append(htmlTagItens);

		$tagList.find('a').on('click', function (e) {
			e.preventDefault();
			var $a = $(this);
			var tagCurrent = $a.text();
			$tagActive.html(tagCurrent);
			$tagCollapse.collapse('hide');
			$tagList.find('a').removeClass('active');
			$a.addClass('active');
			var $posts = $('.post');
			$posts.removeClass('hidden-xs-up');
			console.log(tagCurrent);
			if (tagCurrent !== 'Todas') {
				$posts.each(function () {
					var $post = $(this);
					if ($post.attr('data-tags').indexOf(tagCurrent) === -1) {
						$post.addClass('hidden-xs-up');
					}
				});
			}
			if (typeof ga !== 'undefined') {
				ga('send', 'event', 'Blog', 'Tags', tagCurrent);
			}
		});
	}
})();
