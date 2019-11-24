# babel-plugin-object-to-json-parse 🚀

[![CircleCI](https://circleci.com/gh/nd-02110114/babel-plugin-object-to-json-parse/tree/master.svg?style=svg)](https://circleci.com/gh/nd-02110114/3dmol-sandbox/tree/master)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/babel-plugin-object-to-json-parse.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/babel-plugin-object-to-json-parse.svg)](https://badge.fury.io/js/babel-plugin-object-to-json-parse)


This repository is inspired by [this article](https://v8.dev/blog/cost-of-javascript-2019#json)

> As long as the JSON string is only evaluated once, the JSON.parse approach is much faster compared to the JavaScript object literal, especially for cold loads.

**Caution!!** : I made this plugin for my understanding about AST and babel plugin, so this plugin is not production ready.

## Object to JSON.parse

This plugin converts from object literal to JSON.parse ([example](https://github.com/nd-02110114/babel-plugin-object-to-json-parse/tree/master/example))

```js
// before
const data = { foo: 42, bar: 1337 };

// after
const data = JSON.parse('{"foo":42,"bar":1337}');
```

## How to use

### Install

```sh
$ npm install babel-plugin-object-to-json-parse -D
or
$ yarn babel-plugin-object-to-json-parse -D
```

### setup `.babelrc`

```json
{
  "plugins": ["object-to-json-parse"]
}
```


### Options 
#### `minJSONStringSize` (`number`, dafaults to `1024`)

The `minJSONStringSize` option will prevent the plugin from replacing an expression if the length of the JSON string given to `JSON.parse` is smaller than `minJSONStringSize`. For example, the following ensures all replacements have a string size of at least 1kb.

```json
{
  "plugins": [
    ["object-to-json-parse", {
      "minJSONStringSize": 1024
    }]
  ]
}
```

## Development

### Setup

```sh
$ git clone git@github.com:nd-02110114/babel-plugin-object-to-json-parse.git
$ cd babel-plugin-object-to-json-parse
$ yarn install
```

### Tips

```sh
// example
$ yarn build && yarn example

// test
$ yarn test
```
