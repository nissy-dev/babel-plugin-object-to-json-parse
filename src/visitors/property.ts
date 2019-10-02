import { ObjectProperty, isIdentifier } from '@babel/types'
import { JSONDataMap, PluginState, replaceWithParse } from '../utils'
import { NodePath } from '@babel/traverse'

export default {
  type: 'ObjectProperty',
  enter(storage: JSONDataMap, path: NodePath<ObjectProperty>): void {
    const node = path.node
    const keyNode = node.key
    const valueNode = node.value
    if (
      !valueNode ||
      // __proto__ is special
      // https://tc39.es/ecma262/#sec-__proto__-property-names-in-object-initializers
      (isIdentifier(keyNode) && keyNode.name === '__proto__') ||
      node.shorthand ||
      // @ts-ignore
      // this does exist, but isn't in typings
      node.method
    ) {
      path.shouldSkip = true
    } else if (isIdentifier(keyNode)) {
      storage.set(keyNode, keyNode.name)
    }
  },
  exit(
    storage: JSONDataMap,
    path: NodePath<ObjectProperty>,
    state: PluginState
  ): void {
    const node = path.node
    const keyNode = node.key
    const valueNode = node.value
    if (!storage.has(keyNode)) {
      if (storage.has(valueNode)) {
        const value = storage.get(valueNode)
        if (typeof value === 'object' && value) {
          // @ts-ignore
          replaceWithParse(storage, path.get('value'), state)
          path.shouldSkip = true
        }
      }
      return
    }
    if (!storage.has(valueNode)) {
      if (storage.has(keyNode)) {
        const value = storage.get(keyNode)
        if (typeof value === 'object' && value) {
          // @ts-ignore
          replaceWithParse(storage, path.get('key'), state)
          path.setData('computed', true)
          path.shouldSkip = true
        }
      }
      return
    }
    // returns a [key, value] pair that ObjectExpression must use
    storage.set(node, [String(storage.get(keyNode)), storage.get(valueNode)])
  }
}
