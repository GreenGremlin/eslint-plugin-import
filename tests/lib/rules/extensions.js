'use strict';

var _eslint = require('eslint');

var _extensions = require('rules/extensions');

var _extensions2 = _interopRequireDefault(_extensions);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleTester = new _eslint.RuleTester();

ruleTester.run('extensions', _extensions2.default, {
  valid: [(0, _utils.test)({ code: 'import a from "a"' }), (0, _utils.test)({ code: 'import dot from "./file.with.dot"' }), (0, _utils.test)({
    code: 'import a from "a/index.js"',
    options: ['always']
  }), (0, _utils.test)({
    code: 'import dot from "./file.with.dot.js"',
    options: ['always']
  }), (0, _utils.test)({
    code: ['import a from "a"', 'import packageConfig from "./package.json"'].join('\n'),
    options: [{ json: 'always', js: 'never' }]
  }), (0, _utils.test)({
    code: ['import lib from "./bar"', 'import component from "./bar.jsx"', 'import data from "./bar.json"'].join('\n'),
    options: ['never'],
    settings: { 'import/resolve': { 'extensions': ['.js', '.jsx', '.json'] } }
  }),

  // unresolved (#271/#295)
  (0, _utils.test)({ code: 'import path from "path"' }), (0, _utils.test)({ code: 'import path from "path"', options: ['never'] }), (0, _utils.test)({ code: 'import path from "path"', options: ['always'] }), (0, _utils.test)({ code: 'import thing from "./fake-file.js"', options: ['always'] }), (0, _utils.test)({ code: 'import thing from "non-package"', options: ['never'] })],

  invalid: [(0, _utils.test)({
    code: 'import a from "a/index.js"',
    errors: [{
      message: 'Unexpected use of file extension "js" for "a/index.js"',
      line: 1,
      column: 15
    }]
  }), (0, _utils.test)({
    code: 'import a from "a"',
    options: ['always'],
    errors: [{
      message: 'Missing file extension "js" for "a"',
      line: 1,
      column: 15
    }]
  }), (0, _utils.test)({
    code: 'import dot from "./file.with.dot"',
    options: ['always'],
    errors: [{
      message: 'Missing file extension "js" for "./file.with.dot"',
      line: 1,
      column: 17
    }]
  }), (0, _utils.test)({
    code: ['import a from "a/index.js"', 'import packageConfig from "./package"'].join('\n'),
    options: [{ json: 'always', js: 'never' }],
    settings: { 'import/resolve': { 'extensions': ['.js', '.json'] } },
    errors: [{
      message: 'Unexpected use of file extension "js" for "a/index.js"',
      line: 1,
      column: 15
    }, {
      message: 'Missing file extension "json" for "./package"',
      line: 2,
      column: 27
    }]
  }), (0, _utils.test)({
    code: ['import lib from "./bar.js"', 'import component from "./bar.jsx"', 'import data from "./bar.json"'].join('\n'),
    options: ['never'],
    settings: { 'import/resolve': { 'extensions': ['.js', '.jsx', '.json'] } },
    errors: [{
      message: 'Unexpected use of file extension "js" for "./bar.js"',
      line: 1,
      column: 17
    }]
  }), (0, _utils.test)({
    code: ['import lib from "./bar.js"', 'import component from "./bar.jsx"', 'import data from "./bar.json"'].join('\n'),
    options: [{ json: 'always', js: 'never', jsx: 'never' }],
    settings: { 'import/resolve': { 'extensions': ['.js', '.jsx', '.json'] } },
    errors: [{
      message: 'Unexpected use of file extension "js" for "./bar.js"',
      line: 1,
      column: 17
    }]
  }),

  // unresolved (#271/#295)
  (0, _utils.test)({
    code: 'import thing from "./fake-file.js"',
    options: ['never'],
    errors: [{
      message: 'Unexpected use of file extension "js" for "./fake-file.js"',
      line: 1,
      column: 19
    }]
  }), (0, _utils.test)({
    code: 'import thing from "non-package"',
    options: ['always'],
    errors: [{
      message: 'Missing file extension for "non-package"',
      line: 1,
      column: 19
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,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REg7QUFNSCxhQUFTLENBQUUsT0FBRixDQU5OO0FBT0gsY0FBVSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBRSxLQUFGLEVBQVMsTUFBVCxFQUFpQixPQUFqQixDQUFoQixFQUFwQixFQVBQO0FBUUgsWUFBUSxDQUNOO0FBQ0ksZUFBUyxzREFEYjtBQUVJLFlBQU0sQ0FGVjtBQUdJLGNBQVE7QUFIWixLQURNO0FBUkwsR0FBTCxDQWpETyxFQWlFUCxpQkFBSztBQUNILFVBQU0sQ0FDSiw0QkFESSxFQUVKLG1DQUZJLEVBR0osK0JBSEksRUFJSixJQUpJLENBSUMsSUFKRCxDQURIO0FBTUgsYUFBUyxDQUFFLEVBQUUsTUFBTSxRQUFSLEVBQWtCLElBQUksT0FBdEIsRUFBK0IsS0FBSyxPQUFwQyxFQUFGLENBTk47QUFPSCxjQUFVLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFFLEtBQUYsRUFBUyxNQUFULEVBQWlCLE9BQWpCLENBQWhCLEVBQXBCLEVBUFA7QUFRSCxZQUFRLENBQ047QUFDSSxlQUFTLHNEQURiO0FBRUksWUFBTSxDQUZWO0FBR0ksY0FBUTtBQUhaLEtBRE07QUFSTCxHQUFMLENBakVPOzs7QUFtRlAsbUJBQUs7QUFDSCxVQUFNLG9DQURIO0FBRUgsYUFBUyxDQUFFLE9BQUYsQ0FGTjtBQUdILFlBQVEsQ0FDTjtBQUNJLGVBQVMsNERBRGI7QUFFSSxZQUFNLENBRlY7QUFHSSxjQUFRO0FBSFosS0FETTtBQUhMLEdBQUwsQ0FuRk8sRUE4RlAsaUJBQUs7QUFDSCxVQUFNLGlDQURIO0FBRUgsYUFBUyxDQUFFLFFBQUYsQ0FGTjtBQUdILFlBQVEsQ0FDTjtBQUNJLGVBQVMsMENBRGI7QUFFSSxZQUFNLENBRlY7QUFHSSxjQUFRO0FBSFosS0FETTtBQUhMLEdBQUwsQ0E5Rk87QUF0Q3dCLENBQW5DIiwiZmlsZSI6InJ1bGVzL2V4dGVuc2lvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuaW1wb3J0IHJ1bGUgZnJvbSAncnVsZXMvZXh0ZW5zaW9ucydcbmltcG9ydCB7IHRlc3QgfSBmcm9tICcuLi91dGlscydcblxuY29uc3QgcnVsZVRlc3RlciA9IG5ldyBSdWxlVGVzdGVyKClcblxucnVsZVRlc3Rlci5ydW4oJ2V4dGVuc2lvbnMnLCBydWxlLCB7XG4gIHZhbGlkOiBbXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgYSBmcm9tIFwiYVwiJyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBkb3QgZnJvbSBcIi4vZmlsZS53aXRoLmRvdFwiJyB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgYSBmcm9tIFwiYS9pbmRleC5qc1wiJyxcbiAgICAgIG9wdGlvbnM6IFsgJ2Fsd2F5cycgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgZG90IGZyb20gXCIuL2ZpbGUud2l0aC5kb3QuanNcIicsXG4gICAgICBvcHRpb25zOiBbICdhbHdheXMnIF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBbXG4gICAgICAgICdpbXBvcnQgYSBmcm9tIFwiYVwiJyxcbiAgICAgICAgJ2ltcG9ydCBwYWNrYWdlQ29uZmlnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiJyxcbiAgICAgIF0uam9pbignXFxuJyksXG4gICAgICBvcHRpb25zOiBbIHsganNvbjogJ2Fsd2F5cycsIGpzOiAnbmV2ZXInIH0gXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFtcbiAgICAgICAgJ2ltcG9ydCBsaWIgZnJvbSBcIi4vYmFyXCInLFxuICAgICAgICAnaW1wb3J0IGNvbXBvbmVudCBmcm9tIFwiLi9iYXIuanN4XCInLFxuICAgICAgICAnaW1wb3J0IGRhdGEgZnJvbSBcIi4vYmFyLmpzb25cIicsXG4gICAgICBdLmpvaW4oJ1xcbicpLFxuICAgICAgb3B0aW9uczogWyAnbmV2ZXInIF0sXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L3Jlc29sdmUnOiB7ICdleHRlbnNpb25zJzogWyAnLmpzJywgJy5qc3gnLCAnLmpzb24nIF0gfSB9LFxuICAgIH0pLFxuXG4gICAgLy8gdW5yZXNvbHZlZCAoIzI3MS8jMjk1KVxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIicgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiJywgb3B0aW9uczogWyAnbmV2ZXInIF0gfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiJywgb3B0aW9uczogWyAnYWx3YXlzJyBdIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHRoaW5nIGZyb20gXCIuL2Zha2UtZmlsZS5qc1wiJywgb3B0aW9uczogWyAnYWx3YXlzJyBdIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHRoaW5nIGZyb20gXCJub24tcGFja2FnZVwiJywgb3B0aW9uczogWyAnbmV2ZXInIF0gfSksXG5cbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGEgZnJvbSBcImEvaW5kZXguanNcIicsXG4gICAgICBlcnJvcnM6IFsge1xuICAgICAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCJqc1wiIGZvciBcImEvaW5kZXguanNcIicsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGNvbHVtbjogMTUsXG4gICAgICB9IF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGEgZnJvbSBcImFcIicsXG4gICAgICBvcHRpb25zOiBbICdhbHdheXMnIF0sXG4gICAgICBlcnJvcnM6IFsge1xuICAgICAgICBtZXNzYWdlOiAnTWlzc2luZyBmaWxlIGV4dGVuc2lvbiBcImpzXCIgZm9yIFwiYVwiJyxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgY29sdW1uOiAxNSxcbiAgICAgIH0gXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgZG90IGZyb20gXCIuL2ZpbGUud2l0aC5kb3RcIicsXG4gICAgICBvcHRpb25zOiBbICdhbHdheXMnIF0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6ICdNaXNzaW5nIGZpbGUgZXh0ZW5zaW9uIFwianNcIiBmb3IgXCIuL2ZpbGUud2l0aC5kb3RcIicsXG4gICAgICAgICAgbGluZTogMSxcbiAgICAgICAgICBjb2x1bW46IDE3LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFtcbiAgICAgICAgJ2ltcG9ydCBhIGZyb20gXCJhL2luZGV4LmpzXCInLFxuICAgICAgICAnaW1wb3J0IHBhY2thZ2VDb25maWcgZnJvbSBcIi4vcGFja2FnZVwiJyxcbiAgICAgIF0uam9pbignXFxuJyksXG4gICAgICBvcHRpb25zOiBbIHsganNvbjogJ2Fsd2F5cycsIGpzOiAnbmV2ZXInIH0gXSxcbiAgICAgIHNldHRpbmdzOiB7ICdpbXBvcnQvcmVzb2x2ZSc6IHsgJ2V4dGVuc2lvbnMnOiBbICcuanMnLCAnLmpzb24nIF0gfSB9LFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCJqc1wiIGZvciBcImEvaW5kZXguanNcIicsXG4gICAgICAgICAgbGluZTogMSxcbiAgICAgICAgICBjb2x1bW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbWVzc2FnZTogJ01pc3NpbmcgZmlsZSBleHRlbnNpb24gXCJqc29uXCIgZm9yIFwiLi9wYWNrYWdlXCInLFxuICAgICAgICAgIGxpbmU6IDIsXG4gICAgICAgICAgY29sdW1uOiAyNyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBbXG4gICAgICAgICdpbXBvcnQgbGliIGZyb20gXCIuL2Jhci5qc1wiJyxcbiAgICAgICAgJ2ltcG9ydCBjb21wb25lbnQgZnJvbSBcIi4vYmFyLmpzeFwiJyxcbiAgICAgICAgJ2ltcG9ydCBkYXRhIGZyb20gXCIuL2Jhci5qc29uXCInLFxuICAgICAgXS5qb2luKCdcXG4nKSxcbiAgICAgIG9wdGlvbnM6IFsgJ25ldmVyJyBdLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlJzogeyAnZXh0ZW5zaW9ucyc6IFsgJy5qcycsICcuanN4JywgJy5qc29uJyBdIH0gfSxcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCJqc1wiIGZvciBcIi4vYmFyLmpzXCInLFxuICAgICAgICAgICAgbGluZTogMSxcbiAgICAgICAgICAgIGNvbHVtbjogMTcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogW1xuICAgICAgICAnaW1wb3J0IGxpYiBmcm9tIFwiLi9iYXIuanNcIicsXG4gICAgICAgICdpbXBvcnQgY29tcG9uZW50IGZyb20gXCIuL2Jhci5qc3hcIicsXG4gICAgICAgICdpbXBvcnQgZGF0YSBmcm9tIFwiLi9iYXIuanNvblwiJyxcbiAgICAgIF0uam9pbignXFxuJyksXG4gICAgICBvcHRpb25zOiBbIHsganNvbjogJ2Fsd2F5cycsIGpzOiAnbmV2ZXInLCBqc3g6ICduZXZlcicgfSBdLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlJzogeyAnZXh0ZW5zaW9ucyc6IFsgJy5qcycsICcuanN4JywgJy5qc29uJyBdIH0gfSxcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCJqc1wiIGZvciBcIi4vYmFyLmpzXCInLFxuICAgICAgICAgICAgbGluZTogMSxcbiAgICAgICAgICAgIGNvbHVtbjogMTcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuXG4gICAgLy8gdW5yZXNvbHZlZCAoIzI3MS8jMjk1KVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB0aGluZyBmcm9tIFwiLi9mYWtlLWZpbGUuanNcIicsXG4gICAgICBvcHRpb25zOiBbICduZXZlcicgXSxcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCJqc1wiIGZvciBcIi4vZmFrZS1maWxlLmpzXCInLFxuICAgICAgICAgICAgbGluZTogMSxcbiAgICAgICAgICAgIGNvbHVtbjogMTksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB0aGluZyBmcm9tIFwibm9uLXBhY2thZ2VcIicsXG4gICAgICBvcHRpb25zOiBbICdhbHdheXMnIF0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbWVzc2FnZTogJ01pc3NpbmcgZmlsZSBleHRlbnNpb24gZm9yIFwibm9uLXBhY2thZ2VcIicsXG4gICAgICAgICAgICBsaW5lOiAxLFxuICAgICAgICAgICAgY29sdW1uOiAxOSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgXSxcbn0pXG4iXX0=