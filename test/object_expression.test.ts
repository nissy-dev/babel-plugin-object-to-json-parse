import pluginTester from 'babel-plugin-tester'
import { buildPlugin } from '../src/plugin'
import { ObjectExpression } from '../src/visitors/object_expression'

pluginTester({
  plugin: buildPlugin([ObjectExpression]),
  filename: __filename,
  pluginOptions: {
    minJSONStringSize: 0,
  },
  tests: [
    {
      title: 'check option (expect small objects does not translate)',
      fixture: '__fixtures__/object/option.js',
      outputFixture: '__fixtures__/object/option_out.js',
      pluginOptions: {
        minJSONStringSize: 1024,
      },
    },
    {
      title: 'check invalid objects (expect invalid objects does not translate)',
      fixture: '__fixtures__/object/invalid_case.js',
      outputFixture: '__fixtures__/object/invalid_case_out.js',
    },
    {
      title: 'check valid objects (expect valid objects translate)',
      fixture: '__fixtures__/object/valid_case.js',
      outputFixture: '__fixtures__/object/valid_case_out.js',
    },
    {
      title: 'empty object',
      code: `const a = {}`,
      output: `const a = JSON.parse('{}')`
    },
    {
      title: 'respects minJSONStringSize (default : 1024)',
      code: `const a = { b: 1, c: 2 }`,
      pluginOptions: {
        minJSONStringSize: 1024
      },
      output: `
        const a = {
          b: 1,
          c: 2
        }
      `
    },
    {
      title: 'respects minJSONStringSize',
      code: `const a = { b: 1, c: 2 }`,
      pluginOptions: {
        minJSONStringSize: 1024
      },
      output:  `
        const a = {
          b: 1,
          c: 2
        }
      `
    },
    {
      title: 'respects minJSONStringSize',
      code: `const a = { b: 1, c: 2 }`,
      output: `
        const a = JSON.parse('{"b":1,"c":2}')
      `
    },
    {
      title: 'does not convert objects which include the spread syntax',
      code: `const a = { ...a, b: 1 }`,
      output: `
        const a = { ...a, b: 1 }
      `
    },
    {
      title: 'does not convert objects which include the object method',
      code: `
        const a = {
          method(arg) {
            return arg
          },
          b: 1
        }
      `,
      output: `
        const a = {
          method(arg) {
            return arg
          },

          b: 1
        }
      `
    },
    {
      title: 'does not convert objects which include the invalid value',
      code: `const a = { b: () => console.log('b') }`,
      output: `
        const a = {
          b: () => console.log('b')
        }
      `
    },
    {
      title: 'does not convert objects which have computed property names',
      code: `const a = { b : 'b_val', ['c']: 'c_val' }`,
      output: `
        const a = {
          b: 'b_val',
          ['c']: 'c_val'
        }
      `
    },
    {
      title: 'does not convert objects which have invalid numeric key',
      code: `const a ={ 77777777777777777.1: 'foo' }`,
      output: `
        const a = {
          77777777777777777.1: 'foo'
        }
      `
    },
    {
      title: 'string',
      code: `const a = { b: "b_val" }`,
      output: `const a = JSON.parse('{"b":"b_val"}')`
    },
    {
      title: 'string (include single quote)',
      code: `const a = { b: "'abc'" }`,
      output: `const a = JSON.parse('{"b":"\\'abc\\'"}')`
    },
    {
      title: 'string (include single quote)',
      code: `const a = { b: "ab\'c" }`,
      output: `const a = JSON.parse('{"b":"ab\\'c"}')`
    },
    {
      title: 'string (include double quote)',
      code: `const a = { b: 'ab"c' }`,
      output: `const a = JSON.parse('{"b":"ab\\\\\"c"}')`
    },
    {
      title: 'number',
      code: `const a = { b: 1 }`,
      output: `const a = JSON.parse('{"b":1}')`
    },
    {
      title: 'null',
      code: `const a = { b: null }`,
      output: `const a = JSON.parse('{"b":null}')`
    },
    {
      title: 'boolean',
      code: `const a = { b: false }`,
      output: `const a = JSON.parse('{"b":false}')`
    },
    {
      title: 'Object (with Array)',
      code: `const a = { b: [1, 'b_val', null] }`,
      output: `const a = JSON.parse('{"b":[1,"b_val",null]}')`
    },
    {
      title: 'Nested Array',
      code: `const a = { b: [1, ['b_val', { a: 1 }], null] }`,
      output: `const a = JSON.parse('{"b":[1,["b_val",{"a":1}],null]}')`
    },
    {
      title: 'Object',
      code: `const a = { b: { c: 1 } }`,
      output: `const a = JSON.parse('{"b":{"c":1}}')`
    },
    {
      title: 'Object (having numeric keys)',
      code: `const a = { 1: "123", 23: 45, b: "b_val" }`,
      output: `const a = JSON.parse('{"1":"123","23":45,"b":"b_val"}')`
    }
  ]
})
