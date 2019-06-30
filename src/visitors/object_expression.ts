import { ObjectExpression } from '@babel/types'
import { NodePath } from '@babel/traverse'
import { astToObj } from '../utils'

export function ObjectExpression(path: NodePath<ObjectExpression>) {
  try {
    const obj = astToObj(path.node)
    const json = JSON.stringify(obj)
    path.replaceWithSourceString(`JSON.parse(\'${json}\')`)
  } catch(e) {
    console.error(`Error : ${e.message}`)
  }
}
