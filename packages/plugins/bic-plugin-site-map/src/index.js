'use strict';

const SitemapPlugin = require('sitemap-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'site map');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === true) {

		const paths = Object.keys(webpackConfig.entry)
			.reduce((output, route) => {

				return output.concat(`${route.replace('.', '')}/`);

			}, []);

		webpackConfig.plugins.push(new SitemapPlugin(cfg.url, paths));

		log.debug('added', cfg.url, paths);

	}

};
