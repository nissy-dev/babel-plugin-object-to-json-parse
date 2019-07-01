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

const isValidJsonValue = (node: any) => {
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

const isConvertibleObjectProperty = (
  node: ObjectExpression['properties'][number]
) => isObjectProperty(node) && !node.computed

export function converter(node: any): object | null {
  if (!isValidJsonValue(node)) {
    throw new Error('Invalid value is included.')
  }

  if (isNullLiteral(node)) {
    return null
  }

  if (isArrayExpression(node)) {
    // recursive
    const { elements } = node
    return elements.map(node => converter(node))
  }

  if (isObjectExpression(node)) {
    const { properties } = node

    // skip the objects which include the spread sytanx and object method
    const validObjectSyntax = properties.every(node =>
      isConvertibleObjectProperty(node)
    )
    if (!validObjectSyntax) {
      throw new Error('Invalid syntax is included.')
    }

    // recursive
    return (properties as ObjectProperty[]).reduce((acc, cur) => {
      const key = cur.key.name
      const value = converter(cur.value)
      return { ...acc, [key]: value }
    }, {})
  }

  // for numeric, string, boolean
  // @ts-ignore
  return node.value
}
