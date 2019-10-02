import pluginTester from 'babel-plugin-tester'
import plugin = require('../src/index');

pluginTester({
  plugin,
  tests: [{
      title: 'empty object',
      code: `const a = {};`,
      output: `const a = JSON.parse('{}');`
  }, {
    title: 'does partially convert objects which include the spread syntax',
    code: `const a = { ...a, b: 1 };`,
    output: `
      const a = { ...a,
        b: JSON.parse('1')
      };
    `
  }, {
    title: 'does partially convert objects which include the object method',
    code: `
      const a = {
        method(arg) {
          return arg;
        }, 
        b: 1
      };
    `,
    output: `
      const a = {
        method(arg) {
          return arg;
        },

        b: JSON.parse('1')
      };
    `
  }, {
    title: 'does not convert objects which include the invalid value',
    code: `const a = { b: () => console.log("b") };`,
    output: `
      const a = {
        b: () => console.log("b")
      };
    `
  }, {
    title: 'does convert objects which have computed property names',
    code: `const a = { b : "b_val", ["c"]: "c_val" };`,
    output: `
      const a = JSON.parse('{"b":"b_val","c":"c_val"}');
    `
  }, {
    title: 'does convert computed property names with invalid values',
    code: `const a = { [["c"]]: invalid };`,
    output: `
      const a = {
        [JSON.parse('["c"]')]: invalid
      };
    `
  }, {
    title: 'does convert property values with invalid keys',
    code: `const a = { [invalid]: ["c"] };`,
    output: `
      const a = {
        [invalid]: JSON.parse('["c"]'): 
      }');
    `
  }, {
    title: 'does convert objects which have double quotes in string',
    code: `const a = { b: 'ab\"c' };`,
    output: `
      const a = JSON.parse('{"b":"ab\\"c"}');
    `
  }, {
    title: 'does convert objects which have double quotes in string',
    code: `const a = { b: 'ab"c' };`,
    output: `
      const a = JSON.parse('{"b":"ab\\"c"}');
    `
  }, {
    title: 'does not convert objects which have invalid numeric key',
    code: `const a ={ 77777777777777777.1: "foo" };`,
    output: `
      const a = {
        77777777777777777.1: "foo"
      };
    `
  }, {
    title: 'string',
    code: `const a = { b: "b_val" };`,
    output: `const a = JSON.parse('{"b":"b_val"}');`
  }, {
    title: 'string (include single quote)',
    code: `const a = { b: "'abc'" };`,
    output: `const a = JSON.parse('{"b":"\\'abc\\'"}');`
  }, {
    title: 'string (include single quote)',
    code: `const a = { b: "ab\'c" };`,
    output: `const a = JSON.parse('{"b":"ab\\'c"}');`
  }, {
    title: 'number',
    code: `const a = { b: 1 };`,
    output: `const a = JSON.parse('{"b":1}');`
  }, {
    title: 'null',
    code: `const a = { b: null };`,
    output: `const a = JSON.parse('{"b":null}');`
  }, {
    title: 'boolean',
    code: `const a = { b: false };`,
    output: `const a = JSON.parse('{"b":false}');`
  }, {
    title: 'Array',
    code: `const a = { b: [1, 'b_val', null] };`,
    output: `const a = JSON.parse('{"b":[1,"b_val",null]}');`
  }, {
    title: 'Nested Array',
    code: `const a = { b: [1, ['b_val', { a: 1 }], null] };`,
    output: `const a = JSON.parse('{"b":[1,["b_val",{"a":1}],null]}');`
  }, {
    title: 'Object',
    code: `const a = { b: { c: 1 } };`,
    output: `const a = JSON.parse('{"b":{"c":1}}');`
  }, {
    title: 'Object (having numeric keys)',
    code: `const a = { 1: "123", 23: 45, b: "b_val" };`,
    output: `const a = JSON.parse('{"1":"123","23":45,"b":"b_val"}');`
  }, {
    title: 'respects minJSONStringSize',
    // @ts-ignore
    pluginOptions: {
      minJSONStringSize: 4
    },
    code: `const a = [1];`,
    output: `
      const a = [1];
    `
  }, {
    title: 'respects minJSONStringSize',
    // @ts-ignore
    pluginOptions: {
      minJSONStringSize: 4
    },
    code: `const a = [12];`,
    output: `
      const a = JSON.parse('[12]');
    `
  }, {
    title: 'respects minJSONStringSize',
    // @ts-ignore
    pluginOptions: {
      minJSONStringSize: 4
    },
    code: `const a = [123];`,
    output: `
    const a = JSON.parse('[123]');
    `
  }, {
    title: 'respects outside assignment',
    code: `([123]);`,
    output: `
    JSON.parse('[123]');
    `
  }, {
    title: 'respects outside assignment',
    code: `f([123]);`,
    output: `
    f(JSON.parse('[123]'));
    `
  }, {
    title: 'respects outside assignment',
    code: `new F([123]);`,
    output: `
    new F(JSON.parse('[123]'));
    `
  }, {
    title: 'respects outside assignment',
    code: `(_,[123]);`,
    output: `
    _, JSON.parse('[123]');
    `
  }, {
    title: 'handles partial JSON expressions',
    code: `[invalid,[123]];`,
    output: `
    [invalid, JSON.parse('[123]')];
    `
  }, {
    title: 'handles partial JSON expressions',
    code: `({invalid,valid:[123]});`,
    output: `
    ({
      invalid,
      valid: JSON.parse('[123]')
    });
    `
  },]
});