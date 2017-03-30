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

	const entryChunks = Object.keys(webpackConfig.entry);

	const chunks = entryChunks.slice();

	const minChunks = 2;

	if (cfg.production === true) {

		/**
		 * Chunk "vendor" code loaded from `node_modules`.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			chunks,
			name: cfg.file.vendor,
			minChunks: (module, count) => {

				console.log(cfg.file.vendor, module.resource);

				return module.context && module.context.indexOf(cfg.file.node) >= 0 && count >= minChunks;

			}
		}));

		chunks.push(cfg.file.vendor);

		/**
		 * Chunk "modernizr" code.
		 * TODO: Inline Modernizr JS into head?
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			chunks,
			name: cfg.file.modernizr,
			minChunks: (module, count) => {

				console.log(cfg.file.modernizr, module.resource);

				return module.resource && new RegExp(cfg.file.modernizr).test(module.resource) && count >= minChunks;

			}
		}));

		/**
		 * Chunk "common" code loaded in all entry points.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			chunks,
			name: cfg.file.common,
			minChunks
		}));

		/**
		 * Chunk webpack "manifest" code.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.manifest,
			minChunks: Infinity
		}));

		webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin());
		webpackConfig.plugins.push(new WebpackChunkHash());
		webpackConfig.plugins.push(new ChunkManifestPlugin());
		webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin());

	}

	entryChunks.reduce((arr, entryName) => {

		const template = path.join(cfg.file.pages, entryName, cfg.file.name.tmpl);
		const filename = path.join(entryName, cfg.file.name.html);
		const inject = cfg.production === true || 'head';
		const minify = cfg.production === true && cfg.debug === false ? Object.assign({}, cfg.wp.min.html) : false;
		const chunks = [];

		chunks.push(cfg.file.manifest);
		chunks.push(cfg.file.modernizr);
		chunks.push(cfg.file.vendor);
		chunks.push(cfg.file.common);
		chunks.push(entryName);

		log.debug('adding chunks', chunks);
		log.debug('to file', filename);

		arr.push(new HtmlWebpackPlugin({
			template,
			filename,
			inject,
			minify,
			chunks,
			chunksSortMode: (moduleA, moduleB) => {

				return moduleB.id > moduleA.id;

			}
		}));

		return arr;

	}, webpackConfig.plugins);

};
