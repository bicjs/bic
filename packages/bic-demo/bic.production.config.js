'use strict';

const config = require('./bic.config');

console.info('Loading: bic config – PRODUCTION');

module.exports = Object.assign(config, {
	canWeAddAnythingHere: true
});
