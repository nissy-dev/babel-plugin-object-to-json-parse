import {
  ObjectExpression,
  objectProperty,
  identifier,
  stringLiteral,
  isIdentifier,
  isObjectProperty
} from '@babel/types'
import {
  JSONDataMap,
  PluginState,
  checkJSONTermination,
  replaceWithParse
} from '../utils'
import { NodePath } from '@babel/traverse'

export default {
  type: 'ObjectExpression',
  exit(
    storage: JSONDataMap,
    path: NodePath<ObjectExpression>,
    state: PluginState
  ): void {
    const node = path.node
    let value = {}
    let completelyJSON = true
    for (const prop of node.properties) {
      if (!storage.has(prop)) {
        completelyJSON = false
        break
      }
      // @ts-ignore
      const [key, init] = storage.get(prop)
      // avoid things like __proto__ firing
      Object.defineProperty(value, key, {
        value: init,
        enumerable: true,
        configurable: true,
        writable: true
      })
    }
    if (!completelyJSON) {
      const propertyPaths = path.get('properties')
      for (const propPath of propertyPaths) {
        const prop = propPath.node
        if (!isObjectProperty(prop)) continue
        if (storage.has(prop)) {
          const [key, init] = storage.get(prop)
          let keyNode
          let valueNode = prop.value
          let computed = false
          // ignore base cases
          if (isIdentifier(prop.key)) {
            keyNode = prop.key
          } else if (typeof key !== 'object') {
            keyNode = stringLiteral(`${key}`)
          } else {
            computed = true
            keyNode = prop.key
          }
          const replaceme = identifier('REPLACEME')
          const replacement = objectProperty(keyNode, replaceme, computed)
          storage.set(replacement.value, init)
          // @ts-ignore
          replaceWithParse(storage, propPath.get('value'), state.opts)
          propPath.replaceWith(replacement)
          // @ts-ignore
          if (propPath.node.value == replaceme) {
            // @ts-ignore
            propPath.get('value').replaceWith(valueNode)
            console.dir({ replacement })
          }
        }
      }
      return
    }
    storage.set(node, value)
    checkJSONTermination(storage, path, state.opts)
  }
}
