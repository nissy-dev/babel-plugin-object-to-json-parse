import * as fs from 'fs'
import * as path from 'path'
import * as babel from '@babel/core'

import plugin from '../src'


const options = {
  plugins: [
    [plugin, { minJSONStringSize: 0}]
  ],
}

const getter = (code: string | null | undefined) => new Function(`
  ${code}
  return res
`)

const pathToFixtures = {
  'string': '__fixtures__/object/string/input.js',
  'number': '__fixtures__/object/number/input.js',
  'boolean': '__fixtures__/object/boolean/input.js',
  'null': '__fixtures__/object/null/input.js',
  'object': '__fixtures__/object/object/input.js',
  'array': '__fixtures__/object/array/input.js',
  'backslash': '__fixtures__/object/backslash/input.js',
}

// see: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#exec-tests
describe('This is end to end test (runtime checking)', () => {
  it('string', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['string']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('number', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['number']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('boolean', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['boolean']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('null', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['null']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('object', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['object']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('array', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['array']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
  it('backslash', () => {
    const input = fs.readFileSync(path.join(__dirname, pathToFixtures['backslash']), {encoding: 'utf-8'});
    const result = babel.transform(input, options)
    expect(getter(input)()).toEqual(getter(result?.code)())
  });
})
