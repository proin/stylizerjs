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