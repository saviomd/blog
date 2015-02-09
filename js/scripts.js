if (location.search.indexOf('a=0') !== -1){
	$('a').filter('[href^="/"]').each(function(){
		var url = $(this).attr('href');
		$(this).attr('href', url + '?a=0');
	});
}
