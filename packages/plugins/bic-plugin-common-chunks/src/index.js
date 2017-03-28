'use strict';

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'common chunks');
const cfg = require('@bicjs/bic-config').get();

/**
 * TODO: Disable `common` JS if `webpackConfig.entry.length === 1`.
 */

module.exports = webpackConfig => {

	const splitChunks = [];

	const entryChunks = Object.keys(webpackConfig.entry);

	const chunks = entryChunks.slice();

	if (cfg.production === true) {

		if (entryChunks.length > 1) {

			/**
			 * Chunk "common" code loaded in all entry points.
			 */
			webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
				name: cfg.file.common,
				chunks,
				minChunks: 2
			}));

			splitChunks.unshift(cfg.file.common);

			chunks.push(cfg.file.common);

		}

		/**
		 * Chunk "vendor" code loaded from `node_modules`.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.vendor,
			chunks,
			minChunks: module => {

				return module.context && module.context.indexOf(cfg.file.node) !== -1;

			}
		}));

		splitChunks.unshift(cfg.file.vendor);

		/**
		 * Chunk webpack "manifest" code.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.manifest,
			minChunks: Infinity
		}));

		splitChunks.unshift(cfg.file.manifest);

		log.debug('split', splitChunks, 'from', entryChunks.length, 'entry points');

		/**
		 * TODO: Extract Modernizr from `common` chunk and inline into `<head>` tag.
		 */

		webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin());
		webpackConfig.plugins.push(new WebpackChunkHash());
		webpackConfig.plugins.push(new ChunkManifestPlugin());
		webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin());

	}

	entryChunks.reduce((arr, entryName) => {

		const template = path.join(cfg.file.pages, entryName, cfg.file.name.tmpl);
		const filename = path.join(entryName, cfg.file.name.html);
		const inject = cfg.production === true || 'head';
		const minify = cfg.production === true ? Object.assign({}, cfg.wp.min.html) : false;
		const chunks = splitChunks.slice();

		chunks.push(entryName);

		log.debug('adding chunks', chunks);
		log.debug('to file', filename);

		arr.push(new HtmlWebpackPlugin({
			template,
			filename,
			inject,
			minify,
			chunks
		}));

		return arr;

	}, webpackConfig.plugins);

};
