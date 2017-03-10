'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

const modulesPath = require('./get-modules-path');

const nodeModules = path.relative(cfg.file.absolute.source, modulesPath.node);

module.exports = cfg.production ? [] : [
	path.join(nodeModules, 'webpack/hot/only-dev-server'),
	`${path.join(nodeModules, 'webpack-dev-server/client')}?${cfg.server.url}/`
];
