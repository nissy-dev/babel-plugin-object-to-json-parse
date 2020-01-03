// https://v8.dev/blog/cost-of-javascript-2019
const data = { foo: 42, bar: 1337 }

/* valid */
const valid1 = { foo: 'foo' };
const valid2 = { foo: "foo" };

const valid3 = { foo: "fo'o" };
const valid4 = { foo: "fo\'o" };
const valid5 = { foo: "fo\"o" };

const valid6 = { foo: 'fo"o' };
const valid7 = { foo: 'fo\"o' };
const valid8 = { foo: 'fo\'o' };

const valid9 = { foo: 10 };

const valid10 = { foo: true };

const valid11 = { foo: null };

const valid12 = { foo: [null, 10, 'foo'] };

const valid13 = { foo: [null, [10, 2], [{ foo: 'foo' }]] };

const valid14 = { foo: { bar: 1337 } };
const valid15 = { 1: "123", 23: 45, b: "b_val" };

const valid16 = [1, "two", {three: 3}];


/* invalidValue */
const inValid1 = { foo: () => console.log("invalid") };

const inValid2 = { 
  method(arg) {
    return arg;
  },
  foo: 'foo',
};

const inValid3 = { ...data, foo: 'foo' };
const inValid4 = { bar: data, foo: 'foo' };
