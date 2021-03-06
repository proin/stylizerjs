$(document).ready(function() {
	stylizerjs._init();
	stylizerjs.ready();
});

$( window ).resize(function() {
	stylizerjs._resize();
	stylizerjs.resize();
});

var stylizerjs = new function() {
	this.theme = [];

	this._init = function() {
		this.code.create();
		this._theme.create();
		
		this._href.create();

		this.grid.create();
		this.table.create();

		this.tab.create();
		this.popup.create();
		this.slide.create();

		this.fixed.create();
	}

	this._resize = function() {
		this.grid.create();
		this.table.create();
		this.fixed.resize();
	}

	this.hiddenAllChild = function(_target, _exceptions) {
		var keys = [];
		for(var i=0;i<_target.attributes.length;i++) {
			keys.push(_target.attributes[i].nodeName);
		}

		for(var i=0;i<keys.length;i++) {
			var _ext = false;
			for(var j=0; j < _exceptions.length ; j++ )
				if(keys[i] == _exceptions[j])
					_ext = true;
			if(_ext == false)
				$(_target).removeAttr(keys[i]);
		}
		
		$(_target).css('visibility','hidden');

		$(_target).children().each(function(){
			stylizerjs.hiddenAllChild(this, _exceptions);
		});
	}

	this.hasAttr = function(_target, _attrName) {
		for(var i = 0; i < _target.attributes.length ; i++)
			if(_target.attributes[i].nodeName == _attrName)
				return true;
		return false;
	}

	this.ready = function() {
	}

	this.resize = function() {
	}
}

/* code.js */
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

/* fixed.js */
stylizerjs.fixed = new function() {

	this.create = function() {
		$('[fixed]').each(function(){
			if($(this).attr('fixed') != null && $(this).attr('fixed-status') == null) {
				var clone = $(this).clone().attr('fixed-status','false');
				clone.attr('test','testing');
				$(this).css('position','fixed');
				$(this).attr('fixed-status','true');
				clone.insertAfter(this);
			}
		});
		stylizerjs.fixed.resize();
	}
	
	this.resize = function() {
		$('[fixed-status="false"]').each(function() {
			var clone = this;
			var _fixed_id = $(this).attr('fixed');
			$('[fixed-status="true"]').each(function(){
				if($(this).attr('fixed') == _fixed_id) {
					$(clone).html($(this).html());
					$(this).width($(clone).width());
					$(this).height($(clone).height());
					$(this).css('z-index',1000);
				}
			});
		});

		$('[fixed-status="false"]').each(function() {
			stylizerjs.hiddenAllChild(this,['fixed','fixed-status','style','class']);
		});
	}
}

