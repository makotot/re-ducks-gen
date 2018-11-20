# re-ducks-gen

[![npm](https://img.shields.io/npm/v/re-ducks-gen.svg?style=flat-square)](https://www.npmjs.com/package/re-ducks-gen)
[![NpmLicense](https://img.shields.io/npm/l/re-ducks-gen.svg?style=flat-square)](https://www.npmjs.com/package/re-ducks-gen)

> Cli tool to generate duck files of [re-ducks](https://github.com/alexnm/re-ducks)

## Install

```sh
$ npm i re-ducks-gen
```

## Usage

```sh
Usage: re-ducks-gen [options]

Add new duck files

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

## Configuration

This cli is using [cosmicconfig](https://github.com/davidtheclark/cosmiconfig).

```json
{
  "re-ducks-gen": {
    "root": "./state/ducks"
  }
}
```

## License

MIT
