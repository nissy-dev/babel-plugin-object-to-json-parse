export function buildPlugin(visitor: Function) {
  const visitorMap: { [name: string]: Function } = {}
  visitorMap['ObjectExpression'] = visitor
  visitorMap['ArrayExpression'] = visitor

  return () => ({
    name: 'babel-plugin-object-to-json-parse',
    visitor: visitorMap
  })
}
