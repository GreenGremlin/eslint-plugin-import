'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var _noNamedAsDefaultMember = require('rules/no-named-as-default-member');

var _noNamedAsDefaultMember2 = _interopRequireDefault(_noNamedAsDefaultMember);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleTester = new _eslint.RuleTester();

ruleTester.run('no-named-as-default-member', _noNamedAsDefaultMember2.default, {
  valid: [(0, _utils.test)({ code: 'import bar, {foo} from "./bar";' }), (0, _utils.test)({ code: 'import bar from "./bar"; const baz = bar.baz' }), (0, _utils.test)({ code: 'import {foo} from "./bar"; const baz = foo.baz;' }), (0, _utils.test)({ code: 'import * as named from "./named-exports"; const a = named.a' })].concat(_utils.SYNTAX_CASES),

  invalid: [(0, _utils.test)({
    code: 'import bar from "./bar"; const foo = bar.foo;',
    errors: [{
      message: 'Caution: `bar` also has a named export `foo`. ' + 'Check if you meant to write `import {foo} from \'./bar\'` instead.',
      type: 'MemberExpression'
    }]
  }), (0, _utils.test)({
    code: 'import bar from "./bar"; bar.foo();',
    errors: [{
      message: 'Caution: `bar` also has a named export `foo`. ' + 'Check if you meant to write `import {foo} from \'./bar\'` instead.',
      type: 'MemberExpression'
    }]
  }), (0, _utils.test)({
    code: 'import bar from "./bar"; const {foo} = bar;',
    errors: [{
      message: 'Caution: `bar` also has a named export `foo`. ' + 'Check if you meant to write `import {foo} from \'./bar\'` instead.',
      type: 'Identifier'
    }]
  }), (0, _utils.test)({
    code: 'import bar from "./bar"; const {foo: foo2, baz} = bar;',
    errors: [{
      message: 'Caution: `bar` also has a named export `foo`. ' + 'Check if you meant to write `import {foo} from \'./bar\'` instead.',
      type: 'Identifier'
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSx3QkFBbkI7O0FBRUEsV0FBVyxHQUFYLENBQWUsNEJBQWYsb0NBQW1EO0FBQ2pELFVBQ0UsaUJBQUssRUFBQyxNQUFNLGlDQUFQLEVBQUwsQ0FERixFQUVFLGlCQUFLLEVBQUMsTUFBTSw4Q0FBUCxFQUFMLENBRkYsRUFHRSxpQkFBSyxFQUFDLE1BQU0saURBQVAsRUFBTCxDQUhGLEVBSUUsaUJBQUssRUFBQyxNQUFNLDZEQUFQLEVBQUwsQ0FKRiw2QkFEaUQ7O0FBVWpELFdBQVMsQ0FDUCxpQkFBSztBQUNILFVBQU0sK0NBREg7QUFFSCxZQUFRLENBQUM7QUFDUCxlQUNFLG1EQUNBLG9FQUhLO0FBS1AsWUFBTTtBQUxDLEtBQUQ7QUFGTCxHQUFMLENBRE8sRUFXUCxpQkFBSztBQUNILFVBQU0scUNBREg7QUFFSCxZQUFRLENBQUM7QUFDUCxlQUNFLG1EQUNBLG9FQUhLO0FBS1AsWUFBTTtBQUxDLEtBQUQ7QUFGTCxHQUFMLENBWE8sRUFxQlAsaUJBQUs7QUFDSCxVQUFNLDZDQURIO0FBRUgsWUFBUSxDQUFDO0FBQ1AsZUFDRSxtREFDQSxvRUFISztBQUtQLFlBQU07QUFMQyxLQUFEO0FBRkwsR0FBTCxDQXJCTyxFQStCUCxpQkFBSztBQUNILFVBQU0sd0RBREg7QUFFSCxZQUFRLENBQUM7QUFDUCxlQUNFLG1EQUNBLG9FQUhLO0FBS1AsWUFBTTtBQUxDLEtBQUQ7QUFGTCxHQUFMLENBL0JPO0FBVndDLENBQW5EIiwiZmlsZSI6InJ1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCwgU1lOVEFYX0NBU0VTIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge1J1bGVUZXN0ZXJ9IGZyb20gJ2VzbGludCdcbmltcG9ydCBydWxlIGZyb20gJ3J1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyJ1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tbmFtZWQtYXMtZGVmYXVsdC1tZW1iZXInLCBydWxlLCB7XG4gIHZhbGlkOiBbXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBiYXIsIHtmb299IGZyb20gXCIuL2JhclwiOyd9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IGJhciBmcm9tIFwiLi9iYXJcIjsgY29uc3QgYmF6ID0gYmFyLmJheid9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHtmb299IGZyb20gXCIuL2JhclwiOyBjb25zdCBiYXogPSBmb28uYmF6Oyd9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0ICogYXMgbmFtZWQgZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiOyBjb25zdCBhID0gbmFtZWQuYSd9KSxcblxuICAgIC4uLlNZTlRBWF9DQVNFUyxcbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGJhciBmcm9tIFwiLi9iYXJcIjsgY29uc3QgZm9vID0gYmFyLmZvbzsnLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBtZXNzYWdlOiAoXG4gICAgICAgICAgJ0NhdXRpb246IGBiYXJgIGFsc28gaGFzIGEgbmFtZWQgZXhwb3J0IGBmb29gLiAnICtcbiAgICAgICAgICAnQ2hlY2sgaWYgeW91IG1lYW50IHRvIHdyaXRlIGBpbXBvcnQge2Zvb30gZnJvbSBcXCcuL2JhclxcJ2AgaW5zdGVhZC4nXG4gICAgICAgICksXG4gICAgICAgIHR5cGU6ICdNZW1iZXJFeHByZXNzaW9uJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBiYXIgZnJvbSBcIi4vYmFyXCI7IGJhci5mb28oKTsnLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBtZXNzYWdlOiAoXG4gICAgICAgICAgJ0NhdXRpb246IGBiYXJgIGFsc28gaGFzIGEgbmFtZWQgZXhwb3J0IGBmb29gLiAnICtcbiAgICAgICAgICAnQ2hlY2sgaWYgeW91IG1lYW50IHRvIHdyaXRlIGBpbXBvcnQge2Zvb30gZnJvbSBcXCcuL2JhclxcJ2AgaW5zdGVhZC4nXG4gICAgICAgICksXG4gICAgICAgIHR5cGU6ICdNZW1iZXJFeHByZXNzaW9uJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBiYXIgZnJvbSBcIi4vYmFyXCI7IGNvbnN0IHtmb299ID0gYmFyOycsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIG1lc3NhZ2U6IChcbiAgICAgICAgICAnQ2F1dGlvbjogYGJhcmAgYWxzbyBoYXMgYSBuYW1lZCBleHBvcnQgYGZvb2AuICcgK1xuICAgICAgICAgICdDaGVjayBpZiB5b3UgbWVhbnQgdG8gd3JpdGUgYGltcG9ydCB7Zm9vfSBmcm9tIFxcJy4vYmFyXFwnYCBpbnN0ZWFkLidcbiAgICAgICAgKSxcbiAgICAgICAgdHlwZTogJ0lkZW50aWZpZXInLFxuICAgICAgfV0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGJhciBmcm9tIFwiLi9iYXJcIjsgY29uc3Qge2ZvbzogZm9vMiwgYmF6fSA9IGJhcjsnLFxuICAgICAgZXJyb3JzOiBbe1xuICAgICAgICBtZXNzYWdlOiAoXG4gICAgICAgICAgJ0NhdXRpb246IGBiYXJgIGFsc28gaGFzIGEgbmFtZWQgZXhwb3J0IGBmb29gLiAnICtcbiAgICAgICAgICAnQ2hlY2sgaWYgeW91IG1lYW50IHRvIHdyaXRlIGBpbXBvcnQge2Zvb30gZnJvbSBcXCcuL2JhclxcJ2AgaW5zdGVhZC4nXG4gICAgICAgICksXG4gICAgICAgIHR5cGU6ICdJZGVudGlmaWVyJyxcbiAgICAgIH1dLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==