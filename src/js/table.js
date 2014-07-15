stylizerjs.table = new function() {
	this.tableData = new Object();

	this.create = function() {

		$('table').each(function(){
			stylizerjs.table._setTableSize($(this));
		});
		
		$('tr[table-data]').each(function() {
			$(this).css('position','fixed');
			$(this).css('visibility','hidden');
			$(this).css('display','none');
			stylizerjs.table._setTable($(this).attr('table-data'));
		});
	}

	this.refresh = function(tableDataName, tableData) {
		if(tableDataName!=null && tableData!=null)
			stylizerjs.table.tableData[tableDataName] = tableData;
		this._setTable(tableDataName);
	}

	this._setTableSize = function(tableObj) {
		var table_width = tableObj.width();
		var one_cell_width = -1;

		tableObj.find('> thead > tr').each(function() {
			one_cell_width = stylizerjs.table._getSize(this, one_cell_width, table_width);
		});

		tableObj.find('> tbody > tr').each(function() {
			one_cell_width = stylizerjs.table._getSize(this, one_cell_width, table_width);
		});

		stylizerjs._theme.table(tableObj);
	}

	this._setTable = function(tableDataName) {
		$('tr[table-data-item="'+tableDataName+'"]').each(function() {
			$(this).remove();
		});

		$('tr[table-data="'+tableDataName+'"]').each(function() {
			var data = stylizerjs.table.tableData[tableDataName];
			if(data==null) return;
			for(var i=0;i<data.length;i++) {
				var itemRow = $('<tr table-data-item="'+tableDataName+'"></tr>');
				itemRow.html($(this).html());
				itemRow.find('> td').each(function() {
					if($(this).html().indexOf('{{') == -1 && $(this).html().indexOf('}}') == -1) return;
					var itemIndex = $(this).html().replace('{{','').replace('}}','');
					if(data[i][itemIndex] != null)
						$(this).html(data[i][itemIndex]);
					else 
						$(this).html('');
				});
				itemRow.insertBefore(this);
			}
			stylizerjs.table._setTableSize($(this).parent().parent());
		});
	}

	this._getSize = function(obj, one_cell_width, table_width) {
		if(one_cell_width == -1) {
			var colspans = 0;
			$(obj).find('> th').each(function() {
				if($(this).attr('colspan')==null)
					colspans += 1;
				else
					colspans += $(this).attr('colspan')*1;
			});
			if(colspans > 0) one_cell_width = table_width / colspans;	
		}

		if(one_cell_width == -1) {
			var colspans = 0;
			$(obj).find('> td').each(function() {
				if($(this).attr('colspan')==null)
					colspans += 1;
				else
					colspans += $(this).attr('colspan')*1;
			});
			if(colspans > 0) one_cell_width = table_width / colspans;	
		}

		$(obj).find('> th').each(function() {
			if($(this).attr('colspan')==null)
				$(this).width(one_cell_width);
			else
				$(this).width(one_cell_width*$(this).attr('colspan'));
		});

		$(obj).find('> td').each(function() {
			if($(this).attr('colspan')==null)
				$(this).width(one_cell_width);
			else
				$(this).width(one_cell_width*$(this).attr('colspan'));
		});

		return one_cell_width;
	}
}