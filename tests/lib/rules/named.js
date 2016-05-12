'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/named');

function error(name, module) {
  return { message: name + ' not found in \'' + module + '\'',
    type: 'Identifier' };
}

ruleTester.run('named', rule, {
  valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }), (0, _utils.test)({ code: 'import { foo } from "./bar"' }), (0, _utils.test)({ code: 'import { foo } from "./empty-module"' }), (0, _utils.test)({ code: 'import bar from "./bar.js"' }), (0, _utils.test)({ code: 'import bar, { foo } from "./bar.js"' }), (0, _utils.test)({ code: 'import {a, b, d} from "./named-exports"' }), (0, _utils.test)({ code: 'import {ExportedClass} from "./named-exports"' }), (0, _utils.test)({ code: 'import { ActionTypes } from "./qc"' }), (0, _utils.test)({ code: 'import {a, b, c, d} from "./re-export"' }), (0, _utils.test)({ code: 'import { jsxFoo } from "./jsx/AnotherComponent"',
    settings: { 'import/resolve': { 'extensions': ['.js', '.jsx'] } } }),

  // validate that eslint-disable-line silences this properly
  (0, _utils.test)({ code: 'import {a, b, d} from "./common"; ' + '// eslint-disable-line named' }), (0, _utils.test)({ code: 'import { foo, bar } from "./re-export-names"' }), (0, _utils.test)({ code: 'import { foo, bar } from "./common"',
    settings: { 'import/ignore': ['common'] } }),

  // ignore core modules by default
  (0, _utils.test)({ code: 'import { foo } from "crypto"' }), (0, _utils.test)({ code: 'import { zoob } from "a"' }), (0, _utils.test)({ code: 'import { someThing } from "./test-module"' }),

  // node_modules/a only exports 'foo', should be ignored though
  (0, _utils.test)({ code: 'import { zoob } from "a"' }),

  // export tests
  (0, _utils.test)({ code: 'export { foo } from "./bar"' }), (0, _utils.test)({ code: 'export { foo as bar } from "./bar"' }), (0, _utils.test)({ code: 'export { foo } from "./does-not-exist"' }),

  // es7
  (0, _utils.test)({
    code: 'export bar, { foo } from "./bar"',
    parser: 'babel-eslint'
  }), (0, _utils.test)({
    code: 'import { foo, bar } from "./named-trampoline"',
    parser: 'babel-eslint'
  }),

  // regression tests
  (0, _utils.test)({ code: 'export { foo as bar }' }),

  // destructured exports
  (0, _utils.test)({ code: 'import { destructuredProp } from "./named-exports"' }), (0, _utils.test)({ code: 'import { arrayKeyProp } from "./named-exports"' }), (0, _utils.test)({ code: 'import { deepProp } from "./named-exports"' }), (0, _utils.test)({ code: 'import { deepSparseElement } from "./named-exports"' }),

  // flow types
  (0, _utils.test)({
    code: 'import type { MyType } from "./flowtypes"',
    'parser': 'babel-eslint'
  }),

  // jsnext
  (0, _utils.test)({
    code: '/*jsnext*/ import { createStore } from "redux"',
    settings: { 'import/ignore': [] }
  }),
  // should work without ignore
  (0, _utils.test)({
    code: '/*jsnext*/ import { createStore } from "redux"'
  }),

  // ignore is ignored if exports are found
  (0, _utils.test)({ code: 'import { foo } from "es6-module"' }),

  // issue #210: shameless self-reference
  (0, _utils.test)({ code: 'import { me, soGreat } from "./narcissist"' }),

  // issue #251: re-export default as named
  (0, _utils.test)({ code: 'import { foo, bar, baz } from "./re-export-default"' }), (0, _utils.test)({
    code: 'import { common } from "./re-export-default"',
    settings: { 'import/ignore': ['common'] }
  })].concat(_utils.SYNTAX_CASES),

  invalid: [(0, _utils.test)({ code: 'import { zoob } from "a"',
    settings: { 'import/ignore': [] },
    errors: [error('zoob', 'a')] }), (0, _utils.test)({ code: 'import { somethingElse } from "./test-module"',
    errors: [error('somethingElse', './test-module')] }), (0, _utils.test)({ code: 'import {a, b, d} from "./common"',
    errors: [error('a', './common'), error('b', './common'), error('d', './common')] }), (0, _utils.test)({ code: 'import { baz } from "./bar"',
    errors: [error('baz', './bar')] }),

  // test multiple
  (0, _utils.test)({ code: 'import { baz, bop } from "./bar"',
    errors: [error('baz', './bar'), error('bop', './bar')] }), (0, _utils.test)({ code: 'import {a, b, c} from "./named-exports"',
    errors: [error('c', './named-exports')] }), (0, _utils.test)({ code: 'import { a } from "./default-export"',
    errors: [error('a', './default-export')] }), (0, _utils.test)({ code: 'import { a } from "./common"', args: [2, 'es6-only'],
    errors: [error('a', './common')] }), (0, _utils.test)({ code: 'import { ActionTypess } from "./qc"',
    errors: [error('ActionTypess', './qc')] }), (0, _utils.test)({ code: 'import {a, b, c, d, e} from "./re-export"',
    errors: [error('e', './re-export')] }), (0, _utils.test)({
    code: 'import { a } from "./re-export-names"',
    args: [2, 'es6-only'],
    errors: [error('a', './re-export-names')]
  }),

  // export tests
  (0, _utils.test)({
    code: 'export { bar } from "./bar"',
    errors: ["bar not found in './bar'"]
  }),

  // es7
  (0, _utils.test)({
    code: 'export bar2, { bar } from "./bar"',
    parser: 'babel-eslint',
    errors: ["bar not found in './bar'"]
  }), (0, _utils.test)({
    code: 'import { foo, bar, baz } from "./named-trampoline"',
    parser: 'babel-eslint',
    errors: ["baz not found in './named-trampoline'"]
  }), (0, _utils.test)({
    code: 'import { baz } from "./broken-trampoline"',
    parser: 'babel-eslint',
    errors: ["baz not found via broken-trampoline.js -> named-exports.js"]
  }),

  // parse errors
  (0, _utils.test)({
    code: "import { a } from './test.coffee';",
    settings: { 'import/extensions': ['.js', '.coffee'] },
    errors: [{
      message: "Parse errors in imported module './test.coffee': Unexpected token > (1:20)",
      type: 'Literal'
    }]
  }),

  // flow types
  (0, _utils.test)({
    code: 'import type { MissingType } from "./flowtypes"',
    parser: 'babel-eslint',
    errors: [{
      message: "MissingType not found in './flowtypes'",
      type: 'Identifier'
    }]
  }),

  // jsnext
  (0, _utils.test)({
    code: '/*jsnext*/ import { createSnorlax } from "redux"',
    settings: { 'import/ignore': [] },
    errors: ["createSnorlax not found in 'redux'"]
  }),
  // should work without ignore
  (0, _utils.test)({
    code: '/*jsnext*/ import { createSnorlax } from "redux"',
    errors: ["createSnorlax not found in 'redux'"]
  }),

  // ignore is ignored if exports are found
  (0, _utils.test)({
    code: 'import { baz } from "es6-module"',
    errors: ["baz not found in 'es6-module'"]
  }), (0, _utils.test)({
    code: 'import { baz } from "./bar"',
    settings: { 'import/ignore': ['bar'] },
    errors: ["baz not found in './bar'"]
  }),

  // issue #251
  (0, _utils.test)({
    code: 'import { foo, bar, bap } from "./re-export-default"',
    errors: ["bap not found in './re-export-default'"]
  }), (0, _utils.test)({
    code: 'import { common } from "./re-export-default"',
    // todo: better error message
    errors: ["common not found via re-export-default.js -> common.js"]
  }),

  // #328: * exports do not include default
  (0, _utils.test)({
    code: 'import { default as barDefault } from "./re-export"',
    errors: ['default not found in \'./re-export\'']
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25hbWVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBSSxhQUFhLHdCQUFqQjtJQUNJLE9BQU8sUUFBUSxhQUFSLENBRFg7O0FBR0EsU0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QjtBQUMzQixTQUFPLEVBQUUsU0FBUyxPQUFPLGtCQUFQLEdBQTRCLE1BQTVCLEdBQXFDLElBQWhEO0FBQ0UsVUFBTSxZQURSLEVBQVA7QUFFRDs7QUFFRCxXQUFXLEdBQVgsQ0FBZSxPQUFmLEVBQXdCLElBQXhCLEVBQThCO0FBQzVCLFVBQ0UsaUJBQUssRUFBRSxNQUFNLHlCQUFSLEVBQUwsQ0FERixFQUdFLGlCQUFLLEVBQUMsTUFBTSw2QkFBUCxFQUFMLENBSEYsRUFJRSxpQkFBSyxFQUFDLE1BQU0sc0NBQVAsRUFBTCxDQUpGLEVBS0UsaUJBQUssRUFBQyxNQUFNLDRCQUFQLEVBQUwsQ0FMRixFQU1FLGlCQUFLLEVBQUMsTUFBTSxxQ0FBUCxFQUFMLENBTkYsRUFPRSxpQkFBSyxFQUFDLE1BQU0seUNBQVAsRUFBTCxDQVBGLEVBUUUsaUJBQUssRUFBQyxNQUFNLCtDQUFQLEVBQUwsQ0FSRixFQVNFLGlCQUFLLEVBQUMsTUFBTSxvQ0FBUCxFQUFMLENBVEYsRUFVRSxpQkFBSyxFQUFDLE1BQU0sd0NBQVAsRUFBTCxDQVZGLEVBWUUsaUJBQUssRUFBRSxNQUFNLGlEQUFSO0FBQ0UsY0FBVSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxLQUFELEVBQVEsTUFBUixDQUFoQixFQUFwQixFQURaLEVBQUwsQ0FaRjs7O0FBZ0JFLG1CQUFLLEVBQUMsTUFBTSx1Q0FDQSw4QkFEUCxFQUFMLENBaEJGLEVBbUJFLGlCQUFLLEVBQUUsTUFBTSw4Q0FBUixFQUFMLENBbkJGLEVBcUJFLGlCQUFLLEVBQUUsTUFBTSxxQ0FBUjtBQUNFLGNBQVUsRUFBRSxpQkFBaUIsQ0FBQyxRQUFELENBQW5CLEVBRFosRUFBTCxDQXJCRjs7O0FBeUJFLG1CQUFLLEVBQUUsTUFBTSw4QkFBUixFQUFMLENBekJGLEVBMEJFLGlCQUFLLEVBQUUsTUFBTSwwQkFBUixFQUFMLENBMUJGLEVBNEJFLGlCQUFLLEVBQUUsTUFBTSwyQ0FBUixFQUFMLENBNUJGOzs7QUErQkUsbUJBQUssRUFBRSxNQUFNLDBCQUFSLEVBQUwsQ0EvQkY7OztBQWtDRSxtQkFBSyxFQUFFLE1BQU0sNkJBQVIsRUFBTCxDQWxDRixFQW1DRSxpQkFBSyxFQUFFLE1BQU0sb0NBQVIsRUFBTCxDQW5DRixFQW9DRSxpQkFBSyxFQUFFLE1BQU0sd0NBQVIsRUFBTCxDQXBDRjs7O0FBdUNFLG1CQUFLO0FBQ0gsVUFBTSxrQ0FESDtBQUVILFlBQVE7QUFGTCxHQUFMLENBdkNGLEVBMkNFLGlCQUFLO0FBQ0gsVUFBTSwrQ0FESDtBQUVILFlBQVE7QUFGTCxHQUFMLENBM0NGOzs7QUFpREUsbUJBQUssRUFBRSxNQUFNLHVCQUFSLEVBQUwsQ0FqREY7OztBQW9ERSxtQkFBSyxFQUFFLE1BQU0sb0RBQVIsRUFBTCxDQXBERixFQXFERSxpQkFBSyxFQUFFLE1BQU0sZ0RBQVIsRUFBTCxDQXJERixFQXNERSxpQkFBSyxFQUFFLE1BQU0sNENBQVIsRUFBTCxDQXRERixFQXVERSxpQkFBSyxFQUFFLE1BQU0scURBQVIsRUFBTCxDQXZERjs7O0FBMERFLG1CQUFLO0FBQ0gsVUFBTSwyQ0FESDtBQUVILGNBQVU7QUFGUCxHQUFMLENBMURGOzs7QUFnRUUsbUJBQUs7QUFDSCxVQUFNLGdEQURIO0FBRUgsY0FBVSxFQUFFLGlCQUFpQixFQUFuQjtBQUZQLEdBQUwsQ0FoRUY7O0FBcUVFLG1CQUFLO0FBQ0gsVUFBTTtBQURILEdBQUwsQ0FyRUY7OztBQTBFRSxtQkFBSyxFQUFFLE1BQU0sa0NBQVIsRUFBTCxDQTFFRjs7O0FBNkVFLG1CQUFLLEVBQUUsTUFBTSw0Q0FBUixFQUFMLENBN0VGOzs7QUFnRkUsbUJBQUssRUFBRSxNQUFNLHFEQUFSLEVBQUwsQ0FoRkYsRUFpRkUsaUJBQUs7QUFDSCxVQUFNLDhDQURIO0FBRUgsY0FBVSxFQUFFLGlCQUFpQixDQUFDLFFBQUQsQ0FBbkI7QUFGUCxHQUFMLENBakZGLDZCQUQ0Qjs7QUEwRjVCLFdBQVMsQ0FFUCxpQkFBSyxFQUFFLE1BQU0sMEJBQVI7QUFDRSxjQUFVLEVBQUUsaUJBQWlCLEVBQW5CLEVBRFo7QUFFRSxZQUFRLENBQUUsTUFBTSxNQUFOLEVBQWMsR0FBZCxDQUFGLENBRlYsRUFBTCxDQUZPLEVBTVAsaUJBQUssRUFBRSxNQUFNLCtDQUFSO0FBQ0UsWUFBUSxDQUFFLE1BQU0sZUFBTixFQUF1QixlQUF2QixDQUFGLENBRFYsRUFBTCxDQU5PLEVBU1AsaUJBQUssRUFBQyxNQUFNLGtDQUFQO0FBQ0gsWUFBUSxDQUFFLE1BQU0sR0FBTixFQUFXLFVBQVgsQ0FBRixFQUNFLE1BQU0sR0FBTixFQUFXLFVBQVgsQ0FERixFQUVFLE1BQU0sR0FBTixFQUFXLFVBQVgsQ0FGRixDQURMLEVBQUwsQ0FUTyxFQWNQLGlCQUFLLEVBQUMsTUFBTSw2QkFBUDtBQUNILFlBQVEsQ0FBQyxNQUFNLEtBQU4sRUFBYSxPQUFiLENBQUQsQ0FETCxFQUFMLENBZE87OztBQWtCUCxtQkFBSyxFQUFDLE1BQU0sa0NBQVA7QUFDSCxZQUFRLENBQUMsTUFBTSxLQUFOLEVBQWEsT0FBYixDQUFELEVBQXdCLE1BQU0sS0FBTixFQUFhLE9BQWIsQ0FBeEIsQ0FETCxFQUFMLENBbEJPLEVBcUJQLGlCQUFLLEVBQUMsTUFBTSx5Q0FBUDtBQUNILFlBQVEsQ0FBQyxNQUFNLEdBQU4sRUFBVyxpQkFBWCxDQUFELENBREwsRUFBTCxDQXJCTyxFQXdCUCxpQkFBSyxFQUFDLE1BQU0sc0NBQVA7QUFDSCxZQUFRLENBQUMsTUFBTSxHQUFOLEVBQVcsa0JBQVgsQ0FBRCxDQURMLEVBQUwsQ0F4Qk8sRUEyQlAsaUJBQUssRUFBQyxNQUFNLDhCQUFQLEVBQXVDLE1BQU0sQ0FBQyxDQUFELEVBQUksVUFBSixDQUE3QztBQUNILFlBQVEsQ0FBQyxNQUFNLEdBQU4sRUFBVyxVQUFYLENBQUQsQ0FETCxFQUFMLENBM0JPLEVBOEJQLGlCQUFLLEVBQUMsTUFBTSxxQ0FBUDtBQUNILFlBQVEsQ0FBQyxNQUFNLGNBQU4sRUFBc0IsTUFBdEIsQ0FBRCxDQURMLEVBQUwsQ0E5Qk8sRUFpQ1AsaUJBQUssRUFBQyxNQUFNLDJDQUFQO0FBQ0gsWUFBUSxDQUFDLE1BQU0sR0FBTixFQUFXLGFBQVgsQ0FBRCxDQURMLEVBQUwsQ0FqQ08sRUFvQ1AsaUJBQUs7QUFDSCxVQUFNLHVDQURIO0FBRUgsVUFBTSxDQUFDLENBQUQsRUFBSSxVQUFKLENBRkg7QUFHSCxZQUFRLENBQUMsTUFBTSxHQUFOLEVBQVcsbUJBQVgsQ0FBRDtBQUhMLEdBQUwsQ0FwQ087OztBQTJDUCxtQkFBSztBQUNILFVBQU0sNkJBREg7QUFFSCxZQUFRLENBQUMsMEJBQUQ7QUFGTCxHQUFMLENBM0NPOzs7QUFpRFAsbUJBQUs7QUFDSCxVQUFNLG1DQURIO0FBRUgsWUFBUSxjQUZMO0FBR0gsWUFBUSxDQUFDLDBCQUFEO0FBSEwsR0FBTCxDQWpETyxFQXNEUCxpQkFBSztBQUNILFVBQU0sb0RBREg7QUFFSCxZQUFRLGNBRkw7QUFHSCxZQUFRLENBQUMsdUNBQUQ7QUFITCxHQUFMLENBdERPLEVBMkRQLGlCQUFLO0FBQ0gsVUFBTSwyQ0FESDtBQUVILFlBQVEsY0FGTDtBQUdILFlBQVEsQ0FBQyw0REFBRDtBQUhMLEdBQUwsQ0EzRE87OztBQWtFUCxtQkFBSztBQUNILFVBQU0sb0NBREg7QUFFSCxjQUFVLEVBQUUscUJBQXFCLENBQUMsS0FBRCxFQUFRLFNBQVIsQ0FBdkIsRUFGUDtBQUdILFlBQVEsQ0FBQztBQUNQLGVBQVMsNEVBREY7QUFFUCxZQUFNO0FBRkMsS0FBRDtBQUhMLEdBQUwsQ0FsRU87OztBQTRFUCxtQkFBSztBQUNILFVBQU0sZ0RBREg7QUFFSCxZQUFRLGNBRkw7QUFHSCxZQUFRLENBQUM7QUFDUCxlQUFTLHdDQURGO0FBRVAsWUFBTTtBQUZDLEtBQUQ7QUFITCxHQUFMLENBNUVPOzs7QUFzRlAsbUJBQUs7QUFDSCxVQUFNLGtEQURIO0FBRUgsY0FBVSxFQUFFLGlCQUFpQixFQUFuQixFQUZQO0FBR0gsWUFBUSxDQUFDLG9DQUFEO0FBSEwsR0FBTCxDQXRGTzs7QUE0RlAsbUJBQUs7QUFDSCxVQUFNLGtEQURIO0FBRUgsWUFBUSxDQUFDLG9DQUFEO0FBRkwsR0FBTCxDQTVGTzs7O0FBa0dQLG1CQUFLO0FBQ0gsVUFBTSxrQ0FESDtBQUVILFlBQVEsQ0FBQywrQkFBRDtBQUZMLEdBQUwsQ0FsR08sRUFzR1AsaUJBQUs7QUFDSCxVQUFNLDZCQURIO0FBRUgsY0FBVSxFQUFFLGlCQUFpQixDQUFDLEtBQUQsQ0FBbkIsRUFGUDtBQUdILFlBQVEsQ0FBQywwQkFBRDtBQUhMLEdBQUwsQ0F0R087OztBQTZHUCxtQkFBSztBQUNILFVBQU0scURBREg7QUFFSCxZQUFRLENBQUMsd0NBQUQ7QUFGTCxHQUFMLENBN0dPLEVBaUhQLGlCQUFLO0FBQ0gsVUFBTSw4Q0FESDs7QUFHSCxZQUFRLENBQUMsd0RBQUQ7QUFITCxHQUFMLENBakhPOzs7QUF3SFAsbUJBQUs7QUFDSCxVQUFNLHFEQURIO0FBRUgsWUFBUTtBQUZMLEdBQUwsQ0F4SE87QUExRm1CLENBQTlCIiwiZmlsZSI6InJ1bGVzL25hbWVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCwgU1lOVEFYX0NBU0VTIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG52YXIgcnVsZVRlc3RlciA9IG5ldyBSdWxlVGVzdGVyKClcbiAgLCBydWxlID0gcmVxdWlyZSgncnVsZXMvbmFtZWQnKVxuXG5mdW5jdGlvbiBlcnJvcihuYW1lLCBtb2R1bGUpIHtcbiAgcmV0dXJuIHsgbWVzc2FnZTogbmFtZSArICcgbm90IGZvdW5kIGluIFxcJycgKyBtb2R1bGUgKyAnXFwnJ1xuICAgICAgICAgLCB0eXBlOiAnSWRlbnRpZmllcicgfVxufVxuXG5ydWxlVGVzdGVyLnJ1bignbmFtZWQnLCBydWxlLCB7XG4gIHZhbGlkOiBbXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgXCIuL21hbGZvcm1lZC5qc1wiJyB9KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQgeyBmb28gfSBmcm9tIFwiLi9iYXJcIid9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHsgZm9vIH0gZnJvbSBcIi4vZW1wdHktbW9kdWxlXCInfSksXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBiYXIgZnJvbSBcIi4vYmFyLmpzXCInfSksXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBiYXIsIHsgZm9vIH0gZnJvbSBcIi4vYmFyLmpzXCInfSksXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCB7YSwgYiwgZH0gZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiJ30pLFxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQge0V4cG9ydGVkQ2xhc3N9IGZyb20gXCIuL25hbWVkLWV4cG9ydHNcIid9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHsgQWN0aW9uVHlwZXMgfSBmcm9tIFwiLi9xY1wiJ30pLFxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQge2EsIGIsIGMsIGR9IGZyb20gXCIuL3JlLWV4cG9ydFwiJ30pLFxuXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyBqc3hGb28gfSBmcm9tIFwiLi9qc3gvQW5vdGhlckNvbXBvbmVudFwiJ1xuICAgICAgICAgLCBzZXR0aW5nczogeyAnaW1wb3J0L3Jlc29sdmUnOiB7ICdleHRlbnNpb25zJzogWycuanMnLCAnLmpzeCddIH0gfSB9KSxcblxuICAgIC8vIHZhbGlkYXRlIHRoYXQgZXNsaW50LWRpc2FibGUtbGluZSBzaWxlbmNlcyB0aGlzIHByb3Blcmx5XG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCB7YSwgYiwgZH0gZnJvbSBcIi4vY29tbW9uXCI7ICcgK1xuICAgICAgICAgICAgICAgICcvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5hbWVkJyB9KSxcblxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHsgZm9vLCBiYXIgfSBmcm9tIFwiLi9yZS1leHBvcnQtbmFtZXNcIicgfSksXG5cbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCB7IGZvbywgYmFyIH0gZnJvbSBcIi4vY29tbW9uXCInXG4gICAgICAgICAsIHNldHRpbmdzOiB7ICdpbXBvcnQvaWdub3JlJzogWydjb21tb24nXSB9IH0pLFxuXG4gICAgLy8gaWdub3JlIGNvcmUgbW9kdWxlcyBieSBkZWZhdWx0XG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyBmb28gfSBmcm9tIFwiY3J5cHRvXCInIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHsgem9vYiB9IGZyb20gXCJhXCInIH0pLFxuXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyBzb21lVGhpbmcgfSBmcm9tIFwiLi90ZXN0LW1vZHVsZVwiJyB9KSxcblxuICAgIC8vIG5vZGVfbW9kdWxlcy9hIG9ubHkgZXhwb3J0cyAnZm9vJywgc2hvdWxkIGJlIGlnbm9yZWQgdGhvdWdoXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyB6b29iIH0gZnJvbSBcImFcIicgfSksXG5cbiAgICAvLyBleHBvcnQgdGVzdHNcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCB7IGZvbyB9IGZyb20gXCIuL2JhclwiJyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCB7IGZvbyBhcyBiYXIgfSBmcm9tIFwiLi9iYXJcIicgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgeyBmb28gfSBmcm9tIFwiLi9kb2VzLW5vdC1leGlzdFwiJyB9KSxcblxuICAgIC8vIGVzN1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCBiYXIsIHsgZm9vIH0gZnJvbSBcIi4vYmFyXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgeyBmb28sIGJhciB9IGZyb20gXCIuL25hbWVkLXRyYW1wb2xpbmVcIicsXG4gICAgICBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnLFxuICAgIH0pLFxuXG4gICAgLy8gcmVncmVzc2lvbiB0ZXN0c1xuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IHsgZm9vIGFzIGJhciB9J30pLFxuXG4gICAgLy8gZGVzdHJ1Y3R1cmVkIGV4cG9ydHNcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCB7IGRlc3RydWN0dXJlZFByb3AgfSBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHsgYXJyYXlLZXlQcm9wIH0gZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiJyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCB7IGRlZXBQcm9wIH0gZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiJyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCB7IGRlZXBTcGFyc2VFbGVtZW50IH0gZnJvbSBcIi4vbmFtZWQtZXhwb3J0c1wiJyB9KSxcblxuICAgIC8vIGZsb3cgdHlwZXNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgdHlwZSB7IE15VHlwZSB9IGZyb20gXCIuL2Zsb3d0eXBlc1wiJyxcbiAgICAgICdwYXJzZXInOiAnYmFiZWwtZXNsaW50JyxcbiAgICB9KSxcblxuICAgIC8vIGpzbmV4dFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJy8qanNuZXh0Ki8gaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tIFwicmVkdXhcIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L2lnbm9yZSc6IFtdIH0sXG4gICAgfSksXG4gICAgLy8gc2hvdWxkIHdvcmsgd2l0aG91dCBpZ25vcmVcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICcvKmpzbmV4dCovIGltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSBcInJlZHV4XCInLFxuICAgIH0pLFxuXG4gICAgLy8gaWdub3JlIGlzIGlnbm9yZWQgaWYgZXhwb3J0cyBhcmUgZm91bmRcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCB7IGZvbyB9IGZyb20gXCJlczYtbW9kdWxlXCInIH0pLFxuXG4gICAgLy8gaXNzdWUgIzIxMDogc2hhbWVsZXNzIHNlbGYtcmVmZXJlbmNlXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyBtZSwgc29HcmVhdCB9IGZyb20gXCIuL25hcmNpc3Npc3RcIicgfSksXG5cbiAgICAvLyBpc3N1ZSAjMjUxOiByZS1leHBvcnQgZGVmYXVsdCBhcyBuYW1lZFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHsgZm9vLCBiYXIsIGJheiB9IGZyb20gXCIuL3JlLWV4cG9ydC1kZWZhdWx0XCInIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGNvbW1vbiB9IGZyb20gXCIuL3JlLWV4cG9ydC1kZWZhdWx0XCInLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9pZ25vcmUnOiBbJ2NvbW1vbiddIH0sXG4gICAgfSksXG5cbiAgICAuLi5TWU5UQVhfQ0FTRVMsXG4gIF0sXG5cbiAgaW52YWxpZDogW1xuXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgeyB6b29iIH0gZnJvbSBcImFcIidcbiAgICAgICAgICwgc2V0dGluZ3M6IHsgJ2ltcG9ydC9pZ25vcmUnOiBbXSB9XG4gICAgICAgICAsIGVycm9yczogWyBlcnJvcignem9vYicsICdhJykgXSB9KSxcblxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IHsgc29tZXRoaW5nRWxzZSB9IGZyb20gXCIuL3Rlc3QtbW9kdWxlXCInXG4gICAgICAgICAsIGVycm9yczogWyBlcnJvcignc29tZXRoaW5nRWxzZScsICcuL3Rlc3QtbW9kdWxlJykgXSB9KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQge2EsIGIsIGR9IGZyb20gXCIuL2NvbW1vblwiJyxcbiAgICAgIGVycm9yczogWyBlcnJvcignYScsICcuL2NvbW1vbicpXG4gICAgICAgICAgICAgICwgZXJyb3IoJ2InLCAnLi9jb21tb24nKVxuICAgICAgICAgICAgICAsIGVycm9yKCdkJywgJy4vY29tbW9uJykgXX0pLFxuXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCB7IGJheiB9IGZyb20gXCIuL2JhclwiJyxcbiAgICAgIGVycm9yczogW2Vycm9yKCdiYXonLCAnLi9iYXInKV19KSxcblxuICAgIC8vIHRlc3QgbXVsdGlwbGVcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHsgYmF6LCBib3AgfSBmcm9tIFwiLi9iYXJcIicsXG4gICAgICBlcnJvcnM6IFtlcnJvcignYmF6JywgJy4vYmFyJyksIGVycm9yKCdib3AnLCAnLi9iYXInKV19KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQge2EsIGIsIGN9IGZyb20gXCIuL25hbWVkLWV4cG9ydHNcIicsXG4gICAgICBlcnJvcnM6IFtlcnJvcignYycsICcuL25hbWVkLWV4cG9ydHMnKV19KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQgeyBhIH0gZnJvbSBcIi4vZGVmYXVsdC1leHBvcnRcIicsXG4gICAgICBlcnJvcnM6IFtlcnJvcignYScsICcuL2RlZmF1bHQtZXhwb3J0JyldfSksXG5cbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHsgYSB9IGZyb20gXCIuL2NvbW1vblwiJywgYXJnczogWzIsICdlczYtb25seSddLFxuICAgICAgZXJyb3JzOiBbZXJyb3IoJ2EnLCAnLi9jb21tb24nKV19KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQgeyBBY3Rpb25UeXBlc3MgfSBmcm9tIFwiLi9xY1wiJyxcbiAgICAgIGVycm9yczogW2Vycm9yKCdBY3Rpb25UeXBlc3MnLCAnLi9xYycpXX0pLFxuXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCB7YSwgYiwgYywgZCwgZX0gZnJvbSBcIi4vcmUtZXhwb3J0XCInLFxuICAgICAgZXJyb3JzOiBbZXJyb3IoJ2UnLCAnLi9yZS1leHBvcnQnKV19KSxcblxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGEgfSBmcm9tIFwiLi9yZS1leHBvcnQtbmFtZXNcIicsXG4gICAgICBhcmdzOiBbMiwgJ2VzNi1vbmx5J10sXG4gICAgICBlcnJvcnM6IFtlcnJvcignYScsICcuL3JlLWV4cG9ydC1uYW1lcycpXSxcbiAgICB9KSxcblxuICAgIC8vIGV4cG9ydCB0ZXN0c1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2V4cG9ydCB7IGJhciB9IGZyb20gXCIuL2JhclwiJyxcbiAgICAgIGVycm9yczogW1wiYmFyIG5vdCBmb3VuZCBpbiAnLi9iYXInXCJdLFxuICAgIH0pLFxuXG4gICAgLy8gZXM3XG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGJhcjIsIHsgYmFyIH0gZnJvbSBcIi4vYmFyXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGVycm9yczogW1wiYmFyIG5vdCBmb3VuZCBpbiAnLi9iYXInXCJdLFxuICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGZvbywgYmFyLCBiYXogfSBmcm9tIFwiLi9uYW1lZC10cmFtcG9saW5lXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGVycm9yczogW1wiYmF6IG5vdCBmb3VuZCBpbiAnLi9uYW1lZC10cmFtcG9saW5lJ1wiXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgeyBiYXogfSBmcm9tIFwiLi9icm9rZW4tdHJhbXBvbGluZVwiJyxcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgICBlcnJvcnM6IFtcImJheiBub3QgZm91bmQgdmlhIGJyb2tlbi10cmFtcG9saW5lLmpzIC0+IG5hbWVkLWV4cG9ydHMuanNcIl0sXG4gICAgfSksXG5cbiAgICAvLyBwYXJzZSBlcnJvcnNcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgYSB9IGZyb20gJy4vdGVzdC5jb2ZmZWUnO1wiLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9leHRlbnNpb25zJzogWycuanMnLCAnLmNvZmZlZSddIH0sXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIG1lc3NhZ2U6IFwiUGFyc2UgZXJyb3JzIGluIGltcG9ydGVkIG1vZHVsZSAnLi90ZXN0LmNvZmZlZSc6IFVuZXhwZWN0ZWQgdG9rZW4gPiAoMToyMClcIixcbiAgICAgICAgdHlwZTogJ0xpdGVyYWwnLFxuICAgICAgfV0sXG4gICAgfSksXG5cbiAgICAvLyBmbG93IHR5cGVzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IHR5cGUgeyBNaXNzaW5nVHlwZSB9IGZyb20gXCIuL2Zsb3d0eXBlc1wiJyxcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIG1lc3NhZ2U6IFwiTWlzc2luZ1R5cGUgbm90IGZvdW5kIGluICcuL2Zsb3d0eXBlcydcIixcbiAgICAgICAgdHlwZTogJ0lkZW50aWZpZXInLFxuICAgICAgfV0sXG4gICAgfSksXG5cbiAgICAvLyBqc25leHRcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICcvKmpzbmV4dCovIGltcG9ydCB7IGNyZWF0ZVNub3JsYXggfSBmcm9tIFwicmVkdXhcIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L2lnbm9yZSc6IFtdIH0sXG4gICAgICBlcnJvcnM6IFtcImNyZWF0ZVNub3JsYXggbm90IGZvdW5kIGluICdyZWR1eCdcIl0sXG4gICAgfSksXG4gICAgLy8gc2hvdWxkIHdvcmsgd2l0aG91dCBpZ25vcmVcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICcvKmpzbmV4dCovIGltcG9ydCB7IGNyZWF0ZVNub3JsYXggfSBmcm9tIFwicmVkdXhcIicsXG4gICAgICBlcnJvcnM6IFtcImNyZWF0ZVNub3JsYXggbm90IGZvdW5kIGluICdyZWR1eCdcIl0sXG4gICAgfSksXG5cbiAgICAvLyBpZ25vcmUgaXMgaWdub3JlZCBpZiBleHBvcnRzIGFyZSBmb3VuZFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGJheiB9IGZyb20gXCJlczYtbW9kdWxlXCInLFxuICAgICAgZXJyb3JzOiBbXCJiYXogbm90IGZvdW5kIGluICdlczYtbW9kdWxlJ1wiXSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgeyBiYXogfSBmcm9tIFwiLi9iYXJcIicsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L2lnbm9yZSc6IFsnYmFyJ10gfSxcbiAgICAgIGVycm9yczogW1wiYmF6IG5vdCBmb3VuZCBpbiAnLi9iYXInXCJdLFxuICAgIH0pLFxuXG4gICAgLy8gaXNzdWUgIzI1MVxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGZvbywgYmFyLCBiYXAgfSBmcm9tIFwiLi9yZS1leHBvcnQtZGVmYXVsdFwiJyxcbiAgICAgIGVycm9yczogW1wiYmFwIG5vdCBmb3VuZCBpbiAnLi9yZS1leHBvcnQtZGVmYXVsdCdcIl0sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IHsgY29tbW9uIH0gZnJvbSBcIi4vcmUtZXhwb3J0LWRlZmF1bHRcIicsXG4gICAgICAvLyB0b2RvOiBiZXR0ZXIgZXJyb3IgbWVzc2FnZVxuICAgICAgZXJyb3JzOiBbXCJjb21tb24gbm90IGZvdW5kIHZpYSByZS1leHBvcnQtZGVmYXVsdC5qcyAtPiBjb21tb24uanNcIl0sXG4gICAgfSksXG5cbiAgICAvLyAjMzI4OiAqIGV4cG9ydHMgZG8gbm90IGluY2x1ZGUgZGVmYXVsdFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB7IGRlZmF1bHQgYXMgYmFyRGVmYXVsdCB9IGZyb20gXCIuL3JlLWV4cG9ydFwiJyxcbiAgICAgIGVycm9yczogW2BkZWZhdWx0IG5vdCBmb3VuZCBpbiAnLi9yZS1leHBvcnQnYF0sXG4gICAgfSksXG4gIF0sXG59KVxuIl19