'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _utils = require('../utils');

var _eslint = require('eslint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-unresolved');

function runResolverTests(resolver) {
  // redefine 'test' to set a resolver
  // thus 'rest'. needed something 4-chars-long for formatting simplicity
  function rest(specs) {
    specs.settings = (0, _objectAssign2.default)({}, specs.settings, { 'import/resolver': resolver });

    return (0, _utils.test)(specs);
  }

  ruleTester.run('no-unresolved (' + resolver + ')', rule, {
    valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }), rest({ code: 'import foo from "./bar";' }), rest({ code: "import bar from './bar.js';" }), rest({ code: "import {someThing} from './test-module';" }), rest({ code: "import fs from 'fs';" }), rest({ code: 'import * as foo from "a"' }), rest({ code: 'export { foo } from "./bar"' }), rest({ code: 'export * from "./bar"' }), rest({ code: 'export { foo }' }),

    // stage 1 proposal for export symmetry,
    rest({ code: 'export * as bar from "./bar"',
      parser: 'babel-eslint' }), rest({ code: 'export bar from "./bar"',
      parser: 'babel-eslint' }), rest({ code: 'import foo from "./jsx/MyUnCoolComponent.jsx"' }),

    // commonjs setting
    rest({ code: 'var foo = require("./bar")',
      options: [{ commonjs: true }] }), rest({ code: 'require("./bar")',
      options: [{ commonjs: true }] }), rest({ code: 'require("./does-not-exist")',
      options: [{ commonjs: false }] }), rest({ code: 'require("./does-not-exist")' }),

    // amd setting
    rest({ code: 'require(["./bar"], function (bar) {})',
      options: [{ amd: true }] }), rest({ code: 'define(["./bar"], function (bar) {})',
      options: [{ amd: true }] }), rest({ code: 'require(["./does-not-exist"], function (bar) {})',
      options: [{ amd: false }] }),
    // magic modules: http://git.io/vByan
    rest({ code: 'define(["require", "exports", "module"], function (r, e, m) { })',
      options: [{ amd: true }] }),

    // don't validate without callback param
    rest({ code: 'require(["./does-not-exist"])',
      options: [{ amd: true }] }), rest({ code: 'define(["./does-not-exist"], function (bar) {})' }),

    // stress tests
    rest({ code: 'require("./does-not-exist", "another arg")',
      options: [{ commonjs: true, amd: true }] }), rest({ code: 'proxyquire("./does-not-exist")',
      options: [{ commonjs: true, amd: true }] }), rest({ code: '(function() {})("./does-not-exist")',
      options: [{ commonjs: true, amd: true }] }), rest({ code: 'define([0, foo], function (bar) {})',
      options: [{ amd: true }] }), rest({ code: 'require(0)',
      options: [{ commonjs: true }] }), rest({ code: 'require(foo)',
      options: [{ commonjs: true }] })],

    invalid: [rest({
      code: 'import reallyfake from "./reallyfake/module"',
      settings: { 'import/ignore': ['^\\./fake/'] },
      errors: [{ message: 'Unable to resolve path to module ' + '\'./reallyfake/module\'.' }]
    }), rest({
      code: "import bar from './baz';",
      errors: [{ message: "Unable to resolve path to module './baz'.",
        type: 'Literal' }]
    }), rest({ code: "import bar from './baz';",
      errors: [{ message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }] }), rest({
      code: "import bar from './empty-folder';",
      errors: [{ message: "Unable to resolve path to module './empty-folder'.",
        type: 'Literal'
      }] }),

    // sanity check that this module is _not_ found without proper settings
    rest({
      code: "import { DEEP } from 'in-alternate-root';",
      errors: [{ message: 'Unable to resolve path to ' + "module 'in-alternate-root'.",
        type: 'Literal'
      }] }), rest({ code: 'export { foo } from "./does-not-exist"',
      errors: ["Unable to resolve path to module './does-not-exist'."] }), rest({
      code: 'export * from "./does-not-exist"',
      errors: ["Unable to resolve path to module './does-not-exist'."]
    }),

    // export symmetry proposal
    rest({ code: 'export * as bar from "./does-not-exist"',
      parser: 'babel-eslint',
      errors: ["Unable to resolve path to module './does-not-exist'."]
    }), rest({ code: 'export bar from "./does-not-exist"',
      parser: 'babel-eslint',
      errors: ["Unable to resolve path to module './does-not-exist'."]
    }), rest({ code: 'import foo from "./jsx/MyUncoolComponent.jsx"',
      errors: ["Unable to resolve path to module './jsx/MyUncoolComponent.jsx'."] }),

    // commonjs setting
    rest({
      code: 'var bar = require("./baz")',
      options: [{ commonjs: true }],
      errors: [{
        message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }]
    }), rest({
      code: 'require("./baz")',
      options: [{ commonjs: true }],
      errors: [{
        message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }]
    }),

    // amd
    rest({
      code: 'require(["./baz"], function (bar) {})',
      options: [{ amd: true }],
      errors: [{
        message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }]
    }), rest({
      code: 'define(["./baz"], function (bar) {})',
      options: [{ amd: true }],
      errors: [{
        message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }]
    }), rest({
      code: 'define(["./baz", "./bar", "./does-not-exist"], function (bar) {})',
      options: [{ amd: true }],
      errors: [{
        message: "Unable to resolve path to module './baz'.",
        type: 'Literal'
      }, {
        message: "Unable to resolve path to module './does-not-exist'.",
        type: 'Literal'
      }]
    })]
  });
}

