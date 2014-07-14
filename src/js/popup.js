stylizerjs.popup = new function() {
	this.create = function() {
		$('body').append('<popup-container></popup-container>');
		$('popup-container').append('<popup-dissmiss-panel></popup-dissmiss-panel>');

		$('popup[popup-id]').each(function(){
			$('popup-container').append($(this));
			$(this).attr('style','visibility:hidden;position:absolute;');
		});

		$('popup-container').attr('style','visibility:hidden;');

		$('[popup-href]').each(function() {
			$(this).click(function() {
				stylizerjs.popup.visible($('popup[popup-id="'+$(this).attr('popup-href')+'"]'));
			});
		});
	}

	this.visible = function(jqueryObj) {
		$('popup-container').attr('style','visibility:visible;');
		jqueryObj.attr('style','visibility:visible;position:absolute;');

		$('body').css('overflow','hidden');

		stylizerjs._theme.popup(jqueryObj);

		$('[dismiss-popup]').each(function(){
			$(this).click(function() {
				stylizerjs.popup.hidden(jqueryObj);
			});
		});

		$('popup-dissmiss-panel').click(function() {
			stylizerjs.popup.hidden(jqueryObj);
		});
	}

	this.hidden = function(jqueryObj) {
		$('popup-container').attr('style','visibility:hidden;');
		jqueryObj.attr('style','visibility:hidden;');
		$('body').removeAttr('style');
	}
}