stylizerjs.table = new function() {
	
	this.create = function() {
		$('table').each(function(){
			var table_width = $(this).width();
			var one_cell_width = -1;
			$(this).find('> thead > tr').each(function() {
				if(one_cell_width == -1) {
					var colspans = 0;
					$(this).find('> th').each(function() {
						if($(this).attr('colspan')==null)
							colspans += 1;
						else
							colspans += $(this).attr('colspan')*1;
					});
					one_cell_width = table_width / colspans;	
				}

				if(one_cell_width == -1) {
					var colspans = 0;
					$(this).find('> td').each(function() {
						if($(this).attr('colspan')==null)
							colspans += 1;
						else
							colspans += $(this).attr('colspan')*1;
					});
					one_cell_width = table_width / colspans;	
				}

				$(this).find('> th').each(function() {
					if($(this).attr('colspan')==null)
						$(this).width(one_cell_width);
					else
						$(this).width(one_cell_width*$(this).attr('colspan'));
				});

				$(this).find('> td').each(function() {
					if($(this).attr('colspan')==null)
						$(this).width(one_cell_width);
					else
						$(this).width(one_cell_width*$(this).attr('colspan'));
				});
			});

			$(this).find('> tbody > tr').each(function() {
				if(one_cell_width == -1) {
					var colspans = 0;
					$(this).find('> th').each(function() {
						if($(this).attr('colspan')==null)
							colspans += 1;
						else
							colspans += $(this).attr('colspan')*1;
					});
					one_cell_width = table_width / colspans;	
				}

				if(one_cell_width == -1) {
					var colspans = 0;
					$(this).find('> td').each(function() {
						if($(this).attr('colspan')==null)
							colspans += 1;
						else
							colspans += $(this).attr('colspan')*1;
					});
					one_cell_width = table_width / colspans;	
				}

				$(this).find('> th').each(function() {
					if($(this).attr('colspan')==null)
						$(this).width(one_cell_width);
					else
						$(this).width(one_cell_width*$(this).attr('colspan'));
				});

				$(this).find('> td').each(function() {
					if($(this).attr('colspan')==null)
						$(this).width(one_cell_width);
					else
						$(this).width(one_cell_width*$(this).attr('colspan'));
				});
			});
		});
	}
}