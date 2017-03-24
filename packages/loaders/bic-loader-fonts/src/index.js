'use strict';

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('loader', 'fonts');

module.exports = webpackConfig => {

	log.debug('init');

	const filename = cfg.production ? cfg.wp.outputHashPath : cfg.wp.outputPath;

	const woffLoader = {
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
		use: [{
			loader: 'url-loader',
			options: {
				name: filename,
				limit: cfg.wp.maxInlineFileSizeLimit,
				mimetype: 'application/font-woff'
			}
		}]
	};

	webpackConfig.module.rules.push(woffLoader);

	log.debug('added', woffLoader);

	const fontLoader = {
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		use: [{
			loader: 'file-loader',
			options: {
				name: filename
			}
		}]
	};

	webpackConfig.module.rules.push(fontLoader);

	log.debug('added', fontLoader);

};
