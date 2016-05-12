'use strict';

var _utils = require('../utils');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _eslint = require('eslint');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-extraneous-dependencies');

ruleTester.run('no-extraneous-dependencies', rule, {
  valid: [(0, _utils.test)({ code: 'import "lodash.cond"' }), (0, _utils.test)({ code: 'import "pkg-up"' }), (0, _utils.test)({ code: 'import foo, { bar } from "lodash.cond"' }), (0, _utils.test)({ code: 'import foo, { bar } from "pkg-up"' }), (0, _utils.test)({ code: 'import "eslint"' }), (0, _utils.test)({ code: 'import "eslint/lib/api"' }), (0, _utils.test)({ code: 'require("lodash.cond")' }), (0, _utils.test)({ code: 'require("pkg-up")' }), (0, _utils.test)({ code: 'var foo = require("lodash.cond")' }), (0, _utils.test)({ code: 'var foo = require("pkg-up")' }), (0, _utils.test)({ code: 'import "fs"' }), (0, _utils.test)({ code: 'import "./foo"' }), (0, _utils.test)({ code: 'import "lodash.isarray"' }), (0, _utils.test)({ code: 'import "@scope/core"' }),

  // 'project' type
  (0, _utils.test)({
    code: 'import "importType"',
    settings: { 'import/resolver': { node: { paths: [path.join(__dirname, '../../files')] } } }
  })],
  invalid: [(0, _utils.test)({
    code: 'import "not-a-dependency"',
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'not-a-dependency\' should be listed in the project\'s dependencies. Run \'npm i -S not-a-dependency\' to add it'
    }]
  }), (0, _utils.test)({
    code: 'var donthaveit = require("@scope/donthaveit")',
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'@scope/donthaveit\' should be listed in the project\'s dependencies. Run \'npm i -S @scope/donthaveit\' to add it'
    }]
  }), (0, _utils.test)({
    code: 'var donthaveit = require("@scope/donthaveit/lib/foo")',
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'@scope/donthaveit\' should be listed in the project\'s dependencies. Run \'npm i -S @scope/donthaveit\' to add it'
    }]
  }), (0, _utils.test)({
    code: 'import "eslint"',
    options: [{ devDependencies: false }],
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'eslint\' should be listed in the project\'s dependencies, not devDependencies.'
    }]
  }), (0, _utils.test)({
    code: 'import "lodash.isarray"',
    options: [{ optionalDependencies: false }],
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'lodash.isarray\' should be listed in the project\'s dependencies, not optionalDependencies.'
    }]
  }), (0, _utils.test)({
    code: 'var foo = require("not-a-dependency")',
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'not-a-dependency\' should be listed in the project\'s dependencies. Run \'npm i -S not-a-dependency\' to add it'
    }]
  }), (0, _utils.test)({
    code: 'var eslint = require("eslint")',
    options: [{ devDependencies: false }],
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'eslint\' should be listed in the project\'s dependencies, not devDependencies.'
    }]
  }), (0, _utils.test)({
    code: 'var eslint = require("lodash.isarray")',
    options: [{ optionalDependencies: false }],
    errors: [{
      ruleId: 'no-extraneous-dependencies',
      message: '\'lodash.isarray\' should be listed in the project\'s dependencies, not optionalDependencies.'
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0lBQVksSTs7QUFFWjs7OztBQUVBLElBQU0sYUFBYSx3QkFBbkI7SUFDTSxPQUFPLFFBQVEsa0NBQVIsQ0FEYjs7QUFHQSxXQUFXLEdBQVgsQ0FBZSw0QkFBZixFQUE2QyxJQUE3QyxFQUFtRDtBQUNqRCxTQUFPLENBQ0wsaUJBQUssRUFBRSxNQUFNLHNCQUFSLEVBQUwsQ0FESyxFQUVMLGlCQUFLLEVBQUUsTUFBTSxpQkFBUixFQUFMLENBRkssRUFHTCxpQkFBSyxFQUFFLE1BQU0sd0NBQVIsRUFBTCxDQUhLLEVBSUwsaUJBQUssRUFBRSxNQUFNLG1DQUFSLEVBQUwsQ0FKSyxFQUtMLGlCQUFLLEVBQUUsTUFBTSxpQkFBUixFQUFMLENBTEssRUFNTCxpQkFBSyxFQUFFLE1BQU0seUJBQVIsRUFBTCxDQU5LLEVBT0wsaUJBQUssRUFBRSxNQUFNLHdCQUFSLEVBQUwsQ0FQSyxFQVFMLGlCQUFLLEVBQUUsTUFBTSxtQkFBUixFQUFMLENBUkssRUFTTCxpQkFBSyxFQUFFLE1BQU0sa0NBQVIsRUFBTCxDQVRLLEVBVUwsaUJBQUssRUFBRSxNQUFNLDZCQUFSLEVBQUwsQ0FWSyxFQVdMLGlCQUFLLEVBQUUsTUFBTSxhQUFSLEVBQUwsQ0FYSyxFQVlMLGlCQUFLLEVBQUUsTUFBTSxnQkFBUixFQUFMLENBWkssRUFhTCxpQkFBSyxFQUFFLE1BQU0seUJBQVIsRUFBTCxDQWJLLEVBY0wsaUJBQUssRUFBRSxNQUFNLHNCQUFSLEVBQUwsQ0FkSzs7O0FBaUJMLG1CQUFLO0FBQ0gsVUFBTSxxQkFESDtBQUVILGNBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFFLEtBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsYUFBckIsQ0FBRixDQUFULEVBQVIsRUFBckI7QUFGUCxHQUFMLENBakJLLENBRDBDO0FBdUJqRCxXQUFTLENBQ1AsaUJBQUs7QUFDSCxVQUFNLDJCQURIO0FBRUgsWUFBUSxDQUFDO0FBQ1AsY0FBUSw0QkFERDtBQUVQLGVBQVM7QUFGRixLQUFEO0FBRkwsR0FBTCxDQURPLEVBUVAsaUJBQUs7QUFDSCxVQUFNLCtDQURIO0FBRUgsWUFBUSxDQUFDO0FBQ1AsY0FBUSw0QkFERDtBQUVQLGVBQVM7QUFGRixLQUFEO0FBRkwsR0FBTCxDQVJPLEVBZVAsaUJBQUs7QUFDSCxVQUFNLHVEQURIO0FBRUgsWUFBUSxDQUFDO0FBQ1AsY0FBUSw0QkFERDtBQUVQLGVBQVM7QUFGRixLQUFEO0FBRkwsR0FBTCxDQWZPLEVBc0JQLGlCQUFLO0FBQ0gsVUFBTSxpQkFESDtBQUVILGFBQVMsQ0FBQyxFQUFDLGlCQUFpQixLQUFsQixFQUFELENBRk47QUFHSCxZQUFRLENBQUM7QUFDUCxjQUFRLDRCQUREO0FBRVAsZUFBUztBQUZGLEtBQUQ7QUFITCxHQUFMLENBdEJPLEVBOEJQLGlCQUFLO0FBQ0gsVUFBTSx5QkFESDtBQUVILGFBQVMsQ0FBQyxFQUFDLHNCQUFzQixLQUF2QixFQUFELENBRk47QUFHSCxZQUFRLENBQUM7QUFDUCxjQUFRLDRCQUREO0FBRVAsZUFBUztBQUZGLEtBQUQ7QUFITCxHQUFMLENBOUJPLEVBc0NQLGlCQUFLO0FBQ0gsVUFBTSx1Q0FESDtBQUVILFlBQVEsQ0FBQztBQUNQLGNBQVEsNEJBREQ7QUFFUCxlQUFTO0FBRkYsS0FBRDtBQUZMLEdBQUwsQ0F0Q08sRUE2Q1AsaUJBQUs7QUFDSCxVQUFNLGdDQURIO0FBRUgsYUFBUyxDQUFDLEVBQUMsaUJBQWlCLEtBQWxCLEVBQUQsQ0FGTjtBQUdILFlBQVEsQ0FBQztBQUNQLGNBQVEsNEJBREQ7QUFFUCxlQUFTO0FBRkYsS0FBRDtBQUhMLEdBQUwsQ0E3Q08sRUFxRFAsaUJBQUs7QUFDSCxVQUFNLHdDQURIO0FBRUgsYUFBUyxDQUFDLEVBQUMsc0JBQXNCLEtBQXZCLEVBQUQsQ0FGTjtBQUdILFlBQVEsQ0FBQztBQUNQLGNBQVEsNEJBREQ7QUFFUCxlQUFTO0FBRkYsS0FBRDtBQUhMLEdBQUwsQ0FyRE87QUF2QndDLENBQW5EIiwiZmlsZSI6InJ1bGVzL25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAgICwgcnVsZSA9IHJlcXVpcmUoJ3J1bGVzL25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJylcblxucnVsZVRlc3Rlci5ydW4oJ25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IFwibG9kYXNoLmNvbmRcIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcInBrZy11cFwiJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGZvbywgeyBiYXIgfSBmcm9tIFwibG9kYXNoLmNvbmRcIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBmb28sIHsgYmFyIH0gZnJvbSBcInBrZy11cFwiJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IFwiZXNsaW50XCInfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgXCJlc2xpbnQvbGliL2FwaVwiJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAncmVxdWlyZShcImxvZGFzaC5jb25kXCIpJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAncmVxdWlyZShcInBrZy11cFwiKSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ3ZhciBmb28gPSByZXF1aXJlKFwibG9kYXNoLmNvbmRcIiknfSksXG4gICAgdGVzdCh7IGNvZGU6ICd2YXIgZm9vID0gcmVxdWlyZShcInBrZy11cFwiKSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcImZzXCInfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgXCIuL2Zvb1wiJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IFwibG9kYXNoLmlzYXJyYXlcIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBcIkBzY29wZS9jb3JlXCInfSksXG5cbiAgICAvLyAncHJvamVjdCcgdHlwZVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcImltcG9ydFR5cGVcIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L3Jlc29sdmVyJzogeyBub2RlOiB7IHBhdGhzOiBbIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9maWxlcycpIF0gfSB9IH0sXG4gICAgfSksXG4gIF0sXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgXCJub3QtYS1kZXBlbmRlbmN5XCInLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICduby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcycsXG4gICAgICAgIG1lc3NhZ2U6ICdcXCdub3QtYS1kZXBlbmRlbmN5XFwnIHNob3VsZCBiZSBsaXN0ZWQgaW4gdGhlIHByb2plY3RcXCdzIGRlcGVuZGVuY2llcy4gUnVuIFxcJ25wbSBpIC1TIG5vdC1hLWRlcGVuZGVuY3lcXCcgdG8gYWRkIGl0JyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ3ZhciBkb250aGF2ZWl0ID0gcmVxdWlyZShcIkBzY29wZS9kb250aGF2ZWl0XCIpJyxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnLFxuICAgICAgICBtZXNzYWdlOiAnXFwnQHNjb3BlL2RvbnRoYXZlaXRcXCcgc2hvdWxkIGJlIGxpc3RlZCBpbiB0aGUgcHJvamVjdFxcJ3MgZGVwZW5kZW5jaWVzLiBSdW4gXFwnbnBtIGkgLVMgQHNjb3BlL2RvbnRoYXZlaXRcXCcgdG8gYWRkIGl0JyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ3ZhciBkb250aGF2ZWl0ID0gcmVxdWlyZShcIkBzY29wZS9kb250aGF2ZWl0L2xpYi9mb29cIiknLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBydWxlSWQ6ICduby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcycsXG4gICAgICAgIG1lc3NhZ2U6ICdcXCdAc2NvcGUvZG9udGhhdmVpdFxcJyBzaG91bGQgYmUgbGlzdGVkIGluIHRoZSBwcm9qZWN0XFwncyBkZXBlbmRlbmNpZXMuIFJ1biBcXCducG0gaSAtUyBAc2NvcGUvZG9udGhhdmVpdFxcJyB0byBhZGQgaXQnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IFwiZXNsaW50XCInLFxuICAgICAgb3B0aW9uczogW3tkZXZEZXBlbmRlbmNpZXM6IGZhbHNlfV0sXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJyxcbiAgICAgICAgbWVzc2FnZTogJ1xcJ2VzbGludFxcJyBzaG91bGQgYmUgbGlzdGVkIGluIHRoZSBwcm9qZWN0XFwncyBkZXBlbmRlbmNpZXMsIG5vdCBkZXZEZXBlbmRlbmNpZXMuJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBcImxvZGFzaC5pc2FycmF5XCInLFxuICAgICAgb3B0aW9uczogW3tvcHRpb25hbERlcGVuZGVuY2llczogZmFsc2V9XSxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnLFxuICAgICAgICBtZXNzYWdlOiAnXFwnbG9kYXNoLmlzYXJyYXlcXCcgc2hvdWxkIGJlIGxpc3RlZCBpbiB0aGUgcHJvamVjdFxcJ3MgZGVwZW5kZW5jaWVzLCBub3Qgb3B0aW9uYWxEZXBlbmRlbmNpZXMuJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ3ZhciBmb28gPSByZXF1aXJlKFwibm90LWEtZGVwZW5kZW5jeVwiKScsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJyxcbiAgICAgICAgbWVzc2FnZTogJ1xcJ25vdC1hLWRlcGVuZGVuY3lcXCcgc2hvdWxkIGJlIGxpc3RlZCBpbiB0aGUgcHJvamVjdFxcJ3MgZGVwZW5kZW5jaWVzLiBSdW4gXFwnbnBtIGkgLVMgbm90LWEtZGVwZW5kZW5jeVxcJyB0byBhZGQgaXQnLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAndmFyIGVzbGludCA9IHJlcXVpcmUoXCJlc2xpbnRcIiknLFxuICAgICAgb3B0aW9uczogW3tkZXZEZXBlbmRlbmNpZXM6IGZhbHNlfV0sXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJyxcbiAgICAgICAgbWVzc2FnZTogJ1xcJ2VzbGludFxcJyBzaG91bGQgYmUgbGlzdGVkIGluIHRoZSBwcm9qZWN0XFwncyBkZXBlbmRlbmNpZXMsIG5vdCBkZXZEZXBlbmRlbmNpZXMuJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ3ZhciBlc2xpbnQgPSByZXF1aXJlKFwibG9kYXNoLmlzYXJyYXlcIiknLFxuICAgICAgb3B0aW9uczogW3tvcHRpb25hbERlcGVuZGVuY2llczogZmFsc2V9XSxcbiAgICAgIGVycm9yczogW3tcbiAgICAgICAgcnVsZUlkOiAnbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnLFxuICAgICAgICBtZXNzYWdlOiAnXFwnbG9kYXNoLmlzYXJyYXlcXCcgc2hvdWxkIGJlIGxpc3RlZCBpbiB0aGUgcHJvamVjdFxcJ3MgZGVwZW5kZW5jaWVzLCBub3Qgb3B0aW9uYWxEZXBlbmRlbmNpZXMuJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==