'use strict';

const StyleLintPlugin = require('stylelint-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'lint styles');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		files: '**/*.s?(a|c)ss',
		failOnError: true
	}));

	log.debug('added');

};
