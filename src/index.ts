import { buildPlugin } from './plugin'
import ArrayExpression from './visitors/array_expression'
import Literal from './visitors/literal'
import ObjectExpression from './visitors/object_expression'
import Property from './visitors/property'

export = buildPlugin([ArrayExpression, Literal, ObjectExpression, Property])
