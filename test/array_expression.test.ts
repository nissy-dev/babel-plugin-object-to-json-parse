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
      title: 'Array',
      fixture: '__fixtures__/array/array.js',
      outputFixture: '__fixtures__/array/array_out.js',
    },
    {
      title: 'Array',
      code: `const a = [1, "two", {three: 3}]`,
      output: `const a = JSON.parse('[1,"two",{"three":3}]')`
    },
    {
      title: 'Array',
      code: `const a = [{one: 1}, {two: 2}, {three: 3}]`,
      output: `const a = JSON.parse('[{"one":1},{"two":2},{"three":3}]')`
    },
  ]
})
