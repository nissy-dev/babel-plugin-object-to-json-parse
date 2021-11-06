const test1 = JSON.parse('{"foo":"fo\'o"}')
const test2 = JSON.parse('{"foo":"fo\\"o"}')
const test3 = JSON.parse('{"foo":"fo\\"o"}')
const test4 = JSON.parse('{"foo":"fo\'o"}')
const test5 = JSON.parse('{"foo":"fo\\to"}')
const test6 = JSON.parse('{"foo":"fo\\fo"}')
const test7 = JSON.parse('{"foo":"fo\\ro"}')
const test8 = JSON.parse('{"foo":"fo\\no"}')
const test9 = JSON.parse('{"foo":"fo\\bo"}')
const test10 = JSON.parse('{"foo":"fo\\r\\no"}')
const test11 = JSON.parse('{"foo":"foo"}')
const test12 = JSON.parse('{"foo":"fo\\\\o"}')
const test13 = JSON.parse('{"foo":"fo\\\\o"}')
const test14 = JSON.parse('{"foo":"fo\\\\\\\\o"}')
const test15 = JSON.parse('{"foo":"\\\\\\\\"}')
const test16 = JSON.parse('{"fo\'o":"foo"}')
const test17 = JSON.parse('{"fo\\"o":"foo"}')
const test18 = JSON.parse('{"fo\\"o":"foo"}')
const test19 = JSON.parse('{"fo\'o":"foo"}')
const test20 = JSON.parse('{"fo\\no":"foo"}')
const test21 = JSON.parse('{"fo\\r\\no":"foo"}')
const test22 = JSON.parse('{"fo\\\\o":"foo"}')
const test23 = JSON.parse('{"fo\\\\o":"foo"}')
const test24 = JSON.parse('{"fo\\\\\\\\o":"foo"}')
const test25 = JSON.parse('{"foo":"foo\\nbar\\nhoge"}')
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
  test24,
]
