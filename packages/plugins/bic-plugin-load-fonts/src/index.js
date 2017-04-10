'use strict';

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('load fonts');

module.exports = webpackConfig => {

	log.profile('start');

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

	log.debug(woffLoader);

	webpackConfig.module.rules.push(woffLoader);

	const fontLoader = {
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		use: [{
			loader: 'file-loader',
			options: {
				name: filename
			}
		}]
	};

	log.debug(fontLoader);

	webpackConfig.module.rules.push(fontLoader);

	log.info('added');

	log.profile('start');

};
