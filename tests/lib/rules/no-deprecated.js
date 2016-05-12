'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-deprecated');

ruleTester.run('no-deprecated', rule, {
  valid: [(0, _utils.test)({ code: "import { x } from './fake' " }), (0, _utils.test)({ code: "import bar from './bar'" }), (0, _utils.test)({ code: "import { fine } from './deprecated'" }), (0, _utils.test)({ code: "import { _undocumented } from './deprecated'" }),

  // naked namespace is fine
  (0, _utils.test)({ code: "import * as depd from './deprecated'" }), (0, _utils.test)({ code: "import * as depd from './deprecated'; console.log(depd.fine())" }), (0, _utils.test)({ code: "import { deepDep } from './deep-deprecated'" }), (0, _utils.test)({ code: "import { deepDep } from './deep-deprecated'; console.log(deepDep.fine())" }),

  // redefined
  (0, _utils.test)({
    code: "import { deepDep } from './deep-deprecated'; function x(deepDep) { console.log(deepDep.MY_TERRIBLE_ACTION) }"
  })],
  invalid: [

  // reports on parse errors even without specifiers
  (0, _utils.test)({ code: "import './malformed.js'", errors: 1 }), (0, _utils.test)({
    code: "import { fn } from './deprecated'",
    errors: ["Deprecated: please use 'x' instead."]
  }), (0, _utils.test)({
    code: "import TerribleClass from './deprecated'",
    errors: ['Deprecated: this is awful, use NotAsBadClass.']
  }), (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'",
    errors: ['Deprecated: please stop sending/handling this action type.']
  }),

  // ignore redeclares
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'; function shadow(MY_TERRIBLE_ACTION) { console.log(MY_TERRIBLE_ACTION); }",
    errors: ['Deprecated: please stop sending/handling this action type.']
  }),

  // ignore non-deprecateds
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION, fine } from './deprecated'; console.log(fine)",
    errors: ['Deprecated: please stop sending/handling this action type.']
  }),

  // reflag on subsequent usages
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'; console.log(MY_TERRIBLE_ACTION)",
    errors: [{ type: 'ImportSpecifier', message: 'Deprecated: please stop sending/handling this action type.' }, { type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }),

  // don't flag other members
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'; console.log(someOther.MY_TERRIBLE_ACTION)",
    errors: [{ type: 'ImportSpecifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }),

  // flag it even with members
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'; console.log(MY_TERRIBLE_ACTION.whatever())",
    errors: [{ type: 'ImportSpecifier', message: 'Deprecated: please stop sending/handling this action type.' }, { type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }),

  // works for function calls too
  (0, _utils.test)({
    code: "import { MY_TERRIBLE_ACTION } from './deprecated'; console.log(MY_TERRIBLE_ACTION(this, is, the, worst))",
    errors: [{ type: 'ImportSpecifier', message: 'Deprecated: please stop sending/handling this action type.' }, { type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }),

  // deprecated full module
  (0, _utils.test)({
    code: "import Thing from './deprecated-file'",
    errors: [{ type: 'ImportDeclaration', message: 'Deprecated: this module is the worst.' }]
  }),

  // don't flag as part of other member expressions
  (0, _utils.test)({
    code: "import Thing from './deprecated-file'; console.log(other.Thing)",
    errors: [{ type: 'ImportDeclaration', message: 'Deprecated: this module is the worst.' }]
  }),

  // namespace following
  (0, _utils.test)({
    code: "import * as depd from './deprecated'; console.log(depd.MY_TERRIBLE_ACTION)",
    errors: [{ type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }), (0, _utils.test)({
    code: "import * as deep from './deep-deprecated'; console.log(deep.deepDep.MY_TERRIBLE_ACTION)",
    errors: [{ type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }), (0, _utils.test)({
    code: "import { deepDep } from './deep-deprecated'; console.log(deepDep.MY_TERRIBLE_ACTION)",
    errors: [{ type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  }), (0, _utils.test)({
    code: "import { deepDep } from './deep-deprecated'; function x(deepNDep) { console.log(deepDep.MY_TERRIBLE_ACTION) }",
    errors: [{ type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  })]
});

ruleTester.run('no-deprecated: hoisting', rule, {
  valid: [(0, _utils.test)({
    code: "function x(deepDep) { console.log(deepDep.MY_TERRIBLE_ACTION) } import { deepDep } from './deep-deprecated'"
  })],

  invalid: [(0, _utils.test)({
    code: "console.log(MY_TERRIBLE_ACTION); import { MY_TERRIBLE_ACTION } from './deprecated'",
    errors: [{ type: 'Identifier', message: 'Deprecated: please stop sending/handling this action type.' }, { type: 'ImportSpecifier', message: 'Deprecated: please stop sending/handling this action type.' }]
  })]
});
//# sourceMappingURL=data:application/json;base64,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QUFNLFlBQVIsRUFBc0IsU0FBUyw0REFBL0IsRUFETTtBQUZMLEdBQUwsQ0ExRk8sRUFnR1AsaUJBQUs7QUFDSCxVQUFNLHNGQURIO0FBRUgsWUFBUSxDQUNOLEVBQUUsTUFBTSxZQUFSLEVBQXNCLFNBQVMsNERBQS9CLEVBRE07QUFGTCxHQUFMLENBaEdPLEVBc0dQLGlCQUFLO0FBQ0gsVUFBTSwrR0FESDtBQUVILFlBQVEsQ0FDTixFQUFFLE1BQU0sWUFBUixFQUFzQixTQUFTLDREQUEvQixFQURNO0FBRkwsR0FBTCxDQXRHTztBQW5CMkIsQ0FBdEM7O0FBa0lBLFdBQVcsR0FBWCxDQUFlLHlCQUFmLEVBQTBDLElBQTFDLEVBQWdEO0FBQzlDLFNBQU8sQ0FFTCxpQkFBSztBQUNILFVBQU07QUFESCxHQUFMLENBRkssQ0FEdUM7O0FBUzlDLFdBQVMsQ0FFUCxpQkFBSztBQUNILFVBQU0sb0ZBREg7QUFFSCxZQUFRLENBQ04sRUFBRSxNQUFNLFlBQVIsRUFBc0IsU0FBUyw0REFBL0IsRUFETSxFQUVOLEVBQUUsTUFBTSxpQkFBUixFQUEyQixTQUFTLDREQUFwQyxFQUZNO0FBRkwsR0FBTCxDQUZPO0FBVHFDLENBQWhEIiwiZmlsZSI6InJ1bGVzL25vLWRlcHJlY2F0ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbmNvbnN0IHJ1bGVUZXN0ZXIgPSBuZXcgUnVsZVRlc3RlcigpXG4gICAgLCBydWxlID0gcmVxdWlyZSgncnVsZXMvbm8tZGVwcmVjYXRlZCcpXG5cbnJ1bGVUZXN0ZXIucnVuKCduby1kZXByZWNhdGVkJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICcuL2Zha2UnIFwiIH0pLFxuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCBiYXIgZnJvbSAnLi9iYXInXCIgfSksXG5cbiAgICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgeyBmaW5lIH0gZnJvbSAnLi9kZXByZWNhdGVkJ1wiIH0pLFxuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IF91bmRvY3VtZW50ZWQgfSBmcm9tICcuL2RlcHJlY2F0ZWQnXCIgfSksXG5cbiAgICAvLyBuYWtlZCBuYW1lc3BhY2UgaXMgZmluZVxuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCAqIGFzIGRlcGQgZnJvbSAnLi9kZXByZWNhdGVkJ1wiIH0pLFxuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCAqIGFzIGRlcGQgZnJvbSAnLi9kZXByZWNhdGVkJzsgY29uc29sZS5sb2coZGVwZC5maW5lKCkpXCIgfSksXG4gICAgdGVzdCh7IGNvZGU6IFwiaW1wb3J0IHsgZGVlcERlcCB9IGZyb20gJy4vZGVlcC1kZXByZWNhdGVkJ1wiIH0pLFxuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IGRlZXBEZXAgfSBmcm9tICcuL2RlZXAtZGVwcmVjYXRlZCc7IGNvbnNvbGUubG9nKGRlZXBEZXAuZmluZSgpKVwiIH0pLFxuXG4gICAgLy8gcmVkZWZpbmVkXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IGRlZXBEZXAgfSBmcm9tICcuL2RlZXAtZGVwcmVjYXRlZCc7IGZ1bmN0aW9uIHgoZGVlcERlcCkgeyBjb25zb2xlLmxvZyhkZWVwRGVwLk1ZX1RFUlJJQkxFX0FDVElPTikgfVwiLFxuICAgIH0pLFxuICBdLFxuICBpbnZhbGlkOiBbXG5cbiAgICAvLyByZXBvcnRzIG9uIHBhcnNlIGVycm9ycyBldmVuIHdpdGhvdXQgc3BlY2lmaWVyc1xuICAgIHRlc3QoeyBjb2RlOiBcImltcG9ydCAnLi9tYWxmb3JtZWQuanMnXCIsIGVycm9yczogMSB9KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJpbXBvcnQgeyBmbiB9IGZyb20gJy4vZGVwcmVjYXRlZCdcIixcbiAgICAgIGVycm9yczogW1wiRGVwcmVjYXRlZDogcGxlYXNlIHVzZSAneCcgaW5zdGVhZC5cIl0sXG4gICAgfSksXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IFRlcnJpYmxlQ2xhc3MgZnJvbSAnLi9kZXByZWNhdGVkJ1wiLFxuICAgICAgZXJyb3JzOiBbJ0RlcHJlY2F0ZWQ6IHRoaXMgaXMgYXdmdWwsIHVzZSBOb3RBc0JhZENsYXNzLiddLFxuICAgIH0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IE1ZX1RFUlJJQkxFX0FDVElPTiB9IGZyb20gJy4vZGVwcmVjYXRlZCdcIixcbiAgICAgIGVycm9yczogWydEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJ10sXG4gICAgfSksXG5cbiAgICAvLyBpZ25vcmUgcmVkZWNsYXJlc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJpbXBvcnQgeyBNWV9URVJSSUJMRV9BQ1RJT04gfSBmcm9tICcuL2RlcHJlY2F0ZWQnOyBmdW5jdGlvbiBzaGFkb3coTVlfVEVSUklCTEVfQUNUSU9OKSB7IGNvbnNvbGUubG9nKE1ZX1RFUlJJQkxFX0FDVElPTik7IH1cIixcbiAgICAgIGVycm9yczogWydEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJ10sXG4gICAgfSksXG5cbiAgICAvLyBpZ25vcmUgbm9uLWRlcHJlY2F0ZWRzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IE1ZX1RFUlJJQkxFX0FDVElPTiwgZmluZSB9IGZyb20gJy4vZGVwcmVjYXRlZCc7IGNvbnNvbGUubG9nKGZpbmUpXCIsXG4gICAgICBlcnJvcnM6IFsnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLiddLFxuICAgIH0pLFxuXG4gICAgLy8gcmVmbGFnIG9uIHN1YnNlcXVlbnQgdXNhZ2VzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IE1ZX1RFUlJJQkxFX0FDVElPTiB9IGZyb20gJy4vZGVwcmVjYXRlZCc7IGNvbnNvbGUubG9nKE1ZX1RFUlJJQkxFX0FDVElPTilcIixcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7IHR5cGU6ICdJbXBvcnRTcGVjaWZpZXInLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLicgfSxcbiAgICAgICAgeyB0eXBlOiAnSWRlbnRpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGRvbid0IGZsYWcgb3RoZXIgbWVtYmVyc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJpbXBvcnQgeyBNWV9URVJSSUJMRV9BQ1RJT04gfSBmcm9tICcuL2RlcHJlY2F0ZWQnOyBjb25zb2xlLmxvZyhzb21lT3RoZXIuTVlfVEVSUklCTEVfQUNUSU9OKVwiLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHsgdHlwZTogJ0ltcG9ydFNwZWNpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGZsYWcgaXQgZXZlbiB3aXRoIG1lbWJlcnNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgTVlfVEVSUklCTEVfQUNUSU9OIH0gZnJvbSAnLi9kZXByZWNhdGVkJzsgY29uc29sZS5sb2coTVlfVEVSUklCTEVfQUNUSU9OLndoYXRldmVyKCkpXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSW1wb3J0U3BlY2lmaWVyJywgbWVzc2FnZTogJ0RlcHJlY2F0ZWQ6IHBsZWFzZSBzdG9wIHNlbmRpbmcvaGFuZGxpbmcgdGhpcyBhY3Rpb24gdHlwZS4nIH0sXG4gICAgICAgIHsgdHlwZTogJ0lkZW50aWZpZXInLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLicgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyB3b3JrcyBmb3IgZnVuY3Rpb24gY2FsbHMgdG9vXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IE1ZX1RFUlJJQkxFX0FDVElPTiB9IGZyb20gJy4vZGVwcmVjYXRlZCc7IGNvbnNvbGUubG9nKE1ZX1RFUlJJQkxFX0FDVElPTih0aGlzLCBpcywgdGhlLCB3b3JzdCkpXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSW1wb3J0U3BlY2lmaWVyJywgbWVzc2FnZTogJ0RlcHJlY2F0ZWQ6IHBsZWFzZSBzdG9wIHNlbmRpbmcvaGFuZGxpbmcgdGhpcyBhY3Rpb24gdHlwZS4nIH0sXG4gICAgICAgIHsgdHlwZTogJ0lkZW50aWZpZXInLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLicgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBkZXByZWNhdGVkIGZ1bGwgbW9kdWxlXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCBUaGluZyBmcm9tICcuL2RlcHJlY2F0ZWQtZmlsZSdcIixcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7IHR5cGU6ICdJbXBvcnREZWNsYXJhdGlvbicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiB0aGlzIG1vZHVsZSBpcyB0aGUgd29yc3QuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGRvbid0IGZsYWcgYXMgcGFydCBvZiBvdGhlciBtZW1iZXIgZXhwcmVzc2lvbnNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IFRoaW5nIGZyb20gJy4vZGVwcmVjYXRlZC1maWxlJzsgY29uc29sZS5sb2cob3RoZXIuVGhpbmcpXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSW1wb3J0RGVjbGFyYXRpb24nLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogdGhpcyBtb2R1bGUgaXMgdGhlIHdvcnN0LicgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBuYW1lc3BhY2UgZm9sbG93aW5nXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCAqIGFzIGRlcGQgZnJvbSAnLi9kZXByZWNhdGVkJzsgY29uc29sZS5sb2coZGVwZC5NWV9URVJSSUJMRV9BQ1RJT04pXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSWRlbnRpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0ICogYXMgZGVlcCBmcm9tICcuL2RlZXAtZGVwcmVjYXRlZCc7IGNvbnNvbGUubG9nKGRlZXAuZGVlcERlcC5NWV9URVJSSUJMRV9BQ1RJT04pXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSWRlbnRpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgZGVlcERlcCB9IGZyb20gJy4vZGVlcC1kZXByZWNhdGVkJzsgY29uc29sZS5sb2coZGVlcERlcC5NWV9URVJSSUJMRV9BQ1RJT04pXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSWRlbnRpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgZGVlcERlcCB9IGZyb20gJy4vZGVlcC1kZXByZWNhdGVkJzsgZnVuY3Rpb24geChkZWVwTkRlcCkgeyBjb25zb2xlLmxvZyhkZWVwRGVwLk1ZX1RFUlJJQkxFX0FDVElPTikgfVwiLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHsgdHlwZTogJ0lkZW50aWZpZXInLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLicgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG59KVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tZGVwcmVjYXRlZDogaG9pc3RpbmcnLCBydWxlLCB7XG4gIHZhbGlkOiBbXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiZnVuY3Rpb24geChkZWVwRGVwKSB7IGNvbnNvbGUubG9nKGRlZXBEZXAuTVlfVEVSUklCTEVfQUNUSU9OKSB9IGltcG9ydCB7IGRlZXBEZXAgfSBmcm9tICcuL2RlZXAtZGVwcmVjYXRlZCdcIixcbiAgICB9KSxcblxuICBdLFxuXG4gIGludmFsaWQ6IFtcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJjb25zb2xlLmxvZyhNWV9URVJSSUJMRV9BQ1RJT04pOyBpbXBvcnQgeyBNWV9URVJSSUJMRV9BQ1RJT04gfSBmcm9tICcuL2RlcHJlY2F0ZWQnXCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgeyB0eXBlOiAnSWRlbnRpZmllcicsIG1lc3NhZ2U6ICdEZXByZWNhdGVkOiBwbGVhc2Ugc3RvcCBzZW5kaW5nL2hhbmRsaW5nIHRoaXMgYWN0aW9uIHR5cGUuJyB9LFxuICAgICAgICB7IHR5cGU6ICdJbXBvcnRTcGVjaWZpZXInLCBtZXNzYWdlOiAnRGVwcmVjYXRlZDogcGxlYXNlIHN0b3Agc2VuZGluZy9oYW5kbGluZyB0aGlzIGFjdGlvbiB0eXBlLicgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgXSxcbn0pXG4iXX0=