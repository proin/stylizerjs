stylizerjs.popup = new function() {
	this.popups = new Object();

	this.create = function() {
		$('body').append('<popup-container></popup-container>');

		$('popup[popup-id]').each(function(){
			stylizerjs.popup.popups[$(this).attr('popup-id')] = $(this).clone();
			$(this).remove();
		});

		$('popup-container').attr('style','visibility:hidden;');

		$('[popup-href]').each(function() {
			$(this).click(function() {
				stylizerjs.popup.visible(stylizerjs.popup.popups[$(this).attr('popup-href')]);
			});
		});
	}

	this.visible = function(jqueryObj) {
		$('popup-container').attr('style','visibility:visible;');
		$('popup-container').append(jqueryObj);
		$('body').css('overflow','hidden');

		stylizerjs._theme.popup(jqueryObj);

		$('[dismiss-popup]').each(function(){
			$(this).click(function() {
				stylizerjs.popup.hidden();
			});
		});

		$('popup-container').click(function() {
			stylizerjs.popup.hidden();
		});
	}

	this.hidden = function() {
		$('popup-container').attr('style','visibility:hidden;');
		$('popup-container').html('');
		$('body').css('overflow','scroll');
	}
}