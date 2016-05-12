'use strict';

var _chai = require('chai');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _importType = require('core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('importType(name)', function () {
  var context = (0, _utils.testContext)();

  it("should return 'builtin' for node.js modules", function () {
    (0, _chai.expect)((0, _importType2.default)('fs', context)).to.equal('builtin');
    (0, _chai.expect)((0, _importType2.default)('path', context)).to.equal('builtin');
  });

  it("should return 'external' for non-builtin modules without a relative path", function () {
    (0, _chai.expect)((0, _importType2.default)('lodash', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('async', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('chalk', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('foo', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('lodash.find', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('lodash/fp', context)).to.equal('external');
  });

  it("should return 'external' for scopes packages", function () {
    (0, _chai.expect)((0, _importType2.default)('@cycle/core', context)).to.equal('external');
    (0, _chai.expect)((0, _importType2.default)('@cycle/dom', context)).to.equal('external');
  });

  it("should return 'internal' for non-builtins resolved outside of node_modules", function () {
    var pathContext = (0, _utils.testContext)({ "import/resolver": { node: { paths: [path.join(__dirname, '..', '..', 'files')] } } });
    (0, _chai.expect)((0, _importType2.default)('importType', pathContext)).to.equal('internal');
  });

  it("should return 'parent' for internal modules that go through the parent", function () {
    (0, _chai.expect)((0, _importType2.default)('../foo', context)).to.equal('parent');
    (0, _chai.expect)((0, _importType2.default)('../../foo', context)).to.equal('parent');
    (0, _chai.expect)((0, _importType2.default)('../bar/foo', context)).to.equal('parent');
  });

  it("should return 'sibling' for internal modules that are connected to one of the siblings", function () {
    (0, _chai.expect)((0, _importType2.default)('./foo', context)).to.equal('sibling');
    (0, _chai.expect)((0, _importType2.default)('./foo/bar', context)).to.equal('sibling');
    (0, _chai.expect)((0, _importType2.default)('./importType', context)).to.equal('sibling');
    (0, _chai.expect)((0, _importType2.default)('./importType/', context)).to.equal('sibling');
    (0, _chai.expect)((0, _importType2.default)('./importType/index', context)).to.equal('sibling');
    (0, _chai.expect)((0, _importType2.default)('./importType/index.js', context)).to.equal('sibling');
  });

  describe("should return 'index' for sibling index file", function () {
    (0, _chai.expect)((0, _importType2.default)('.', context)).to.equal('index');
    (0, _chai.expect)((0, _importType2.default)('./', context)).to.equal('index');
    (0, _chai.expect)((0, _importType2.default)('./index', context)).to.equal('index');
    (0, _chai.expect)((0, _importType2.default)('./index.js', context)).to.equal('index');
  });

  it("should return 'unknown' for any unhandled cases", function () {
    (0, _chai.expect)((0, _importType2.default)('/malformed', context)).to.equal('unknown');
    (0, _chai.expect)((0, _importType2.default)('   foo', context)).to.equal('unknown');
  });
});
//# sourceMappingURL=data:application/json;base64,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QXJEO0FBQ0Esc0JBQU8sMEJBQVcsZUFBWCxFQUE0QixPQUE1QixDQUFQLEVBQTZDLEVBQTdDLENBQWdELEtBQWhELENBQXNELFNBQXREO0FBQ0Esc0JBQU8sMEJBQVcsb0JBQVgsRUFBaUMsT0FBakMsQ0FBUCxFQUFrRCxFQUFsRCxDQUFxRCxLQUFyRCxDQUEyRCxTQUEzRDtBQUNBLHNCQUFPLDBCQUFXLHVCQUFYLEVBQW9DLE9BQXBDLENBQVAsRUFBcUQsRUFBckQsQ0FBd0QsS0FBeEQsQ0FBOEQsU0FBOUQ7QUFDRCxHQVBEOztBQVNBLFdBQVMsOENBQVQsRUFBeUQsWUFBVztBQUNsRSxzQkFBTywwQkFBVyxHQUFYLEVBQWdCLE9BQWhCLENBQVAsRUFBaUMsRUFBakMsQ0FBb0MsS0FBcEMsQ0FBMEMsT0FBMUM7QUFDQSxzQkFBTywwQkFBVyxJQUFYLEVBQWlCLE9BQWpCLENBQVAsRUFBa0MsRUFBbEMsQ0FBcUMsS0FBckMsQ0FBMkMsT0FBM0M7QUFDQSxzQkFBTywwQkFBVyxTQUFYLEVBQXNCLE9BQXRCLENBQVAsRUFBdUMsRUFBdkMsQ0FBMEMsS0FBMUMsQ0FBZ0QsT0FBaEQ7QUFDQSxzQkFBTywwQkFBVyxZQUFYLEVBQXlCLE9BQXpCLENBQVAsRUFBMEMsRUFBMUMsQ0FBNkMsS0FBN0MsQ0FBbUQsT0FBbkQ7QUFDRCxHQUxEOztBQU9BLEtBQUcsaURBQUgsRUFBc0QsWUFBVztBQUMvRCxzQkFBTywwQkFBVyxZQUFYLEVBQXlCLE9BQXpCLENBQVAsRUFBMEMsRUFBMUMsQ0FBNkMsS0FBN0MsQ0FBbUQsU0FBbkQ7QUFDQSxzQkFBTywwQkFBVyxRQUFYLEVBQXFCLE9BQXJCLENBQVAsRUFBc0MsRUFBdEMsQ0FBeUMsS0FBekMsQ0FBK0MsU0FBL0M7QUFDRCxHQUhEO0FBSUQsQ0FyREQiLCJmaWxlIjoiY29yZS9pbXBvcnRUeXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IGltcG9ydFR5cGUgZnJvbSAnY29yZS9pbXBvcnRUeXBlJ1xuXG5pbXBvcnQgeyB0ZXN0Q29udGV4dCB9IGZyb20gJy4uL3V0aWxzJ1xuXG5kZXNjcmliZSgnaW1wb3J0VHlwZShuYW1lKScsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY29udGV4dCA9IHRlc3RDb250ZXh0KClcblxuICBpdChcInNob3VsZCByZXR1cm4gJ2J1aWx0aW4nIGZvciBub2RlLmpzIG1vZHVsZXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJ2ZzJywgY29udGV4dCkpLnRvLmVxdWFsKCdidWlsdGluJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgncGF0aCcsIGNvbnRleHQpKS50by5lcXVhbCgnYnVpbHRpbicpXG4gIH0pXG5cbiAgaXQoXCJzaG91bGQgcmV0dXJuICdleHRlcm5hbCcgZm9yIG5vbi1idWlsdGluIG1vZHVsZXMgd2l0aG91dCBhIHJlbGF0aXZlIHBhdGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJ2xvZGFzaCcsIGNvbnRleHQpKS50by5lcXVhbCgnZXh0ZXJuYWwnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCdhc3luYycsIGNvbnRleHQpKS50by5lcXVhbCgnZXh0ZXJuYWwnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCdjaGFsaycsIGNvbnRleHQpKS50by5lcXVhbCgnZXh0ZXJuYWwnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCdmb28nLCBjb250ZXh0KSkudG8uZXF1YWwoJ2V4dGVybmFsJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnbG9kYXNoLmZpbmQnLCBjb250ZXh0KSkudG8uZXF1YWwoJ2V4dGVybmFsJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnbG9kYXNoL2ZwJywgY29udGV4dCkpLnRvLmVxdWFsKCdleHRlcm5hbCcpXG4gIH0pXG5cbiAgaXQoXCJzaG91bGQgcmV0dXJuICdleHRlcm5hbCcgZm9yIHNjb3BlcyBwYWNrYWdlc1wiLCBmdW5jdGlvbigpIHtcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnQGN5Y2xlL2NvcmUnLCBjb250ZXh0KSkudG8uZXF1YWwoJ2V4dGVybmFsJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnQGN5Y2xlL2RvbScsIGNvbnRleHQpKS50by5lcXVhbCgnZXh0ZXJuYWwnKVxuICB9KVxuXG4gIGl0KFwic2hvdWxkIHJldHVybiAnaW50ZXJuYWwnIGZvciBub24tYnVpbHRpbnMgcmVzb2x2ZWQgb3V0c2lkZSBvZiBub2RlX21vZHVsZXNcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBhdGhDb250ZXh0ID0gdGVzdENvbnRleHQoeyBcImltcG9ydC9yZXNvbHZlclwiOiB7IG5vZGU6IHsgcGF0aHM6IFsgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2ZpbGVzJykgXSB9IH0gfSlcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnaW1wb3J0VHlwZScsIHBhdGhDb250ZXh0KSkudG8uZXF1YWwoJ2ludGVybmFsJylcbiAgfSlcblxuICBpdChcInNob3VsZCByZXR1cm4gJ3BhcmVudCcgZm9yIGludGVybmFsIG1vZHVsZXMgdGhhdCBnbyB0aHJvdWdoIHRoZSBwYXJlbnRcIiwgZnVuY3Rpb24oKSB7XG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJy4uL2ZvbycsIGNvbnRleHQpKS50by5lcXVhbCgncGFyZW50JylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnLi4vLi4vZm9vJywgY29udGV4dCkpLnRvLmVxdWFsKCdwYXJlbnQnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCcuLi9iYXIvZm9vJywgY29udGV4dCkpLnRvLmVxdWFsKCdwYXJlbnQnKVxuICB9KVxuXG4gIGl0KFwic2hvdWxkIHJldHVybiAnc2libGluZycgZm9yIGludGVybmFsIG1vZHVsZXMgdGhhdCBhcmUgY29ubmVjdGVkIHRvIG9uZSBvZiB0aGUgc2libGluZ3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJy4vZm9vJywgY29udGV4dCkpLnRvLmVxdWFsKCdzaWJsaW5nJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnLi9mb28vYmFyJywgY29udGV4dCkpLnRvLmVxdWFsKCdzaWJsaW5nJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnLi9pbXBvcnRUeXBlJywgY29udGV4dCkpLnRvLmVxdWFsKCdzaWJsaW5nJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnLi9pbXBvcnRUeXBlLycsIGNvbnRleHQpKS50by5lcXVhbCgnc2libGluZycpXG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJy4vaW1wb3J0VHlwZS9pbmRleCcsIGNvbnRleHQpKS50by5lcXVhbCgnc2libGluZycpXG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJy4vaW1wb3J0VHlwZS9pbmRleC5qcycsIGNvbnRleHQpKS50by5lcXVhbCgnc2libGluZycpXG4gIH0pXG5cbiAgZGVzY3JpYmUoXCJzaG91bGQgcmV0dXJuICdpbmRleCcgZm9yIHNpYmxpbmcgaW5kZXggZmlsZVwiLCBmdW5jdGlvbigpIHtcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnLicsIGNvbnRleHQpKS50by5lcXVhbCgnaW5kZXgnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCcuLycsIGNvbnRleHQpKS50by5lcXVhbCgnaW5kZXgnKVxuICAgIGV4cGVjdChpbXBvcnRUeXBlKCcuL2luZGV4JywgY29udGV4dCkpLnRvLmVxdWFsKCdpbmRleCcpXG4gICAgZXhwZWN0KGltcG9ydFR5cGUoJy4vaW5kZXguanMnLCBjb250ZXh0KSkudG8uZXF1YWwoJ2luZGV4JylcbiAgfSlcblxuICBpdChcInNob3VsZCByZXR1cm4gJ3Vua25vd24nIGZvciBhbnkgdW5oYW5kbGVkIGNhc2VzXCIsIGZ1bmN0aW9uKCkge1xuICAgIGV4cGVjdChpbXBvcnRUeXBlKCcvbWFsZm9ybWVkJywgY29udGV4dCkpLnRvLmVxdWFsKCd1bmtub3duJylcbiAgICBleHBlY3QoaW1wb3J0VHlwZSgnICAgZm9vJywgY29udGV4dCkpLnRvLmVxdWFsKCd1bmtub3duJylcbiAgfSlcbn0pXG4iXX0=