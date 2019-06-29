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
    title: 'string',
    code: `const a = { b: "b_val" };`,
    output: `const a = JSON.parse('{ "b": "b_val" }');`
  }, {
    title: 'number',
    code: `const a = { b: 1 };`,
    output: `const a = JSON.parse('{ "b": 1 }');`
  }, {
    title: 'null',
    code: `const a = { b: null };`,
    output: `const a = JSON.parse('{ "b": null }');`
  }, {
    title: 'Array',
    code: `const a = { b: [1, 'b_val', null] };`,
    output: `const a = JSON.parse('{ "b": [1, "b_val", null] }');`
  }, {
    title: 'Object',
    code: `const a = { b: { c: 1 } };`,
    output: `const a = JSON.parse('{ "b": { "c": 1 } }');`
  },]
})
