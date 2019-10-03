import { Node } from '@babel/types'
import { NodePath } from '@babel/traverse'
/**
 * Stores data on a Node without potential a collision with existing keys
 */
export type JSONDataMap = WeakMap<
  object,
  string | null | number | boolean | object
>
export interface PluginState {
  opts: PluginOptions
}
export interface PluginOptions {
  minJSONStringSize: number
}

import { isArrayExpression, isObjectProperty } from '@babel/types'

export function replaceWithParse(
  storage: JSONDataMap,
  path: NodePath<Node>,
  options: PluginOptions
): void {
  const node = path.node
  const value = storage.get(node)
  const json = JSON.stringify(value)
  const escapedJson = json.replace(/'/g, "\\'")
  if (escapedJson.length < options.minJSONStringSize) {
    return
  }
  path.replaceWithSourceString(`JSON.parse('${escapedJson}')`)
  path.shouldSkip = true
}

export function checkJSONTermination(
  storage: JSONDataMap,
  path: NodePath<Node>,
  options: PluginOptions
): void {
  const parentNode = path.parent
  if (!isArrayExpression(parentNode) && !isObjectProperty(parentNode)) {
    replaceWithParse(storage, path, options)
  }
}
