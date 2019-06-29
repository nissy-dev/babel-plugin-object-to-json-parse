import { buildPlugin } from './plugin'
import { ObjectExpression } from './visitors/object_expression'

export = buildPlugin([ObjectExpression])
