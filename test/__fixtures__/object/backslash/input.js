const test1 = { foo: "fo\'o" }
const test2 = { foo: "fo\"o" }
const test3 = { foo: 'fo\"o' }
const test4 = { foo: 'fo\'o' }
const test5 = { foo: 'fo\to' }
const test6 = { foo: 'fo\fo' }
const test7= { foo: 'fo\ro' }
const test8 = { foo: 'fo\no' }
const test9= { foo: 'fo\bo' }
const test10= { foo: 'fo\r\no' }
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
  test10
]