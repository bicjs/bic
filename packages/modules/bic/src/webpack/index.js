'use strict';

const webpackConfigDev = require('./dev');

const webpackConfig = Object.assign({}, webpackConfigDev);

require('@bicjs/bic-logger')
	.get('webpack config')
	.debug(webpackConfig);

module.exports = webpackConfig;
