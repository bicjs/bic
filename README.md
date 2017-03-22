# Bic

> Bic website packaging framework repository.

## Usage

```shell
npm install -D bic-cli
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
npm install

# Will be done by the time you get back from a ☕ break.
npm run bootstrap

# Will open the hideous demo site.
npm run demo

# Will open an interactive list of all NPM scripts.
npm run ls
```
