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
          const replacement = objectProperty(
            keyNode,
            identifier('REPLACEME'),
            computed
          )
          storage.set(replacement.value, init)
          propPath.replaceWith(replacement)
          // @ts-ignore
          replaceWithParse(storage, propPath.get('value'), state.opts)
        }
      }
      return
    }
    storage.set(node, value)
    checkJSONTermination(storage, path, state.opts)
  }
}
