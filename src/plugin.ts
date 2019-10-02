import { JSONDataMap } from './utils'
interface Handler {
  enter?: Function
  exit?: Function
}
type Visitor =
  | Function
  | {
      type: string
      enter?: Function
      exit?: Function
    }
interface VisitorMap {
  [name: string]: Function | Handler
}
interface Plugin {
  name: string
  visitor: VisitorMap
}
export function buildPlugin(
  visitors: Visitor[],
  storage: JSONDataMap = new WeakMap() // eslint-disable-line no-undef
): () => Plugin {
  const visitorMap: VisitorMap = {}
  function bindStorage(fn: Function): Function {
    return fn.bind(null, storage)
  }
  for (const visitor of visitors) {
    if (typeof visitor === 'function') {
      visitorMap[visitor.name] = bindStorage(visitor)
    } else {
      let handler: Handler = {}
      if (visitor.enter) {
        handler.enter = bindStorage(visitor.enter)
      }
      if (visitor.exit) {
        handler.exit = bindStorage(visitor.exit)
      }
      visitorMap[visitor.type] = handler
    }
  }

  return (): Plugin => ({
    name: 'babel-plugin-object-to-json-parse',
    visitor: visitorMap
  })
}
