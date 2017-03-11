'use strict';

const webpack = require('webpack');
const httpServer = require('http-server');

const cfg = require('@bicjs/bic-config');

module.exports = webpackConfig => {

	console.info('Starting Build');

	webpack(webpackConfig, (err, stats) => {

		if (err) {

			return console.error(err);

		}

		const jsonStats = stats.toJson();

		if (jsonStats.errors.length > 0) {

			return console.error(jsonStats.errors);

		}

		if (jsonStats.warnings.length > 0) {

			console.warn(jsonStats.warnings);

		}

		console.info('Build Successful');

		if (cfg.open) {

			console.log('Starting Preview Server');

			httpServer.createServer({
				root: cfg.file.dest
			}).listen(cfg.server.port, cfg.server.host, () => {

				console.log(`Preview Server started at: ${cfg.server.url}`);

			});

		}

	});

};
