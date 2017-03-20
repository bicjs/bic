'use strict';

const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		files: '**/*.s?(a|c)ss',
		failOnError: false
	}));

};
