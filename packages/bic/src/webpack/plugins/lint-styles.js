'use strict';

const StyleLintPlugin = require('stylelint-webpack-plugin');

const configFile = require.resolve('stylelint-config-bic');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		configFile: configFile,
		files: '**/*.s?(a|c)ss',
		failOnError: false
	}));

};

module.importPath = __filename;
