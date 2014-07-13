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