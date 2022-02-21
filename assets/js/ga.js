	
$(function(){
    	
	// GA event tracking
	$('.ga').on('click', function(){
		var action = '杏一活動';
		var category = $(this).data('ga-cat');
		var label = $(this).data('ga-lab');
		
		gtag('event', action, {
			'event_category': category,
			'event_label': label
		});
	});

});

