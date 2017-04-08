'use strict';

const SitemapPlugin = require('sitemap-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'site map');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === true) {

		const paths = Object.keys(webpackConfig.entry)
			.reduce((output, path) => {

				const page = {
					path: `${path}/`,
					priority: '0.5'
				};

				if (page.path.indexOf('.') === 0) {

					page.path = page.path.substring(1);
					page.priority = '1.0';

				}

				output.push(page);

				return output;

			}, []);

		webpackConfig.plugins.push(new SitemapPlugin(cfg.url, paths, {
			lastMod: true,
			skipGzip: true,
			changeFeq: 'monthly'
		}));

		log.debug('added', cfg.url, paths);

	}

};
