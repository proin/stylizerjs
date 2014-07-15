colors = {
	greenblue : {
		represent : '#80ccc8',
		text : '#fff'
	},
	pastelblue : {
		represent : '#8bcede',
		text : '#fff',
		border : '#46b8da'
	},
	deepblue : {
		represent : '#39b3d7',
		border : '#269abc',
		text : '#fff'
	},
	skyblue1 : {
		represent : '#d0ebf2',
		text : '#80ccc8'
	},
	skyblue2 : {
		represent : 'rgb(231,245,248)',
		text : '#000'
	},
	white : {
		represent : '#fff',
		text : '#000'
	}
}

stylizerjs.theme.push(
 
{
	'name' : 'pastel-blue',
	'tab' : {
		'default' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text
		},
		'in-active' : {
			'background-color' : colors.skyblue1.represent,
			'color' : colors.skyblue1.text
		}
	},
	'button' : {
		'default' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text,
			'border-color' : colors.pastelblue.border
		},
		'hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'border-color' : colors.deepblue.border
		}
	},
	'panel' : {
		'header' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text
		},
		'body' : {
			'background-color' : colors.white.represent,
			'color' : colors.white.text,
			'border-color' : colors.pastelblue.represent
		},
		'footer' : {
			'background-color' : colors.skyblue2.represent,
			'color' : colors.skyblue2.text
		}
	},
	'table' : {
		'wrapper' : {
			'border' : '1px solid ' + colors.pastelblue.represent,
			'background-color' : colors.white.represent,
			'color' : colors.white.text
		},
		'header' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text
		},
		'odd-row' : {
			'background-color' : colors.skyblue2.represent
		}
	},
	'nav' : {
		'nav' : {
			'background-color' : colors.greenblue.represent,
			'color' : colors.greenblue.text
		},
		'title' : {
			'background-color' : colors.greenblue.represent,
			'color' : colors.greenblue.text
		},
		'title-hover' : {
			'background-color' : colors.skyblue1.represent,
			'color' : colors.skyblue1.text
		}
	},
	'popup' : {
		'header' : {
			'background-color' : colors.greenblue.represent,
			'color' : colors.greenblue.text
		},
		'body' : {
			'background-color' : colors.white.represent,
			'color' : colors.white.text,
			'border-color' : colors.greenblue.represent
		},
		'footer' : {
			'background-color' : colors.skyblue2.represent,
			'color' : colors.skyblue2.text
		}
	},
	'slide' : {
		'header' : {
			'background-color' : colors.greenblue.represent,
			'color' : colors.greenblue.text
		},
		'body' : {
			'background-color' : colors.skyblue2.represent,
			'color' : colors.skyblue2.text
		}
	},
	'basics' : {
		'blockquote' : {
			'background-color' : colors.skyblue2.represent,
			'color' : colors.skyblue2.text,
			'border-left' : '10px solid ' + colors.pastelblue.represent
		},
		'code' : {
			'color' : colors.white.text
		}
	}
}

);