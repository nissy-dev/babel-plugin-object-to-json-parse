const test1 = {
  method(arg) {
    return arg
  },

  b: 1
}
const test2 = { ...test1, b: 1 }
const test3 = {
  b: 'b_val',
  ['c']: 'c_val'
}
const test4 = {
  77777777777777777.1: 'foo'
}