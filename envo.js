var envo = {

	site: {
		width: null,
		height: null
	},

	logo: {
		width: 800,
		height: 148
	},

	init: function() {
		envo.site.width = $(window).width();
		envo.site.height = $(window).height();
		envo.showReel.set();
		envo.setLogo();
		envo.menu.set();
	},

	head: {
		set: function() {
			$('#head').css({
				width: envo.site.width,
				height: envo.site.height
			});
		}
	},

	showReel: {
		max: null,
		current: 1,
		set: function() {
			envo.showReel.max = $('.image').length;
			$('.image').css({
				width: envo.site.width,
				height: envo.site.height
			});
			envo.showReel.work();
		},
		work: function() {
			if (envo.showReel.current > envo.showReel.max) {
				envo.showReel.current = 1;
			}
			$('.image').fadeOut('slow');
			$('.image_'+envo.showReel.current).fadeIn('slow');
			envo.showReel.current++;
			setTimeout(function(){
				envo.showReel.work();
			},6000);
		}
	},

	setLogo: function() {
		$('#head h1').css({
			width: envo.logo.width+'px',
			height: envo.logo.height+'px',
			left: (envo.site.width/2)-(envo.logo.width/2),
			//top: (envo.site.height/2)-(envo.logo.height/2)-300
			top: 150
		});
	},

	content: {
		set: function() {
			$('#content').css({
				width: envo.site.width
			});
		}
	},

	menu: {
		selected: null,
		set: function() {
			$('#menu li').click(function(){
				envo.menu.selected = $(this).data('anchor');
				$('.block').hide();
				$('.block_'+envo.menu.selected+'').fadeIn('medium');
			});
		}
	}

};

$(document).ready(function(){
	envo.init();
});
