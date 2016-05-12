'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/order');

ruleTester.run('order', rule, {
  valid: [
  // Default order using require
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var async = require(\'async\');\n        var relParent1 = require(\'../foo\');\n        var relParent2 = require(\'../foo/bar\');\n        var relParent3 = require(\'../\');\n        var sibling = require(\'./foo\');\n        var index = require(\'./\');'
  }),
  // Default order using import
  (0, _utils.test)({
    code: '\n        import fs from \'fs\';\n        import async, {foo1} from \'async\';\n        import relParent1 from \'../foo\';\n        import relParent2, {foo2} from \'../foo/bar\';\n        import relParent3 from \'../\';\n        import sibling, {foo3} from \'./foo\';\n        import index from \'./\';'
  }),
  // Multiple module of the same rank next to each other
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var fs = require(\'fs\');\n        var path = require(\'path\');\n        var _ = require(\'lodash\');\n        var async = require(\'async\');'
  }),
  // Overriding order to be the reverse of the default order
  (0, _utils.test)({
    code: '\n        var index = require(\'./\');\n        var sibling = require(\'./foo\');\n        var relParent3 = require(\'../\');\n        var relParent2 = require(\'../foo/bar\');\n        var relParent1 = require(\'../foo\');\n        var async = require(\'async\');\n        var fs = require(\'fs\');\n      ',
    options: [{ groups: ['index', 'sibling', 'parent', 'external', 'builtin'] }]
  }),
  // Ignore dynamic requires
  (0, _utils.test)({
    code: '\n        var path = require(\'path\');\n        var _ = require(\'lodash\');\n        var async = require(\'async\');\n        var fs = require(\'f\' + \'s\');'
  }),
  // Ignore non-require call expressions
  (0, _utils.test)({
    code: '\n        var path = require(\'path\');\n        var result = add(1, 2);\n        var _ = require(\'lodash\');'
  }),
  // Ignore requires that are not at the top-level
  (0, _utils.test)({
    code: '\n        var index = require(\'./\');\n        function foo() {\n          var fs = require(\'fs\');\n        }\n        () => require(\'fs\');\n        if (a) {\n          require(\'fs\');\n        }'
  }),
  // Ignore unknown/invalid cases
  (0, _utils.test)({
    code: '\n        var unknown1 = require(\'/unknown1\');\n        var fs = require(\'fs\');\n        var unknown2 = require(\'/unknown2\');\n        var async = require(\'async\');\n        var unknown3 = require(\'/unknown3\');\n        var foo = require(\'../foo\');\n        var unknown4 = require(\'/unknown4\');\n        var bar = require(\'../foo/bar\');\n        var unknown5 = require(\'/unknown5\');\n        var parent = require(\'../\');\n        var unknown6 = require(\'/unknown6\');\n        var foo = require(\'./foo\');\n        var unknown7 = require(\'/unknown7\');\n        var index = require(\'./\');\n        var unknown8 = require(\'/unknown8\');\n    ' }),
  // Ignoring unassigned values by default (require)
  (0, _utils.test)({
    code: '\n        require(\'./foo\');\n        require(\'fs\');\n        var path = require(\'path\');\n    ' }),
  // Ignoring unassigned values by default (import)
  (0, _utils.test)({
    code: '\n        import \'./foo\';\n        import \'fs\';\n        import path from \'path\';\n    ' }),
  // No imports
  (0, _utils.test)({
    code: '\n        function add(a, b) {\n          return a + b;\n        }\n        var foo;\n    ' }),
  // Grouping import types
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var path = require(\'path\');\n\n        var sibling = require(\'./foo\');\n        var relParent3 = require(\'../\');\n        var async = require(\'async\');\n        var relParent1 = require(\'../foo\');\n      ',
    options: [{ groups: [['builtin', 'index'], ['sibling', 'parent', 'external']] }]
  }),
  // Omitted types should implicitly be considered as the last type
  (0, _utils.test)({
    code: '\n        var index = require(\'./\');\n        var path = require(\'path\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', 'external']] }]
  }),
  // missing 'builtin'

  // Mixing require and import should have import up top
  (0, _utils.test)({
    code: '\n        import async, {foo1} from \'async\';\n        import relParent2, {foo2} from \'../foo/bar\';\n        import sibling, {foo3} from \'./foo\';\n        var fs = require(\'fs\');\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        var index = require(\'./\');\n      '
  }),
  // Option: newlines-between: 'always'
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var path = require(\'path\');\n\n        var sibling = require(\'./foo\');\n\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling'], ['parent', 'external']],
      'newlines-between': 'always'
    }]
  }),
  // Option: newlines-between: 'never'
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var path = require(\'path\');\n        var sibling = require(\'./foo\');\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling'], ['parent', 'external']],
      'newlines-between': 'never'
    }]
  })],
  invalid: [
  // builtin before external module (require)
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        var fs = require(\'fs\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur before import of `async`'
    }]
  }),
  // builtin before external module (import)
  (0, _utils.test)({
    code: '\n        import async from \'async\';\n        import fs from \'fs\';\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur before import of `async`'
    }]
  }),
  // builtin before external module (mixed import and require)
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        import fs from \'fs\';\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur before import of `async`'
    }]
  }),
  // external before parent
  (0, _utils.test)({
    code: '\n        var parent = require(\'../parent\');\n        var async = require(\'async\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`async` import should occur before import of `../parent`'
    }]
  }),
  // parent before sibling
  (0, _utils.test)({
    code: '\n        var sibling = require(\'./sibling\');\n        var parent = require(\'../parent\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`../parent` import should occur before import of `./sibling`'
    }]
  }),
  // sibling before index
  (0, _utils.test)({
    code: '\n        var index = require(\'./\');\n        var sibling = require(\'./sibling\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`./sibling` import should occur before import of `./`'
    }]
  }),
  // Multiple errors
  (0, _utils.test)({
    code: '\n        var sibling = require(\'./sibling\');\n        var async = require(\'async\');\n        var fs = require(\'fs\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`async` import should occur before import of `./sibling`'
    }, {
      ruleId: 'order',
      message: '`fs` import should occur before import of `./sibling`'
    }]
  }),
  // Uses 'after' wording if it creates less errors
  (0, _utils.test)({
    code: '\n        var index = require(\'./\');\n        var fs = require(\'fs\');\n        var path = require(\'path\');\n        var _ = require(\'lodash\');\n        var foo = require(\'foo\');\n        var bar = require(\'bar\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`./` import should occur after import of `bar`'
    }]
  }),
  // Overriding order to be the reverse of the default order
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n      ',
    options: [{ groups: ['index', 'sibling', 'parent', 'external', 'builtin'] }],
    errors: [{
      ruleId: 'order',
      message: '`./` import should occur before import of `fs`'
    }]
  }),
  // member expression of require
  (0, _utils.test)({
    code: '\n        var foo = require(\'./foo\').bar;\n        var fs = require(\'fs\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur before import of `./foo`'
    }]
  }),
  // nested member expression of require
  (0, _utils.test)({
    code: '\n        var foo = require(\'./foo\').bar.bar.bar;\n        var fs = require(\'fs\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur before import of `./foo`'
    }]
  }),
  // Grouping import types
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var sibling = require(\'./foo\');\n        var path = require(\'path\');\n      ',
    options: [{ groups: [['builtin', 'index'], ['sibling', 'parent', 'external']] }],
    errors: [{
      ruleId: 'order',
      message: '`path` import should occur before import of `./foo`'
    }]
  }),
  // Omitted types should implicitly be considered as the last type
  (0, _utils.test)({
    code: '\n        var path = require(\'path\');\n        var async = require(\'async\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', 'external', 'internal']] }],

    // missing 'builtin'
    errors: [{
      ruleId: 'order',
      message: '`async` import should occur before import of `path`'
    }]
  }),
  // Setting the order for an unknown type
  // should make the rule trigger an error and do nothing else
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        var index = require(\'./\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', 'UNKNOWN', 'internal']] }],
    errors: [{
      ruleId: 'order',
      message: 'Incorrect configuration of the rule: Unknown type `"UNKNOWN"`'
    }]
  }),
  // Type in an array can't be another array, too much nesting
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        var index = require(\'./\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', ['builtin'], 'internal']] }],
    errors: [{
      ruleId: 'order',
      message: 'Incorrect configuration of the rule: Unknown type `["builtin"]`'
    }]
  }),
  // No numbers
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        var index = require(\'./\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', 2, 'internal']] }],
    errors: [{
      ruleId: 'order',
      message: 'Incorrect configuration of the rule: Unknown type `2`'
    }]
  }),
  // Duplicate
  (0, _utils.test)({
    code: '\n        var async = require(\'async\');\n        var index = require(\'./\');\n      ',
    options: [{ groups: ['index', ['sibling', 'parent', 'parent', 'internal']] }],
    errors: [{
      ruleId: 'order',
      message: 'Incorrect configuration of the rule: `parent` is duplicated'
    }]
  }),
  // Mixing require and import should have import up top
  (0, _utils.test)({
    code: '\n        import async, {foo1} from \'async\';\n        import relParent2, {foo2} from \'../foo/bar\';\n        var fs = require(\'fs\');\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        import sibling, {foo3} from \'./foo\';\n        var index = require(\'./\');\n      ',
    errors: [{
      ruleId: 'order',
      message: '`./foo` import should occur before import of `fs`'
    }]
  }), (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        import async, {foo1} from \'async\';\n        import relParent2, {foo2} from \'../foo/bar\';\n      ',
    errors: [{
      ruleId: 'order',
      message: '`fs` import should occur after import of `../foo/bar`'
    }]
  }),
  // Option newlines-between: 'never' - should report unnecessary line between groups
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var path = require(\'path\');\n\n        var sibling = require(\'./foo\');\n\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling'], ['parent', 'external']],
      'newlines-between': 'never'
    }],
    errors: [{
      line: 4,
      message: 'There should be no empty line between import groups'
    }, {
      line: 6,
      message: 'There should be no empty line between import groups'
    }]
  }),
  // // Option newlines-between: 'always' - should report lack of newline between groups
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n        var path = require(\'path\');\n        var sibling = require(\'./foo\');\n        var relParent1 = require(\'../foo\');\n        var relParent3 = require(\'../\');\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling'], ['parent', 'external']],
      'newlines-between': 'always'
    }],
    errors: [{
      line: 4,
      message: 'There should be one empty line between import groups'
    }, {
      line: 5,
      message: 'There should be one empty line between import groups'
    }]
  }),
  //Option newlines-between: 'always' should report too many empty lines between import groups
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n        var index = require(\'./\');\n\n\n\n        var sibling = require(\'./foo\');\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling', 'parent', 'external']],
      'newlines-between': 'always'
    }],
    errors: [{
      line: 3,
      message: 'There should be one empty line between import groups'
    }]
  }),
  //Option newlines-between: 'always' should report unnecessary empty lines space between import groups
  (0, _utils.test)({
    code: '\n        var fs = require(\'fs\');\n\n        var path = require(\'path\');\n        var index = require(\'./\');\n\n        var sibling = require(\'./foo\');\n\n        var async = require(\'async\');\n      ',
    options: [{
      groups: [['builtin', 'index'], ['sibling', 'parent', 'external']],
      'newlines-between': 'always'
    }],
    errors: [{
      line: 2,
      message: 'There should be no empty line within import group'
    }, {
      line: 7,
      message: 'There should be no empty line within import group'
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,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LENBRk0sQ0FEVjtBQUtFLDBCQUFvQjtBQUx0QixLQURPLENBVk47QUFtQkgsWUFBUSxDQUNOO0FBQ0UsWUFBTSxDQURSO0FBRUUsZUFBUztBQUZYLEtBRE07QUFuQkwsR0FBTCxDQS9UTzs7QUEwVlAsbUJBQUs7QUFDSCw4TkFERztBQVdILGFBQVMsQ0FDUDtBQUNFLGNBQVEsQ0FDTixDQUFDLFNBQUQsRUFBWSxPQUFaLENBRE0sRUFFTixDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFVBQXRCLENBRk0sQ0FEVjtBQUtFLDBCQUFvQjtBQUx0QixLQURPLENBWE47QUFvQkgsWUFBUSxDQUNOO0FBQ0UsWUFBTSxDQURSO0FBRUUsZUFBUztBQUZYLEtBRE0sRUFLTjtBQUNFLFlBQU0sQ0FEUjtBQUVFLGVBQVM7QUFGWCxLQUxNO0FBcEJMLEdBQUwsQ0ExVk87QUExTW1CLENBQTlCIiwiZmlsZSI6InJ1bGVzL29yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJy4uL3V0aWxzJ1xuXG5pbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAgICwgcnVsZSA9IHJlcXVpcmUoJ3J1bGVzL29yZGVyJylcblxucnVsZVRlc3Rlci5ydW4oJ29yZGVyJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIC8vIERlZmF1bHQgb3JkZXIgdXNpbmcgcmVxdWlyZVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MSA9IHJlcXVpcmUoJy4uL2ZvbycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MiA9IHJlcXVpcmUoJy4uL2Zvby9iYXInKTtcbiAgICAgICAgdmFyIHJlbFBhcmVudDMgPSByZXF1aXJlKCcuLi8nKTtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSByZXF1aXJlKCcuL2ZvbycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO2AsXG4gICAgICB9KSxcbiAgICAvLyBEZWZhdWx0IG9yZGVyIHVzaW5nIGltcG9ydFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICBpbXBvcnQgZnMgZnJvbSAnZnMnO1xuICAgICAgICBpbXBvcnQgYXN5bmMsIHtmb28xfSBmcm9tICdhc3luYyc7XG4gICAgICAgIGltcG9ydCByZWxQYXJlbnQxIGZyb20gJy4uL2Zvbyc7XG4gICAgICAgIGltcG9ydCByZWxQYXJlbnQyLCB7Zm9vMn0gZnJvbSAnLi4vZm9vL2Jhcic7XG4gICAgICAgIGltcG9ydCByZWxQYXJlbnQzIGZyb20gJy4uLyc7XG4gICAgICAgIGltcG9ydCBzaWJsaW5nLCB7Zm9vM30gZnJvbSAnLi9mb28nO1xuICAgICAgICBpbXBvcnQgaW5kZXggZnJvbSAnLi8nO2AsXG4gICAgICB9KSxcbiAgICAvLyBNdWx0aXBsZSBtb2R1bGUgb2YgdGhlIHNhbWUgcmFuayBuZXh0IHRvIGVhY2ggb3RoZXJcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgICAgIHZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7YCxcbiAgICAgIH0pLFxuICAgIC8vIE92ZXJyaWRpbmcgb3JkZXIgdG8gYmUgdGhlIHJldmVyc2Ugb2YgdGhlIGRlZmF1bHQgb3JkZXJcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxdWlyZSgnLi8nKTtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSByZXF1aXJlKCcuL2ZvbycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MyA9IHJlcXVpcmUoJy4uLycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MiA9IHJlcXVpcmUoJy4uL2Zvby9iYXInKTtcbiAgICAgICAgdmFyIHJlbFBhcmVudDEgPSByZXF1aXJlKCcuLi9mb28nKTtcbiAgICAgICAgdmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgIGAsXG4gICAgICBvcHRpb25zOiBbe2dyb3VwczogWydpbmRleCcsICdzaWJsaW5nJywgJ3BhcmVudCcsICdleHRlcm5hbCcsICdidWlsdGluJ119XSxcbiAgICB9KSxcbiAgICAvLyBJZ25vcmUgZHluYW1pYyByZXF1aXJlc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICAgICAgdmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbiAgICAgICAgdmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZicgKyAncycpO2AsXG4gICAgfSksXG4gICAgLy8gSWdub3JlIG5vbi1yZXF1aXJlIGNhbGwgZXhwcmVzc2lvbnNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBhZGQoMSwgMik7XG4gICAgICAgIHZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7YCxcbiAgICB9KSxcbiAgICAvLyBJZ25vcmUgcmVxdWlyZXMgdGhhdCBhcmUgbm90IGF0IHRoZSB0b3AtbGV2ZWxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxdWlyZSgnLi8nKTtcbiAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xuICAgICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgIH1cbiAgICAgICAgKCkgPT4gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICByZXF1aXJlKCdmcycpO1xuICAgICAgICB9YCxcbiAgICB9KSxcbiAgICAvLyBJZ25vcmUgdW5rbm93bi9pbnZhbGlkIGNhc2VzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciB1bmtub3duMSA9IHJlcXVpcmUoJy91bmtub3duMScpO1xuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgdW5rbm93bjIgPSByZXF1aXJlKCcvdW5rbm93bjInKTtcbiAgICAgICAgdmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbiAgICAgICAgdmFyIHVua25vd24zID0gcmVxdWlyZSgnL3Vua25vd24zJyk7XG4gICAgICAgIHZhciBmb28gPSByZXF1aXJlKCcuLi9mb28nKTtcbiAgICAgICAgdmFyIHVua25vd240ID0gcmVxdWlyZSgnL3Vua25vd240Jyk7XG4gICAgICAgIHZhciBiYXIgPSByZXF1aXJlKCcuLi9mb28vYmFyJyk7XG4gICAgICAgIHZhciB1bmtub3duNSA9IHJlcXVpcmUoJy91bmtub3duNScpO1xuICAgICAgICB2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vJyk7XG4gICAgICAgIHZhciB1bmtub3duNiA9IHJlcXVpcmUoJy91bmtub3duNicpO1xuICAgICAgICB2YXIgZm9vID0gcmVxdWlyZSgnLi9mb28nKTtcbiAgICAgICAgdmFyIHVua25vd243ID0gcmVxdWlyZSgnL3Vua25vd243Jyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICAgIHZhciB1bmtub3duOCA9IHJlcXVpcmUoJy91bmtub3duOCcpO1xuICAgIGB9KSxcbiAgICAvLyBJZ25vcmluZyB1bmFzc2lnbmVkIHZhbHVlcyBieSBkZWZhdWx0IChyZXF1aXJlKVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICByZXF1aXJlKCcuL2ZvbycpO1xuICAgICAgICByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBgfSksXG4gICAgLy8gSWdub3JpbmcgdW5hc3NpZ25lZCB2YWx1ZXMgYnkgZGVmYXVsdCAoaW1wb3J0KVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICBpbXBvcnQgJy4vZm9vJztcbiAgICAgICAgaW1wb3J0ICdmcyc7XG4gICAgICAgIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuICAgIGB9KSxcbiAgICAvLyBObyBpbXBvcnRzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIGZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb287XG4gICAgYH0pLFxuICAgIC8vIEdyb3VwaW5nIGltcG9ydCB0eXBlc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgc2libGluZyA9IHJlcXVpcmUoJy4vZm9vJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQzID0gcmVxdWlyZSgnLi4vJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQxID0gcmVxdWlyZSgnLi4vZm9vJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW3tncm91cHM6IFtcbiAgICAgICAgWydidWlsdGluJywgJ2luZGV4J10sXG4gICAgICAgIFsnc2libGluZycsICdwYXJlbnQnLCAnZXh0ZXJuYWwnXSxcbiAgICAgIF19XSxcbiAgICB9KSxcbiAgICAvLyBPbWl0dGVkIHR5cGVzIHNob3VsZCBpbXBsaWNpdGx5IGJlIGNvbnNpZGVyZWQgYXMgdGhlIGxhc3QgdHlwZVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICAgIGAsXG4gICAgICBvcHRpb25zOiBbe2dyb3VwczogW1xuICAgICAgICAnaW5kZXgnLFxuICAgICAgICBbJ3NpYmxpbmcnLCAncGFyZW50JywgJ2V4dGVybmFsJ10sXG4gICAgICAgIC8vIG1pc3NpbmcgJ2J1aWx0aW4nXG4gICAgICBdfV0sXG4gICAgfSksXG4gICAgLy8gTWl4aW5nIHJlcXVpcmUgYW5kIGltcG9ydCBzaG91bGQgaGF2ZSBpbXBvcnQgdXAgdG9wXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIGltcG9ydCBhc3luYywge2ZvbzF9IGZyb20gJ2FzeW5jJztcbiAgICAgICAgaW1wb3J0IHJlbFBhcmVudDIsIHtmb28yfSBmcm9tICcuLi9mb28vYmFyJztcbiAgICAgICAgaW1wb3J0IHNpYmxpbmcsIHtmb28zfSBmcm9tICcuL2Zvbyc7XG4gICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQxID0gcmVxdWlyZSgnLi4vZm9vJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQzID0gcmVxdWlyZSgnLi4vJyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICBgLFxuICAgIH0pLFxuICAgIC8vIE9wdGlvbjogbmV3bGluZXMtYmV0d2VlbjogJ2Fsd2F5cydcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxdWlyZSgnLi8nKTtcbiAgICAgICAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbiAgICAgICAgdmFyIHNpYmxpbmcgPSByZXF1aXJlKCcuL2ZvbycpO1xuXG4gICAgICAgIHZhciByZWxQYXJlbnQxID0gcmVxdWlyZSgnLi4vZm9vJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQzID0gcmVxdWlyZSgnLi4vJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBzOiBbXG4gICAgICAgICAgICBbJ2J1aWx0aW4nLCAnaW5kZXgnXSxcbiAgICAgICAgICAgIFsnc2libGluZyddLFxuICAgICAgICAgICAgWydwYXJlbnQnLCAnZXh0ZXJuYWwnXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgICduZXdsaW5lcy1iZXR3ZWVuJzogJ2Fsd2F5cycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIC8vIE9wdGlvbjogbmV3bGluZXMtYmV0d2VlbjogJ25ldmVyJ1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSByZXF1aXJlKCcuL2ZvbycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MSA9IHJlcXVpcmUoJy4uL2ZvbycpO1xuICAgICAgICB2YXIgcmVsUGFyZW50MyA9IHJlcXVpcmUoJy4uLycpO1xuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgYCxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGdyb3VwczogW1xuICAgICAgICAgICAgWydidWlsdGluJywgJ2luZGV4J10sXG4gICAgICAgICAgICBbJ3NpYmxpbmcnXSxcbiAgICAgICAgICAgIFsncGFyZW50JywgJ2V4dGVybmFsJ10sXG4gICAgICAgICAgXSxcbiAgICAgICAgICAnbmV3bGluZXMtYmV0d2Vlbic6ICduZXZlcicsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuICBpbnZhbGlkOiBbXG4gICAgLy8gYnVpbHRpbiBiZWZvcmUgZXh0ZXJuYWwgbW9kdWxlIChyZXF1aXJlKVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgYCxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnYGZzYCBpbXBvcnQgc2hvdWxkIG9jY3VyIGJlZm9yZSBpbXBvcnQgb2YgYGFzeW5jYCcsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICAvLyBidWlsdGluIGJlZm9yZSBleHRlcm5hbCBtb2R1bGUgKGltcG9ydClcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbiAgICAgICAgaW1wb3J0IGZzIGZyb20gJ2ZzJztcbiAgICAgIGAsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ29yZGVyJyxcbiAgICAgICAgbWVzc2FnZTogJ2Bmc2AgaW1wb3J0IHNob3VsZCBvY2N1ciBiZWZvcmUgaW1wb3J0IG9mIGBhc3luY2AnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gYnVpbHRpbiBiZWZvcmUgZXh0ZXJuYWwgbW9kdWxlIChtaXhlZCBpbXBvcnQgYW5kIHJlcXVpcmUpXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICAgIGltcG9ydCBmcyBmcm9tICdmcyc7XG4gICAgICBgLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgZnNgIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgYXN5bmNgJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIC8vIGV4dGVybmFsIGJlZm9yZSBwYXJlbnRcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uL3BhcmVudCcpO1xuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgYCxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnYGFzeW5jYCBpbXBvcnQgc2hvdWxkIG9jY3VyIGJlZm9yZSBpbXBvcnQgb2YgYC4uL3BhcmVudGAnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gcGFyZW50IGJlZm9yZSBzaWJsaW5nXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBzaWJsaW5nID0gcmVxdWlyZSgnLi9zaWJsaW5nJyk7XG4gICAgICAgIHZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi9wYXJlbnQnKTtcbiAgICAgIGAsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ29yZGVyJyxcbiAgICAgICAgbWVzc2FnZTogJ2AuLi9wYXJlbnRgIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgLi9zaWJsaW5nYCcsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICAvLyBzaWJsaW5nIGJlZm9yZSBpbmRleFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgICB2YXIgc2libGluZyA9IHJlcXVpcmUoJy4vc2libGluZycpO1xuICAgICAgYCxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnYC4vc2libGluZ2AgaW1wb3J0IHNob3VsZCBvY2N1ciBiZWZvcmUgaW1wb3J0IG9mIGAuL2AnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gTXVsdGlwbGUgZXJyb3JzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBzaWJsaW5nID0gcmVxdWlyZSgnLi9zaWJsaW5nJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICBgLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgYXN5bmNgIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgLi9zaWJsaW5nYCcsXG4gICAgICB9LCB7XG4gICAgICAgIHJ1bGVJZDogJ29yZGVyJyxcbiAgICAgICAgbWVzc2FnZTogJ2Bmc2AgaW1wb3J0IHNob3VsZCBvY2N1ciBiZWZvcmUgaW1wb3J0IG9mIGAuL3NpYmxpbmdgJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIC8vIFVzZXMgJ2FmdGVyJyB3b3JkaW5nIGlmIGl0IGNyZWF0ZXMgbGVzcyBlcnJvcnNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxdWlyZSgnLi8nKTtcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgICAgIHZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG4gICAgICAgIHZhciBmb28gPSByZXF1aXJlKCdmb28nKTtcbiAgICAgICAgdmFyIGJhciA9IHJlcXVpcmUoJ2JhcicpO1xuICAgICAgYCxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnYC4vYCBpbXBvcnQgc2hvdWxkIG9jY3VyIGFmdGVyIGltcG9ydCBvZiBgYmFyYCcsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICAvLyBPdmVycmlkaW5nIG9yZGVyIHRvIGJlIHRoZSByZXZlcnNlIG9mIHRoZSBkZWZhdWx0IG9yZGVyXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW3tncm91cHM6IFsnaW5kZXgnLCAnc2libGluZycsICdwYXJlbnQnLCAnZXh0ZXJuYWwnLCAnYnVpbHRpbiddfV0sXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ29yZGVyJyxcbiAgICAgICAgbWVzc2FnZTogJ2AuL2AgaW1wb3J0IHNob3VsZCBvY2N1ciBiZWZvcmUgaW1wb3J0IG9mIGBmc2AnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gbWVtYmVyIGV4cHJlc3Npb24gb2YgcmVxdWlyZVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZm9vID0gcmVxdWlyZSgnLi9mb28nKS5iYXI7XG4gICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICBgLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgZnNgIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgLi9mb29gJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIC8vIG5lc3RlZCBtZW1iZXIgZXhwcmVzc2lvbiBvZiByZXF1aXJlXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBmb28gPSByZXF1aXJlKCcuL2ZvbycpLmJhci5iYXIuYmFyO1xuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgYCxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnYGZzYCBpbXBvcnQgc2hvdWxkIG9jY3VyIGJlZm9yZSBpbXBvcnQgb2YgYC4vZm9vYCcsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICAvLyBHcm91cGluZyBpbXBvcnQgdHlwZXNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxdWlyZSgnLi8nKTtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSByZXF1aXJlKCcuL2ZvbycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICAgIGAsXG4gICAgICBvcHRpb25zOiBbe2dyb3VwczogW1xuICAgICAgICBbJ2J1aWx0aW4nLCAnaW5kZXgnXSxcbiAgICAgICAgWydzaWJsaW5nJywgJ3BhcmVudCcsICdleHRlcm5hbCddLFxuICAgICAgXX1dLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgcGF0aGAgaW1wb3J0IHNob3VsZCBvY2N1ciBiZWZvcmUgaW1wb3J0IG9mIGAuL2Zvb2AnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gT21pdHRlZCB0eXBlcyBzaG91bGQgaW1wbGljaXRseSBiZSBjb25zaWRlcmVkIGFzIHRoZSBsYXN0IHR5cGVcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW3tncm91cHM6IFtcbiAgICAgICAgJ2luZGV4JyxcbiAgICAgICAgWydzaWJsaW5nJywgJ3BhcmVudCcsICdleHRlcm5hbCcsICdpbnRlcm5hbCddLFxuICAgICAgICAvLyBtaXNzaW5nICdidWlsdGluJ1xuICAgICAgXX1dLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgYXN5bmNgIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgcGF0aGAnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gU2V0dGluZyB0aGUgb3JkZXIgZm9yIGFuIHVua25vd24gdHlwZVxuICAgIC8vIHNob3VsZCBtYWtlIHRoZSBydWxlIHRyaWdnZXIgYW4gZXJyb3IgYW5kIGRvIG5vdGhpbmcgZWxzZVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgYCxcbiAgICAgIG9wdGlvbnM6IFt7Z3JvdXBzOiBbXG4gICAgICAgICdpbmRleCcsXG4gICAgICAgIFsnc2libGluZycsICdwYXJlbnQnLCAnVU5LTk9XTicsICdpbnRlcm5hbCddLFxuICAgICAgXX1dLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdJbmNvcnJlY3QgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZTogVW5rbm93biB0eXBlIGBcIlVOS05PV05cImAnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gVHlwZSBpbiBhbiBhcnJheSBjYW4ndCBiZSBhbm90aGVyIGFycmF5LCB0b28gbXVjaCBuZXN0aW5nXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW3tncm91cHM6IFtcbiAgICAgICAgJ2luZGV4JyxcbiAgICAgICAgWydzaWJsaW5nJywgJ3BhcmVudCcsIFsnYnVpbHRpbiddLCAnaW50ZXJuYWwnXSxcbiAgICAgIF19XSxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnSW5jb3JyZWN0IGNvbmZpZ3VyYXRpb24gb2YgdGhlIHJ1bGU6IFVua25vd24gdHlwZSBgW1wiYnVpbHRpblwiXWAnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gTm8gbnVtYmVyc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgYCxcbiAgICAgIG9wdGlvbnM6IFt7Z3JvdXBzOiBbXG4gICAgICAgICdpbmRleCcsXG4gICAgICAgIFsnc2libGluZycsICdwYXJlbnQnLCAyLCAnaW50ZXJuYWwnXSxcbiAgICAgIF19XSxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnSW5jb3JyZWN0IGNvbmZpZ3VyYXRpb24gb2YgdGhlIHJ1bGU6IFVua25vd24gdHlwZSBgMmAnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gRHVwbGljYXRlXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW3tncm91cHM6IFtcbiAgICAgICAgJ2luZGV4JyxcbiAgICAgICAgWydzaWJsaW5nJywgJ3BhcmVudCcsICdwYXJlbnQnLCAnaW50ZXJuYWwnXSxcbiAgICAgIF19XSxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnb3JkZXInLFxuICAgICAgICBtZXNzYWdlOiAnSW5jb3JyZWN0IGNvbmZpZ3VyYXRpb24gb2YgdGhlIHJ1bGU6IGBwYXJlbnRgIGlzIGR1cGxpY2F0ZWQnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgLy8gTWl4aW5nIHJlcXVpcmUgYW5kIGltcG9ydCBzaG91bGQgaGF2ZSBpbXBvcnQgdXAgdG9wXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIGltcG9ydCBhc3luYywge2ZvbzF9IGZyb20gJ2FzeW5jJztcbiAgICAgICAgaW1wb3J0IHJlbFBhcmVudDIsIHtmb28yfSBmcm9tICcuLi9mb28vYmFyJztcbiAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgICAgICAgdmFyIHJlbFBhcmVudDEgPSByZXF1aXJlKCcuLi9mb28nKTtcbiAgICAgICAgdmFyIHJlbFBhcmVudDMgPSByZXF1aXJlKCcuLi8nKTtcbiAgICAgICAgaW1wb3J0IHNpYmxpbmcsIHtmb28zfSBmcm9tICcuL2Zvbyc7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICBgLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgLi9mb29gIGltcG9ydCBzaG91bGQgb2NjdXIgYmVmb3JlIGltcG9ydCBvZiBgZnNgJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICBpbXBvcnQgYXN5bmMsIHtmb28xfSBmcm9tICdhc3luYyc7XG4gICAgICAgIGltcG9ydCByZWxQYXJlbnQyLCB7Zm9vMn0gZnJvbSAnLi4vZm9vL2Jhcic7XG4gICAgICBgLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICdvcmRlcicsXG4gICAgICAgIG1lc3NhZ2U6ICdgZnNgIGltcG9ydCBzaG91bGQgb2NjdXIgYWZ0ZXIgaW1wb3J0IG9mIGAuLi9mb28vYmFyYCcsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICAvLyBPcHRpb24gbmV3bGluZXMtYmV0d2VlbjogJ25ldmVyJyAtIHNob3VsZCByZXBvcnQgdW5uZWNlc3NhcnkgbGluZSBiZXR3ZWVuIGdyb3Vwc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuICAgICAgICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgc2libGluZyA9IHJlcXVpcmUoJy4vZm9vJyk7XG5cbiAgICAgICAgdmFyIHJlbFBhcmVudDEgPSByZXF1aXJlKCcuLi9mb28nKTtcbiAgICAgICAgdmFyIHJlbFBhcmVudDMgPSByZXF1aXJlKCcuLi8nKTtcbiAgICAgICAgdmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbiAgICAgIGAsXG4gICAgICBvcHRpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cHM6IFtcbiAgICAgICAgICAgIFsnYnVpbHRpbicsICdpbmRleCddLFxuICAgICAgICAgICAgWydzaWJsaW5nJ10sXG4gICAgICAgICAgICBbJ3BhcmVudCcsICdleHRlcm5hbCddLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgJ25ld2xpbmVzLWJldHdlZW4nOiAnbmV2ZXInLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluZTogNCxcbiAgICAgICAgICBtZXNzYWdlOiAnVGhlcmUgc2hvdWxkIGJlIG5vIGVtcHR5IGxpbmUgYmV0d2VlbiBpbXBvcnQgZ3JvdXBzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDYsXG4gICAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBubyBlbXB0eSBsaW5lIGJldHdlZW4gaW1wb3J0IGdyb3VwcycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIC8vIC8vIE9wdGlvbiBuZXdsaW5lcy1iZXR3ZWVuOiAnYWx3YXlzJyAtIHNob3VsZCByZXBvcnQgbGFjayBvZiBuZXdsaW5lIGJldHdlZW4gZ3JvdXBzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgIHZhciBpbmRleCA9IHJlcXVpcmUoJy4vJyk7XG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgICAgICB2YXIgc2libGluZyA9IHJlcXVpcmUoJy4vZm9vJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQxID0gcmVxdWlyZSgnLi4vZm9vJyk7XG4gICAgICAgIHZhciByZWxQYXJlbnQzID0gcmVxdWlyZSgnLi4vJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBzOiBbXG4gICAgICAgICAgICBbJ2J1aWx0aW4nLCAnaW5kZXgnXSxcbiAgICAgICAgICAgIFsnc2libGluZyddLFxuICAgICAgICAgICAgWydwYXJlbnQnLCAnZXh0ZXJuYWwnXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgICduZXdsaW5lcy1iZXR3ZWVuJzogJ2Fsd2F5cycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5lOiA0LFxuICAgICAgICAgIG1lc3NhZ2U6ICdUaGVyZSBzaG91bGQgYmUgb25lIGVtcHR5IGxpbmUgYmV0d2VlbiBpbXBvcnQgZ3JvdXBzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDUsXG4gICAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBvbmUgZW1wdHkgbGluZSBiZXR3ZWVuIGltcG9ydCBncm91cHMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICAvL09wdGlvbiBuZXdsaW5lcy1iZXR3ZWVuOiAnYWx3YXlzJyBzaG91bGQgcmVwb3J0IHRvbyBtYW55IGVtcHR5IGxpbmVzIGJldHdlZW4gaW1wb3J0IGdyb3Vwc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuXG5cblxuICAgICAgICB2YXIgc2libGluZyA9IHJlcXVpcmUoJy4vZm9vJyk7XG4gICAgICAgIHZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4gICAgICBgLFxuICAgICAgb3B0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBzOiBbXG4gICAgICAgICAgICBbJ2J1aWx0aW4nLCAnaW5kZXgnXSxcbiAgICAgICAgICAgIFsnc2libGluZycsICdwYXJlbnQnLCAnZXh0ZXJuYWwnXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgJ25ld2xpbmVzLWJldHdlZW4nOiAnYWx3YXlzJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDMsXG4gICAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBvbmUgZW1wdHkgbGluZSBiZXR3ZWVuIGltcG9ydCBncm91cHMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICAvL09wdGlvbiBuZXdsaW5lcy1iZXR3ZWVuOiAnYWx3YXlzJyBzaG91bGQgcmVwb3J0IHVubmVjZXNzYXJ5IGVtcHR5IGxpbmVzIHNwYWNlIGJldHdlZW4gaW1wb3J0IGdyb3Vwc1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuXG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlKCcuLycpO1xuXG4gICAgICAgIHZhciBzaWJsaW5nID0gcmVxdWlyZSgnLi9mb28nKTtcblxuICAgICAgICB2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xuICAgICAgYCxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGdyb3VwczogW1xuICAgICAgICAgICAgWydidWlsdGluJywgJ2luZGV4J10sXG4gICAgICAgICAgICBbJ3NpYmxpbmcnLCAncGFyZW50JywgJ2V4dGVybmFsJ11cbiAgICAgICAgICBdLFxuICAgICAgICAgICduZXdsaW5lcy1iZXR3ZWVuJzogJ2Fsd2F5cycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5lOiAyLFxuICAgICAgICAgIG1lc3NhZ2U6ICdUaGVyZSBzaG91bGQgYmUgbm8gZW1wdHkgbGluZSB3aXRoaW4gaW1wb3J0IGdyb3VwJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDcsXG4gICAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBubyBlbXB0eSBsaW5lIHdpdGhpbiBpbXBvcnQgZ3JvdXAnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbn0pXG4iXX0=