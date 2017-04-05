'use strict';

const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'generate favicons');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production) {

		webpackConfig.plugins.push(new FaviconsWebpackPlugin({
			// Your source logo
			logo: path.join(cfg.file.favicons, cfg.file.name.favicon),
			// The prefix for all image files (might be a folder or a name)
			prefix: path.join(cfg.file.favicons, '/'),
			// Emit all stats of the generated icons
			emitStats: cfg.debug,
			// The name of the json containing all favicon information
			statsFilename: 'iconstats-[hash].json',
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: false,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			background: '#fff',
			// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			title: (cfg.common && cfg.common.title) || 'Favicon',

			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}));

		log.debug('added');

	}

};
