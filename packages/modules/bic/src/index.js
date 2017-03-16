'use strict';

const buildDevelopment = require('./webpack/build/development');
const buildProduction = require('./webpack/build/production');

const cfg = require('@bicjs/bic-config');

const logger = require('@bicjs/bic-logger');

logger.setLevel(cfg.debug ? logger.LEVEL.debug : logger.LEVEL.error);

const log = logger.get('init');

log.info('start');

const webpackConfig = require('../webpack.config');

if (cfg.production === true) {

	buildProduction(webpackConfig);

} else {

	buildDevelopment(webpackConfig);

}

log.info('end');

module.exports = true;
