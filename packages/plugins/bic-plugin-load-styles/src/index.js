'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('loader', 'styles');

module.exports = webpackConfig => {

	// PostCSS

	const postcssLoader = {
		loader: 'postcss-loader',
		options: {
			plugins: () => {

				return [
					autoprefixer
				];

			}
		}
	};

	// CSS

	const cssLoader = {
		loader: 'css-loader'
	};

	// SASS

	let sassLoaders = [{
		loader: 'sass-loader',
		options: {
			includePaths: [
				cfg.file.node,
				cfg.file.local,
				cfg.file.source
			],
			root: cfg.file.source,
			outputStyle: 'expanded'
		}
	}];

	sassLoaders = [
		cssLoader,
		postcssLoader
	].concat(sassLoaders);

	// Add SASS Loader
	webpackConfig.module.rules.push({
		test: /\.scss$/i,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: sassLoaders
		})
	});

	log.debug('added', sassLoaders);

	// Add CSS Loader

	let cssLoaders = [
		cssLoader,
		postcssLoader
	];

	webpackConfig.module.rules.push({
		test: /\.css$/i,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: cssLoaders
		})
	});

	log.debug('added', cssLoaders);

	// Configure ExtractTextPlugin

	const filename = cfg.production ? `${cfg.wp.outputContentHash}.${cfg.file.name.css}` : cfg.file.name.css;

	webpackConfig.plugins.push(
		new ExtractTextPlugin({
			filename: path.join(cfg.wp.outputName, filename),
			allChunks: true,
			disable: !cfg.production
		})
	);

	log.debug(`CSS extract is ${cfg.production ? 'enabled' : 'disabled'}`);

};
