stylizerjs.grid = new function() {
	this.create = function() {
		$('grid').each(function(){
			var colspans = 0;
			var _gird_width = $(this).width();
			$(this).find('> column').each(function(){
				if($(this).attr('colspan')==null)
					colspans += 1;
				else
					colspans += $(this).attr('colspan')*1;
			});
			
			$(this).find('> column').each(function(){
				var _this_colspan = 1;
				if($(this).attr('colspan')==null)
					_this_colspan = 1;
				else
					_this_colspan = $(this).attr('colspan')*1;
				var _this_width = _gird_width * _this_colspan / colspans;
				$(this).width(_this_width);
			});
		});
	}
}