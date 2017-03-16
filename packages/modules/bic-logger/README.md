# Bic Logger

## Purpose

Create a console wrapper that can have log level settings without locking into a lib.

## Status

Currently a wrapper for [Minilog](https://github.com/mixu/minilog).

## Install

```shell
$ npm install @bicjs/bic-logger
```

## Usage

```js
var logger  = require('@bicjs/bic-logger').get('my logger id');

logger
  .debug('whaaa?!')
  .info('ohhhh.')
  .log('meh.')
  .warn('yo!')
  .error('HAAAAALP!!!');
```

## Roadmap

Add a simple method to set logging level. The Minilog [filters](http://mixu.net/minilog/filter.html) are cool but maybe overkill.
