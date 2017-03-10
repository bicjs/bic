'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

const getEntryData = require('../utils/get-entry-data');

module.exports = webpackConfig => {

	webpackConfig.module.rules.push({
		test: /\.(ejs|hbs|njk|pug)$/i,
		use: [{
			loader: 'file-loader',
			options: {
				name: filepath => path
					.relative(
						cfg.file.absolute.pages, filepath
					)
					.replace(
						path.extname(filepath), '.html'
					)
			}
		}, {
			loader: 'extract-loader'
		}, {
			loader: 'html-loader',
			options: {
				attrs: [
					'img:src'
				],
				root: cfg.file.absolute.source
			}
		}, {
			loader: 'passthrough-loader',
			options: {
				callback: (source, loader) => {

					const callback = loader.async();

					if (!callback) {

						return source;

					}

					const resourceDir = path.dirname(loader.resourcePath);
					const localsPath = path.relative(cfg.file.absolute.pages, resourceDir);

					const locals = getEntryData(resourceDir, cfg.file.config);
					locals.path = localsPath === '' ? '' : `/${localsPath}`;

					const common = cfg.public.data;

					callback(null, cfg.template(loader, {
						locals,
						common
					}));

				}
			}
		}]
	});

};
