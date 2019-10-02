// https://v8.dev/blog/cost-of-javascript-2019
const data = { foo: 42, bar: 1337 }

/* valid */
const valid1 = { foo: 'foo' };
const valid2 = { foo: "fo'o" }
const valid3 = { foo: "fo\'o" }

const valid4 = { foo: 10 };

const valid5 = { foo: true };

const valid6 = { foo: null };

const valid7 = { foo: [null, 10, 'foo'] };

const valid8 = { foo: [null, [10, 2], [{ foo: 'foo' }]] };

const valid9 = { foo: { bar: 1337 } };
const valid10 = { 1: "123", 23: 45, b: "b_val" };

/* invalidValue */
const inValid1 = { foo: () => console.log("invalid") };

const inValid2 = { 
  method(arg) {
    return arg;
  },
  foo: 'foo',
};

const inValid3 = { ...data, foo: 'foo' };

const inValid4 = { foo: 'fo\"o' }
const inValid5 = { foo: 'fo"o' }

/* partialValue */

const partialValue1 = { a: data, b: ['foo'] };
const partialValue2 = { [data.foo]: ['foo'] };
