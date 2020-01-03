// https://v8.dev/blog/cost-of-javascript-2019
const data = JSON.parse('{"foo":42,"bar":1337}');
/* valid */

const valid1 = JSON.parse('{"foo":"foo"}');
const valid2 = JSON.parse('{"foo":"foo"}');
const valid3 = JSON.parse('{"foo":"fo\'o"}');
const valid4 = JSON.parse('{"foo":"fo\'o"}');
const valid5 = JSON.parse('{"foo":"fo\\\"o"}');
const valid6 = JSON.parse('{"foo":"fo\\\"o"}');
const valid7 = JSON.parse('{"foo":"fo\\\"o"}');
const valid8 = JSON.parse('{"foo":"fo\'o"}');
const valid9 = JSON.parse('{"foo":10}');
const valid10 = JSON.parse('{"foo":true}');
const valid11 = JSON.parse('{"foo":null}');
const valid12 = JSON.parse('{"foo":[null,10,"foo"]}');
const valid13 = JSON.parse('{"foo":[null,[10,2],[{"foo":"foo"}]]}');
const valid14 = JSON.parse('{"foo":{"bar":1337}}');
const valid15 = JSON.parse('{"1":"123","23":45,"b":"b_val"}');
const valid16 = JSON.parse('[1,"two",{"three":3}]');
/* invalidValue */

const inValid1 = {
  foo: () => console.log("invalid")
};
const inValid2 = {
  method(arg) {
    return arg;
  },

  foo: 'foo'
};
const inValid3 = { ...data,
  foo: 'foo'
};
const inValid4 = {
  bar: data,
  foo: 'foo'
};
