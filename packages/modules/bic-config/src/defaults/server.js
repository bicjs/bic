'use strict';

const protocol = 'http';
const host = 'localhost';
const port = 8080;
const url = `${protocol}://${host}:${port}`;

const config = {
	protocol,
	host,
	port,
	url
};

module.exports = config;
