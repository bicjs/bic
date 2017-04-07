'use strict';

const webpack = require('webpack');
const httpServer = require('http-server');

const cfg = require('@bicjs/bic-config').get();

const log = require('@bicjs/bic-logger').get('build', 'production');

const dir = require('../utils/get-dest-dir');

module.exports = webpackConfig => {

	log.info('Starting Build');

	webpack(webpackConfig, (err, stats) => {

		if (err) {

			return log.error(err);

		}

		const jsonStats = stats.toJson();

		if (jsonStats.errors.length > 0) {

			return jsonStats.errors.forEach(msg => log.error(msg));

		}

		if (jsonStats.warnings.length > 0) {

			jsonStats.warnings.forEach(msg => log.warn(msg));

		}

		log.debug(stats.toString());

		log.info('Build Successful');

		if (cfg.open) {

			log.info('Starting Preview Server');

			httpServer.createServer({
				root: dir.dest
			}).listen(cfg.server.port, cfg.server.host, () => {

				log.info(`Preview Server started at: ${cfg.server.url}`);

			});

		}

	});

};
