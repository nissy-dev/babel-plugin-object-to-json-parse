import {
  Literal,
  isBooleanLiteral,
  isNullLiteral,
  isNumericLiteral,
  isStringLiteral
} from '@babel/types'
import { JSONDataMap } from '../utils'
import { NodePath } from '@babel/traverse'

export default {
  type: 'Literal',
  enter(storage: JSONDataMap, path: NodePath<Literal>): void {
    const node = path.node
    let value
    if (isNullLiteral(node)) value = null
    else if (isBooleanLiteral(node)) value = node.value
    else if (isNumericLiteral(node)) {
      value = node.value
      if (!Number.isSafeInteger(value)) return
    } else if (isStringLiteral(node)) value = node.value
    else return
    storage.set(node, value)
  }
}
