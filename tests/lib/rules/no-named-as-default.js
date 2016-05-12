'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-named-as-default');

ruleTester.run('no-named-as-default', rule, {
  valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }), (0, _utils.test)({ code: 'import bar, { foo } from "./bar";' }), (0, _utils.test)({ code: 'import bar, { foo } from "./empty-folder";' }),

  // es7
  (0, _utils.test)({ code: 'export bar, { foo } from "./bar";',
    parser: 'babel-eslint' }), (0, _utils.test)({ code: 'export bar from "./bar";',
    parser: 'babel-eslint' })].concat(_utils.SYNTAX_CASES),

  invalid: [(0, _utils.test)({
    code: 'import foo from "./bar";',
    errors: [{
      message: 'Using exported name \'foo\' as identifier for default export.',
      type: 'ImportDefaultSpecifier' }] }), (0, _utils.test)({
    code: 'import foo, { foo as bar } from "./bar";',
    errors: [{
      message: 'Using exported name \'foo\' as identifier for default export.',
      type: 'ImportDefaultSpecifier' }] }),

  // es7
  (0, _utils.test)({
    code: 'export foo from "./bar";',
    parser: 'babel-eslint',
    errors: [{
      message: 'Using exported name \'foo\' as identifier for default export.',
      type: 'ExportDefaultSpecifier' }] }), (0, _utils.test)({
    code: 'export foo, { foo as bar } from "./bar";',
    parser: 'babel-eslint',
    errors: [{
      message: 'Using exported name \'foo\' as identifier for default export.',
      type: 'ExportDefaultSpecifier' }] }), (0, _utils.test)({
    code: 'import foo from "./malformed.js"',
    errors: [{
      message: "Parse errors in imported module './malformed.js': 'return' outside of function (1:1)",
      type: 'Literal'
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQSxJQUFNLGFBQWEsd0JBQW5CO0lBQ00sT0FBTyxRQUFRLDJCQUFSLENBRGI7O0FBR0EsV0FBVyxHQUFYLENBQWUscUJBQWYsRUFBc0MsSUFBdEMsRUFBNEM7QUFDMUMsVUFDRSxpQkFBSyxFQUFFLE1BQU0seUJBQVIsRUFBTCxDQURGLEVBR0UsaUJBQUssRUFBQyxNQUFNLG1DQUFQLEVBQUwsQ0FIRixFQUlFLGlCQUFLLEVBQUMsTUFBTSw0Q0FBUCxFQUFMLENBSkY7OztBQU9FLG1CQUFLLEVBQUUsTUFBTSxtQ0FBUjtBQUNFLFlBQVEsY0FEVixFQUFMLENBUEYsRUFTRSxpQkFBSyxFQUFFLE1BQU0sMEJBQVI7QUFDRSxZQUFRLGNBRFYsRUFBTCxDQVRGLDZCQUQwQzs7QUFnQjFDLFdBQVMsQ0FDUCxpQkFBSztBQUNILFVBQU0sMEJBREg7QUFFSCxZQUFRLENBQUU7QUFDUixlQUFTLCtEQUREO0FBRVIsWUFBTSx3QkFGRSxFQUFGLENBRkwsRUFBTCxDQURPLEVBTVAsaUJBQUs7QUFDSCxVQUFNLDBDQURIO0FBRUgsWUFBUSxDQUFFO0FBQ1IsZUFBUywrREFERDtBQUVSLFlBQU0sd0JBRkUsRUFBRixDQUZMLEVBQUwsQ0FOTzs7O0FBYVAsbUJBQUs7QUFDSCxVQUFNLDBCQURIO0FBRUgsWUFBUSxjQUZMO0FBR0gsWUFBUSxDQUFFO0FBQ1IsZUFBUywrREFERDtBQUVSLFlBQU0sd0JBRkUsRUFBRixDQUhMLEVBQUwsQ0FiTyxFQW1CUCxpQkFBSztBQUNILFVBQU0sMENBREg7QUFFSCxZQUFRLGNBRkw7QUFHSCxZQUFRLENBQUU7QUFDUixlQUFTLCtEQUREO0FBRVYsWUFBTSx3QkFGSSxFQUFGLENBSEwsRUFBTCxDQW5CTyxFQTBCUCxpQkFBSztBQUNILFVBQU0sa0NBREg7QUFFSCxZQUFRLENBQUM7QUFDUCxlQUFTLHNGQURGO0FBRVAsWUFBTTtBQUZDLEtBQUQ7QUFGTCxHQUFMLENBMUJPO0FBaEJpQyxDQUE1QyIsImZpbGUiOiJydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCwgU1lOVEFYX0NBU0VTIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAgICwgcnVsZSA9IHJlcXVpcmUoJ3J1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQnKVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tbmFtZWQtYXMtZGVmYXVsdCcsIHJ1bGUsIHtcbiAgdmFsaWQ6IFtcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcIi4vbWFsZm9ybWVkLmpzXCInIH0pLFxuXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBiYXIsIHsgZm9vIH0gZnJvbSBcIi4vYmFyXCI7J30pLFxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQgYmFyLCB7IGZvbyB9IGZyb20gXCIuL2VtcHR5LWZvbGRlclwiOyd9KSxcblxuICAgIC8vIGVzN1xuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGJhciwgeyBmb28gfSBmcm9tIFwiLi9iYXJcIjsnXG4gICAgICAgICAsIHBhcnNlcjogJ2JhYmVsLWVzbGludCcgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgYmFyIGZyb20gXCIuL2JhclwiOydcbiAgICAgICAgICwgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyB9KSxcblxuICAgIC4uLlNZTlRBWF9DQVNFUyxcbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGZvbyBmcm9tIFwiLi9iYXJcIjsnLFxuICAgICAgZXJyb3JzOiBbIHtcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGV4cG9ydGVkIG5hbWUgXFwnZm9vXFwnIGFzIGlkZW50aWZpZXIgZm9yIGRlZmF1bHQgZXhwb3J0LidcbiAgICAgICwgdHlwZTogJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInIH0gXSB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgZm9vLCB7IGZvbyBhcyBiYXIgfSBmcm9tIFwiLi9iYXJcIjsnLFxuICAgICAgZXJyb3JzOiBbIHtcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGV4cG9ydGVkIG5hbWUgXFwnZm9vXFwnIGFzIGlkZW50aWZpZXIgZm9yIGRlZmF1bHQgZXhwb3J0LidcbiAgICAgICwgdHlwZTogJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInIH0gXSB9KSxcblxuICAgIC8vIGVzN1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCBmb28gZnJvbSBcIi4vYmFyXCI7JyxcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgICBlcnJvcnM6IFsge1xuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgZXhwb3J0ZWQgbmFtZSBcXCdmb29cXCcgYXMgaWRlbnRpZmllciBmb3IgZGVmYXVsdCBleHBvcnQuJ1xuICAgICAgLCB0eXBlOiAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcicgfSBdIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCBmb28sIHsgZm9vIGFzIGJhciB9IGZyb20gXCIuL2JhclwiOycsXG4gICAgICBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnLFxuICAgICAgZXJyb3JzOiBbIHtcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGV4cG9ydGVkIG5hbWUgXFwnZm9vXFwnIGFzIGlkZW50aWZpZXIgZm9yIGRlZmF1bHQgZXhwb3J0LidcbiAgICAsIHR5cGU6ICdFeHBvcnREZWZhdWx0U3BlY2lmaWVyJyB9IF0gfSksXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgZm9vIGZyb20gXCIuL21hbGZvcm1lZC5qc1wiJyxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgbWVzc2FnZTogXCJQYXJzZSBlcnJvcnMgaW4gaW1wb3J0ZWQgbW9kdWxlICcuL21hbGZvcm1lZC5qcyc6ICdyZXR1cm4nIG91dHNpZGUgb2YgZnVuY3Rpb24gKDE6MSlcIixcbiAgICAgICAgdHlwZTogJ0xpdGVyYWwnLFxuICAgICAgfV0sXG4gICAgfSksXG4gIF0sXG59KVxuIl19