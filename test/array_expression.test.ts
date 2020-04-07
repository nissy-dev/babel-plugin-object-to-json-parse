import pluginTester from 'babel-plugin-tester'
import { buildPlugin } from '../src/plugin'
import { ArrayExpression } from '../src/visitors/array_expression'

pluginTester({
  plugin: buildPlugin([ArrayExpression]),
  filename: __filename,
  pluginOptions: {
    minJSONStringSize: 0,
  },
  tests: [
    {
      title: 'array',
      fixture: '__fixtures__/array/input.js',
      outputFixture: '__fixtures__/array/output.js',
    },
    {
      title: 'array',
      code: `const a = [1, "two", {three: 3}]`,
      output: `const a = JSON.parse('[1,"two",{"three":3}]')`
    },
    {
      title: 'array',
      code: `const a = [{one: 1}, {two: 2}, {three: 3}]`,
      output: `const a = JSON.parse('[{"one":1},{"two":2},{"three":3}]')`
    },
  ]
})
