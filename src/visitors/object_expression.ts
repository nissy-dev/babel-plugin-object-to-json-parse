import { ObjectExpression } from '@babel/types'
import { NodePath } from '@babel/traverse'
import { converter } from '../utils'

const REWRITE_THRESHOLD = 5 * 1024;

/* eslint-disable no-redeclare */
export function ObjectExpression(path: NodePath<ObjectExpression>) {
  try {
    const obj = converter(path.node)
    const json = JSON.stringify(obj)
    // it simply isn't worth it to convert into the AST objects that are too small.
    // so, we only convert large objects to their JSON.parse expression.
    if (json.length > REWRITE_THRESHOLD) {
      // escaping for single quotes
      const escapedJson = json.replace(/'/g, "\\'")
      path.replaceWithSourceString(`JSON.parse('${escapedJson}')`)
    }
  } catch (e) {
    // disable error message
    // const { loc } = path.parent
    // const line = loc && loc.start.line
    // console.error(
    //   `At ${line} line (start) : The object wasn't converted (${e.message})`
    // )
  }
}
