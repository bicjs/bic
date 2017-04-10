'use strict';

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('load images');

module.exports = webpackConfig => {

	log.profile('start');

	const filename = cfg.production ? cfg.wp.outputHashPath : cfg.wp.outputPath;

	const imagesLoaders = [{
		loader: 'url-loader',
		options: {
			name: filename,
			limit: cfg.wp.maxInlineFileSizeLimit
		}
	}];

	if (cfg.production) {

		imagesLoaders.push({
			loader: 'image-webpack-loader',
			options: {
				pngquant: {
					quality: '65-90',
					speed: 4
				},
				svgo: {
					plugins: [{
						removeViewBox: false
					}, {
						removeEmptyAttrs: false
					}]
				}
			}
		});

	}

	log.debug(imagesLoaders);

	webpackConfig.module.rules.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		use: imagesLoaders
	});

	log.info('added');

	log.profile('start');

};
