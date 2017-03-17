'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

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
				callback: function callback(content) {

					const asyncCallback = this.async();

					if (!asyncCallback) {

						return content;

					}

					const pageDir = this.context;
					const dataPath = path.join(pageDir, cfg.file.name.data);

					this.addDependency(dataPath);

					const locals = require(dataPath);

					/**
					 * Absolute path to page
					 */
					const localsPath = path.relative(cfg.file.absolute.pages, pageDir);

					locals.path = localsPath === '' ? localsPath : `/${localsPath}`;

					const data = {
						locals: locals,
						common: cfg.common
					};

					cfg.template(content, data, (err, result) => {

						if (err) {

							this.emitError(err.message || err.toString());

							return;

						}

						asyncCallback(null, result);

					});

				}
			}
		}]
	});

};
