'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester({ env: { es6: true } }),
    rule = require('rules/namespace');

function error(name, namespace) {
  return { message: '\'' + name + '\' not found in imported namespace \'' + namespace + '\'.' };
}

var valid = [(0, _utils.test)({ code: 'import "./malformed.js"' }), (0, _utils.test)({ code: "import * as foo from './empty-folder';" }), (0, _utils.test)({ code: 'import * as names from "./named-exports"; ' + 'console.log((names.b).c); ' }), (0, _utils.test)({ code: 'import * as names from "./named-exports"; ' + 'console.log(names.a);' }), (0, _utils.test)({ code: 'import * as names from "./re-export-names"; ' + 'console.log(names.foo);' }), (0, _utils.test)({
  code: "import * as elements from './jsx';",
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  }
}), (0, _utils.test)({ code: "import * as foo from './common';",
  settings: { 'import/ignore': ['common'] } }),

// destructuring namespaces
(0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'const { a } = names' }), (0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'const { d: c } = names' }), (0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'const { c } = foo\n' + '    , { length } = "names"\n' + '    , alt = names' }),
// deep destructuring only cares about top level
(0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'const { ExportedClass: { length } } = names' }),

// detect scope redefinition
(0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'function b(names) { const { c } = names }' }), (0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'function b() { let names = null; const { c } = names }' }), (0, _utils.test)({ code: 'import * as names from "./named-exports";' + 'const x = function names() { const { c } = names }' }),

/////////
// es7 //
/////////
(0, _utils.test)({ code: 'export * as names from "./named-exports"',
  parser: 'babel-eslint' }), (0, _utils.test)({ code: 'export defport, * as names from "./named-exports"',
  parser: 'babel-eslint' }),
// non-existent is handled by no-unresolved
(0, _utils.test)({ code: 'export * as names from "./does-not-exist"',
  parser: 'babel-eslint' }), (0, _utils.test)({
  code: 'import * as Endpoints from "./issue-195/Endpoints"; console.log(Endpoints.Users)',
  parser: 'babel-eslint'
}),

// respect hoisting
(0, _utils.test)({
  code: 'function x() { console.log((names.b).c); } ' + 'import * as names from "./named-exports"; '
}),

// names.default is valid export
(0, _utils.test)({ code: "import * as names from './default-export';" }), (0, _utils.test)({ code: "import * as names from './default-export'; console.log(names.default)" }), (0, _utils.test)({
  code: 'export * as names from "./default-export"',
  parser: 'babel-eslint'
}), (0, _utils.test)({
  code: 'export defport, * as names from "./default-export"',
  parser: 'babel-eslint'
})].concat(_utils.SYNTAX_CASES);

var invalid = [(0, _utils.test)({ code: "import * as foo from './common';",
  errors: ["No exported names found in module './common'."] }), (0, _utils.test)({ code: "import * as names from './named-exports'; " + ' console.log(names.c);',
  errors: [error('c', 'names')] }), (0, _utils.test)({ code: "import * as names from './named-exports';" + " console.log(names['a']);",
  errors: ["Unable to validate computed reference to imported namespace 'names'."] }),

// assignment warning (from no-reassign)
(0, _utils.test)({ code: 'import * as foo from \'./bar\'; foo.foo = \'y\';',
  errors: [{ message: 'Assignment to member of namespace \'foo\'.' }] }), (0, _utils.test)({ code: 'import * as foo from \'./bar\'; foo.x = \'y\';',
  errors: ['Assignment to member of namespace \'foo\'.', "'x' not found in imported namespace 'foo'."] }),

// invalid destructuring
(0, _utils.test)({
  code: 'import * as names from "./named-exports"; const { c } = names',
  errors: [{ type: 'Property', message: "'c' not found in imported namespace 'names'." }]
}), (0, _utils.test)({
  code: 'import * as names from "./named-exports"; function b() { const { c } = names }',
  errors: [{ type: 'Property', message: "'c' not found in imported namespace 'names'." }]
}), (0, _utils.test)({
  code: 'import * as names from "./named-exports"; const { c: d } = names',
  errors: [{ type: 'Property', message: "'c' not found in imported namespace 'names'." }]
}), (0, _utils.test)({
  code: 'import * as names from "./named-exports";' + 'const { c: { d } } = names',
  errors: [{ type: 'Property', message: "'c' not found in imported namespace 'names'." }]
}),

/////////
// es7 //
/////////

(0, _utils.test)({
  code: 'import * as Endpoints from "./issue-195/Endpoints"; console.log(Endpoints.Foo)',
  parser: 'babel-eslint',
  errors: ["'Foo' not found in imported namespace 'Endpoints'."]
}),

// parse errors
(0, _utils.test)({
  code: "import * as namespace from './malformed.js';",
  errors: [{
    message: "Parse errors in imported module './malformed.js': 'return' outside of function (1:1)",
    type: 'Literal'
  }]
}), (0, _utils.test)({
  code: "import b from './deep/default'; console.log(b.e)",
  errors: ["'e' not found in imported namespace 'b'."]
}),

// respect hoisting
(0, _utils.test)({
  code: 'console.log(names.c);' + "import * as names from './named-exports'; ",
  errors: [error('c', 'names')]
}), (0, _utils.test)({
  code: 'function x() { console.log(names.c) } ' + "import * as names from './named-exports'; ",
  errors: [error('c', 'names')]
}),

// #328: * exports do not include default
(0, _utils.test)({
  code: 'import * as ree from "./re-export"; console.log(ree.default)',
  errors: ['\'default\' not found in imported namespace \'ree\'.']
})]

