stylizerjs._href = new function() {
	this.create = function() {
		$('[href]').each(function() {
			if($(this).prop('tagName') == 'A') return;
			$(this).click(function() {
				if($(this).attr('new-window') == null)
					$(location).attr('href', $(this).attr('href'));
				else
					window.open($(this).attr('href'));
			});
		});
	}
}