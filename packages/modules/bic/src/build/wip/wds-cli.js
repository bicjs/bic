'use strict';

const path = require('path');
const execa = require('execa');

const packageRoot = require('./webpack/utils/get-package-root');

const webpackConfigPath = path.join(packageRoot, 'webpack.config.js');

const webpackDevServerProcess = execa('webpack-dev-server', [
	'--hot',
	'--debug',
	`--config=${webpackConfigPath}`
]);

webpackDevServerProcess.stdout.pipe(process.stdout);
webpackDevServerProcess.stderr.pipe(process.stderr);

webpackDevServerProcess.then(result => {

	console.log(result.stdout);

}).catch(error => {

	console.log(error);

});
