stylizerjs.slide = new function() {
	this.slideSize = new Object();

	this.create = function() {
		$('body').append('<slide-container></slide-container>');
		$('slide-container').append('<slide-dissmiss-panel></slide-dissmiss-panel>');

		$('slide[slide-id]').each(function(){
			stylizerjs.slide.slideSize[$(this).attr('slide-id')] = $(this).width();
			
			$(this).css('float','left');
			$(this).css({width: 0, visibility: 'hidden', height: 0});

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
		$('html,body').css('overflow','hidden');

		jqueryObj.css({visibility: 'visible', height: 'auto'});
		if(jqueryObj.attr('right') != null) 
			jqueryObj.css('float','right');
		
		stylizerjs._theme.slide(jqueryObj);

		jqueryObj.animate({
			width: stylizerjs.slide.slideSize[jqueryObj.attr('slide-id')]+'%' 
		}, 500 , function() {
			if($('slide[slide-id="'+jqueryObj.attr('slide-id')+'"]').height() == $('slide-container').height())
				$('slide-container').css('overflow','hidden');
			else
				$('slide-container').css('overflow','scroll');

			$('[dismiss-slide]').each(function(){
				$(this).click(function() {
					stylizerjs.slide.hidden(jqueryObj);
				});
			});
		});

		$('slide-dissmiss-panel').click(function() {
			stylizerjs.slide.hidden(jqueryObj);
		});
	}

	this.hidden = function(jqueryObj) {
		$('html,body').removeAttr('style');
		$('slide-container').attr('style','visibility:hidden;');
		
		jqueryObj.css('float','left');
		jqueryObj.css('visibility','hidden');
		jqueryObj.css('height','0px');
		jqueryObj.css('width','0px');

		$('slide-container').animate({
			scrollTop: 0
		}, 0, function() {
		});
	}
}