///////////////////////
// deep dereferences //
//////////////////////
;[['deep', 'espree'], ['deep-es7', 'babel-eslint']].forEach(function (_ref) {
  var folder = _ref[0];
  var parser = _ref[1];
  // close over params
  valid.push((0, _utils.test)({ parser: parser, code: 'import * as a from "./' + folder + '/a"; console.log(a.b.c.d.e)' }), (0, _utils.test)({ parser: parser, code: 'import { b } from "./' + folder + '/a"; console.log(b.c.d.e)' }), (0, _utils.test)({ parser: parser, code: 'import * as a from "./' + folder + '/a"; console.log(a.b.c.d.e.f)' }), (0, _utils.test)({ parser: parser, code: 'import * as a from "./' + folder + '/a"; var {b:{c:{d:{e}}}} = a' }), (0, _utils.test)({ parser: parser, code: 'import { b } from "./' + folder + '/a"; var {c:{d:{e}}} = b' }));

  // deep namespaces should include explicitly exported defaults
  (0, _utils.test)({ parser: parser, code: 'import * as a from "./' + folder + '/a"; console.log(a.b.default)' }), invalid.push((0, _utils.test)({
    parser: parser,
    code: 'import * as a from "./' + folder + '/a"; console.log(a.b.e)',
    errors: ["'e' not found in deeply imported namespace 'a.b'."]
  }), (0, _utils.test)({
    parser: parser,
    code: 'import { b } from "./' + folder + '/a"; console.log(b.e)',
    errors: ["'e' not found in imported namespace 'b'."]
  }), (0, _utils.test)({
    parser: parser,
    code: 'import * as a from "./' + folder + '/a"; console.log(a.b.c.e)',
    errors: ["'e' not found in deeply imported namespace 'a.b.c'."]
  }), (0, _utils.test)({
    parser: parser,
    code: 'import { b } from "./' + folder + '/a"; console.log(b.c.e)',
    errors: ["'e' not found in deeply imported namespace 'b.c'."]
  }), (0, _utils.test)({
    parser: parser,
    code: 'import * as a from "./' + folder + '/a"; var {b:{ e }} = a',
    errors: ["'e' not found in deeply imported namespace 'a.b'."]
  }), (0, _utils.test)({
    parser: parser,
    code: 'import * as a from "./' + folder + '/a"; var {b:{c:{ e }}} = a',
    errors: ["'e' not found in deeply imported namespace 'a.b.c'."]
  }));
});

