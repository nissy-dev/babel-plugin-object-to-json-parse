export function buildPlugin(visitors: Function[]) {
  const visitorMap: { [name: string]: Function } = {}
  for (const visitor of visitors) {
    visitorMap[visitor.name] = visitor
  }

  return () => ({
    name: 'babel-plugin-object-to-json-parse',
    visitor: visitorMap,
  })
}
