'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'browser sync');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === false) {

		log.profile('start');

		const options = {
			host: cfg.server.host,
			port: cfg.server.port + 1,
			proxy: cfg.server.url
		};

		log.debug(options);

		webpackConfig.plugins.push(new BrowserSyncPlugin(options, {
			reload: false,
			callback: () => {

				log.info('started');

			}
		}));

		log.info('added');

		log.profile('start');

	}

};
