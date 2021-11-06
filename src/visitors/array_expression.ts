import { ArrayExpression } from '@babel/types'
import { NodePath } from '@babel/traverse'
import { converter } from '../utils'

interface PluginState {
  opts: {
    minJSONStringSize: number
  }
}

const DEFAULT_THRESHOLD = 1024

export function ArrayExpression(
  path: NodePath<ArrayExpression>,
  state: PluginState
): void {
  try {
    const obj = converter(path.node)
    const json = JSON.stringify(obj)
    // escaping for single quotes
    const escapedJson = json.replace(/'/g, "\\'")
    // it simply isn't worth it to convert into the AST objects that are too small.
    // so, this plugin only convert large objects by default.
    const { minJSONStringSize } = state.opts
    const threshold = minJSONStringSize ?? DEFAULT_THRESHOLD
    if (escapedJson.length < threshold) {
      return
    }
    path.replaceWithSourceString(`JSON.parse('${escapedJson}')`)
  } catch (e) {
    // disable error message
    // const { loc } = path.parent
    // const line = loc && loc.start.line
    // console.error(
    //   `At ${line} line (start) : The object wasn't converted (${e.message})`
    // )
  }
}
