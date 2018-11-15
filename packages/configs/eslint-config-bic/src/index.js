'use strict';

const RULE = {
	off: 0,
	warn: 1,
	error: 2
};

module.exports = {
	env: {
		es6: true,
		browser: true,
		commonjs: true
	},
	extends: [
		'xo/esnext'
	],
	rules: {
		'padded-blocks': [
			RULE.warn,
			'always'
		],
		'capitalized-comments': [
			RULE.error,
			'always',
			{
				ignoreInlineComments: true
			}
		]
	},
	globals: {
		__DEBUG__: false,
		__CONFIG__: false
	}
};
