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
	//envo.init();
});

var canvas = document.getElementById('canvas')
  , context = canvas.getContext('2d')
  , img = new Image()
  , w
  , h
  , offset
  , glitchInterval;

img.src = 'http://blog.codepen.io/wp-content/uploads/2012/06/White-Large.png';
img.src = 'http://envo.github.dev/images/logo_invert.png';
img.onload = function() {
  init();
	window.onresize = init;
};

var init = function() {
	clearInterval(glitchInterval);
	canvas.width = w = window.innerWidth;
	offset = w * .1;
	canvas.height = h = ~~(175 * ((w - (offset * 2)) / img.width));
	glitchInterval = setInterval(function() {
		clear();
		context.drawImage(img, 0, 110, img.width, 175, offset, 0, w - (offset * 2), h);
		setTimeout(glitchImg, randInt(250, 1000));
	}, 500);
};

var clear = function() {
	context.rect(0, 0, w, h);
	context.fill();
};

var glitchImg = function() {
	for (var i = 0; i < randInt(1, 13); i++) {
		var x = Math.random() * w;
		var y = Math.random() * h;
		var spliceWidth = w - x;
		var spliceHeight = randInt(5, h / 3);
		context.drawImage(canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
		context.drawImage(canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
	}
};

var randInt = function(a, b) {
	return ~~(Math.random() * (b - a) + a);
};
