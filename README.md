# Bic

> Bic website packaging framework repository.

## Usage

```shell
yarn add -D bic-cli
```

In your `package.json` add:

```shell
{
	...
	"scripts": {
		"dev": "bic",
		"build": "bic --clean --production"
	}
}
```

To open in your default browser, use the `--open` flag.
To see debug level logs, use the `--debug` flag.


## Development

```shell
yarn setup

# open demo site.
yarn demo

# list of all scripts.
yarn ls
```
