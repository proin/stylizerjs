stylizerjs.code = new function() {
	this.create = function() {
		$('code').each(function() {
			stylizerjs.code.replaceEntity(this);
		});
	}

	this.replaceEntity = function(obj) {
		var text = $(obj).html();
		var splittext = text.split('\n');
		var html = '';
		var firstTabCount = -1;

		var tabText = '';

		if( $(obj).attr('tab-space') != null ) {
			for(var i = 0 ; i < $(obj).attr('tab-space') ; i++)
				tabText += '&nbsp;';
		} else {
			tabText = '&nbsp;&nbsp;&nbsp;&nbsp;';
		}

		for(var i=0;i<splittext.length;i++) {
			if(splittext[i].length == 0)
				continue;
			var tabCount = splittext[i].split('\t').length;
			if(firstTabCount==-1) {
				html += $(obj).text(splittext[i]).html();
				firstTabCount = tabCount;
			} else {
				for(var j=0;j<tabCount-firstTabCount;j++)
					html += tabText;
				html += $(obj).text(splittext[i]).html();
			}

			if(i < splittext.length - 1)
				html += '<br>';
		}
		$(obj).html(html);
	}
}