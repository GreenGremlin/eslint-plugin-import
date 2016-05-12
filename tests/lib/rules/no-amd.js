'use strict';

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester();

ruleTester.run('no-amd', require('rules/no-amd'), {
  valid: [{ code: 'import "x";', parserOptions: { sourceType: 'module' } }, { code: 'import x from "x"', parserOptions: { sourceType: 'module' } }, 'var x = require("x")', 'require("x")',
  // 2-args, not an array
  'require("x", "y")',
  // random other function
  'setTimeout(foo, 100)',
  // non-identifier callee
  '(a || b)(1, 2, 3)',

  // nested scope is fine
  'function x() { define(["a"], function (a) {}) }', 'function x() { require(["a"], function (a) {}) }',

  // unmatched arg types/number
  'define(0, 1, 2)', 'define("a")'],

  invalid: [{ code: 'define([], function() {})', errors: [{ message: 'Expected imports instead of AMD define().' }] }, { code: 'define(["a"], function(a) { console.log(a); })', errors: [{ message: 'Expected imports instead of AMD define().' }] }, { code: 'require([], function() {})', errors: [{ message: 'Expected imports instead of AMD require().' }] }, { code: 'require(["a"], function(a) { console.log(a); })', errors: [{ message: 'Expected imports instead of AMD require().' }] }]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWFtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUksYUFBYSx3QkFBakI7O0FBRUEsV0FBVyxHQUFYLENBQWUsUUFBZixFQUF5QixRQUFRLGNBQVIsQ0FBekIsRUFBa0Q7QUFDaEQsU0FBTyxDQUNMLEVBQUUsTUFBTSxhQUFSLEVBQXVCLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBdEMsRUFESyxFQUVMLEVBQUUsTUFBTSxtQkFBUixFQUE2QixlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQTVDLEVBRkssRUFHTCxzQkFISyxFQUtMLGNBTEs7O0FBT1AscUJBUE87O0FBU0wsd0JBVEs7O0FBV0wscUJBWEs7OztBQWNMLG1EQWRLLEVBZUwsa0RBZks7OztBQWtCTCxtQkFsQkssRUFtQkwsYUFuQkssQ0FEeUM7O0FBdUJqRCxXQUFTLENBQ04sRUFBRSxNQUFNLDJCQUFSLEVBQXFDLFFBQVEsQ0FBRSxFQUFFLFNBQVMsMkNBQVgsRUFBRixDQUE3QyxFQURNLEVBRU4sRUFBRSxNQUFNLGdEQUFSLEVBQTBELFFBQVEsQ0FBRSxFQUFFLFNBQVMsMkNBQVgsRUFBRixDQUFsRSxFQUZNLEVBSVIsRUFBRSxNQUFNLDRCQUFSLEVBQXNDLFFBQVEsQ0FBRSxFQUFFLFNBQVMsNENBQVgsRUFBRixDQUE5QyxFQUpRLEVBS1IsRUFBRSxNQUFNLGlEQUFSLEVBQTJELFFBQVEsQ0FBRSxFQUFFLFNBQVMsNENBQVgsRUFBRixDQUFuRSxFQUxRO0FBdkJ3QyxDQUFsRCIsImZpbGUiOiJydWxlcy9uby1hbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG52YXIgcnVsZVRlc3RlciA9IG5ldyBSdWxlVGVzdGVyKClcblxucnVsZVRlc3Rlci5ydW4oJ25vLWFtZCcsIHJlcXVpcmUoJ3J1bGVzL25vLWFtZCcpLCB7XG4gIHZhbGlkOiBbXG4gICAgeyBjb2RlOiAnaW1wb3J0IFwieFwiOycsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSB9LFxuICAgIHsgY29kZTogJ2ltcG9ydCB4IGZyb20gXCJ4XCInLCBwYXJzZXJPcHRpb25zOiB7IHNvdXJjZVR5cGU6ICdtb2R1bGUnIH0gfSxcbiAgICAndmFyIHggPSByZXF1aXJlKFwieFwiKScsXG5cbiAgICAncmVxdWlyZShcInhcIiknLFxuICAgIC8vIDItYXJncywgbm90IGFuIGFycmF5XG5cdFx0J3JlcXVpcmUoXCJ4XCIsIFwieVwiKScsXG4gICAgLy8gcmFuZG9tIG90aGVyIGZ1bmN0aW9uXG4gICAgJ3NldFRpbWVvdXQoZm9vLCAxMDApJyxcbiAgICAvLyBub24taWRlbnRpZmllciBjYWxsZWVcbiAgICAnKGEgfHwgYikoMSwgMiwgMyknLFxuXG4gICAgLy8gbmVzdGVkIHNjb3BlIGlzIGZpbmVcbiAgICAnZnVuY3Rpb24geCgpIHsgZGVmaW5lKFtcImFcIl0sIGZ1bmN0aW9uIChhKSB7fSkgfScsXG4gICAgJ2Z1bmN0aW9uIHgoKSB7IHJlcXVpcmUoW1wiYVwiXSwgZnVuY3Rpb24gKGEpIHt9KSB9JyxcblxuICAgIC8vIHVubWF0Y2hlZCBhcmcgdHlwZXMvbnVtYmVyXG4gICAgJ2RlZmluZSgwLCAxLCAyKScsXG4gICAgJ2RlZmluZShcImFcIiknLFxuXHRdLFxuXG5cdGludmFsaWQ6IFtcbiAgICB7IGNvZGU6ICdkZWZpbmUoW10sIGZ1bmN0aW9uKCkge30pJywgZXJyb3JzOiBbIHsgbWVzc2FnZTogJ0V4cGVjdGVkIGltcG9ydHMgaW5zdGVhZCBvZiBBTUQgZGVmaW5lKCkuJyB9XSB9LFxuICAgIHsgY29kZTogJ2RlZmluZShbXCJhXCJdLCBmdW5jdGlvbihhKSB7IGNvbnNvbGUubG9nKGEpOyB9KScsIGVycm9yczogWyB7IG1lc3NhZ2U6ICdFeHBlY3RlZCBpbXBvcnRzIGluc3RlYWQgb2YgQU1EIGRlZmluZSgpLicgfV0gfSxcblxuXHRcdHsgY29kZTogJ3JlcXVpcmUoW10sIGZ1bmN0aW9uKCkge30pJywgZXJyb3JzOiBbIHsgbWVzc2FnZTogJ0V4cGVjdGVkIGltcG9ydHMgaW5zdGVhZCBvZiBBTUQgcmVxdWlyZSgpLicgfV0gfSxcblx0XHR7IGNvZGU6ICdyZXF1aXJlKFtcImFcIl0sIGZ1bmN0aW9uKGEpIHsgY29uc29sZS5sb2coYSk7IH0pJywgZXJyb3JzOiBbIHsgbWVzc2FnZTogJ0V4cGVjdGVkIGltcG9ydHMgaW5zdGVhZCBvZiBBTUQgcmVxdWlyZSgpLicgfV0gfSxcblx0XSxcbn0pXG4iXX0=