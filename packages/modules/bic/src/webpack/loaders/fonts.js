'use strict';

const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	// Woff Loaders

	webpackConfig.module.rules.push({
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
		use: [{
			loader: 'url-loader',
			options: {
				name: cfg.wp.outputPath,
				limit: cfg.wp.maxInlineFileSizeLimit,
				mimetype: 'application/font-woff'
			}
		}]
	});

	// Font Loaders

	webpackConfig.module.rules.push({
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		use: [{
			loader: 'file-loader',
			options: {
				name: cfg.wp.outputPath
			}
		}]
	});

};
