'use strict';

const webpack = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'use strict');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
	webpackConfig.plugins.push(new CaseSensitivePathsPlugin());

	log.debug('added');

};
