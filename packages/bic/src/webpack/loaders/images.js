'use strict';

const cfg = require('@bicjs/bic-config');

/**
 * TODO: Figure out why cache loader doesn't work with images.
 */

module.exports = webpackConfig => {

	const imagesLoaders = [{
		loader: 'url-loader',
		options: {
			limit: cfg.wp.maxInlineFileSizeLimit,
			name: cfg.wp.outputPath
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

	// Add Images Loader
	webpackConfig.module.rules.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		use: imagesLoaders
	});

};
