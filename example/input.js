// https://v8.dev/blog/cost-of-javascript-2019
const data = { foo: 42, bar: 1337 }

/* string */
const data2 = { foo: 'foo' };

/* numeric */
const data3 = { foo: 10 };

/* boolean */
const data4 = { foo: true };

/* null */
const data5 = { foo: null };

/* array */
const data6 = { foo: [null, 10, 'foo'] };

/* nested array */
const data7 = { foo: [null, [10, 2], [{ foo: 'foo' }]] };

/* object */
const data8 = { foo: { bar: 1337 } };
const data9 = { 1: "123", 23: 45, b: "b_val" };


/* invalidValue */
const data10 = { foo: () => console.log("invalid") };

const data11 = { 
  method(arg) {
    return arg;
  },
  foo: 'foo',
};

const data12 = { ...data, foo: 'foo' };

const data13 = {
  foo: "'abc'",
  bar: 'ab"c'
};
