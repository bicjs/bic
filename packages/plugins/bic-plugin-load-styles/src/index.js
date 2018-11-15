'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('load styles');

module.exports = webpackConfig => {

	const cssLoaders = [{
		loader: cfg.production ? MiniCssExtractPlugin.loader : 'style-loader'
	},
	{
		loader: 'css-loader',
		options: {
			sourceMap: true
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			sourceMap: true,
			ident: 'postcss',
			plugins: [
				require('postcss-preset-env')()
			]
		}
	}];

	webpackConfig.module.rules.push({
		test: /\.css$/,
		use: cssLoaders
	});

	log.debug('added', cssLoaders);

	const sassLoaders = cssLoaders.concat([{
		loader: 'sass-loader',
		options: {
			includePaths: [
				cfg.file.node,
				cfg.file.local,
				cfg.file.source
			],
			root: cfg.file.source,
			outputStyle: 'expanded',
			sourceMap: true
		}
	}]);

	webpackConfig.module.rules.push({
		test: /\.(sa|sc|c)ss$/,
		use: sassLoaders
	});

	log.debug('added', sassLoaders);

	const filename = cfg.production ? `${cfg.wp.outputContentHash}.${cfg.file.name.css}` : cfg.file.name.css;

	webpackConfig.plugins.push(
		new MiniCssExtractPlugin({
			filename: path.join(cfg.wp.outputName, filename),
			chunkFilename: path.join(cfg.wp.outputName, filename)
		})
	);

	log.debug(`CSS extract is ${cfg.production ? 'enabled' : 'disabled'}`);

	if (cfg.production) {

		webpackConfig.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

	}

};
