/* global ga */

var blog = blog || {};

blog.header = (function () {
	if (typeof ga !== 'undefined') {
		$('.header__title').on('click', function () {
			ga('send', 'event', 'Blog', 'Cabeçalho', 'Home');
		});
	}
})();

/* global ga */

var blog = blog || {};

blog.post = (function () {
	if (typeof ga !== 'undefined') {
		$('.post__title').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Post', 'Título: ' + $(this).text().trim());
		});

		$('.js-post-content').find('a').on('click', function () {
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

/* global ga */

var blog = blog || {};

blog.footer = (function () {
	if (typeof ga !== 'undefined') {
		$('.footer').find('a').on('click', function () {
			ga('send', 'event', 'Blog', 'Rodapé', $(this).text());
		});
	}
})();

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

var blog = blog || {};

blog.noGa = (function () {
	if (location.search.indexOf('a=0') !== -1) {
		$('a').filter('[href^="/"]').each(function () {
			var url = $(this).attr('href');
			$(this).attr('href', url + '?a=0');
		});
	}
})();
