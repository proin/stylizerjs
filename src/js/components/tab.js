stylizerjs.tab = new function() {
	this.create = function() {
		var _check = true;
		$('tab').each(function(){
			var _tab_name = $(this).attr('tab-id');
			if(_tab_name!=null) {
				$('tab[tab-id="'+_tab_name+'"] > menu').each(function(){
					var _menu_name = $(this).attr('tab-id');
					
					if(_check) {
						if($(this).attr('tab-status') == 'active') {
							stylizerjs.tab.selectTab(_tab_name, _menu_name);
							_check = false;
						}
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