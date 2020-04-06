const var1 = {
  method(arg) {
    return arg
  },

  b: 1
}
const var2 = { ...var1, b: 1 }
const var3 = {
  b: 'b_val',
  ['c']: 'c_val'
}
const var4 = {
  77777777777777777.1: 'foo'
}