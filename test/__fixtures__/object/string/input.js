const test1 = { foo: 'foo' }
const test2 = { foo: "foo" }
const test3 = { foo: "fo'o" }
const test4 = { foo: 'fo"o' }
const test5 = { foo: '' }
const test6 = { foo: "" }
const test7 = { 'foo': "foo" }
const test8 = { "foo": "foo" }
const test9 = { "fo'o": "foo" }
const test10 = { 'fo"o': "foo" }
const res = [
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8,
  test9,
  test10,
]
