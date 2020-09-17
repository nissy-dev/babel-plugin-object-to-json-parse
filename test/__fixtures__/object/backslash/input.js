const test1 = { foo: "fo\'o" }
const test2 = { foo: "fo\"o" }
const test3 = { foo: 'fo\"o' }
const test4 = { foo: 'fo\'o' }
const test5 = { foo: 'fo\to' }
const test6 = { foo: 'fo\fo' }
const test7 = { foo: 'fo\ro' }
const test8 = { foo: 'fo\no' }
const test9 = { foo: 'fo\bo' }
const test10 = { foo: 'fo\r\no' }
const test11 = { foo: 'fo\o' }
const test12 = { foo: 'fo\\o' }
const test13 = { foo: 'fo\\\o' }
const test14 = { foo: 'fo\\\\o' }
const test15 = { foo: '\\\\' }
const test16 = { "fo\'o": "foo" }
const test17 = { "fo\"o": "foo" }
const test18 = { 'fo\"o': "foo" }
const test19 = { 'fo\'o': "foo" }
const test20 = { 'fo\no': "foo" }
const test21 = { 'fo\r\no': "foo" }
const test22 = { 'fo\\o': "foo" }
const test23 = { 'fo\\\o': "foo" }
const test24 = { 'fo\\\\o': "foo" }
const test25 = { foo: 'foo\nbar\nhoge' }
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
  test11,
  test12,
  test13,
  test14,
  test15,
  test16,
  test17,
  test18,
  test19,
  test20,
  test21,
  test22,
  test23,
  test24
]