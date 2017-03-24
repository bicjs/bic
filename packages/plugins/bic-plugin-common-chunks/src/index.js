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

	if (cfg.production === true) {

		Object.keys(webpackConfig.entry).reduce((arr, entryName) => {

			/**
			 * TODO: See if it's necessary to resolve `pages` from `src`.
			 */
			const template = path.join('pages', entryName, cfg.file.name.tmpl);
			const filename = path.join(entryName, cfg.file.name.html);

			arr.push(new HtmlWebpackPlugin({
				template,
				filename,
				inject: 'body',
				chunks: [
					cfg.file.vendor,
					cfg.file.common,
					entryName
				]
			}));

			return arr;

		}, webpackConfig.plugins);

		/**
		 * Chunk "common" code loaded in all entry points.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.common
		}));

		/**
		 * Chunk "vendor" code loaded from `node_modules`.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.vendor,
			chunks: cfg.file.common,
			minChunks: module => {

				// this assumes your vendor imports exist in the node_modules directory
				return module.context && module.context.indexOf('node_modules') !== -1;

			}
		}));

		/**
		 * Chunk webpack "manifest" code.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.manifest,
			chunks: cfg.file.common
		}));

		/**
		 * TODO: Extract Modernizr from `common` chunk and inline into `<head>` tag.
		 */

		webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin());
		webpackConfig.plugins.push(new WebpackChunkHash());
		webpackConfig.plugins.push(new ChunkManifestPlugin());
		webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin());

		log.debug('added');

	}

	Object.keys(webpackConfig.entry).reduce((arr, entryName) => {

		/**
		 * TODO: See if it's necessary to resolve `pages` from `src`.
		 */
		const template = path.join('pages', entryName, cfg.file.name.tmpl);
		const filename = path.join(entryName, cfg.file.name.html);
		const inject = cfg.production || 'head';
		const chunks = cfg.production ? [
			cfg.file.manifest,
			cfg.file.vendor,
			cfg.file.common,
			entryName
		] : [
			entryName
		];

		arr.push(new HtmlWebpackPlugin({
			template,
			filename,
			inject,
			chunks
		}));

		return arr;

	}, webpackConfig.plugins);

};
