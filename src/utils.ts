import {
  isArrayExpression,
  isBooleanLiteral,
  isObjectExpression,
  isNullLiteral,
  isNumericLiteral,
  isStringLiteral,
  ObjectExpression,
  ObjectProperty,
  isObjectProperty
} from '@babel/types'

const checkValidJsonValue = (node: any) => {
  if (
    isNumericLiteral(node) ||
    isStringLiteral(node) ||
    isBooleanLiteral(node) ||
    isNullLiteral(node) ||
    isArrayExpression(node) ||
    isObjectExpression(node)
  ) {
    return true
  }

  return false
}

const nodeToValue = (node: any): any => {
  if (!checkValidJsonValue(node)) {
    throw new Error('Invalid value is included.')
  }

  if (isNullLiteral(node)) {
    return null
  }

  if (isArrayExpression(node)) {
    // recursive
    const elmentNodes = node.elements
    return elmentNodes.map(node => nodeToValue(node))
  }

  if (isObjectExpression(node)) {
    // recursive
    return astToObj(node)
  }

  // for numeric, string, boolean
  // @ts-ignore
  return node.value
}

const isConvertibleObjectProperty = (
  node: ObjectExpression['properties'][number]
) => isObjectProperty(node) && !node.computed

export function astToObj(node: ObjectExpression) {
  const { properties } = node
  // skip the objects which include the spread sytanx and object method
  const validObjectSyntax = properties.every(node =>
    isConvertibleObjectProperty(node)
  )
  if (!validObjectSyntax) {
    throw new Error('Invalid syntax is included.')
  }

  let obj = {} as any
  for (let property of properties as ObjectProperty[]) {
    const keyName = property.key.name
    const valueNode = property.value
    const value = nodeToValue(valueNode)
    obj[keyName] = value
  }

  return obj
}
