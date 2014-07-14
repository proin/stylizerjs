stylizerjs.slide = new function() {
	this.slideSize = new Object();

	this.create = function() {
		$('body').append('<slide-container></slide-container>');
		$('slide-container').append('<slide-dissmiss-panel></slide-dissmiss-panel>');

		$('slide[slide-id]').each(function(){
			stylizerjs.slide.slideSize[$(this).attr('slide-id')] = $(this).width();
			stylizerjs.slide.hidden($(this));
			$('slide-container').append($(this));
		});

		$('slide-container').attr('style','visibility:hidden;');

		$('[slide-href]').each(function() {
			$(this).click(function() {
				stylizerjs.slide.visible($('slide[slide-id="'+$(this).attr('slide-href')+'"]'));
			});
		});
	}

	this.visible = function(jqueryObj) {
		$('slide-container').attr('style','visibility:visible;');
		jqueryObj.css({visibility: 'visible', height: 'auto'});
		jqueryObj.animate({ width: stylizerjs.slide.slideSize[jqueryObj.attr('slide-id')]+'%' }, 500 );
		$('body').css('overflow','hidden');

		if(jqueryObj.attr('right') != null) 
			jqueryObj.css('float','right');

		if(jqueryObj.height() == $('slide-container').height())
			$('slide-container').css('overflow','hidden');
		else
			$('slide-container').css('overflow','scroll');

		stylizerjs._theme.slide(jqueryObj);

		$('[dismiss-slide]').each(function(){
			$(this).click(function() {
				stylizerjs.slide.hidden(jqueryObj);
			});
		});

		$('slide-dissmiss-panel').click(function() {
			stylizerjs.slide.hidden(jqueryObj);
		});
	}

	this.hidden = function(jqueryObj) {
		$('slide-container').attr('style','visibility:hidden;');
		$('slide-container').animate({
			scrollTop: 0
		}, 0);
		jqueryObj.css('float','left');
		jqueryObj.css({width: 0, visibility: 'hidden', height: 0});
		$('body').removeAttr('style');
	}
}