['node', 'webpack'].forEach(runResolverTests);

ruleTester.run('no-unresolved (import/resolve legacy)', rule, {
  valid: [(0, _utils.test)({
    code: "import { DEEP } from 'in-alternate-root';",
    settings: {
      'import/resolve': {
        'paths': [path.join(process.cwd(), 'tests', 'files', 'alternate-root')]
      }
    }
  }), (0, _utils.test)({
    code: "import { DEEP } from 'in-alternate-root'; " + "import { bar } from 'src-bar';",
    settings: { 'import/resolve': { 'paths': [path.join('tests', 'files', 'src-root'), path.join('tests', 'files', 'alternate-root')] } } }), (0, _utils.test)({
    code: 'import * as foo from "jsx-module/foo"',
    settings: { 'import/resolve': { 'extensions': ['.jsx'] } }
  })],

  invalid: [(0, _utils.test)({
    code: 'import * as foo from "jsx-module/foo"',
    errors: ["Unable to resolve path to module 'jsx-module/foo'."]
  })]
});

ruleTester.run('no-unresolved (webpack-specific)', rule, {
  valid: [(0, _utils.test)({
    // default webpack config in files/webpack.config.js knows about jsx
    code: 'import * as foo from "jsx-module/foo"',
    settings: { 'import/resolver': 'webpack' }
  }), (0, _utils.test)({
    // should ignore loaders
    code: 'import * as foo from "some-loader?with=args!jsx-module/foo"',
    settings: { 'import/resolver': 'webpack' }
  })],
  invalid: [(0, _utils.test)({
    // default webpack config in files/webpack.config.js knows about jsx
    code: 'import * as foo from "jsx-module/foo"',
    settings: {
      'import/resolver': { 'webpack': { 'config': 'webpack.empty.config.js' } }
    },
    errors: ["Unable to resolve path to module 'jsx-module/foo'."]
  })]
});

ruleTester.run('no-unresolved ignore list', rule, {
  valid: [(0, _utils.test)({
    code: 'import "./malformed.js"',
    options: [{ ignore: ['\.png$', '\.gif$'] }]
  }), (0, _utils.test)({
    code: 'import "./test.giffy"',
    options: [{ ignore: ['\.png$', '\.gif$'] }]
  }), (0, _utils.test)({
    code: 'import "./test.gif"',
    options: [{ ignore: ['\.png$', '\.gif$'] }]
  }), (0, _utils.test)({
    code: 'import "./test.png"',
    options: [{ ignore: ['\.png$', '\.gif$'] }]
  })],

  invalid: [(0, _utils.test)({
    code: 'import "./test.gif"',
    options: [{ ignore: ['\.png$'] }],
    errors: ["Unable to resolve path to module './test.gif'."]
  }), (0, _utils.test)({
    code: 'import "./test.png"',
    options: [{ ignore: ['\.gif$'] }],
    errors: ["Unable to resolve path to module './test.png'."]
  })]
});

