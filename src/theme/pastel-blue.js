color_pastel_blue = '#8bcede'
color_pastel_blue_border = '#46b8da'
color_sky_blue = '#d0ebf2'
color_sky_blue_2 = 'rgb(231,245,248)'
color_pastel_hover = '#39b3d7'
color_pastel_hover_border = '#269abc'
color_green_blue = '#80ccc8'
color_white = '#fff'
text_color_white = '#fff'
text_color_black = '#000'
 
stylizerjs.theme.push(
 
{
	'name' : 'pastel-blue',
	'tab' : {
		'default' : {
			'background-color' : color_pastel_blue,
			'color' : text_color_white
		},
		'in-active' : {
			'background-color' : color_sky_blue,
			'color' : text_color_white
		}
	},
	'button' : {
		'default' : {
			'background-color' : color_pastel_blue,
			'color' : text_color_white,
			'border-color' : color_pastel_blue
		},
		'hover' : {
			'background-color' : color_pastel_hover,
			'color' : text_color_white,
			'border-color' : color_pastel_hover
		}
	},
	'panel' : {
		'header' : {
			'background-color' : color_pastel_blue,
			'color' : text_color_white
		},
		'body' : {
			'background-color' : color_white,
			'color' : text_color_black,
			'border-color' : color_pastel_blue
		},
		'footer' : {
			'background-color' : color_sky_blue_2,
			'color' : color_pastel_blue_border
		}
	},
	'table' : {
		'wrapper' : {
			'border' : '1px solid ' + color_pastel_blue,
			'color' : text_color_black,
			'background-color' : color_white
		},
		'header' : {
			'background-color' : color_pastel_blue,
			'color' : text_color_white
		},
		'odd-row' : {
			'background-color' : color_sky_blue
		}
	},
	'nav' : {
		'nav' : {
			'background-color' : color_green_blue,
			'color' : text_color_white
		},
		'title' : {
			'background-color' : color_green_blue,
			'color' : text_color_white
		},
		'title-hover' : {
			'background-color' : color_green_blue,
			'color' : color_sky_blue_2
		}
	},
	'popup' : {
		'header' : {
			'background-color' : color_green_blue,
			'color' : text_color_white
		},
		'body' : {
			'background-color' : color_white,
			'color' : text_color_black,
			'border-color' : color_green_blue
		},
		'footer' : {
			'background-color' : color_sky_blue_2,
			'color' : text_color_black
		}
	},
	'basics' : {
		'blockquote' : {
			'background-color' : color_sky_blue,
			'color' : text_color_black,
			'border-left' : '10px solid ' + color_pastel_blue
		},
		'code' : {
			'color' : text_color_black
		}
	}
}

);