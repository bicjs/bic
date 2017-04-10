'use strict';

const webpack = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'use strict');

module.exports = webpackConfig => {

	log.profile('start');

	webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
	webpackConfig.plugins.push(new CaseSensitivePathsPlugin());

	log.info('added');

	log.profile('start');

};
