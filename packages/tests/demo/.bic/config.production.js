'use strict';

console.info('Loading: bic config – PRODUCTION');

const config = require('./default');

module.exports = Object.assign(config, {
	canWeAddAnythingHere: true
});
