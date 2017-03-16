'use strict';

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new OpenBrowserPlugin({
		url: cfg.server.url,
		browser: 'Google Chrome Canary'
	}));

};
