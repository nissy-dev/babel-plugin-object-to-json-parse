// https://v8.dev/blog/cost-of-javascript-2019
const data = JSON.parse('{"foo":42,"bar":1337}');
/* string */

const data2 = JSON.parse('{"foo":"foo"}');
/* numeric */

const data3 = JSON.parse('{"foo":10}');
/* boolean */

const data4 = JSON.parse('{"foo":true}');
/* null */

const data5 = JSON.parse('{"foo":null}');
/* array */

const data6 = JSON.parse('{"foo":[null,10,"foo"]}');
/* nested array */

const data7 = JSON.parse('{"foo":[null,[10,2],[{"foo":"foo"}]]}');
/* object */

const data8 = JSON.parse('{"foo":{"bar":1337}}');
const data9 = JSON.parse('{"1":"123","23":45,"b":"b_val"}');
/* invalidValue */

const data10 = {
  foo: () => console.log("invalid")
};
const data11 = {
  method(arg) {
    return arg;
  },

  foo: 'foo'
};
const data12 = { ...data,
  foo: 'foo'
};
const data13 = {
  foo: "'abc'",
  bar: 'ab"c'
};
