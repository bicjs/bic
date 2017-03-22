'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	console.info('Starting Dev Server');

	if (cfg.debug === false) {

		const dashboard = new Dashboard();

		webpackConfig.plugins.push(new DashboardPlugin(dashboard.setData));

	}

	const server = new WebpackDevServer(webpack(webpackConfig), {

		/**
		 * TODO: Figure out how to get HMR working? (Currently doing full page refresh.)
		 */
		// hot: true,
		// hotOnly: true,
		clientLogLevel: cfg.debug === true ? 'info' : 'none',
		quiet: cfg.debug === false,
		noInfo: cfg.debug === false,
		contentBase: webpackConfig.output.path,
		publicPath: webpackConfig.output.publicPath,
		host: cfg.server.host,
		port: cfg.server.port,
		overlay: {
			errors: true,
			warnings: true
		},
		stats: {
			colors: true
		}

	});

	server.listen(cfg.server.port, cfg.server.host, err => {

		if (err) {

			throw err;

		}

		console.log(`Dev Server started at: ${cfg.server.url}`);

	});

};
