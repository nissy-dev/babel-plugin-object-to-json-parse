import { ObjectExpression } from '@babel/types'
import { NodePath } from '@babel/traverse'
import { astToObj } from '../utils'

export function ObjectExpression(path: NodePath<ObjectExpression>) {
  try {
    const obj = astToObj(path.node)
    const json = JSON.stringify(obj)
    path.replaceWithSourceString(`JSON.parse(\'${json}\')`)
  } catch(e) {
    const { loc } = path.parent
    const line = loc && loc.start.line
    console.error(`At ${line} line (start) : Error (${e.message})`)
  }
}
