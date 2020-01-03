import { buildPlugin } from './plugin'
import { ObjectExpression } from './visitors/object_expression'
import { ArrayExpression } from './visitors/array_expression'

export = buildPlugin([ObjectExpression, ArrayExpression])
