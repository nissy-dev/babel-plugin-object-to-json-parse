import { ArrayExpression } from '@babel/types'
import {
  JSONDataMap,
  PluginState,
  checkJSONTermination,
  replaceWithParse
} from '../utils'
import { NodePath } from '@babel/traverse'

export default {
  type: 'ArrayExpression',
  exit(
    storage: JSONDataMap,
    path: NodePath<ArrayExpression>,
    state: PluginState
  ): void {
    const node = path.node
    let value = []
    let completelyJSON = true
    for (const elem of node.elements) {
      if (
        // holes , [0,,2]
        !elem ||
        !storage.has(elem)
      ) {
        completelyJSON = false
        break
      }
      value.push(storage.get(elem))
    }
    if (!completelyJSON) {
      const elementPaths = path.get('elements')
      for (const elemPath of elementPaths) {
        const elem = elemPath.node
        if (elem && storage.has(elem)) {
          replaceWithParse(storage, elemPath, state.opts)
        }
      }
      return
    }
    storage.set(node, value)
    checkJSONTermination(storage, path, state.opts)
  }
}
