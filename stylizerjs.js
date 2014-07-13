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
		this.tab.create();
		this.grid.create();
		this.fixed.create();
		this.popup.create();
	}

	this._resize = function() {
		this.grid.create();
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
		for(var i=0;i<splittext.length;i++) {
			if(splittext[i].length == 0)
				continue;
			var tabCount = splittext[i].split('\t').length;
			if(firstTabCount==-1) {
				html += $(obj).text(splittext[i]).html();
				firstTabCount = tabCount;
			} else {
				for(var j=0;j<tabCount-firstTabCount;j++)
					html += '&nbsp;&nbsp;&nbsp;&nbsp;';
				html += $(obj).text(splittext[i]).html();
			}

			if(i < splittext.length - 1)
				html += '<br>';
		}
		$(obj).html(html);
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
					$(this).css('z-index',200);
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
			var _gird_width = $(this).width();
			$(this).children('column').each(function(){
				$(this).removeAttr('style');
				$(this).removeAttr('class');
				if($(this).attr('colspan')==null)
					colspans += 1;
				else
					colspans += $(this).attr('colspan')*1;
			});
			
			$(this).children('column').each(function(){
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

/* popup.js */
stylizerjs.popup = new function() {
	this.create = function() {
		$('body').append('<popup-container></popup-container>');

		$('popup-container').append('<popup-dissmiss-panel></popup-dissmiss-panel>')

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
		stylizerjs._theme.create();

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

/* tab.js */
stylizerjs.tab = new function() {
	this.create = function() {
		$('tab').each(function(){
			var _tab_name = $(this).attr('tab-id');
			if(_tab_name!=null) {
				$('tab[tab-id="'+_tab_name+'"] > menu').each(function(){
					var _menu_name = $(this).attr('tab-id');
					
					if($(this).attr('tab-status') == 'active') {
						stylizerjs.tab.selectTab(_tab_name, _menu_name);
					}
					
					// Tab Menu Clicked
					$(this).click(function(){
						stylizerjs.tab.selectTab(_tab_name, _menu_name);
					});
				});	
			}
		});
	}

	this.selectTab = function(_tab_name, _menu_name) {
		// Invisible All Tab Contents
		$('tabcontent[tab-id="'+_tab_name+'"] > menu').each(function(index){
			$(this).removeAttr('tab-status');
		});
		
		$('tabcontent[tab-id="'+_tab_name+'"] tabcontent > menu').each(function(index){
			$(this).removeAttr('tab-status');
		});

		stylizerjs.tab.acitiveTab(_tab_name, _menu_name);

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
				stylizerjs.tab.acitiveTab(_sub_tab_name,_sub_menu_name);
		});
	}

	this.acitiveTab = function(_tab_name, _menu_name) {
		// Active Clicked Menu And Apply Theme
		var selected = $('tab[tab-id="'+_tab_name+'"] > menu[tab-id="'+_menu_name+'"]');
		
		$('tab[tab-id="'+_tab_name+'"] > menu').each(function(){
			$(this).removeAttr('tab-status');
			$(this).attr('ondragstart','return false');
			$(this).attr('onselectstart','return false');
		});

		selected.attr('tab-status','active');
		
		stylizerjs._theme.tab($('tab[tab-id="'+_tab_name+'"]'));

		// Active Tab Content
		$('tabcontent[tab-id="'+_tab_name+'"] > menu[tab-id="'+_menu_name+'"]').attr('tab-status','active');
		stylizerjs.resize();

		// Tab Change Listener
		stylizerjs.tab.change(_tab_name, _menu_name);
	}
	
	this.change = function(_tab_name, _menu_name) {
	}
}

/* theme.js */
stylizerjs._theme = new function() {
	this.create = function() {
		this.setDefault();
	}

	this.setDefault = function() {
		// Set Inner Theme
		$('[inner-theme]').each(function(){
			stylizerjs._theme.setInnerTheme($(this));
		});

		// Apply Theme
		$('button').each(function() {
			stylizerjs._theme.button($(this));
		});

		$('panel').each(function() {
			stylizerjs._theme.panel($(this));
		});

		$('table').each(function() {
			stylizerjs._theme.table($(this));
		});

		$('nav').each(function() {
			stylizerjs._theme.nav($(this));
		});
	}

	this.setInnerTheme = function(jqueryObj) {
		var themeName = jqueryObj.attr('inner-theme');
		if(themeName == null) 
			return;

		var components = ['button','panel','table','tab','nav','popup'];
		for(var i=0; i<components.length;i++) {
			jqueryObj.find(components[i]).each(function() {
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

		if(jqueryObj.attr('href') != null) {
			jqueryObj.click(function() {
				if(jqueryObj.attr('new-window') == null)
					$(location).attr('href', jqueryObj.attr('href'));
				else
					window.open(jqueryObj.attr('href'));
			});
		}
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
	}

	this.popup = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		
		stylizerjs._theme.setTheme(themeName,jqueryObj,'popup','body');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> header'),'popup','header');
		stylizerjs._theme.setTheme(themeName,jqueryObj.find('> footer'),'popup','footer');
	}

	this.nav = function(jqueryObj) {
		var themeName = jqueryObj.attr('theme');
		var titleObj = jqueryObj.find('> title');

		stylizerjs._theme.setTheme(themeName,jqueryObj,'nav','nav');
		
		stylizerjs._theme.setTheme(themeName,titleObj,'nav','title');
		titleObj.hover(function() {
			stylizerjs._theme.setTheme(themeName,titleObj,'nav','title-hover');
		}, function() {
			stylizerjs._theme.setTheme(themeName,titleObj,'nav','title');
		});

		if(titleObj.attr('href') != null) {
			titleObj.click(function() {
				if(titleObj.attr('new-window') == null)
					$(location).attr('href', titleObj.attr('href'));
				else
					window.open(titleObj.attr('href'));
			});
		}

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
