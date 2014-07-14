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