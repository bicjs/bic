'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('loader', 'templates');

module.exports = webpackConfig => {

	const templatesLoader = {
		test: /\.(ejs|hbs|njk|pug)$/i,
		use: [
			/**
			 * TODO: Remove loader "export" if/when integrated with `HtmlWebpackPlugin`
			 */
			// {
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: filepath => path
			// 			.relative(
			// 				cfg.file.absolute.pages, filepath
			// 			)
			// 			.replace(
			// 				path.extname(filepath), '.html'
			// 			)
			// 	}
			// },
			// {
			// 	loader: 'extract-loader'
			// },
			{
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
							common: cfg.common,
							production: cfg.production,
							debug: cfg.debug
						};

						log.debug('found template at', this.resourcePath);
						log.debug('found config at ', dataPath);

						log.debug('rendering', content);
						log.debug('with', data);

						cfg.template(content, data, (err, result) => {

							if (err) {

								const e = err.message || err.toString();

								log.error(e);

								this.emitError(e);

								return;

							}

							log.debug('rendered html', result);

							asyncCallback(null, result);

						});

					}
				}
			}
		]
	};

	webpackConfig.module.rules.push(templatesLoader);

	log.debug('added', templatesLoader);

};
