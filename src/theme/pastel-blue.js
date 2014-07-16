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
		text : '#fff'
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

stylizerjs.theme.push({
	'name' : 'pastel-blue',
	'tab' : {
		'default' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		},
		'in-active' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text
		},
		'hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		}
	},
	'button' : {
		'default' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text,
			'border-color' : colors.pastelblue.represent
		},
		'hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'border-color' : colors.deepblue.border
		}
	},
	'panel' : {
		'header' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
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
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		},
		'title' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		},
		'title-hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.skyblue2.represent
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
		},
		'mark' : {
			'background-color' : colors.greenblue.represent,
			'color' : colors.greenblue.text,
			'padding' : '0px 6px 0px 6px'
		},
		'div.strengthen' : {
			'font-size' : '22px'
		},
		'div.code' : {
			'background-color' : colors.skyblue2.represent,
			'padding' : '15px'
		},
		'div.explanation' : {
			'background-color' : colors.white.represent,
			'padding' : '15px'
		},
		'h1' : {
			'color' : colors.deepblue.represent,
			'border-bottom' : '1px solid '+colors.deepblue.represent
		},
		'h2' : {
			'color' : colors.deepblue.represent,
			'font-size' : '26px',
			'margin' : '0 0 12px 0',
			'border-bottom' : '1px solid '+colors.deepblue.represent
		},
		'h3' : {
			'font-size' : '18px',
			'margin' : '0 0 18px 0',
			'border-bottom' : '1px solid '+colors.deepblue.represent
		}
	}
});

stylizerjs.theme.push({
	'name' : 'intro',
	'button' : {
		'default' : {
			'width' : '200px',
			'height' : '200px',
			'background-color' : colors.pastelblue.represent,
			'border' : '10px solid ' + colors.skyblue1.represent,
			'font-size' : '150px',
			'margin' : '30px 60px 60px 60px',
			'padding' : '0 0 0 0',
			'line-height' : '1'
		},
		'hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'border-color' : colors.deepblue.border
		}
	},
	'tab' : {
		'default' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		},
		'in-active' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text
		},
		'hover' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text
		}
	},
	'panel' : {
		'header' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'text-align' : 'center'
		},
		'body' : {
			'background-color' : colors.white.represent,
			'color' : colors.white.text,
			'border' : '0px',
			'margin' : '0px 40px 40px 40px'
		},
		'footer' : {
			'background-color' : colors.skyblue2.represent,
			'color' : colors.skyblue2.text
		}
	},
	'basics' : {
		'div.intro' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text,
			'padding' : '30px',
			'text-align' : 'center',
			'font-size' : '30px',
			'display' : 'block'
		},
		'div.context' : {
			'background-color' : colors.pastelblue.represent,
			'color' : colors.pastelblue.text,
			'padding' : '10px',
			'line-height' : '1.2',
			'text-align' : 'justify',
			'font-size' : '16px',
			'display' : 'block'
		},
		'div.footer' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'padding' : '18px',
			'line-height' : '1.4',
			'text-align' : 'center',
			'font-size' : '18px',
			'display' : 'block'
		},
		'a' : {
			'color' : colors.white.represent
		},
		'code' : {
			'color' : colors.white.text
			// 'background-color' : '#eee',
			// 'padding' : '5px'
		}
	}
});

stylizerjs.theme.push({
	'name' : 'btn-download',
	'button' : {
		'default' : {
			'background-color' : colors.pastelblue.represent,
			'border' : '3px solid ' + colors.skyblue1.represent,
			'font-size' : '30px',
			'margin-top' : '30px',
			'margin-left' : '15px',
			'margin-right' : '15px',
			'border-radius' : '10px',
			'padding' : '6px 30px'
		},
		'hover' : {
			'background-color' : colors.deepblue.represent,
			'color' : colors.deepblue.text,
			'border-color' : colors.deepblue.border
		}
	}
});

stylizerjs.theme.push(
	{
		'name' : 'navbar-btn',
		'button' : {
			'default' : {
				'background-color' : colors.deepblue.represent,
				'color' : colors.deepblue.text,
				'border-color' : colors.skyblue1.represent,
				'border-radius' : '0px'
			},
			'hover' : {
				'background-color' : colors.pastelblue.represent,
				'color' : colors.pastelblue.text,
				'border-color' : colors.skyblue1.represent
			}
		}
	}
);

stylizerjs.theme.push(
	{
		'name' : 'btn-panel',
		'button' : {
			'default' : {
				'background-color' : colors.white.represent,
				'color' : colors.deepblue.represent,
				'border' : '2px solid ' + colors.deepblue.represent,
				'border-radius' : '0px',
				'width' : '100%'
			},
			'hover' : {
				'background-color' : colors.deepblue.represent,
				'color' : colors.deepblue.text,
				'border-color' : colors.deepblue.represent
			}
		}
	}
);

stylizerjs.theme.push(
	{
		'name' : 'popup-download',
		'button' : {
			'default' : {
				'background-color' : colors.greenblue.represent,
				'color' : colors.greenblue.text,
				'border' : '2px solid ' + colors.greenblue.represent,
				'border-radius' : '0px',
				'width' : '100%'
			},
			'hover' : {
				'background-color' : colors.white.represent,
				'color' : colors.greenblue.represent,
				'border-color' : colors.greenblue.represent
			}
		}
	}
);

stylizerjs.theme.push(
	{
		'name' : 'popup-example',
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
		'tab' : {
			'default' : {
				'background-color' : colors.pastelblue.represent,
				'color' : colors.pastelblue.text
			},
			'in-active' : {
				'background-color' : colors.skyblue1.represent,
				'color' : colors.skyblue1.text
			},
			'hover' : {
				'background-color' : colors.pastelblue.represent,
				'color' : colors.pastelblue.text
			}
		}
	}
);
