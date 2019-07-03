import { ObjectExpression } from '@babel/types'
import { NodePath } from '@babel/traverse'
import { converter } from '../utils'

/* eslint-disable no-redeclare */
export function ObjectExpression(path: NodePath<ObjectExpression>) {
  try {
    const obj = converter(path.node)
    const json = JSON.stringify(obj)
    // escaping for single quotes
    const escapedJson = json.replace(/'/g, "\\'")
    path.replaceWithSourceString(`JSON.parse('${escapedJson}')`)
  } catch (e) {
    const { loc } = path.parent
    const line = loc && loc.start.line
    console.error(
      `At ${line} line (start) : The object wasn't converted (${e.message})`
    )
  }
}
