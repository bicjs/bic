'use strict';

const buildDevelopment = require('./webpack/build/development');
const buildProduction = require('./webpack/build/production');

const cfg = require('@bicjs/bic-config');

const webpackConfig = require('../webpack.config');

if (cfg.production === true) {

	buildProduction(webpackConfig);

} else {

	buildDevelopment(webpackConfig);

}

module.exports = true;
