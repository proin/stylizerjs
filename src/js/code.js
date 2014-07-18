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


		if($(obj).attr('type') != null)
			if(this.codeHighlight[$(obj).attr('type')] != null)
				html = this.codeHighlight[$(obj).attr('type')](html);

		$(obj).html(html);
	}

	this.codeHighlight = {
		'html' : function(code) {
			var result = code.replace(/\t/gi, '').replace(/=""/gi, '').replace(/&amp;gt;/gi, '&gt;').replace(/&amp;lt;/gi, '&lt;');
	
			result = result.replace(/(&lt;)([^&]+)/g, '<c type="tag">$1</c><c type="attrs">$2</c>');
			result = result.replace(/&gt;/g, '<c type="tag">&gt;</c>');
			
			var tmp = $('<tmp>'+result+'</tmp>');
			tmp.find('c[type="attrs"]').each(function(){
				var splittext = $(this).html().split(' ');
				var result = '';
				for(var i=0;i<splittext.length;i++) {
					if(i==0 && i==splittext.length-1) result += '<c type="tagName">'+splittext[i]+'</c>';
					else if(i==0) result += '<c type="tagName">'+splittext[i]+'</c> ';
					else if(i==splittext.length-1) result += splittext[i].replace(/"[^ &]+/g,'<c type="attr-value">$&</c>');
					else result += splittext[i].replace(/"[^ &]+/g,'<c type="attr-value">$&</c>') + ' ';
				}
				$(this).html(result);
			});

			result = tmp.html();

			return result;
		},
		'javascript' : function(code) {
			var keyword = 'in if for while finally var new function do return void else break catch '
						+ 'instanceof with throw case default try this switch continue typeof delete '
						+ 'let yield const class';
			var literal = 'true false null undefined NaN Infinity';
			var builtin = 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent '
						+ 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error '
						+ 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError '
						+ 'TypeError URIError Number Math Date String RegExp Array Float32Array '
						+ 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array '
						+ 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require '
						+ 'module console window document';
			var result = code;
			
			result = result.replace(/"[^"]+"/g, '<c type="string">$&</c>');
			result = result.replace(/'[^']+'/g, '<c type="string">$&</c>');
			result = result.replace(/([^a-zA-Z])(var)([^a-zA-Z])/g, '$1<c type="keyword">$2</c>$3');
			result = result.replace(/([^a-zA-Z])(function)([^a-zA-Z])/g, '$1<c type="keyword">$2</c>$3');
			
			return result;
		}
	}
}