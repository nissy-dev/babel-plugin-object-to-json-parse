import pluginTester from 'babel-plugin-tester'
import { buildPlugin } from '../../src/plugin'
import { ObjectExpression } from '../../src/visitors/object_expression'

pluginTester({
  plugin: buildPlugin([ObjectExpression]),
  tests: [{
      title: 'empty object',
      code: `const a = {};`,
      output: `const a = JSON.parse('{}');`
  }, {
    title: 'does not convert objects which include the spread syntax',
    code: `const a = { ...a, b: 1 };`,
    output: `
      const a = { ...a,
        b: 1
      };
    `
  }, {
    title: 'does not convert objects which include the object method',
    code: `
      const a = {
        method(arg) {
          return arg;
        }, 
        b: 1 
      };
    `,
    output: `
      const a = {
        method(arg) {
          return arg;
        },

        b: 1
      };
    `
  }, {
    title: 'does not convert objects which include the invalid value',
    code: `const a = { b: () => console.log("b") };`,
    output: `
      const a = {
        b: () => console.log("b")
      };
    `
  }, {
    title: 'does not convert objects which have computed property names',
    code: `const a = { b : "b_val", ["c"]: "c_val" };`,
    output: `
      const a = {
        b: "b_val",
        ["c"]: "c_val"
      };
    `
  }, {
    title: 'string',
    code: `const a = { b: "b_val" };`,
    output: `const a = JSON.parse('{"b":"b_val"}');`
  }, {
    title: 'number',
    code: `const a = { b: 1 };`,
    output: `const a = JSON.parse('{"b":1}');`
  }, {
    title: 'null',
    code: `const a = { b: null };`,
    output: `const a = JSON.parse('{"b":null}');`
  }, {
    title: 'boolean',
    code: `const a = { b: false };`,
    output: `const a = JSON.parse('{"b":false}');`
  }, {
    title: 'Array',
    code: `const a = { b: [1, 'b_val', null] };`,
    output: `const a = JSON.parse('{"b":[1,"b_val",null]}');`
  }, {
    title: 'Nested Array',
    code: `const a = { b: [1, ['b_val', { a: 1 }], null] };`,
    output: `const a = JSON.parse('{"b":[1,["b_val",{"a":1}],null]}');`
  }, {
    title: 'Object',
    code: `const a = { b: { c: 1 } };`,
    output: `const a = JSON.parse('{"b":{"c":1}}');`
  },]
})
