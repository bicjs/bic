'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

const modulesPath = require('./get-modules-path');

const nodeModules = path.relative(cfg.file.absolute.source, modulesPath.node);

const hmr = path.join(nodeModules, 'webpack/hot/only-dev-server');
const wds = path.join(nodeModules, 'webpack-dev-server/client');

module.exports = cfg.production ? [] : [
	hmr,
	`${wds}?${cfg.server.url}/`
];
