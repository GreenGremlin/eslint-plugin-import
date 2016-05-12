'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/export');

ruleTester.run('export', rule, {
  valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }),

  // default
  (0, _utils.test)({ code: 'var foo = "foo"; export default foo;' }), (0, _utils.test)({ code: 'export var foo = "foo"; export var bar = "bar";' }), (0, _utils.test)({ code: 'export var foo = "foo", bar = "bar";' }), (0, _utils.test)({ code: 'export var { foo, bar } = object;' }), (0, _utils.test)({ code: 'export var [ foo, bar ] = array;' }), (0, _utils.test)({ code: 'export var { foo, bar } = object;' }), (0, _utils.test)({ code: 'export var [ foo, bar ] = array;' }), (0, _utils.test)({ code: 'export { foo, foo as bar }' }), (0, _utils.test)({ code: 'export { bar }; export * from "./export-all"' }), (0, _utils.test)({ code: 'export * from "./export-all"' }), (0, _utils.test)({ code: 'export * from "./does-not-exist"' }),

  // #328: "export * from" does not export a default
  (0, _utils.test)({ code: 'export default foo; export * from "./bar"' })],

  invalid: [
  // multiple defaults
  (0, _utils.test)({
    code: 'export default foo; export default bar',
    errors: ['Multiple default exports.', 'Multiple default exports.']
  }), (0, _utils.test)({
    code: 'export default function foo() {}; ' + 'export default function bar() {}',
    errors: ['Multiple default exports.', 'Multiple default exports.']
  }), (0, _utils.test)({
    code: 'export function foo() {}; ' + 'export { bar as foo }',
    errors: ["Multiple exports of name 'foo'.", "Multiple exports of name 'foo'."]
  }), (0, _utils.test)({
    code: 'export {foo}; export {foo};',
    errors: ["Multiple exports of name 'foo'.", "Multiple exports of name 'foo'."]
  }), (0, _utils.test)({
    code: 'export {foo}; export {bar as foo};',
    errors: ["Multiple exports of name 'foo'.", "Multiple exports of name 'foo'."]
  }), (0, _utils.test)({
    code: 'export var foo = "foo"; export var foo = "bar";',
    errors: ["Multiple exports of name 'foo'.", "Multiple exports of name 'foo'."]
  }), (0, _utils.test)({
    code: 'export var foo = "foo", foo = "bar";',
    errors: ["Multiple exports of name 'foo'.", "Multiple exports of name 'foo'."]
  }), (0, _utils.test)({
    code: 'export { foo }; export * from "./export-all"',
    errors: ['Multiple exports of name \'foo\'.', 'Multiple exports of name \'foo\'.']
  }),
  // test({ code: 'export * from "./default-export"'
  //      , errors: [{ message: 'No named exports found in module ' +
  //                            '\'./default-export\'.'
  //                 , type: 'Literal' }] }),

  (0, _utils.test)({
    code: 'export * from "./malformed.js"',
    errors: [{
      message: "Parse errors in imported module './malformed.js': 'return' outside of function (1:1)",
      type: 'Literal'
    }]
  }), (0, _utils.test)({
    code: 'export var { foo, bar } = object; export var foo = "bar"',
    errors: ['Multiple exports of name \'foo\'.', 'Multiple exports of name \'foo\'.']
  }), (0, _utils.test)({
    code: 'export var { bar: { foo } } = object; export var foo = "bar"',
    errors: ['Multiple exports of name \'foo\'.', 'Multiple exports of name \'foo\'.']
  }), (0, _utils.test)({
    code: 'export var [ foo, bar ] = array; export var bar = "baz"',
    errors: ['Multiple exports of name \'bar\'.', 'Multiple exports of name \'bar\'.']
  }), (0, _utils.test)({
    code: 'export var [ foo, /*sparse*/, { bar } ] = array; export var bar = "baz"',
    errors: ['Multiple exports of name \'bar\'.', 'Multiple exports of name \'bar\'.']
  }),

  // #328: "export * from" does not export a default
  (0, _utils.test)({
    code: 'export * from "./default-export"',
    errors: ['No named exports found in module \'./default-export\'.']
  })]
});
//# sourceMappingURL=data:application/json;base64,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dWxlcy9leHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbnZhciBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAsIHJ1bGUgPSByZXF1aXJlKCdydWxlcy9leHBvcnQnKVxuXG5ydWxlVGVzdGVyLnJ1bignZXhwb3J0JywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IFwiLi9tYWxmb3JtZWQuanNcIicgfSksXG5cbiAgICAvLyBkZWZhdWx0XG4gICAgdGVzdCh7IGNvZGU6ICd2YXIgZm9vID0gXCJmb29cIjsgZXhwb3J0IGRlZmF1bHQgZm9vOycgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgdmFyIGZvbyA9IFwiZm9vXCI7IGV4cG9ydCB2YXIgYmFyID0gXCJiYXJcIjsnfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgdmFyIGZvbyA9IFwiZm9vXCIsIGJhciA9IFwiYmFyXCI7JyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCB2YXIgeyBmb28sIGJhciB9ID0gb2JqZWN0OycgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgdmFyIFsgZm9vLCBiYXIgXSA9IGFycmF5OycgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgdmFyIHsgZm9vLCBiYXIgfSA9IG9iamVjdDsnIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IHZhciBbIGZvbywgYmFyIF0gPSBhcnJheTsnIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IHsgZm9vLCBmb28gYXMgYmFyIH0nIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IHsgYmFyIH07IGV4cG9ydCAqIGZyb20gXCIuL2V4cG9ydC1hbGxcIicgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgKiBmcm9tIFwiLi9leHBvcnQtYWxsXCInIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0ICogZnJvbSBcIi4vZG9lcy1ub3QtZXhpc3RcIicgfSksXG5cbiAgICAvLyAjMzI4OiBcImV4cG9ydCAqIGZyb21cIiBkb2VzIG5vdCBleHBvcnQgYSBkZWZhdWx0XG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgZGVmYXVsdCBmb287IGV4cG9ydCAqIGZyb20gXCIuL2JhclwiJyB9KSxcbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAgLy8gbXVsdGlwbGUgZGVmYXVsdHNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdleHBvcnQgZGVmYXVsdCBmb287IGV4cG9ydCBkZWZhdWx0IGJhcicsXG4gICAgICBlcnJvcnM6IFsnTXVsdGlwbGUgZGVmYXVsdCBleHBvcnRzLicsICdNdWx0aXBsZSBkZWZhdWx0IGV4cG9ydHMuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9vKCkge307ICcgK1xuICAgICAgICAgICAgICAgICAnZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmFyKCkge30nLFxuICAgICAgZXJyb3JzOiBbJ011bHRpcGxlIGRlZmF1bHQgZXhwb3J0cy4nLCAnTXVsdGlwbGUgZGVmYXVsdCBleHBvcnRzLiddLFxuICAgIH0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGZ1bmN0aW9uIGZvbygpIHt9OyAnICtcbiAgICAgICAgICAgICAgICAgJ2V4cG9ydCB7IGJhciBhcyBmb28gfScsXG4gICAgICBlcnJvcnM6IFtcIk11bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSAnZm9vJy5cIiwgXCJNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgJ2ZvbycuXCJdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB7Zm9vfTsgZXhwb3J0IHtmb299OycsXG4gICAgICBlcnJvcnM6IFtcIk11bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSAnZm9vJy5cIiwgXCJNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgJ2ZvbycuXCJdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB7Zm9vfTsgZXhwb3J0IHtiYXIgYXMgZm9vfTsnLFxuICAgICAgZXJyb3JzOiBbXCJNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgJ2ZvbycuXCIsIFwiTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lICdmb28nLlwiXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdleHBvcnQgdmFyIGZvbyA9IFwiZm9vXCI7IGV4cG9ydCB2YXIgZm9vID0gXCJiYXJcIjsnLFxuICAgICAgZXJyb3JzOiBbXCJNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgJ2ZvbycuXCIsIFwiTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lICdmb28nLlwiXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdleHBvcnQgdmFyIGZvbyA9IFwiZm9vXCIsIGZvbyA9IFwiYmFyXCI7JyxcbiAgICAgIGVycm9yczogW1wiTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lICdmb28nLlwiLCBcIk11bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSAnZm9vJy5cIl0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IHsgZm9vIH07IGV4cG9ydCAqIGZyb20gXCIuL2V4cG9ydC1hbGxcIicsXG4gICAgICBlcnJvcnM6IFsnTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lIFxcJ2Zvb1xcJy4nLFxuICAgICAgICAgICAgICAgJ011bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSBcXCdmb29cXCcuJ10sXG4gICAgfSksXG4gICAgLy8gdGVzdCh7IGNvZGU6ICdleHBvcnQgKiBmcm9tIFwiLi9kZWZhdWx0LWV4cG9ydFwiJ1xuICAgIC8vICAgICAgLCBlcnJvcnM6IFt7IG1lc3NhZ2U6ICdObyBuYW1lZCBleHBvcnRzIGZvdW5kIGluIG1vZHVsZSAnICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXFwnLi9kZWZhdWx0LWV4cG9ydFxcJy4nXG4gICAgLy8gICAgICAgICAgICAgICAgICwgdHlwZTogJ0xpdGVyYWwnIH1dIH0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0ICogZnJvbSBcIi4vbWFsZm9ybWVkLmpzXCInLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBtZXNzYWdlOiBcIlBhcnNlIGVycm9ycyBpbiBpbXBvcnRlZCBtb2R1bGUgJy4vbWFsZm9ybWVkLmpzJzogJ3JldHVybicgb3V0c2lkZSBvZiBmdW5jdGlvbiAoMToxKVwiLFxuICAgICAgICB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICB9XSxcbiAgICB9KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB2YXIgeyBmb28sIGJhciB9ID0gb2JqZWN0OyBleHBvcnQgdmFyIGZvbyA9IFwiYmFyXCInLFxuICAgICAgZXJyb3JzOiBbJ011bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSBcXCdmb29cXCcuJyxcbiAgICAgICAgICAgICAgICdNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgXFwnZm9vXFwnLiddLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB2YXIgeyBiYXI6IHsgZm9vIH0gfSA9IG9iamVjdDsgZXhwb3J0IHZhciBmb28gPSBcImJhclwiJyxcbiAgICAgIGVycm9yczogWydNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgXFwnZm9vXFwnLicsXG4gICAgICAgICAgICAgICAnTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lIFxcJ2Zvb1xcJy4nXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdleHBvcnQgdmFyIFsgZm9vLCBiYXIgXSA9IGFycmF5OyBleHBvcnQgdmFyIGJhciA9IFwiYmF6XCInLFxuICAgICAgZXJyb3JzOiBbJ011bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSBcXCdiYXJcXCcuJyxcbiAgICAgICAgICAgICAgICdNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgXFwnYmFyXFwnLiddLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB2YXIgWyBmb28sIC8qc3BhcnNlKi8sIHsgYmFyIH0gXSA9IGFycmF5OyBleHBvcnQgdmFyIGJhciA9IFwiYmF6XCInLFxuICAgICAgZXJyb3JzOiBbJ011bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSBcXCdiYXJcXCcuJyxcbiAgICAgICAgICAgICAgICdNdWx0aXBsZSBleHBvcnRzIG9mIG5hbWUgXFwnYmFyXFwnLiddLFxuICAgIH0pLFxuXG5cbiAgICAvLyAjMzI4OiBcImV4cG9ydCAqIGZyb21cIiBkb2VzIG5vdCBleHBvcnQgYSBkZWZhdWx0XG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0ICogZnJvbSBcIi4vZGVmYXVsdC1leHBvcnRcIicsXG4gICAgICBlcnJvcnM6IFtgTm8gbmFtZWQgZXhwb3J0cyBmb3VuZCBpbiBtb2R1bGUgJy4vZGVmYXVsdC1leHBvcnQnLmBdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==