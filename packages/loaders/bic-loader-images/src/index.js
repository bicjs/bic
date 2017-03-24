'use strict';

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('loader', 'images');

module.exports = webpackConfig => {

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

	webpackConfig.module.rules.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		use: imagesLoaders
	});

	log.debug('added', imagesLoaders);

};
