'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var _noMutableExports = require('rules/no-mutable-exports');

var _noMutableExports2 = _interopRequireDefault(_noMutableExports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleTester = new _eslint.RuleTester();

ruleTester.run('no-mutable-exports', _noMutableExports2.default, {
  valid: [(0, _utils.test)({ code: 'export const count = 1' }), (0, _utils.test)({ code: 'export function getCount() {}' }), (0, _utils.test)({ code: 'export class Counter {}' }), (0, _utils.test)({ code: 'export default count = 1' }), (0, _utils.test)({ code: 'export default function getCount() {}' }), (0, _utils.test)({ code: 'export default class Counter {}' }), (0, _utils.test)({ code: 'const count = 1\nexport { count }' }), (0, _utils.test)({ code: 'const count = 1\nexport { count as counter }' }), (0, _utils.test)({ code: 'const count = 1\nexport default count' }), (0, _utils.test)({ code: 'const count = 1\nexport { count as default }' }), (0, _utils.test)({ code: 'function getCount() {}\nexport { getCount }' }), (0, _utils.test)({ code: 'function getCount() {}\nexport { getCount as getCounter }' }), (0, _utils.test)({ code: 'function getCount() {}\nexport default getCount' }), (0, _utils.test)({ code: 'function getCount() {}\nexport { getCount as default }' }), (0, _utils.test)({ code: 'class Counter {}\nexport { Counter }' }), (0, _utils.test)({ code: 'class Counter {}\nexport { Counter as Count }' }), (0, _utils.test)({ code: 'class Counter {}\nexport default Counter' }), (0, _utils.test)({ code: 'class Counter {}\nexport { Counter as default }' }), (0, _utils.test)({
    parser: 'babel-eslint',
    code: 'export Something from "./something";'
  })],
  invalid: [(0, _utils.test)({
    code: 'export let count = 1',
    errors: ['Exporting mutable \'let\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'export var count = 1',
    errors: ['Exporting mutable \'var\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'let count = 1\nexport { count }',
    errors: ['Exporting mutable \'let\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'var count = 1\nexport { count }',
    errors: ['Exporting mutable \'var\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'let count = 1\nexport { count as counter }',
    errors: ['Exporting mutable \'let\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'var count = 1\nexport { count as counter }',
    errors: ['Exporting mutable \'var\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'let count = 1\nexport default count',
    errors: ['Exporting mutable \'let\' binding, use \'const\' instead.']
  }), (0, _utils.test)({
    code: 'var count = 1\nexport default count',
    errors: ['Exporting mutable \'var\' binding, use \'const\' instead.']
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW11dGFibGUtZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsd0JBQW5COztBQUVBLFdBQVcsR0FBWCxDQUFlLG9CQUFmLDhCQUEyQztBQUN6QyxTQUFPLENBQ0wsaUJBQUssRUFBRSxNQUFNLHdCQUFSLEVBQUwsQ0FESyxFQUVMLGlCQUFLLEVBQUUsTUFBTSwrQkFBUixFQUFMLENBRkssRUFHTCxpQkFBSyxFQUFFLE1BQU0seUJBQVIsRUFBTCxDQUhLLEVBSUwsaUJBQUssRUFBRSxNQUFNLDBCQUFSLEVBQUwsQ0FKSyxFQUtMLGlCQUFLLEVBQUUsTUFBTSx1Q0FBUixFQUFMLENBTEssRUFNTCxpQkFBSyxFQUFFLE1BQU0saUNBQVIsRUFBTCxDQU5LLEVBT0wsaUJBQUssRUFBRSxNQUFNLG1DQUFSLEVBQUwsQ0FQSyxFQVFMLGlCQUFLLEVBQUUsTUFBTSw4Q0FBUixFQUFMLENBUkssRUFTTCxpQkFBSyxFQUFFLE1BQU0sdUNBQVIsRUFBTCxDQVRLLEVBVUwsaUJBQUssRUFBRSxNQUFNLDhDQUFSLEVBQUwsQ0FWSyxFQVdMLGlCQUFLLEVBQUUsTUFBTSw2Q0FBUixFQUFMLENBWEssRUFZTCxpQkFBSyxFQUFFLE1BQU0sMkRBQVIsRUFBTCxDQVpLLEVBYUwsaUJBQUssRUFBRSxNQUFNLGlEQUFSLEVBQUwsQ0FiSyxFQWNMLGlCQUFLLEVBQUUsTUFBTSx3REFBUixFQUFMLENBZEssRUFlTCxpQkFBSyxFQUFFLE1BQU0sc0NBQVIsRUFBTCxDQWZLLEVBZ0JMLGlCQUFLLEVBQUUsTUFBTSwrQ0FBUixFQUFMLENBaEJLLEVBaUJMLGlCQUFLLEVBQUUsTUFBTSwwQ0FBUixFQUFMLENBakJLLEVBa0JMLGlCQUFLLEVBQUUsTUFBTSxpREFBUixFQUFMLENBbEJLLEVBbUJMLGlCQUFLO0FBQ0gsWUFBUSxjQURMO0FBRUgsVUFBTTtBQUZILEdBQUwsQ0FuQkssQ0FEa0M7QUF5QnpDLFdBQVMsQ0FDUCxpQkFBSztBQUNILFVBQU0sc0JBREg7QUFFSCxZQUFRLENBQUMsMkRBQUQ7QUFGTCxHQUFMLENBRE8sRUFLUCxpQkFBSztBQUNILFVBQU0sc0JBREg7QUFFSCxZQUFRLENBQUMsMkRBQUQ7QUFGTCxHQUFMLENBTE8sRUFTUCxpQkFBSztBQUNILFVBQU0saUNBREg7QUFFSCxZQUFRLENBQUMsMkRBQUQ7QUFGTCxHQUFMLENBVE8sRUFhUCxpQkFBSztBQUNILFVBQU0saUNBREg7QUFFSCxZQUFRLENBQUMsMkRBQUQ7QUFGTCxHQUFMLENBYk8sRUFpQlAsaUJBQUs7QUFDSCxVQUFNLDRDQURIO0FBRUgsWUFBUSxDQUFDLDJEQUFEO0FBRkwsR0FBTCxDQWpCTyxFQXFCUCxpQkFBSztBQUNILFVBQU0sNENBREg7QUFFSCxZQUFRLENBQUMsMkRBQUQ7QUFGTCxHQUFMLENBckJPLEVBeUJQLGlCQUFLO0FBQ0gsVUFBTSxxQ0FESDtBQUVILFlBQVEsQ0FBQywyREFBRDtBQUZMLEdBQUwsQ0F6Qk8sRUE2QlAsaUJBQUs7QUFDSCxVQUFNLHFDQURIO0FBRUgsWUFBUSxDQUFDLDJEQUFEO0FBRkwsR0FBTCxDQTdCTztBQXpCZ0MsQ0FBM0MiLCJmaWxlIjoicnVsZXMvbm8tbXV0YWJsZS1leHBvcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0ZXN0fSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UnVsZVRlc3Rlcn0gZnJvbSAnZXNsaW50J1xuaW1wb3J0IHJ1bGUgZnJvbSAncnVsZXMvbm8tbXV0YWJsZS1leHBvcnRzJ1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tbXV0YWJsZS1leHBvcnRzJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGNvbnN0IGNvdW50ID0gMSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCBmdW5jdGlvbiBnZXRDb3VudCgpIHt9J30pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGNsYXNzIENvdW50ZXIge30nfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgZGVmYXVsdCBjb3VudCA9IDEnfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb3VudCgpIHt9J30pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciB7fSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2NvbnN0IGNvdW50ID0gMVxcbmV4cG9ydCB7IGNvdW50IH0nfSksXG4gICAgdGVzdCh7IGNvZGU6ICdjb25zdCBjb3VudCA9IDFcXG5leHBvcnQgeyBjb3VudCBhcyBjb3VudGVyIH0nfSksXG4gICAgdGVzdCh7IGNvZGU6ICdjb25zdCBjb3VudCA9IDFcXG5leHBvcnQgZGVmYXVsdCBjb3VudCd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2NvbnN0IGNvdW50ID0gMVxcbmV4cG9ydCB7IGNvdW50IGFzIGRlZmF1bHQgfSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2Z1bmN0aW9uIGdldENvdW50KCkge31cXG5leHBvcnQgeyBnZXRDb3VudCB9J30pLFxuICAgIHRlc3QoeyBjb2RlOiAnZnVuY3Rpb24gZ2V0Q291bnQoKSB7fVxcbmV4cG9ydCB7IGdldENvdW50IGFzIGdldENvdW50ZXIgfSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2Z1bmN0aW9uIGdldENvdW50KCkge31cXG5leHBvcnQgZGVmYXVsdCBnZXRDb3VudCd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2Z1bmN0aW9uIGdldENvdW50KCkge31cXG5leHBvcnQgeyBnZXRDb3VudCBhcyBkZWZhdWx0IH0nfSksXG4gICAgdGVzdCh7IGNvZGU6ICdjbGFzcyBDb3VudGVyIHt9XFxuZXhwb3J0IHsgQ291bnRlciB9J30pLFxuICAgIHRlc3QoeyBjb2RlOiAnY2xhc3MgQ291bnRlciB7fVxcbmV4cG9ydCB7IENvdW50ZXIgYXMgQ291bnQgfSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2NsYXNzIENvdW50ZXIge31cXG5leHBvcnQgZGVmYXVsdCBDb3VudGVyJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAnY2xhc3MgQ291bnRlciB7fVxcbmV4cG9ydCB7IENvdW50ZXIgYXMgZGVmYXVsdCB9J30pLFxuICAgIHRlc3Qoe1xuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGNvZGU6ICdleHBvcnQgU29tZXRoaW5nIGZyb20gXCIuL3NvbWV0aGluZ1wiOycsXG4gICAgfSksXG4gIF0sXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdleHBvcnQgbGV0IGNvdW50ID0gMScsXG4gICAgICBlcnJvcnM6IFsnRXhwb3J0aW5nIG11dGFibGUgXFwnbGV0XFwnIGJpbmRpbmcsIHVzZSBcXCdjb25zdFxcJyBpbnN0ZWFkLiddLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB2YXIgY291bnQgPSAxJyxcbiAgICAgIGVycm9yczogWydFeHBvcnRpbmcgbXV0YWJsZSBcXCd2YXJcXCcgYmluZGluZywgdXNlIFxcJ2NvbnN0XFwnIGluc3RlYWQuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnbGV0IGNvdW50ID0gMVxcbmV4cG9ydCB7IGNvdW50IH0nLFxuICAgICAgZXJyb3JzOiBbJ0V4cG9ydGluZyBtdXRhYmxlIFxcJ2xldFxcJyBiaW5kaW5nLCB1c2UgXFwnY29uc3RcXCcgaW5zdGVhZC4nXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICd2YXIgY291bnQgPSAxXFxuZXhwb3J0IHsgY291bnQgfScsXG4gICAgICBlcnJvcnM6IFsnRXhwb3J0aW5nIG11dGFibGUgXFwndmFyXFwnIGJpbmRpbmcsIHVzZSBcXCdjb25zdFxcJyBpbnN0ZWFkLiddLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2xldCBjb3VudCA9IDFcXG5leHBvcnQgeyBjb3VudCBhcyBjb3VudGVyIH0nLFxuICAgICAgZXJyb3JzOiBbJ0V4cG9ydGluZyBtdXRhYmxlIFxcJ2xldFxcJyBiaW5kaW5nLCB1c2UgXFwnY29uc3RcXCcgaW5zdGVhZC4nXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICd2YXIgY291bnQgPSAxXFxuZXhwb3J0IHsgY291bnQgYXMgY291bnRlciB9JyxcbiAgICAgIGVycm9yczogWydFeHBvcnRpbmcgbXV0YWJsZSBcXCd2YXJcXCcgYmluZGluZywgdXNlIFxcJ2NvbnN0XFwnIGluc3RlYWQuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnbGV0IGNvdW50ID0gMVxcbmV4cG9ydCBkZWZhdWx0IGNvdW50JyxcbiAgICAgIGVycm9yczogWydFeHBvcnRpbmcgbXV0YWJsZSBcXCdsZXRcXCcgYmluZGluZywgdXNlIFxcJ2NvbnN0XFwnIGluc3RlYWQuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAndmFyIGNvdW50ID0gMVxcbmV4cG9ydCBkZWZhdWx0IGNvdW50JyxcbiAgICAgIGVycm9yczogWydFeHBvcnRpbmcgbXV0YWJsZSBcXCd2YXJcXCcgYmluZGluZywgdXNlIFxcJ2NvbnN0XFwnIGluc3RlYWQuJ10sXG4gICAgfSksXG4gIF0sXG59KVxuIl19