/* grid.js */
stylizerjs.grid = new function() {
	this.create = function() {
		$('grid').each(function(){
			var colspans = 0;
			var _gird_width = $(this).width() * 0.99;
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

/* href.js */
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

/* popup.js */
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

		$('html,body').css('overflow','hidden');

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
		$('html,body').removeAttr('style');
	}
}

/* slide.js */
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

/* tab.js */
stylizerjs.tab = new function() {
	this.create = function() {
		$('tab').each(function(){
			var _tab_name = $(this).attr('tab-id');
			stylizerjs._theme.tab($(this));
			if(_tab_name!=null) {
				$('tab[tab-id="'+_tab_name+'"] > menu').each(function(){
					var checkParent = 0;
					var top = 0;
					
					$(this).parents().each(function() {
						if($(this).attr('tab-status') == 'active') checkParent++;
						if($(this).prop('tagName').toLowerCase() == 'tabcontent') top++;
					});

					var _menu_name = $(this).attr('tab-id');
					console.log(_tab_name, checkParent, top);
					if($(this).attr('tab-status') == 'active' && (checkParent != 0 || top == 0)) {
						stylizerjs.tab.select(_tab_name, _menu_name);
					}
					
					$(this).click(function(){
						stylizerjs.tab.select(_tab_name, _menu_name);
					});
				});
			}
		});

		$('[tab-href]').each(function() {
			$(this).click(function() {
				stylizerjs.tab.select($(this).attr('tab-href').split('#')[0], $(this).attr('tab-href').split('#')[1]);
			});
		});
	}

	this.change = function(tabName, contentName) {
	}

	this.select = function(_tab_name, _menu_name) {
		$('tabcontent[tab-id="'+_tab_name+'"] > menu').each(function(index){
			$(this).removeAttr('tab-status');
		});
		
		$('tabcontent[tab-id="'+_tab_name+'"] tabcontent > menu').each(function(index){
			$(this).removeAttr('tab-status');
		});

		stylizerjs.tab._acitiveTab(_tab_name, _menu_name);

		$('tabcontent[tab-id="'+_tab_name+'"] > menu[tab-id="'+_menu_name+'"] tab > menu[tab-status="active"]').each(function(){
			var _sub_tab_name = $(this).parent().attr('tab-id');
			var _sub_menu_name = $(this).attr('tab-id');
			var _check = true;
			$(this).parents().each(function(){
				if($(this).prop('tagName') == 'MENU' && $(this).attr('tab-status')!='active') {
					_check = false;
				}
			});
			if(_check == true)
				stylizerjs.tab._acitiveTab(_sub_tab_name,_sub_menu_name);
		});
	}

	this._acitiveTab = function(_tab_name, _menu_name) {
		// Active Clicked Menu And Apply Theme
		var selected = $('tab[tab-id="'+_tab_name+'"] > menu[tab-id="'+_menu_name+'"]');
		
		$('tab[tab-id="'+_tab_name+'"] > menu').each(function(){
			$(this).removeAttr('tab-status');
			$(this).attr('ondragstart','return false');
			$(this).attr('onselectstart','return false');
		});

		selected.attr('tab-status','active');
		
		$('tabcontent[tab-id="'+_tab_name+'"] > menu[tab-id="'+_menu_name+'"]').attr('tab-status','active');
		stylizerjs.resize();
		stylizerjs._theme.tab($('tab[tab-id="'+_tab_name+'"]'));

		stylizerjs.tab.change(_tab_name, _menu_name);
	}
	
}

/* table.js */
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

/* theme.js */
stylizerjs._theme = new function() {
	this.components = ['button','panel','table','tab','nav','popup','slide'];

	this.create = function() {
		this.setDefault();
	}

	this.setDefault = function() {
		// Set Inner Theme
		$('[inner-theme]').each(function(){
			stylizerjs._theme.setInnerTheme($(this));
		});

		// Apply Theme
		$('[theme]').each(function(){
			for(var i=0; i<stylizerjs._theme.components.length;i++)
				if($(this).prop('tagName').toLowerCase() == stylizerjs._theme.components[i]) return;
			stylizerjs._theme.setTheme($(this).attr('theme'),$(this),'basics', $(this).prop('tagName').toLowerCase());
		});

		$('button').each(function() {
			stylizerjs._theme.button($(this));
		});

		$('panel').each(function() {
			stylizerjs._theme.panel($(this));
		});

		$('nav').each(function() {
			stylizerjs._theme.nav($(this));
		});
	}

	this.setInnerTheme = function(jqueryObj) {
		var themeName = jqueryObj.attr('inner-theme');
		if(themeName == null) 
			return;
		for(var i=0; i<stylizerjs._theme.components.length;i++) {
			jqueryObj.find(stylizerjs._theme.components[i]).each(function() {
				var setAvailable = true;
				var isFirst = true;
				$(this).parents().each(function(index) {
					if(stylizerjs.hasAttr(this, 'inner-theme') == true && isFirst) {
						if($(this).attr('inner-theme') != themeName)
							setAvailable = false;
						isFirst = false;
					}
				});
				if(stylizerjs.hasAttr(this, 'theme') == false && setAvailable == true)
					$(this).attr('theme', themeName);
			});
		}

		var themeObj = stylizerjs._theme.findTheme(themeName);
		if(themeObj.hasOwnProperty('basics') == false)
			return;
		$.each(themeObj['basics'], function(k, v) {
			jqueryObj.find(k).each(function() {
				var setAvailable = true;
				var isFirst = true;
				$(this).parents().each(function(index) {
					if(stylizerjs.hasAttr(this, 'inner-theme') == true && isFirst) {
						if($(this).attr('inner-theme') != themeName)
							setAvailable = false;
						isFirst = false;
					}
				});
				if(stylizerjs.hasAttr(this, 'theme') == false && setAvailable == true)
					$(this).attr('theme', themeName);
				stylizerjs._theme.setTheme($(this).attr('theme'),$(this),'basics',k);
			});
		});
	}

	this.button = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		stylizerjs._theme.setTheme(themeName,jqueryObj,'button','default');
		jqueryObj.hover(function() {
			stylizerjs._theme.setTheme(themeName,jqueryObj,'button','hover');
		}, function() {
			stylizerjs._theme.setTheme(themeName,jqueryObj,'button','default');
		});
	}

	this.panel = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj,'panel','body');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> header'),'panel','header');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> footer'),'panel','footer');
	}

	this.table = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> thead > tr > th'),'table','wrapper');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> thead > tr > td'),'table','wrapper');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tbody > tr > th'),'table','wrapper');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tbody > tr > td'),'table','wrapper');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tfoot > tr > th'),'table','wrapper');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tfoot > tr > td'),'table','wrapper');

		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> thead > tr > th'),'table','header');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tbody > tr:nth-child(odd) > th'),'table','odd-row');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> tbody > tr:nth-child(odd) > td'),'table','odd-row');

	}

	this.tab = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> menu'),'tab','in-active');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> menu[tab-status="active"]'),'tab','default');

		jqueryObj.find('> menu').each(function() {
			$(this).hover(function() {
				if($(this).attr('tab-status')==null) stylizerjs._theme.setTheme(themeName, $(this),'tab','hover');
			}, function() {
				if($(this).attr('tab-status')==null) stylizerjs._theme.setTheme(themeName, $(this),'tab','in-active');
			});
		});
	}

	this.popup = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj,'popup','body');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> header'),'popup','header');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> footer'),'popup','footer');
	}

	this.slide = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj,'slide','body');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> header'),'slide','header');
	}

	this.nav = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		var titleObj = jqueryObj.find('> title');

		stylizerjs._theme.setTheme(themeName,jqueryObj,'nav','nav');
		
		stylizerjs._theme.setTheme(themeName,titleObj,'nav','title');

		titleObj.attr('ondragstart','return false');
		titleObj.attr('onselectstart','return false');

		titleObj.hover(function() {
			stylizerjs._theme.setTheme(themeName,titleObj,'nav','title-hover');
		}, function() {
			stylizerjs._theme.setTheme(themeName,titleObj,'nav','title');
		});
	}

	this.setTheme = function(themeName, jqueryObj, style, status) {
		var theme = stylizerjs._theme.findTheme(themeName);
		if(theme == false)
			return;
		if(theme.hasOwnProperty(style) == false)
			return;
		if(theme[style].hasOwnProperty(status) == false)
			return;
		$.each(theme[style][status], function(k, v) {
			jqueryObj.css(k, v);
		});
	}

	this.findTheme = function(themeName) {
		for(var i=0;i<stylizerjs.theme.length;i++)
			if(stylizerjs.theme[i]['name'] == themeName)
				 return stylizerjs.theme[i];
		return false;
	}
}
