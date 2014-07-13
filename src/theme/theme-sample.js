color = '#d45151'
color_text = '#fff'

color_body = '#fff'

color_sub = '#f9f9f9'
color_sub_text = '#000'

color_hover = '#a00'
color_border = '#a00'

stylizerjs.theme.push(
	{
		'name' : 'myTheme',
		'tab' : {
			'default' : {
				'background-color' : color,
				'color' : color_text
			},
			'in-active' : {
				'background-color' : color_sub,
				'color' : color_sub_text
			}
		},
		'button' : {
			'default' : {
				'background-color' : color,
				'color' : color_text,
				'border-color' : color
			},
			'hover' : {
				'background-color' : color_hover,
				'color' : color_text,
				'border-color' : color_hover
			}
		},
		'panel' : {
			'header' : {
				'background-color' : color,
				'color' : color_text
			},
			'body' : {
				'background-color' : color_body,
				'color' : color_sub_text,
				'border-color' : color
			},
			'footer' : {
				'background-color' : color_sub,
				'color' : color_sub_text
			}
		},
		'table' : {
			'wrapper' : {
				'border' : '1px solid ' + color,
				'color' : color_sub_text,
				'background-color' : color_body
			},
			'header' : {
				'background-color' : color,
				'color' : color_text
			},
			'odd-row' : {
				'background-color' : color_sub
			}
		},
		'basics' : {
			'blockquote' : {
				'background-color' : color_sub,
				'color' : color_sub_text,
				'border-left' : '10px solid ' + color
			}
		}

	}
);