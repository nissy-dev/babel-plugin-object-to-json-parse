const test1 = JSON.parse('{"foo":"foo"}')
const test2 = JSON.parse('{"foo":"foo"}')
const test3 = JSON.parse('{"foo":"fo\'o"}')
const test4 = JSON.parse('{"foo":"fo\\"o"}')
const test5 = JSON.parse('{"foo":""}')
const test6 = JSON.parse('{"foo":""}')
const res = [test1, test2, test3, test4, test5, test6]