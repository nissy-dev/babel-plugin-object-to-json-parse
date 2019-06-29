export function ObjectExpression(path: any) {
  const { properties } = path.node;
  const ASTtoStringObject = (nodes: any) => {
    if (nodes.length == 0) {
      return "{}"
    }

    const a = nodes.reduce((acc: any, cur: any)=> {
      const key = cur.key.name;
      const value = cur.value.value;
      return acc + `"${key}": ${value}, `;
    }, "");

    return `{ ${a.slice(0, -2)} }`;
  };
  const stringObject = ASTtoStringObject(properties);
  const test = (object: any) => `JSON.parse(\'${object}\')`;
  path.replaceWithSourceString(test(stringObject));
}
