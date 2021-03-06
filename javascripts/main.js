$(document).ready(function() {
	var passed = false;
	var before = true;
	var scrolled = false;
	var scrollBreak = $("#floatHeader").height() - parseInt($("#floatHeader").css('padding-bottom')) - 1;
	var scrollFinish = $("#header").height() - $("h1").height();

	$(window).scroll(function(e) {
		scrolled = true;
		var newScroll = $(window).scrollTop();

		var percent = (newScroll - scrollBreak) / (scrollFinish - scrollBreak);
		if(percent <= 1) {
			var padding = percent * 40;
			$("#body").css('padding-top', padding);
		}

		if(newScroll > scrollBreak && newScroll < scrollFinish) {
			$("#floatHeader").css({
				'top': (newScroll - scrollBreak) * -1,
				'box-shadow': 'none'
			});
			passed = false;
			before = false;
		} else if(!passed && newScroll > scrollFinish) {
			$("#floatHeader").css({
				'top': (scrollFinish - scrollBreak) * -1,
				'box-shadow': '0 0 20px 0 black'
			});
			passed = true;
		} else if(!before && newScroll < scrollBreak) {
			$("#floatHeader").css('top', 0);
			before = true;
		}
	});

	setTimeout(function() {
		if(!scrolled) {
			$("html, body").animate({
				scrollTop: 50
			});
		}
	}, 500);

	var dark = $(".dark")[0];
	var darkWatch = scrollMonitor.create(dark, {top: $("h1").height(), bottom: ($("h1").height() + 10) * -1});

	darkWatch.fullyEnterViewport(function() {
		$("body").addClass("dark");
	});
	darkWatch.exitViewport(function() {
		$("body").removeClass("dark");
	})
});
