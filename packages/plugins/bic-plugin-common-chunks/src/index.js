'use strict';

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineChunkManifestPlugin = require('inline-chunk-manifest-html-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'common chunks');
const cfg = require('@bicjs/bic-config').get();

/**
 *
 * NOTE: We're not chunking and inlining Modernizr because:
 *
 * 		1. Paul Irish says it's [irresponsible](https://github.com/Modernizr/Modernizr/issues/878#issuecomment-41448059).
 *   	2. The `HtmlWebpackPlugin` [won't order based on `chunks`. option](https://github.com/jantimon/html-webpack-plugin/pull/423/)
 *    3. The `ScriptExtHtmlWebpackPlugin` [can't inline scripts into the `<head>` tag](https://github.com/numical/script-ext-html-webpack-plugin/issues/6).
 *
 */

module.exports = webpackConfig => {

	log.profile('start');

	const entryChunks = Object.keys(webpackConfig.entry);

	if (cfg.production === true) {

		const chunks = entryChunks.slice();

		const minChunks = chunks.length;

		const isExternal = module => {

			return module.context && module.context.indexOf(cfg.file.node) >= 0;

		};

		const isCommon = count => {

			return count >= minChunks;

		};

		/**
		 * Chunk "common" code loaded in all entry points.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.file.common,
			chunks,
			minChunks: (module, count) => {

				return !isExternal(module) && isCommon(count);

			}
		}));

		/**
		 * Chunk "vendor" code loaded from `node_modules`.
		 */
		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			chunks: chunks.concat(cfg.file.common),
			name: cfg.file.vendor,
			minChunks: (module, count) => {

				return isExternal(module) && isCommon(count);

			}
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
		webpackConfig.plugins.push(new InlineChunkManifestPlugin());

	}

	entryChunks.reduce((arr, entryName) => {

		const template = path.join(cfg.file.pages, entryName, cfg.file.name.tmpl);
		const filename = path.join(entryName, cfg.file.name.html);
		const inject = cfg.production === true || 'head';
		const minify = cfg.production === true && cfg.debug === false ? Object.assign({}, cfg.wp.min.html) : false;
		const chunks = [];

		chunks.push(cfg.file.manifest);
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
			chunks
		}));

		return arr;

	}, webpackConfig.plugins);

	log.info('added');

	log.profile('start');

};
