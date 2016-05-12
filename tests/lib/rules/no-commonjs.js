'use strict';

var _eslint = require('eslint');

var EXPORT_MESSAGE = 'Expected "export" or "export default"',
    IMPORT_MESSAGE = 'Expected "import" instead of "require()"';

var ruleTester = new _eslint.RuleTester();

ruleTester.run('no-commonjs', require('rules/no-commonjs'), {
  valid: [

  // imports
  { code: 'import "x";', parserOptions: { sourceType: 'module' } }, { code: 'import x from "x"', parserOptions: { sourceType: 'module' } }, { code: 'import x from "x"', parserOptions: { sourceType: 'module' } }, { code: 'import { x } from "x"', parserOptions: { sourceType: 'module' } },

  // exports
  { code: 'export default "x"', parserOptions: { sourceType: 'module' } }, { code: 'export function house() {}', parserOptions: { sourceType: 'module' } },

  // allowed requires
  { code: 'function a() { var x = require("y"); }' }, // nested requires allowed
  { code: 'require.resolve("help")' }, // methods of require are allowed
  { code: 'require.ensure([])' }, // webpack specific require.ensure is allowed
  { code: 'require([], function(a, b, c) {})' }, // AMD require is allowed
  { code: "var bar = require('./bar', true);" }, { code: "var bar = proxyquire('./bar');" }, { code: "var bar = require('./ba' + 'r');" }, { code: 'var zero = require(0);' }, { code: 'module.exports = function () {}', options: ['allow-primitive-modules'] }, { code: 'module.exports = "foo"', options: ['allow-primitive-modules'] }],

  invalid: [

  // imports
  { code: 'var x = require("x")', errors: [{ message: IMPORT_MESSAGE }] }, { code: 'require("x")', errors: [{ message: IMPORT_MESSAGE }] },

  // exports
  { code: 'exports.face = "palm"', errors: [{ message: EXPORT_MESSAGE }] }, { code: 'module.exports.face = "palm"', errors: [{ message: EXPORT_MESSAGE }] }, { code: 'module.exports = face', errors: [{ message: EXPORT_MESSAGE }] }, { code: 'exports = module.exports = {}', errors: [{ message: EXPORT_MESSAGE }] }, { code: 'var x = module.exports = {}', errors: [{ message: EXPORT_MESSAGE }] }, { code: 'module.exports = {}',
    options: ['allow-primitive-modules'],
    errors: [{ message: EXPORT_MESSAGE }]
  }, { code: 'var x = module.exports',
    options: ['allow-primitive-modules'],
    errors: [{ message: EXPORT_MESSAGE }]
  }]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWNvbW1vbmpzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTSxpQkFBaUIsdUNBQXZCO0lBQ00saUJBQWlCLDBDQUR2Qjs7QUFHQSxJQUFNLGFBQWEsd0JBQW5COztBQUVBLFdBQVcsR0FBWCxDQUFlLGFBQWYsRUFBOEIsUUFBUSxtQkFBUixDQUE5QixFQUE0RDtBQUMxRCxTQUFPOzs7QUFHTCxJQUFFLE1BQU0sYUFBUixFQUF1QixlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQXRDLEVBSEssRUFJTCxFQUFFLE1BQU0sbUJBQVIsRUFBNkIsZUFBZSxFQUFFLFlBQVksUUFBZCxFQUE1QyxFQUpLLEVBS0wsRUFBRSxNQUFNLG1CQUFSLEVBQTZCLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBNUMsRUFMSyxFQU1MLEVBQUUsTUFBTSx1QkFBUixFQUFpQyxlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQWhELEVBTks7OztBQVNMLElBQUUsTUFBTSxvQkFBUixFQUE4QixlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQTdDLEVBVEssRUFVTCxFQUFFLE1BQU0sNEJBQVIsRUFBc0MsZUFBZSxFQUFFLFlBQVksUUFBZCxFQUFyRCxFQVZLOzs7QUFhTCxJQUFFLE1BQU0sd0NBQVIsRUFiSyxFO0FBY0wsSUFBRSxNQUFNLHlCQUFSLEVBZEssRTtBQWVMLElBQUUsTUFBTSxvQkFBUixFQWZLLEU7QUFnQkwsSUFBRSxNQUFNLG1DQUFSLEVBaEJLLEU7QUFpQkwsSUFBRSxNQUFNLG1DQUFSLEVBakJLLEVBa0JMLEVBQUUsTUFBTSxnQ0FBUixFQWxCSyxFQW1CTCxFQUFFLE1BQU0sa0NBQVIsRUFuQkssRUFvQkwsRUFBRSxNQUFNLHdCQUFSLEVBcEJLLEVBc0JMLEVBQUUsTUFBTSxpQ0FBUixFQUEyQyxTQUFTLENBQUMseUJBQUQsQ0FBcEQsRUF0QkssRUF1QkwsRUFBRSxNQUFNLHdCQUFSLEVBQWtDLFNBQVMsQ0FBQyx5QkFBRCxDQUEzQyxFQXZCSyxDQURtRDs7QUEyQjFELFdBQVM7OztBQUdQLElBQUUsTUFBTSxzQkFBUixFQUFnQyxRQUFRLENBQUUsRUFBRSxTQUFTLGNBQVgsRUFBRixDQUF4QyxFQUhPLEVBSVAsRUFBRSxNQUFNLGNBQVIsRUFBd0IsUUFBUSxDQUFFLEVBQUUsU0FBUyxjQUFYLEVBQUYsQ0FBaEMsRUFKTzs7O0FBT1AsSUFBRSxNQUFNLHVCQUFSLEVBQWlDLFFBQVEsQ0FBRSxFQUFFLFNBQVMsY0FBWCxFQUFGLENBQXpDLEVBUE8sRUFRUCxFQUFFLE1BQU0sOEJBQVIsRUFBd0MsUUFBUSxDQUFFLEVBQUUsU0FBUyxjQUFYLEVBQUYsQ0FBaEQsRUFSTyxFQVNQLEVBQUUsTUFBTSx1QkFBUixFQUFpQyxRQUFRLENBQUUsRUFBRSxTQUFTLGNBQVgsRUFBRixDQUF6QyxFQVRPLEVBVVAsRUFBRSxNQUFNLCtCQUFSLEVBQXlDLFFBQVEsQ0FBRSxFQUFFLFNBQVMsY0FBWCxFQUFGLENBQWpELEVBVk8sRUFXUCxFQUFFLE1BQU0sNkJBQVIsRUFBdUMsUUFBUSxDQUFFLEVBQUUsU0FBUyxjQUFYLEVBQUYsQ0FBL0MsRUFYTyxFQVlQLEVBQUUsTUFBTSxxQkFBUjtBQUNFLGFBQVMsQ0FBQyx5QkFBRCxDQURYO0FBRUUsWUFBUSxDQUFFLEVBQUUsU0FBUyxjQUFYLEVBQUY7QUFGVixHQVpPLEVBZ0JQLEVBQUUsTUFBTSx3QkFBUjtBQUNFLGFBQVMsQ0FBQyx5QkFBRCxDQURYO0FBRUUsWUFBUSxDQUFFLEVBQUUsU0FBUyxjQUFYLEVBQUY7QUFGVixHQWhCTztBQTNCaUQsQ0FBNUQiLCJmaWxlIjoicnVsZXMvbm8tY29tbW9uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBFWFBPUlRfTUVTU0FHRSA9ICdFeHBlY3RlZCBcImV4cG9ydFwiIG9yIFwiZXhwb3J0IGRlZmF1bHRcIidcbiAgICAsIElNUE9SVF9NRVNTQUdFID0gJ0V4cGVjdGVkIFwiaW1wb3J0XCIgaW5zdGVhZCBvZiBcInJlcXVpcmUoKVwiJ1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tY29tbW9uanMnLCByZXF1aXJlKCdydWxlcy9uby1jb21tb25qcycpLCB7XG4gIHZhbGlkOiBbXG5cbiAgICAvLyBpbXBvcnRzXG4gICAgeyBjb2RlOiAnaW1wb3J0IFwieFwiOycsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSB9LFxuICAgIHsgY29kZTogJ2ltcG9ydCB4IGZyb20gXCJ4XCInLCBwYXJzZXJPcHRpb25zOiB7IHNvdXJjZVR5cGU6ICdtb2R1bGUnIH0gfSxcbiAgICB7IGNvZGU6ICdpbXBvcnQgeCBmcm9tIFwieFwiJywgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9IH0sXG4gICAgeyBjb2RlOiAnaW1wb3J0IHsgeCB9IGZyb20gXCJ4XCInLCBwYXJzZXJPcHRpb25zOiB7IHNvdXJjZVR5cGU6ICdtb2R1bGUnIH0gfSxcblxuICAgIC8vIGV4cG9ydHNcbiAgICB7IGNvZGU6ICdleHBvcnQgZGVmYXVsdCBcInhcIicsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSB9LFxuICAgIHsgY29kZTogJ2V4cG9ydCBmdW5jdGlvbiBob3VzZSgpIHt9JywgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9IH0sXG5cbiAgICAvLyBhbGxvd2VkIHJlcXVpcmVzXG4gICAgeyBjb2RlOiAnZnVuY3Rpb24gYSgpIHsgdmFyIHggPSByZXF1aXJlKFwieVwiKTsgfScgfSwgLy8gbmVzdGVkIHJlcXVpcmVzIGFsbG93ZWRcbiAgICB7IGNvZGU6ICdyZXF1aXJlLnJlc29sdmUoXCJoZWxwXCIpJyB9LCAvLyBtZXRob2RzIG9mIHJlcXVpcmUgYXJlIGFsbG93ZWRcbiAgICB7IGNvZGU6ICdyZXF1aXJlLmVuc3VyZShbXSknIH0sIC8vIHdlYnBhY2sgc3BlY2lmaWMgcmVxdWlyZS5lbnN1cmUgaXMgYWxsb3dlZFxuICAgIHsgY29kZTogJ3JlcXVpcmUoW10sIGZ1bmN0aW9uKGEsIGIsIGMpIHt9KScgfSwgLy8gQU1EIHJlcXVpcmUgaXMgYWxsb3dlZFxuICAgIHsgY29kZTogXCJ2YXIgYmFyID0gcmVxdWlyZSgnLi9iYXInLCB0cnVlKTtcIiB9LFxuICAgIHsgY29kZTogXCJ2YXIgYmFyID0gcHJveHlxdWlyZSgnLi9iYXInKTtcIiB9LFxuICAgIHsgY29kZTogXCJ2YXIgYmFyID0gcmVxdWlyZSgnLi9iYScgKyAncicpO1wiIH0sXG4gICAgeyBjb2RlOiAndmFyIHplcm8gPSByZXF1aXJlKDApOycgfSxcblxuICAgIHsgY29kZTogJ21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge30nLCBvcHRpb25zOiBbJ2FsbG93LXByaW1pdGl2ZS1tb2R1bGVzJ10gfSxcbiAgICB7IGNvZGU6ICdtb2R1bGUuZXhwb3J0cyA9IFwiZm9vXCInLCBvcHRpb25zOiBbJ2FsbG93LXByaW1pdGl2ZS1tb2R1bGVzJ10gfSxcbiAgXSxcblxuICBpbnZhbGlkOiBbXG5cbiAgICAvLyBpbXBvcnRzXG4gICAgeyBjb2RlOiAndmFyIHggPSByZXF1aXJlKFwieFwiKScsIGVycm9yczogWyB7IG1lc3NhZ2U6IElNUE9SVF9NRVNTQUdFIH1dIH0sXG4gICAgeyBjb2RlOiAncmVxdWlyZShcInhcIiknLCBlcnJvcnM6IFsgeyBtZXNzYWdlOiBJTVBPUlRfTUVTU0FHRSB9XSB9LFxuXG4gICAgLy8gZXhwb3J0c1xuICAgIHsgY29kZTogJ2V4cG9ydHMuZmFjZSA9IFwicGFsbVwiJywgZXJyb3JzOiBbIHsgbWVzc2FnZTogRVhQT1JUX01FU1NBR0UgfV0gfSxcbiAgICB7IGNvZGU6ICdtb2R1bGUuZXhwb3J0cy5mYWNlID0gXCJwYWxtXCInLCBlcnJvcnM6IFsgeyBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9XSB9LFxuICAgIHsgY29kZTogJ21vZHVsZS5leHBvcnRzID0gZmFjZScsIGVycm9yczogWyB7IG1lc3NhZ2U6IEVYUE9SVF9NRVNTQUdFIH1dIH0sXG4gICAgeyBjb2RlOiAnZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge30nLCBlcnJvcnM6IFsgeyBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9XSB9LFxuICAgIHsgY29kZTogJ3ZhciB4ID0gbW9kdWxlLmV4cG9ydHMgPSB7fScsIGVycm9yczogWyB7IG1lc3NhZ2U6IEVYUE9SVF9NRVNTQUdFIH1dIH0sXG4gICAgeyBjb2RlOiAnbW9kdWxlLmV4cG9ydHMgPSB7fScsXG4gICAgICBvcHRpb25zOiBbJ2FsbG93LXByaW1pdGl2ZS1tb2R1bGVzJ10sXG4gICAgICBlcnJvcnM6IFsgeyBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9XSxcbiAgICB9LFxuICAgIHsgY29kZTogJ3ZhciB4ID0gbW9kdWxlLmV4cG9ydHMnLFxuICAgICAgb3B0aW9uczogWydhbGxvdy1wcmltaXRpdmUtbW9kdWxlcyddLFxuICAgICAgZXJyb3JzOiBbIHsgbWVzc2FnZTogRVhQT1JUX01FU1NBR0UgfV0sXG4gICAgfSxcbiAgXSxcbn0pXG4iXX0=