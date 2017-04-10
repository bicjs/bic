'use strict';

const urljoin = require('url-join');
const RobotsPlugin = require('@tanepiper/robots-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'site map');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	log.profile('start');

	const config = {
		sitemap: urljoin(cfg.url, cfg.file.name.sitemap),
		userAgents: [{
			name: '*',
			disallow: cfg.production === false ? ['/'] : ''
		}]
	};

	log.debug(config);

	webpackConfig.plugins.push(new RobotsPlugin(config));

	log.info('added');

	log.profile('start');

};
