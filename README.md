# Passthrough Loader

## Purpose

To allow the creation of ad hoc [webpack](https://webpack.github.io/) [loaders](http://webpack.github.io/docs/list-of-loaders.html).

> Inspired by [gulp-tap](https://github.com/geejs/gulp-tap).

## Usage

### Install

```shell
npm install --save-dev passthrough-loader
```

### Implement

```javascript
const webpackConfig = {
	entry: [
		'file?./index.html!passthrough!./index.tmpl'
	],
	passthrough: {
		callback: function renderTemplate(source) {

			return renderMyTemplate(source);

		}
	}
}
```

## Reasons

My specific use case was trying to use an HTML template library and send
the output through more loaders. I wasn't able to achieve this using the
[HTMLWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin)
because of inherent limitations to webpack plugins without
[polluting the template files with webpack syntax, or using a webpack specific workaround](https://github.com/ampedandwired/html-webpack-plugin/issues/325).

There are webpack loaders that are more similar than different, and yet,
may not have configurations to support each individual use case,
or interface with the libraries they are implementing. If a loader
does not meet ad hoc requirements, the passthrough loader allows the
creation of a loader that will.
