'use strict';

exports.__esModule = true;
exports.SYNTAX_CASES = exports.FILENAME = undefined;
exports.testFilePath = testFilePath;
exports.test = test;
exports.testContext = testContext;
exports.getFilename = getFilename;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

require('babel-eslint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testFilePath(relativePath) {
  return _path2.default.join(process.cwd(), './tests/files', relativePath);
}

// warms up the module cache. this import takes a while (>500ms)


var FILENAME = exports.FILENAME = testFilePath('foo.js');

function test(t) {
  return (0, _objectAssign2.default)({
    filename: FILENAME,
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6
    }
  }, t);
}

function testContext(settings) {
  return { getFilename: function getFilename() {
      return FILENAME;
    },
    settings: settings || {} };
}

function getFilename(file) {
  return _path2.default.join(__dirname, '..', 'files', file || 'foo.js');
}

/**
 * to be added as valid cases just to ensure no nullable fields are going
 * to crash at runtinme
 * @type {Array}
 */
var SYNTAX_CASES = exports.SYNTAX_CASES = [test({ code: 'for (let { foo, bar } of baz) {}' }), test({ code: 'for (let [ foo, bar ] of baz) {}' }), test({ code: 'const { x, y } = bar' }), test({ code: 'const { x, y, ...z } = bar', parser: 'babel-eslint' }),

// all the exports
test({ code: 'export { x }' }), test({ code: 'export { x as y }' }),

// not sure about these since they reference a file
// test({ code: 'export { x } from "./y.js"'}),
// test({ code: 'export * as y from "./y.js"', parser: 'babel-eslint'}),

test({ code: 'export const x = null' }), test({ code: 'export var x = null' }), test({ code: 'export let x = null' }), test({ code: 'export default x' }), test({ code: 'export default class x {}' }),

// issue #267: parser whitelist
test({
  code: 'import json from "./data.json"',
  settings: { 'import/extensions': ['.js'] } })];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFNZ0IsWSxHQUFBLFk7UUFNQSxJLEdBQUEsSTtRQVVBLFcsR0FBQSxXO1FBS0EsVyxHQUFBLFc7O0FBM0JoQjs7OztBQUNBOzs7O0FBR0E7Ozs7QUFFTyxTQUFTLFlBQVQsQ0FBc0IsWUFBdEIsRUFBb0M7QUFDdkMsU0FBTyxlQUFLLElBQUwsQ0FBVSxRQUFRLEdBQVIsRUFBVixFQUF5QixlQUF6QixFQUEwQyxZQUExQyxDQUFQO0FBQ0g7Ozs7O0FBRU0sSUFBTSw4QkFBVyxhQUFhLFFBQWIsQ0FBakI7O0FBRUEsU0FBUyxJQUFULENBQWMsQ0FBZCxFQUFpQjtBQUN0QixTQUFPLDRCQUFPO0FBQ1osY0FBVSxRQURFO0FBRVosbUJBQWU7QUFDYixrQkFBWSxRQURDO0FBRWIsbUJBQWE7QUFGQTtBQUZILEdBQVAsRUFNSixDQU5JLENBQVA7QUFPRDs7QUFFTSxTQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0I7QUFDcEMsU0FBTyxFQUFFLGFBQWEsdUJBQVk7QUFBRSxhQUFPLFFBQVA7QUFBaUIsS0FBOUM7QUFDRSxjQUFVLFlBQVksRUFEeEIsRUFBUDtBQUVEOztBQUVNLFNBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQjtBQUNoQyxTQUFPLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsT0FBM0IsRUFBb0MsUUFBUSxRQUE1QyxDQUFQO0FBQ0Q7Ozs7Ozs7QUFPTSxJQUFNLHNDQUFlLENBRTFCLEtBQUssRUFBRSxNQUFNLGtDQUFSLEVBQUwsQ0FGMEIsRUFHMUIsS0FBSyxFQUFFLE1BQU0sa0NBQVIsRUFBTCxDQUgwQixFQUsxQixLQUFLLEVBQUUsTUFBTSxzQkFBUixFQUFMLENBTDBCLEVBTTFCLEtBQUssRUFBRSxNQUFNLDRCQUFSLEVBQXNDLFFBQVEsY0FBOUMsRUFBTCxDQU4wQjs7O0FBUzFCLEtBQUssRUFBRSxNQUFNLGNBQVIsRUFBTCxDQVQwQixFQVUxQixLQUFLLEVBQUUsTUFBTSxtQkFBUixFQUFMLENBVjBCOzs7Ozs7QUFnQjFCLEtBQUssRUFBRSxNQUFNLHVCQUFSLEVBQUwsQ0FoQjBCLEVBaUIxQixLQUFLLEVBQUUsTUFBTSxxQkFBUixFQUFMLENBakIwQixFQWtCMUIsS0FBSyxFQUFFLE1BQU0scUJBQVIsRUFBTCxDQWxCMEIsRUFvQjFCLEtBQUssRUFBRSxNQUFNLGtCQUFSLEVBQUwsQ0FwQjBCLEVBcUIxQixLQUFLLEVBQUUsTUFBTSwyQkFBUixFQUFMLENBckIwQjs7O0FBd0IxQixLQUFLO0FBQ0gsUUFBTSxnQ0FESDtBQUVILFlBQVUsRUFBRSxxQkFBcUIsQ0FBQyxLQUFELENBQXZCLEVBRlAsRUFBTCxDQXhCMEIsQ0FBckIiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJ1xuXG4vLyB3YXJtcyB1cCB0aGUgbW9kdWxlIGNhY2hlLiB0aGlzIGltcG9ydCB0YWtlcyBhIHdoaWxlICg+NTAwbXMpXG5pbXBvcnQgJ2JhYmVsLWVzbGludCdcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RGaWxlUGF0aChyZWxhdGl2ZVBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuL3Rlc3RzL2ZpbGVzJywgcmVsYXRpdmVQYXRoKVxufVxuXG5leHBvcnQgY29uc3QgRklMRU5BTUUgPSB0ZXN0RmlsZVBhdGgoJ2Zvby5qcycpXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KHQpIHtcbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgZmlsZW5hbWU6IEZJTEVOQU1FLFxuICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgIHNvdXJjZVR5cGU6ICdtb2R1bGUnLFxuICAgICAgZWNtYVZlcnNpb246IDYsXG4gICAgfSxcbiAgfSwgdClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RDb250ZXh0KHNldHRpbmdzKSB7XG4gIHJldHVybiB7IGdldEZpbGVuYW1lOiBmdW5jdGlvbiAoKSB7IHJldHVybiBGSUxFTkFNRSB9XG4gICAgICAgICAsIHNldHRpbmdzOiBzZXR0aW5ncyB8fCB7fSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlbmFtZShmaWxlKSB7XG4gIHJldHVybiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnZmlsZXMnLCBmaWxlIHx8ICdmb28uanMnKVxufVxuXG4vKipcbiAqIHRvIGJlIGFkZGVkIGFzIHZhbGlkIGNhc2VzIGp1c3QgdG8gZW5zdXJlIG5vIG51bGxhYmxlIGZpZWxkcyBhcmUgZ29pbmdcbiAqIHRvIGNyYXNoIGF0IHJ1bnRpbm1lXG4gKiBAdHlwZSB7QXJyYXl9XG4gKi9cbmV4cG9ydCBjb25zdCBTWU5UQVhfQ0FTRVMgPSBbXG5cbiAgdGVzdCh7IGNvZGU6ICdmb3IgKGxldCB7IGZvbywgYmFyIH0gb2YgYmF6KSB7fScgfSksXG4gIHRlc3QoeyBjb2RlOiAnZm9yIChsZXQgWyBmb28sIGJhciBdIG9mIGJheikge30nIH0pLFxuXG4gIHRlc3QoeyBjb2RlOiAnY29uc3QgeyB4LCB5IH0gPSBiYXInIH0pLFxuICB0ZXN0KHsgY29kZTogJ2NvbnN0IHsgeCwgeSwgLi4ueiB9ID0gYmFyJywgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyB9KSxcblxuICAvLyBhbGwgdGhlIGV4cG9ydHNcbiAgdGVzdCh7IGNvZGU6ICdleHBvcnQgeyB4IH0nIH0pLFxuICB0ZXN0KHsgY29kZTogJ2V4cG9ydCB7IHggYXMgeSB9JyB9KSxcblxuICAvLyBub3Qgc3VyZSBhYm91dCB0aGVzZSBzaW5jZSB0aGV5IHJlZmVyZW5jZSBhIGZpbGVcbiAgLy8gdGVzdCh7IGNvZGU6ICdleHBvcnQgeyB4IH0gZnJvbSBcIi4veS5qc1wiJ30pLFxuICAvLyB0ZXN0KHsgY29kZTogJ2V4cG9ydCAqIGFzIHkgZnJvbSBcIi4veS5qc1wiJywgcGFyc2VyOiAnYmFiZWwtZXNsaW50J30pLFxuXG4gIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGNvbnN0IHggPSBudWxsJyB9KSxcbiAgdGVzdCh7IGNvZGU6ICdleHBvcnQgdmFyIHggPSBudWxsJyB9KSxcbiAgdGVzdCh7IGNvZGU6ICdleHBvcnQgbGV0IHggPSBudWxsJyB9KSxcblxuICB0ZXN0KHsgY29kZTogJ2V4cG9ydCBkZWZhdWx0IHgnIH0pLFxuICB0ZXN0KHsgY29kZTogJ2V4cG9ydCBkZWZhdWx0IGNsYXNzIHgge30nIH0pLFxuXG4gIC8vIGlzc3VlICMyNjc6IHBhcnNlciB3aGl0ZWxpc3RcbiAgdGVzdCh7XG4gICAgY29kZTogJ2ltcG9ydCBqc29uIGZyb20gXCIuL2RhdGEuanNvblwiJyxcbiAgICBzZXR0aW5nczogeyAnaW1wb3J0L2V4dGVuc2lvbnMnOiBbJy5qcyddIH0sIC8vIGJyZWFraW5nOiByZW1vdmUgZm9yIHYyXG4gIH0pLFxuXG4gXVxuIl19