ruleTester.run('no-unresolved unknown resolver', rule, {
  valid: [],

  invalid: [

  // logs resolver load error
  (0, _utils.test)({
    code: 'import "./malformed.js"',
    settings: { 'import/resolver': 'foo' },
    errors: ['Resolve error: unable to load resolver "foo".', 'Unable to resolve path to module \'./malformed.js\'.']
  }),

  // only logs resolver message once
  (0, _utils.test)({
    code: 'import "./malformed.js"; import "./fake.js"',
    settings: { 'import/resolver': 'foo' },
    errors: ['Resolve error: unable to load resolver "foo".', 'Unable to resolve path to module \'./malformed.js\'.', 'Unable to resolve path to module \'./fake.js\'.']
  })]
});
//# sourceMappingURL=data:application/json;base64,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QUFFLGdEQUFGO0FBSEwsR0FBTCxDQVBNO0FBdEJ3QyxDQUFsRDs7QUFxQ0EsV0FBVyxHQUFYLENBQWUsZ0NBQWYsRUFBaUQsSUFBakQsRUFBdUQ7QUFDckQsU0FBTyxFQUQ4Qzs7QUFHckQsV0FBUTs7O0FBR04sbUJBQUs7QUFDSCxVQUFNLHlCQURIO0FBRUgsY0FBVSxFQUFFLG1CQUFtQixLQUFyQixFQUZQO0FBR0gsWUFBUTtBQUhMLEdBQUwsQ0FITTs7O0FBYU4sbUJBQUs7QUFDSCxVQUFNLDZDQURIO0FBRUgsY0FBVSxFQUFFLG1CQUFtQixLQUFyQixFQUZQO0FBR0gsWUFBUTtBQUhMLEdBQUwsQ0FiTTtBQUg2QyxDQUF2RCIsImZpbGUiOiJydWxlcy9uby11bnJlc29sdmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbnZhciBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAsIHJ1bGUgPSByZXF1aXJlKCdydWxlcy9uby11bnJlc29sdmVkJylcblxuZnVuY3Rpb24gcnVuUmVzb2x2ZXJUZXN0cyhyZXNvbHZlcikge1xuICAvLyByZWRlZmluZSAndGVzdCcgdG8gc2V0IGEgcmVzb2x2ZXJcbiAgLy8gdGh1cyAncmVzdCcuIG5lZWRlZCBzb21ldGhpbmcgNC1jaGFycy1sb25nIGZvciBmb3JtYXR0aW5nIHNpbXBsaWNpdHlcbiAgZnVuY3Rpb24gcmVzdChzcGVjcykge1xuICAgIHNwZWNzLnNldHRpbmdzID0gYXNzaWduKHt9LFxuICAgICAgc3BlY3Muc2V0dGluZ3MsXG4gICAgICB7ICdpbXBvcnQvcmVzb2x2ZXInOiByZXNvbHZlciB9XG4gICAgKVxuXG4gICAgcmV0dXJuIHRlc3Qoc3BlY3MpXG4gIH1cblxuICBydWxlVGVzdGVyLnJ1bihgbm8tdW5yZXNvbHZlZCAoJHtyZXNvbHZlcn0pYCwgcnVsZSwge1xuICAgIHZhbGlkOiBbXG4gICAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcIi4vbWFsZm9ybWVkLmpzXCInIH0pLFxuXG4gICAgICByZXN0KHsgY29kZTogJ2ltcG9ydCBmb28gZnJvbSBcIi4vYmFyXCI7JyB9KSxcbiAgICAgIHJlc3QoeyBjb2RlOiBcImltcG9ydCBiYXIgZnJvbSAnLi9iYXIuanMnO1wiIH0pLFxuICAgICAgcmVzdCh7IGNvZGU6IFwiaW1wb3J0IHtzb21lVGhpbmd9IGZyb20gJy4vdGVzdC1tb2R1bGUnO1wiIH0pLFxuICAgICAgcmVzdCh7IGNvZGU6IFwiaW1wb3J0IGZzIGZyb20gJ2ZzJztcIiB9KSxcblxuICAgICAgcmVzdCh7IGNvZGU6ICdpbXBvcnQgKiBhcyBmb28gZnJvbSBcImFcIicgfSksXG5cbiAgICAgIHJlc3QoeyBjb2RlOiAnZXhwb3J0IHsgZm9vIH0gZnJvbSBcIi4vYmFyXCInIH0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdleHBvcnQgKiBmcm9tIFwiLi9iYXJcIicgfSksXG4gICAgICByZXN0KHsgY29kZTogJ2V4cG9ydCB7IGZvbyB9JyB9KSxcblxuICAgICAgLy8gc3RhZ2UgMSBwcm9wb3NhbCBmb3IgZXhwb3J0IHN5bW1ldHJ5LFxuICAgICAgcmVzdCh7IGNvZGU6ICdleHBvcnQgKiBhcyBiYXIgZnJvbSBcIi4vYmFyXCInXG4gICAgICAgICAgICwgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyB9KSxcbiAgICAgIHJlc3QoeyBjb2RlOiAnZXhwb3J0IGJhciBmcm9tIFwiLi9iYXJcIidcbiAgICAgICAgICAgLCBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnIH0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdpbXBvcnQgZm9vIGZyb20gXCIuL2pzeC9NeVVuQ29vbENvbXBvbmVudC5qc3hcIicgfSksXG5cbiAgICAgIC8vIGNvbW1vbmpzIHNldHRpbmdcbiAgICAgIHJlc3QoeyBjb2RlOiAndmFyIGZvbyA9IHJlcXVpcmUoXCIuL2JhclwiKSdcbiAgICAgICAgICAgLCBvcHRpb25zOiBbeyBjb21tb25qczogdHJ1ZSB9XX0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdyZXF1aXJlKFwiLi9iYXJcIiknXG4gICAgICAgICAgICwgb3B0aW9uczogW3sgY29tbW9uanM6IHRydWUgfV19KSxcbiAgICAgIHJlc3QoeyBjb2RlOiAncmVxdWlyZShcIi4vZG9lcy1ub3QtZXhpc3RcIiknXG4gICAgICAgICAgICwgb3B0aW9uczogW3sgY29tbW9uanM6IGZhbHNlIH1dfSksXG4gICAgICByZXN0KHsgY29kZTogJ3JlcXVpcmUoXCIuL2RvZXMtbm90LWV4aXN0XCIpJyB9KSxcblxuICAgICAgLy8gYW1kIHNldHRpbmdcbiAgICAgIHJlc3QoeyBjb2RlOiAncmVxdWlyZShbXCIuL2JhclwiXSwgZnVuY3Rpb24gKGJhcikge30pJ1xuICAgICAgICAgICAsIG9wdGlvbnM6IFt7IGFtZDogdHJ1ZSB9XX0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdkZWZpbmUoW1wiLi9iYXJcIl0sIGZ1bmN0aW9uIChiYXIpIHt9KSdcbiAgICAgICAgICAgLCBvcHRpb25zOiBbeyBhbWQ6IHRydWUgfV19KSxcbiAgICAgIHJlc3QoeyBjb2RlOiAncmVxdWlyZShbXCIuL2RvZXMtbm90LWV4aXN0XCJdLCBmdW5jdGlvbiAoYmFyKSB7fSknXG4gICAgICAgICAgICwgb3B0aW9uczogW3sgYW1kOiBmYWxzZSB9XX0pLFxuICAgICAgLy8gbWFnaWMgbW9kdWxlczogaHR0cDovL2dpdC5pby92QnlhblxuICAgICAgcmVzdCh7IGNvZGU6ICdkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJtb2R1bGVcIl0sIGZ1bmN0aW9uIChyLCBlLCBtKSB7IH0pJ1xuICAgICAgICAgICAsIG9wdGlvbnM6IFt7IGFtZDogdHJ1ZSB9XX0pLFxuXG4gICAgICAvLyBkb24ndCB2YWxpZGF0ZSB3aXRob3V0IGNhbGxiYWNrIHBhcmFtXG4gICAgICByZXN0KHsgY29kZTogJ3JlcXVpcmUoW1wiLi9kb2VzLW5vdC1leGlzdFwiXSknXG4gICAgICAgICAgICwgb3B0aW9uczogW3sgYW1kOiB0cnVlIH1dfSksXG4gICAgICByZXN0KHsgY29kZTogJ2RlZmluZShbXCIuL2RvZXMtbm90LWV4aXN0XCJdLCBmdW5jdGlvbiAoYmFyKSB7fSknIH0pLFxuXG4gICAgICAvLyBzdHJlc3MgdGVzdHNcbiAgICAgIHJlc3QoeyBjb2RlOiAncmVxdWlyZShcIi4vZG9lcy1ub3QtZXhpc3RcIiwgXCJhbm90aGVyIGFyZ1wiKSdcbiAgICAgICAgICAgLCBvcHRpb25zOiBbeyBjb21tb25qczogdHJ1ZSwgYW1kOiB0cnVlIH1dfSksXG4gICAgICByZXN0KHsgY29kZTogJ3Byb3h5cXVpcmUoXCIuL2RvZXMtbm90LWV4aXN0XCIpJ1xuICAgICAgICAgICAsIG9wdGlvbnM6IFt7IGNvbW1vbmpzOiB0cnVlLCBhbWQ6IHRydWUgfV19KSxcbiAgICAgIHJlc3QoeyBjb2RlOiAnKGZ1bmN0aW9uKCkge30pKFwiLi9kb2VzLW5vdC1leGlzdFwiKSdcbiAgICAgICAgICAgLCBvcHRpb25zOiBbeyBjb21tb25qczogdHJ1ZSwgYW1kOiB0cnVlIH1dfSksXG4gICAgICByZXN0KHsgY29kZTogJ2RlZmluZShbMCwgZm9vXSwgZnVuY3Rpb24gKGJhcikge30pJ1xuICAgICAgICAgICAsIG9wdGlvbnM6IFt7IGFtZDogdHJ1ZSB9XX0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdyZXF1aXJlKDApJ1xuICAgICAgICAgICAsIG9wdGlvbnM6IFt7IGNvbW1vbmpzOiB0cnVlIH1dfSksXG4gICAgICByZXN0KHsgY29kZTogJ3JlcXVpcmUoZm9vKSdcbiAgICAgICAgICAgLCBvcHRpb25zOiBbeyBjb21tb25qczogdHJ1ZSB9XX0pLFxuXG4gICAgXSxcblxuICAgIGludmFsaWQ6IFtcbiAgICAgIHJlc3Qoe1xuICAgICAgICBjb2RlOiAnaW1wb3J0IHJlYWxseWZha2UgZnJvbSBcIi4vcmVhbGx5ZmFrZS9tb2R1bGVcIicsXG4gICAgICAgIHNldHRpbmdzOiB7ICdpbXBvcnQvaWdub3JlJzogWydeXFxcXC4vZmFrZS8nXSB9LFxuICAgICAgICBlcnJvcnM6IFt7IG1lc3NhZ2U6ICdVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXFwnLi9yZWFsbHlmYWtlL21vZHVsZVxcJy4nIH1dLFxuICAgICAgfSksXG5cblxuICAgICAgcmVzdCh7XG4gICAgICAgIGNvZGU6IFwiaW1wb3J0IGJhciBmcm9tICcuL2Jheic7XCIsXG4gICAgICAgIGVycm9yczogW3sgbWVzc2FnZTogXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi9iYXonLlwiXG4gICAgICAgICAgICAgICAgICwgdHlwZTogJ0xpdGVyYWwnIH1dLFxuICAgICAgfSksXG4gICAgICByZXN0KHsgY29kZTogXCJpbXBvcnQgYmFyIGZyb20gJy4vYmF6JztcIlxuICAgICAgICAgICAsIGVycm9yczogW3sgbWVzc2FnZTogXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi9iYXonLlwiXG4gICAgICAgICAgICAgICAgICAgICAgLCB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgfV0gfSksXG4gICAgICByZXN0KHtcbiAgICAgICAgY29kZTogXCJpbXBvcnQgYmFyIGZyb20gJy4vZW1wdHktZm9sZGVyJztcIixcbiAgICAgICAgZXJyb3JzOiBbeyBtZXNzYWdlOiBcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2VtcHR5LWZvbGRlcicuXCJcbiAgICAgICAgICAgICAgICAgLCB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICAgICAgICAgICAgIH1dfSksXG5cbiAgICAgIC8vIHNhbml0eSBjaGVjayB0aGF0IHRoaXMgbW9kdWxlIGlzIF9ub3RfIGZvdW5kIHdpdGhvdXQgcHJvcGVyIHNldHRpbmdzXG4gICAgICByZXN0KHtcbiAgICAgICAgY29kZTogXCJpbXBvcnQgeyBERUVQIH0gZnJvbSAnaW4tYWx0ZXJuYXRlLXJvb3QnO1wiLFxuICAgICAgICBlcnJvcnM6IFt7IG1lc3NhZ2U6ICdVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9kdWxlICdpbi1hbHRlcm5hdGUtcm9vdCcuXCJcbiAgICAgICAgICAgICAgICAgLCB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICAgICAgICAgICAgIH1dfSksXG5cbiAgICAgIHJlc3QoeyBjb2RlOiAnZXhwb3J0IHsgZm9vIH0gZnJvbSBcIi4vZG9lcy1ub3QtZXhpc3RcIidcbiAgICAgICAgICAgLCBlcnJvcnM6IFtcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2RvZXMtbm90LWV4aXN0Jy5cIl0gfSksXG4gICAgICByZXN0KHtcbiAgICAgICAgY29kZTogJ2V4cG9ydCAqIGZyb20gXCIuL2RvZXMtbm90LWV4aXN0XCInLFxuICAgICAgICBlcnJvcnM6IFtcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2RvZXMtbm90LWV4aXN0Jy5cIl0sXG4gICAgICB9KSxcblxuICAgICAgLy8gZXhwb3J0IHN5bW1ldHJ5IHByb3Bvc2FsXG4gICAgICByZXN0KHsgY29kZTogJ2V4cG9ydCAqIGFzIGJhciBmcm9tIFwiLi9kb2VzLW5vdC1leGlzdFwiJ1xuICAgICAgICAgICAsIHBhcnNlcjogJ2JhYmVsLWVzbGludCdcbiAgICAgICAgICAgLCBlcnJvcnM6IFtcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2RvZXMtbm90LWV4aXN0Jy5cIl0sXG4gICAgICAgICAgIH0pLFxuICAgICAgcmVzdCh7IGNvZGU6ICdleHBvcnQgYmFyIGZyb20gXCIuL2RvZXMtbm90LWV4aXN0XCInXG4gICAgICAgICAgICwgcGFyc2VyOiAnYmFiZWwtZXNsaW50J1xuICAgICAgICAgICAsIGVycm9yczogW1wiVW5hYmxlIHRvIHJlc29sdmUgcGF0aCB0byBtb2R1bGUgJy4vZG9lcy1ub3QtZXhpc3QnLlwiXSxcbiAgICAgICAgICAgfSksXG5cbiAgICAgIHJlc3QoeyBjb2RlOiAnaW1wb3J0IGZvbyBmcm9tIFwiLi9qc3gvTXlVbmNvb2xDb21wb25lbnQuanN4XCInXG4gICAgICAgICAgICwgZXJyb3JzOiBbXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi9qc3gvTXlVbmNvb2xDb21wb25lbnQuanN4Jy5cIl0gfSksXG5cblxuICAgICAgLy8gY29tbW9uanMgc2V0dGluZ1xuICAgICAgcmVzdCh7XG4gICAgICAgIGNvZGU6ICd2YXIgYmFyID0gcmVxdWlyZShcIi4vYmF6XCIpJyxcbiAgICAgICAgb3B0aW9uczogW3sgY29tbW9uanM6IHRydWUgfV0sXG4gICAgICAgIGVycm9yczogW3tcbiAgICAgICAgICBtZXNzYWdlOiBcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2JheicuXCIsXG4gICAgICAgICAgdHlwZTogJ0xpdGVyYWwnLFxuICAgICAgICB9XSxcbiAgICAgIH0pLFxuICAgICAgcmVzdCh7XG4gICAgICAgIGNvZGU6ICdyZXF1aXJlKFwiLi9iYXpcIiknLFxuICAgICAgICBvcHRpb25zOiBbeyBjb21tb25qczogdHJ1ZSB9XSxcbiAgICAgICAgZXJyb3JzOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6IFwiVW5hYmxlIHRvIHJlc29sdmUgcGF0aCB0byBtb2R1bGUgJy4vYmF6Jy5cIixcbiAgICAgICAgICB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICAgIH1dLFxuICAgICAgfSksXG5cbiAgICAgIC8vIGFtZFxuICAgICAgcmVzdCh7XG4gICAgICAgIGNvZGU6ICdyZXF1aXJlKFtcIi4vYmF6XCJdLCBmdW5jdGlvbiAoYmFyKSB7fSknLFxuICAgICAgICBvcHRpb25zOiBbeyBhbWQ6IHRydWUgfV0sXG4gICAgICAgIGVycm9yczogW3tcbiAgICAgICAgICBtZXNzYWdlOiBcIlVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2JheicuXCIsXG4gICAgICAgICAgdHlwZTogJ0xpdGVyYWwnLFxuICAgICAgICB9XSxcbiAgICAgIH0pLFxuICAgICAgcmVzdCh7XG4gICAgICAgIGNvZGU6ICdkZWZpbmUoW1wiLi9iYXpcIl0sIGZ1bmN0aW9uIChiYXIpIHt9KScsXG4gICAgICAgIG9wdGlvbnM6IFt7IGFtZDogdHJ1ZSB9XSxcbiAgICAgICAgZXJyb3JzOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6IFwiVW5hYmxlIHRvIHJlc29sdmUgcGF0aCB0byBtb2R1bGUgJy4vYmF6Jy5cIixcbiAgICAgICAgICB0eXBlOiAnTGl0ZXJhbCcsXG4gICAgICAgIH1dLFxuICAgICAgfSksXG4gICAgICByZXN0KHtcbiAgICAgICAgY29kZTogJ2RlZmluZShbXCIuL2JhelwiLCBcIi4vYmFyXCIsIFwiLi9kb2VzLW5vdC1leGlzdFwiXSwgZnVuY3Rpb24gKGJhcikge30pJyxcbiAgICAgICAgb3B0aW9uczogW3sgYW1kOiB0cnVlIH1dLFxuICAgICAgICBlcnJvcnM6IFt7XG4gICAgICAgICAgbWVzc2FnZTogXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi9iYXonLlwiLFxuICAgICAgICAgIHR5cGU6ICdMaXRlcmFsJyxcbiAgICAgICAgfSx7XG4gICAgICAgICAgbWVzc2FnZTogXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi9kb2VzLW5vdC1leGlzdCcuXCIsXG4gICAgICAgICAgdHlwZTogJ0xpdGVyYWwnLFxuICAgICAgICB9XSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pXG59XG5cblsnbm9kZScsICd3ZWJwYWNrJ10uZm9yRWFjaChydW5SZXNvbHZlclRlc3RzKVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tdW5yZXNvbHZlZCAoaW1wb3J0L3Jlc29sdmUgbGVnYWN5KScsIHJ1bGUsIHtcbiAgdmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgREVFUCB9IGZyb20gJ2luLWFsdGVybmF0ZS1yb290JztcIixcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICdpbXBvcnQvcmVzb2x2ZSc6IHtcbiAgICAgICAgICAncGF0aHMnOiBbcGF0aC5qb2luKCBwcm9jZXNzLmN3ZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ3Rlc3RzJywgJ2ZpbGVzJywgJ2FsdGVybmF0ZS1yb290JyldLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJpbXBvcnQgeyBERUVQIH0gZnJvbSAnaW4tYWx0ZXJuYXRlLXJvb3QnOyBcIiArXG4gICAgICAgICAgICBcImltcG9ydCB7IGJhciB9IGZyb20gJ3NyYy1iYXInO1wiLFxuICAgICAgc2V0dGluZ3M6IHsnaW1wb3J0L3Jlc29sdmUnOiB7ICdwYXRocyc6IFtcbiAgICAgICAgcGF0aC5qb2luKCd0ZXN0cycsICdmaWxlcycsICdzcmMtcm9vdCcpLFxuICAgICAgICBwYXRoLmpvaW4oJ3Rlc3RzJywgJ2ZpbGVzJywgJ2FsdGVybmF0ZS1yb290JyksXG4gICAgICBdfX19KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCAqIGFzIGZvbyBmcm9tIFwianN4LW1vZHVsZS9mb29cIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L3Jlc29sdmUnOiB7ICdleHRlbnNpb25zJzogWycuanN4J10gfSB9LFxuICAgIH0pLFxuICBdLFxuXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgKiBhcyBmb28gZnJvbSBcImpzeC1tb2R1bGUvZm9vXCInLFxuICAgICAgZXJyb3JzOiBbIFwiVW5hYmxlIHRvIHJlc29sdmUgcGF0aCB0byBtb2R1bGUgJ2pzeC1tb2R1bGUvZm9vJy5cIiBdLFxuICAgIH0pLFxuICBdLFxufSlcblxucnVsZVRlc3Rlci5ydW4oJ25vLXVucmVzb2x2ZWQgKHdlYnBhY2stc3BlY2lmaWMpJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3Qoe1xuICAgICAgLy8gZGVmYXVsdCB3ZWJwYWNrIGNvbmZpZyBpbiBmaWxlcy93ZWJwYWNrLmNvbmZpZy5qcyBrbm93cyBhYm91dCBqc3hcbiAgICAgIGNvZGU6ICdpbXBvcnQgKiBhcyBmb28gZnJvbSBcImpzeC1tb2R1bGUvZm9vXCInLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlcic6ICd3ZWJwYWNrJyB9LFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgLy8gc2hvdWxkIGlnbm9yZSBsb2FkZXJzXG4gICAgICBjb2RlOiAnaW1wb3J0ICogYXMgZm9vIGZyb20gXCJzb21lLWxvYWRlcj93aXRoPWFyZ3MhanN4LW1vZHVsZS9mb29cIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L3Jlc29sdmVyJzogJ3dlYnBhY2snIH0sXG4gICAgfSksXG4gIF0sXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIC8vIGRlZmF1bHQgd2VicGFjayBjb25maWcgaW4gZmlsZXMvd2VicGFjay5jb25maWcuanMga25vd3MgYWJvdXQganN4XG4gICAgICBjb2RlOiAnaW1wb3J0ICogYXMgZm9vIGZyb20gXCJqc3gtbW9kdWxlL2Zvb1wiJyxcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICdpbXBvcnQvcmVzb2x2ZXInOiB7ICd3ZWJwYWNrJzogeyAnY29uZmlnJzogJ3dlYnBhY2suZW1wdHkuY29uZmlnLmpzJyB9IH0sXG4gICAgICB9LFxuICAgICAgZXJyb3JzOiBbIFwiVW5hYmxlIHRvIHJlc29sdmUgcGF0aCB0byBtb2R1bGUgJ2pzeC1tb2R1bGUvZm9vJy5cIiBdLFxuICAgIH0pLFxuICBdLFxufSlcblxuXG5ydWxlVGVzdGVyLnJ1bignbm8tdW5yZXNvbHZlZCBpZ25vcmUgbGlzdCcsIHJ1bGUsIHtcbiAgdmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgXCIuL21hbGZvcm1lZC5qc1wiJyxcbiAgICAgIG9wdGlvbnM6IFt7IGlnbm9yZTogWydcXC5wbmckJywgJ1xcLmdpZiQnXX1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcIi4vdGVzdC5naWZmeVwiJyxcbiAgICAgIG9wdGlvbnM6IFt7IGlnbm9yZTogWydcXC5wbmckJywgJ1xcLmdpZiQnXX1dLFxuICAgIH0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IFwiLi90ZXN0LmdpZlwiJyxcbiAgICAgIG9wdGlvbnM6IFt7IGlnbm9yZTogWydcXC5wbmckJywgJ1xcLmdpZiQnXX1dLFxuICAgIH0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IFwiLi90ZXN0LnBuZ1wiJyxcbiAgICAgIG9wdGlvbnM6IFt7IGlnbm9yZTogWydcXC5wbmckJywgJ1xcLmdpZiQnXX1dLFxuICAgIH0pLFxuICBdLFxuXG4gIGludmFsaWQ6W1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcIi4vdGVzdC5naWZcIicsXG4gICAgICBvcHRpb25zOiBbeyBpZ25vcmU6IFsnXFwucG5nJCddfV0sXG4gICAgICBlcnJvcnM6IFsgXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi90ZXN0LmdpZicuXCIgXSxcbiAgICB9KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcIi4vdGVzdC5wbmdcIicsXG4gICAgICBvcHRpb25zOiBbeyBpZ25vcmU6IFsnXFwuZ2lmJCddfV0sXG4gICAgICBlcnJvcnM6IFsgXCJVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnLi90ZXN0LnBuZycuXCIgXSxcbiAgICB9KSxcbiAgXSxcbn0pXG5cbnJ1bGVUZXN0ZXIucnVuKCduby11bnJlc29sdmVkIHVua25vd24gcmVzb2x2ZXInLCBydWxlLCB7XG4gIHZhbGlkOiBbXSxcblxuICBpbnZhbGlkOltcblxuICAgIC8vIGxvZ3MgcmVzb2x2ZXIgbG9hZCBlcnJvclxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcIi4vbWFsZm9ybWVkLmpzXCInLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlcic6ICdmb28nIH0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgYFJlc29sdmUgZXJyb3I6IHVuYWJsZSB0byBsb2FkIHJlc29sdmVyIFwiZm9vXCIuYCxcbiAgICAgICAgYFVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL21hbGZvcm1lZC5qcycuYCxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBvbmx5IGxvZ3MgcmVzb2x2ZXIgbWVzc2FnZSBvbmNlXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IFwiLi9tYWxmb3JtZWQuanNcIjsgaW1wb3J0IFwiLi9mYWtlLmpzXCInLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlcic6ICdmb28nIH0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgYFJlc29sdmUgZXJyb3I6IHVuYWJsZSB0byBsb2FkIHJlc29sdmVyIFwiZm9vXCIuYCxcbiAgICAgICAgYFVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL21hbGZvcm1lZC5qcycuYCxcbiAgICAgICAgYFVuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlICcuL2Zha2UuanMnLmAsXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==