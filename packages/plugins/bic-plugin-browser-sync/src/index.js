'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'browser sync');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === false) {

		webpackConfig.plugins.push(new BrowserSyncPlugin({
			host: cfg.server.host,
			port: cfg.server.port + 1,
			proxy: cfg.server.url
		}, {
			reload: false,
			callback: () => {

				log.debug('started');

			}
		}));

		log.debug('added');

	}

};
