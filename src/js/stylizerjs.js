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
		
		this.grid.create();
		this.table.create();
		this.fixed.create();

		this.tab.create();
		this.popup.create();
		this.slide.create();
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