ruleTester.run('namespace', rule, { valid: valid, invalid: invalid });
//# sourceMappingURL=data:application/json;base64,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QixNQUEvQiwyQkFGRztBQUdILFlBQVEsQ0FBRSxtREFBRjtBQUhMLEdBQUwsQ0FyQkYsRUEwQkUsaUJBQUs7QUFDSCxrQkFERztBQUVILHFDQUErQixNQUEvQiwrQkFGRztBQUdILFlBQVEsQ0FBRSxxREFBRjtBQUhMLEdBQUwsQ0ExQkYsQ0FGRTtBQWlDSCxDQTFDQTs7QUE0Q0QsV0FBVyxHQUFYLENBQWUsV0FBZixFQUE0QixJQUE1QixFQUFrQyxFQUFFLFlBQUYsRUFBUyxnQkFBVCxFQUFsQyIsImZpbGUiOiJydWxlcy9uYW1lc3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0LCBTWU5UQVhfQ0FTRVMgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbnZhciBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoeyBlbnY6IHsgZXM2OiB0cnVlIH19KVxuICAsIHJ1bGUgPSByZXF1aXJlKCdydWxlcy9uYW1lc3BhY2UnKVxuXG5cbmZ1bmN0aW9uIGVycm9yKG5hbWUsIG5hbWVzcGFjZSkge1xuICByZXR1cm4geyBtZXNzYWdlOiBgJyR7bmFtZX0nIG5vdCBmb3VuZCBpbiBpbXBvcnRlZCBuYW1lc3BhY2UgJyR7bmFtZXNwYWNlfScuYCB9XG59XG5cbmNvbnN0IHZhbGlkID0gW1xuICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcIi4vbWFsZm9ybWVkLmpzXCInIH0pLFxuXG4gIHRlc3QoeyBjb2RlOiBcImltcG9ydCAqIGFzIGZvbyBmcm9tICcuL2VtcHR5LWZvbGRlcic7XCJ9KSxcbiAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7ICcgK1xuICAgICAgICAgICAgICAgJ2NvbnNvbGUubG9nKChuYW1lcy5iKS5jKTsgJyB9KSxcblxuICB0ZXN0KHsgY29kZTogJ2ltcG9ydCAqIGFzIG5hbWVzIGZyb20gXCIuL25hbWVkLWV4cG9ydHNcIjsgJyArXG4gICAgICAgICAgICAgICAnY29uc29sZS5sb2cobmFtZXMuYSk7JyB9KSxcbiAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9yZS1leHBvcnQtbmFtZXNcIjsgJyArXG4gICAgICAgICAgICAgICAnY29uc29sZS5sb2cobmFtZXMuZm9vKTsnIH0pLFxuICB0ZXN0KHtcbiAgICBjb2RlOiBcImltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4vanN4JztcIixcbiAgICBwYXJzZXJPcHRpb25zOiB7XG4gICAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgICAgIGVjbWFGZWF0dXJlczogeyBqc3g6IHRydWUgfSxcbiAgICB9LFxuICB9KSxcbiAgdGVzdCh7IGNvZGU6IFwiaW1wb3J0ICogYXMgZm9vIGZyb20gJy4vY29tbW9uJztcIlxuICAgICAgICwgc2V0dGluZ3M6IHsgJ2ltcG9ydC9pZ25vcmUnOiBbJ2NvbW1vbiddIH0gfSksXG5cbiAgLy8gZGVzdHJ1Y3R1cmluZyBuYW1lc3BhY2VzXG4gIHRlc3QoeyBjb2RlOiAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOycgK1xuICAgICAgICAgICAgICAgJ2NvbnN0IHsgYSB9ID0gbmFtZXMnIH0pLFxuICB0ZXN0KHsgY29kZTogJ2ltcG9ydCAqIGFzIG5hbWVzIGZyb20gXCIuL25hbWVkLWV4cG9ydHNcIjsnICtcbiAgICAgICAgICAgICAgICdjb25zdCB7IGQ6IGMgfSA9IG5hbWVzJyB9KSxcbiAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7JyArXG4gICAgICAgICAgICAgICAnY29uc3QgeyBjIH0gPSBmb29cXG4nICtcbiAgICAgICAgICAgICAgICcgICAgLCB7IGxlbmd0aCB9ID0gXCJuYW1lc1wiXFxuJyArXG4gICAgICAgICAgICAgICAnICAgICwgYWx0ID0gbmFtZXMnIH0pLFxuICAvLyBkZWVwIGRlc3RydWN0dXJpbmcgb25seSBjYXJlcyBhYm91dCB0b3AgbGV2ZWxcbiAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7JyArXG4gICAgICAgICAgICAgICAnY29uc3QgeyBFeHBvcnRlZENsYXNzOiB7IGxlbmd0aCB9IH0gPSBuYW1lcycgfSksXG5cbiAgLy8gZGV0ZWN0IHNjb3BlIHJlZGVmaW5pdGlvblxuICB0ZXN0KHsgY29kZTogJ2ltcG9ydCAqIGFzIG5hbWVzIGZyb20gXCIuL25hbWVkLWV4cG9ydHNcIjsnICtcbiAgICAgICAgICAgICAgICdmdW5jdGlvbiBiKG5hbWVzKSB7IGNvbnN0IHsgYyB9ID0gbmFtZXMgfScgfSksXG4gIHRlc3QoeyBjb2RlOiAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOycgK1xuICAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGIoKSB7IGxldCBuYW1lcyA9IG51bGw7IGNvbnN0IHsgYyB9ID0gbmFtZXMgfScgfSksXG4gIHRlc3QoeyBjb2RlOiAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOycgK1xuICAgICAgICAgICAgICAgJ2NvbnN0IHggPSBmdW5jdGlvbiBuYW1lcygpIHsgY29uc3QgeyBjIH0gPSBuYW1lcyB9JyB9KSxcblxuXG4gIC8vLy8vLy8vL1xuICAvLyBlczcgLy9cbiAgLy8vLy8vLy8vXG4gIHRlc3QoeyBjb2RlOiAnZXhwb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiJ1xuICAgICAgICwgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyB9KSxcbiAgdGVzdCh7IGNvZGU6ICdleHBvcnQgZGVmcG9ydCwgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInXG4gICAgICAgLCBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnIH0pLFxuICAvLyBub24tZXhpc3RlbnQgaXMgaGFuZGxlZCBieSBuby11bnJlc29sdmVkXG4gIHRlc3QoeyBjb2RlOiAnZXhwb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vZG9lcy1ub3QtZXhpc3RcIidcbiAgICAgICAsIHBhcnNlcjogJ2JhYmVsLWVzbGludCcgfSksXG5cbiAgdGVzdCh7XG4gICAgY29kZTogJ2ltcG9ydCAqIGFzIEVuZHBvaW50cyBmcm9tIFwiLi9pc3N1ZS0xOTUvRW5kcG9pbnRzXCI7IGNvbnNvbGUubG9nKEVuZHBvaW50cy5Vc2VycyknLFxuICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gIH0pLFxuXG4gIC8vIHJlc3BlY3QgaG9pc3RpbmdcbiAgdGVzdCh7XG4gICAgY29kZTpcbiAgICAgICdmdW5jdGlvbiB4KCkgeyBjb25zb2xlLmxvZygobmFtZXMuYikuYyk7IH0gJyArXG4gICAgICAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOyAnLFxuICB9KSxcblxuICAvLyBuYW1lcy5kZWZhdWx0IGlzIHZhbGlkIGV4cG9ydFxuICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgKiBhcyBuYW1lcyBmcm9tICcuL2RlZmF1bHQtZXhwb3J0JztcIiB9KSxcbiAgdGVzdCh7IGNvZGU6IFwiaW1wb3J0ICogYXMgbmFtZXMgZnJvbSAnLi9kZWZhdWx0LWV4cG9ydCc7IGNvbnNvbGUubG9nKG5hbWVzLmRlZmF1bHQpXCIgfSksXG4gIHRlc3Qoe1xuICAgY29kZTogJ2V4cG9ydCAqIGFzIG5hbWVzIGZyb20gXCIuL2RlZmF1bHQtZXhwb3J0XCInLFxuICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgfSksXG4gIHRlc3Qoe1xuICAgIGNvZGU6ICdleHBvcnQgZGVmcG9ydCwgKiBhcyBuYW1lcyBmcm9tIFwiLi9kZWZhdWx0LWV4cG9ydFwiJyxcbiAgICBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnLFxuICB9KSxcblxuICAuLi5TWU5UQVhfQ0FTRVMsXG5dXG5cbmNvbnN0IGludmFsaWQgPSBbXG4gIHRlc3Qoe2NvZGU6IFwiaW1wb3J0ICogYXMgZm9vIGZyb20gJy4vY29tbW9uJztcIixcbiAgICAgICAgZXJyb3JzOiBbXCJObyBleHBvcnRlZCBuYW1lcyBmb3VuZCBpbiBtb2R1bGUgJy4vY29tbW9uJy5cIl19KSxcblxuICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgKiBhcyBuYW1lcyBmcm9tICcuL25hbWVkLWV4cG9ydHMnOyBcIiArXG4gICAgICAgICAgICAgICAnIGNvbnNvbGUubG9nKG5hbWVzLmMpOydcbiAgICAgICAsIGVycm9yczogW2Vycm9yKCdjJywgJ25hbWVzJyldIH0pLFxuXG4gIHRlc3QoeyBjb2RlOiBcImltcG9ydCAqIGFzIG5hbWVzIGZyb20gJy4vbmFtZWQtZXhwb3J0cyc7XCIgK1xuICAgICAgICAgICAgICAgXCIgY29uc29sZS5sb2cobmFtZXNbJ2EnXSk7XCJcbiAgICAgICAsIGVycm9yczogW1wiVW5hYmxlIHRvIHZhbGlkYXRlIGNvbXB1dGVkIHJlZmVyZW5jZSB0byBpbXBvcnRlZCBuYW1lc3BhY2UgJ25hbWVzJy5cIl0gfSksXG5cbiAgLy8gYXNzaWdubWVudCB3YXJuaW5nIChmcm9tIG5vLXJlYXNzaWduKVxuICB0ZXN0KHsgY29kZTogJ2ltcG9ydCAqIGFzIGZvbyBmcm9tIFxcJy4vYmFyXFwnOyBmb28uZm9vID0gXFwneVxcJzsnXG4gICAgICAgLCBlcnJvcnM6IFt7IG1lc3NhZ2U6ICdBc3NpZ25tZW50IHRvIG1lbWJlciBvZiBuYW1lc3BhY2UgXFwnZm9vXFwnLid9XSB9KSxcbiAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBmb28gZnJvbSBcXCcuL2JhclxcJzsgZm9vLnggPSBcXCd5XFwnOydcbiAgICAgICAsIGVycm9yczogWydBc3NpZ25tZW50IHRvIG1lbWJlciBvZiBuYW1lc3BhY2UgXFwnZm9vXFwnLicsIFwiJ3gnIG5vdCBmb3VuZCBpbiBpbXBvcnRlZCBuYW1lc3BhY2UgJ2ZvbycuXCJdIH0pLFxuXG4gIC8vIGludmFsaWQgZGVzdHJ1Y3R1cmluZ1xuICB0ZXN0KHtcbiAgICBjb2RlOiAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOyBjb25zdCB7IGMgfSA9IG5hbWVzJyxcbiAgICBlcnJvcnM6IFt7IHR5cGU6ICdQcm9wZXJ0eScsIG1lc3NhZ2U6IFwiJ2MnIG5vdCBmb3VuZCBpbiBpbXBvcnRlZCBuYW1lc3BhY2UgJ25hbWVzJy5cIiB9XSxcbiAgfSksXG4gIHRlc3Qoe1xuICAgIGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7IGZ1bmN0aW9uIGIoKSB7IGNvbnN0IHsgYyB9ID0gbmFtZXMgfScsXG4gICAgZXJyb3JzOiBbeyB0eXBlOiAnUHJvcGVydHknLCBtZXNzYWdlOiBcIidjJyBub3QgZm91bmQgaW4gaW1wb3J0ZWQgbmFtZXNwYWNlICduYW1lcycuXCIgfV0sXG4gIH0pLFxuICB0ZXN0KHtcbiAgICBjb2RlOiAnaW1wb3J0ICogYXMgbmFtZXMgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOyBjb25zdCB7IGM6IGQgfSA9IG5hbWVzJyxcbiAgICBlcnJvcnM6IFt7IHR5cGU6ICdQcm9wZXJ0eScsIG1lc3NhZ2U6IFwiJ2MnIG5vdCBmb3VuZCBpbiBpbXBvcnRlZCBuYW1lc3BhY2UgJ25hbWVzJy5cIiB9XSxcbiAgfSksXG4gIHRlc3Qoe1xuICAgIGNvZGU6ICdpbXBvcnQgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7JyArXG4gICAgICAgICAgICdjb25zdCB7IGM6IHsgZCB9IH0gPSBuYW1lcycsXG4gICAgZXJyb3JzOiBbeyB0eXBlOiAnUHJvcGVydHknLCBtZXNzYWdlOiBcIidjJyBub3QgZm91bmQgaW4gaW1wb3J0ZWQgbmFtZXNwYWNlICduYW1lcycuXCIgfV0sXG4gIH0pLFxuXG4gIC8vLy8vLy8vL1xuICAvLyBlczcgLy9cbiAgLy8vLy8vLy8vXG5cbiAgdGVzdCh7XG4gICAgY29kZTogJ2ltcG9ydCAqIGFzIEVuZHBvaW50cyBmcm9tIFwiLi9pc3N1ZS0xOTUvRW5kcG9pbnRzXCI7IGNvbnNvbGUubG9nKEVuZHBvaW50cy5Gb28pJyxcbiAgICBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnLFxuICAgIGVycm9yczogW1wiJ0Zvbycgbm90IGZvdW5kIGluIGltcG9ydGVkIG5hbWVzcGFjZSAnRW5kcG9pbnRzJy5cIl0sXG4gIH0pLFxuXG4gIC8vIHBhcnNlIGVycm9yc1xuICB0ZXN0KHtcbiAgICBjb2RlOiBcImltcG9ydCAqIGFzIG5hbWVzcGFjZSBmcm9tICcuL21hbGZvcm1lZC5qcyc7XCIsXG4gICAgZXJyb3JzOiBbe1xuICAgICAgbWVzc2FnZTogXCJQYXJzZSBlcnJvcnMgaW4gaW1wb3J0ZWQgbW9kdWxlICcuL21hbGZvcm1lZC5qcyc6ICdyZXR1cm4nIG91dHNpZGUgb2YgZnVuY3Rpb24gKDE6MSlcIixcbiAgICAgIHR5cGU6ICdMaXRlcmFsJyxcbiAgICB9XSxcbiAgfSksXG5cbiAgdGVzdCh7XG4gICAgY29kZTogXCJpbXBvcnQgYiBmcm9tICcuL2RlZXAvZGVmYXVsdCc7IGNvbnNvbGUubG9nKGIuZSlcIixcbiAgICBlcnJvcnM6IFsgXCInZScgbm90IGZvdW5kIGluIGltcG9ydGVkIG5hbWVzcGFjZSAnYicuXCIgXSxcbiAgfSksXG5cbiAgLy8gcmVzcGVjdCBob2lzdGluZ1xuICB0ZXN0KHtcbiAgICBjb2RlOlxuICAgICAgJ2NvbnNvbGUubG9nKG5hbWVzLmMpOycgK1xuICAgICAgXCJpbXBvcnQgKiBhcyBuYW1lcyBmcm9tICcuL25hbWVkLWV4cG9ydHMnOyBcIixcbiAgICBlcnJvcnM6IFtlcnJvcignYycsICduYW1lcycpXSxcbiAgfSksXG4gIHRlc3Qoe1xuICAgIGNvZGU6XG4gICAgICAnZnVuY3Rpb24geCgpIHsgY29uc29sZS5sb2cobmFtZXMuYykgfSAnICtcbiAgICAgIFwiaW1wb3J0ICogYXMgbmFtZXMgZnJvbSAnLi9uYW1lZC1leHBvcnRzJzsgXCIsXG4gICAgZXJyb3JzOiBbZXJyb3IoJ2MnLCAnbmFtZXMnKV0sXG4gIH0pLFxuXG4gIC8vICMzMjg6ICogZXhwb3J0cyBkbyBub3QgaW5jbHVkZSBkZWZhdWx0XG4gIHRlc3Qoe1xuICAgIGNvZGU6ICdpbXBvcnQgKiBhcyByZWUgZnJvbSBcIi4vcmUtZXhwb3J0XCI7IGNvbnNvbGUubG9nKHJlZS5kZWZhdWx0KScsXG4gICAgZXJyb3JzOiBbYCdkZWZhdWx0JyBub3QgZm91bmQgaW4gaW1wb3J0ZWQgbmFtZXNwYWNlICdyZWUnLmBdLFxuICB9KSxcblxuXVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gZGVlcCBkZXJlZmVyZW5jZXMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbjtbWydkZWVwJywgJ2VzcHJlZSddLCBbJ2RlZXAtZXM3JywgJ2JhYmVsLWVzbGludCddXS5mb3JFYWNoKGZ1bmN0aW9uIChbZm9sZGVyLCBwYXJzZXJdKSB7IC8vIGNsb3NlIG92ZXIgcGFyYW1zXG4gIHZhbGlkLnB1c2goXG4gICAgdGVzdCh7IHBhcnNlciwgY29kZTogYGltcG9ydCAqIGFzIGEgZnJvbSBcIi4vJHtmb2xkZXJ9L2FcIjsgY29uc29sZS5sb2coYS5iLmMuZC5lKWAgfSksXG4gICAgdGVzdCh7IHBhcnNlciwgY29kZTogYGltcG9ydCB7IGIgfSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyBjb25zb2xlLmxvZyhiLmMuZC5lKWAgfSksXG4gICAgdGVzdCh7IHBhcnNlciwgY29kZTogYGltcG9ydCAqIGFzIGEgZnJvbSBcIi4vJHtmb2xkZXJ9L2FcIjsgY29uc29sZS5sb2coYS5iLmMuZC5lLmYpYCB9KSxcbiAgICB0ZXN0KHsgcGFyc2VyLCBjb2RlOiBgaW1wb3J0ICogYXMgYSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyB2YXIge2I6e2M6e2Q6e2V9fX19ID0gYWAgfSksXG4gICAgdGVzdCh7IHBhcnNlciwgY29kZTogYGltcG9ydCB7IGIgfSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyB2YXIge2M6e2Q6e2V9fX0gPSBiYCB9KSlcblxuICAgIC8vIGRlZXAgbmFtZXNwYWNlcyBzaG91bGQgaW5jbHVkZSBleHBsaWNpdGx5IGV4cG9ydGVkIGRlZmF1bHRzXG4gICAgdGVzdCh7IHBhcnNlciwgY29kZTogYGltcG9ydCAqIGFzIGEgZnJvbSBcIi4vJHtmb2xkZXJ9L2FcIjsgY29uc29sZS5sb2coYS5iLmRlZmF1bHQpYCB9KSxcblxuICBpbnZhbGlkLnB1c2goXG4gICAgdGVzdCh7XG4gICAgICBwYXJzZXIsXG4gICAgICBjb2RlOiBgaW1wb3J0ICogYXMgYSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyBjb25zb2xlLmxvZyhhLmIuZSlgLFxuICAgICAgZXJyb3JzOiBbIFwiJ2UnIG5vdCBmb3VuZCBpbiBkZWVwbHkgaW1wb3J0ZWQgbmFtZXNwYWNlICdhLmInLlwiIF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBwYXJzZXIsXG4gICAgICBjb2RlOiBgaW1wb3J0IHsgYiB9IGZyb20gXCIuLyR7Zm9sZGVyfS9hXCI7IGNvbnNvbGUubG9nKGIuZSlgLFxuICAgICAgZXJyb3JzOiBbIFwiJ2UnIG5vdCBmb3VuZCBpbiBpbXBvcnRlZCBuYW1lc3BhY2UgJ2InLlwiIF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBwYXJzZXIsXG4gICAgICBjb2RlOiBgaW1wb3J0ICogYXMgYSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyBjb25zb2xlLmxvZyhhLmIuYy5lKWAsXG4gICAgICBlcnJvcnM6IFsgXCInZScgbm90IGZvdW5kIGluIGRlZXBseSBpbXBvcnRlZCBuYW1lc3BhY2UgJ2EuYi5jJy5cIiBdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgcGFyc2VyLFxuICAgICAgY29kZTogYGltcG9ydCB7IGIgfSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyBjb25zb2xlLmxvZyhiLmMuZSlgLFxuICAgICAgZXJyb3JzOiBbIFwiJ2UnIG5vdCBmb3VuZCBpbiBkZWVwbHkgaW1wb3J0ZWQgbmFtZXNwYWNlICdiLmMnLlwiIF0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBwYXJzZXIsXG4gICAgICBjb2RlOiBgaW1wb3J0ICogYXMgYSBmcm9tIFwiLi8ke2ZvbGRlcn0vYVwiOyB2YXIge2I6eyBlIH19ID0gYWAsXG4gICAgICBlcnJvcnM6IFsgXCInZScgbm90IGZvdW5kIGluIGRlZXBseSBpbXBvcnRlZCBuYW1lc3BhY2UgJ2EuYicuXCIgXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIHBhcnNlcixcbiAgICAgIGNvZGU6IGBpbXBvcnQgKiBhcyBhIGZyb20gXCIuLyR7Zm9sZGVyfS9hXCI7IHZhciB7Yjp7Yzp7IGUgfX19ID0gYWAsXG4gICAgICBlcnJvcnM6IFsgXCInZScgbm90IGZvdW5kIGluIGRlZXBseSBpbXBvcnRlZCBuYW1lc3BhY2UgJ2EuYi5jJy5cIiBdLFxuICAgIH0pKVxufSlcblxucnVsZVRlc3Rlci5ydW4oJ25hbWVzcGFjZScsIHJ1bGUsIHsgdmFsaWQsIGludmFsaWQgfSlcbiJdfQ==