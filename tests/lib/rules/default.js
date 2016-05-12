'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/default');

ruleTester.run('default', rule, {
  valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }), (0, _utils.test)({ code: 'import foo from "./empty-folder";' }), (0, _utils.test)({ code: 'import { foo } from "./default-export";' }), (0, _utils.test)({ code: 'import foo from "./default-export";' }), (0, _utils.test)({ code: 'import foo from "./mixed-exports";' }), (0, _utils.test)({
    code: 'import bar from "./default-export";' }), (0, _utils.test)({
    code: 'import CoolClass from "./default-class";' }), (0, _utils.test)({
    code: 'import bar, { baz } from "./default-export";' }),

  // core modules always have a default
  (0, _utils.test)({ code: 'import crypto from "crypto";' }), (0, _utils.test)({ code: 'import common from "./common";',
    settings: { 'import/ignore': ['common'] } }),

  // es7 export syntax
  (0, _utils.test)({ code: 'export bar from "./bar"',
    parser: 'babel-eslint' }), (0, _utils.test)({ code: 'export { default as bar } from "./bar"' }), (0, _utils.test)({ code: 'export bar, { foo } from "./bar"',
    parser: 'babel-eslint' }), (0, _utils.test)({ code: 'export { default as bar, foo } from "./bar"' }), (0, _utils.test)({ code: 'export bar, * as names from "./bar"',
    parser: 'babel-eslint' }),

  // sanity check
  (0, _utils.test)({ code: 'export {a} from "./named-exports"' }), (0, _utils.test)({
    code: 'import twofer from "./trampoline"',
    parser: 'babel-eslint'
  }),

  // jsx
  (0, _utils.test)({
    code: 'import MyCoolComponent from "./jsx/MyCoolComponent.jsx"',
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
      ecmaFeatures: { jsx: true }
    }
  }),

  // #54: import of named export default
  (0, _utils.test)({ code: 'import foo from "./named-default-export"' }),

  // #94: redux export of execution result,
  (0, _utils.test)({ code: 'import connectedApp from "./redux"' }), (0, _utils.test)({ code: 'import App from "./jsx/App"',
    ecmaFeatures: { jsx: true, modules: true } }),

  // from no-errors
  (0, _utils.test)({
    code: "import Foo from './jsx/FooES7.js';",
    parser: 'babel-eslint'
  })],

  invalid: [(0, _utils.test)({
    code: "import Foo from './jsx/FooES7.js';",
    errors: ["Parse errors in imported module './jsx/FooES7.js': Unexpected token = (6:16)"]
  }), (0, _utils.test)({
    code: 'import crypto from "./common";',
    settings: { 'import/ignore': ['foo'] },
    errors: [{ message: 'No default export found in module.',
      type: 'ImportDefaultSpecifier' }] }), (0, _utils.test)({
    code: 'import baz from "./named-exports";',
    errors: [{ message: 'No default export found in module.',
      type: 'ImportDefaultSpecifier' }] }), (0, _utils.test)({
    code: 'import bar from "./common";',
    errors: [{ message: 'No default export found in module.',
      type: 'ImportDefaultSpecifier' }] }), (0, _utils.test)({
    code: "import Foo from './jsx/FooES7.js';",
    errors: ["Parse errors in imported module './jsx/FooES7.js': Unexpected token = (6:16)"]
  }),

  // es7 export syntax
  (0, _utils.test)({
    code: 'export baz from "./named-exports"',
    parser: 'babel-eslint',
    errors: ['No default export found in module.']
  }), (0, _utils.test)({
    code: 'export baz, { bar } from "./named-exports"',
    parser: 'babel-eslint',
    errors: ['No default export found in module.']
  }), (0, _utils.test)({
    code: 'export baz, * as names from "./named-exports"',
    parser: 'babel-eslint',
    errors: ['No default export found in module.']
  }),
  // exports default from a module with no default
  (0, _utils.test)({
    code: 'import twofer from "./broken-trampoline"',
    parser: 'babel-eslint',
    errors: ['No default export found in module.']
  }),

  // #328: * exports do not include default
  (0, _utils.test)({
    code: 'import barDefault from "./re-export"',
    errors: ['No default export found in module.']
  })]
});
//# sourceMappingURL=data:application/json;base64,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O0FBR0gsWUFBUSxDQUFDLG9DQUFEO0FBSEwsR0FBTCxDQTNCTyxFQWdDUCxpQkFBSztBQUNILFVBQU0sNENBREg7QUFFSCxZQUFRLGNBRkw7QUFHSCxZQUFRLENBQUMsb0NBQUQ7QUFITCxHQUFMLENBaENPLEVBcUNQLGlCQUFLO0FBQ0gsVUFBTSwrQ0FESDtBQUVILFlBQVEsY0FGTDtBQUdILFlBQVEsQ0FBQyxvQ0FBRDtBQUhMLEdBQUwsQ0FyQ087O0FBMkNQLG1CQUFLO0FBQ0gsVUFBTSwwQ0FESDtBQUVILFlBQVEsY0FGTDtBQUdILFlBQVEsQ0FBQyxvQ0FBRDtBQUhMLEdBQUwsQ0EzQ087OztBQWtEUCxtQkFBSztBQUNILFVBQU0sc0NBREg7QUFFSCxZQUFRO0FBRkwsR0FBTCxDQWxETztBQS9EcUIsQ0FBaEMiLCJmaWxlIjoicnVsZXMvZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbnZhciBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAsIHJ1bGUgPSByZXF1aXJlKCdydWxlcy9kZWZhdWx0JylcblxucnVsZVRlc3Rlci5ydW4oJ2RlZmF1bHQnLCBydWxlLCB7XG4gIHZhbGlkOiBbXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgXCIuL21hbGZvcm1lZC5qc1wiJyB9KSxcblxuICAgIHRlc3Qoe2NvZGU6ICdpbXBvcnQgZm9vIGZyb20gXCIuL2VtcHR5LWZvbGRlclwiOyd9KSxcbiAgICB0ZXN0KHtjb2RlOiAnaW1wb3J0IHsgZm9vIH0gZnJvbSBcIi4vZGVmYXVsdC1leHBvcnRcIjsnfSksXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBmb28gZnJvbSBcIi4vZGVmYXVsdC1leHBvcnRcIjsnfSksXG4gICAgdGVzdCh7Y29kZTogJ2ltcG9ydCBmb28gZnJvbSBcIi4vbWl4ZWQtZXhwb3J0c1wiOyd9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgYmFyIGZyb20gXCIuL2RlZmF1bHQtZXhwb3J0XCI7J30pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCBDb29sQ2xhc3MgZnJvbSBcIi4vZGVmYXVsdC1jbGFzc1wiOyd9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgYmFyLCB7IGJheiB9IGZyb20gXCIuL2RlZmF1bHQtZXhwb3J0XCI7J30pLFxuXG4gICAgLy8gY29yZSBtb2R1bGVzIGFsd2F5cyBoYXZlIGEgZGVmYXVsdFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7JyB9KSxcblxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb25cIjsnXG4gICAgICAgICAsIHNldHRpbmdzOiB7ICdpbXBvcnQvaWdub3JlJzogWydjb21tb24nXSB9IH0pLFxuXG4gICAgLy8gZXM3IGV4cG9ydCBzeW50YXhcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCBiYXIgZnJvbSBcIi4vYmFyXCInXG4gICAgICAgICAsIHBhcnNlcjogJ2JhYmVsLWVzbGludCcgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgeyBkZWZhdWx0IGFzIGJhciB9IGZyb20gXCIuL2JhclwiJyB9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2V4cG9ydCBiYXIsIHsgZm9vIH0gZnJvbSBcIi4vYmFyXCInXG4gICAgICAgICAsIHBhcnNlcjogJ2JhYmVsLWVzbGludCcgfSksXG4gICAgdGVzdCh7IGNvZGU6ICdleHBvcnQgeyBkZWZhdWx0IGFzIGJhciwgZm9vIH0gZnJvbSBcIi4vYmFyXCInIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IGJhciwgKiBhcyBuYW1lcyBmcm9tIFwiLi9iYXJcIidcbiAgICAgICAgICwgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyB9KSxcblxuICAgIC8vIHNhbml0eSBjaGVja1xuICAgIHRlc3QoeyBjb2RlOiAnZXhwb3J0IHthfSBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogJ2ltcG9ydCB0d29mZXIgZnJvbSBcIi4vdHJhbXBvbGluZVwiJyxcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgfSksXG5cbiAgICAvLyBqc3hcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgTXlDb29sQ29tcG9uZW50IGZyb20gXCIuL2pzeC9NeUNvb2xDb21wb25lbnQuanN4XCInLFxuICAgICAgcGFyc2VyT3B0aW9uczoge1xuICAgICAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgICAgICAgZWNtYVZlcnNpb246IDYsXG4gICAgICAgIGVjbWFGZWF0dXJlczogeyBqc3g6IHRydWUgfSxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyAjNTQ6IGltcG9ydCBvZiBuYW1lZCBleHBvcnQgZGVmYXVsdFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGZvbyBmcm9tIFwiLi9uYW1lZC1kZWZhdWx0LWV4cG9ydFwiJyB9KSxcblxuICAgIC8vICM5NDogcmVkdXggZXhwb3J0IG9mIGV4ZWN1dGlvbiByZXN1bHQsXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgY29ubmVjdGVkQXBwIGZyb20gXCIuL3JlZHV4XCInIH0pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IEFwcCBmcm9tIFwiLi9qc3gvQXBwXCInXG4gICAgICAgICAsIGVjbWFGZWF0dXJlczogeyBqc3g6IHRydWUsIG1vZHVsZXM6IHRydWUgfSB9KSxcblxuICAgIC8vIGZyb20gbm8tZXJyb3JzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCBGb28gZnJvbSAnLi9qc3gvRm9vRVM3LmpzJztcIixcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgfSksXG4gIF0sXG5cbiAgaW52YWxpZDogW1xuICAgIHRlc3Qoe1xuICAgICAgY29kZTogXCJpbXBvcnQgRm9vIGZyb20gJy4vanN4L0Zvb0VTNy5qcyc7XCIsXG4gICAgICBlcnJvcnM6IFtcIlBhcnNlIGVycm9ycyBpbiBpbXBvcnRlZCBtb2R1bGUgJy4vanN4L0Zvb0VTNy5qcyc6IFVuZXhwZWN0ZWQgdG9rZW4gPSAoNjoxNilcIl0sXG4gICAgfSksXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgY3J5cHRvIGZyb20gXCIuL2NvbW1vblwiOycsXG4gICAgICBzZXR0aW5nczogeyAnaW1wb3J0L2lnbm9yZSc6IFsnZm9vJ10gfSxcbiAgICAgIGVycm9yczogW3sgbWVzc2FnZTogJ05vIGRlZmF1bHQgZXhwb3J0IGZvdW5kIGluIG1vZHVsZS4nXG4gICAgICAgICAgICAgICAsIHR5cGU6ICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJ31dfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGJheiBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCI7JyxcbiAgICAgIGVycm9yczogW3sgbWVzc2FnZTogJ05vIGRlZmF1bHQgZXhwb3J0IGZvdW5kIGluIG1vZHVsZS4nXG4gICAgICAgICAgICAgICAsIHR5cGU6ICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJ31dfSksXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgYmFyIGZyb20gXCIuL2NvbW1vblwiOycsXG4gICAgICBlcnJvcnM6IFt7IG1lc3NhZ2U6ICdObyBkZWZhdWx0IGV4cG9ydCBmb3VuZCBpbiBtb2R1bGUuJ1xuICAgICAgICAgICAgICAgLCB0eXBlOiAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcid9XX0pLFxuXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCBGb28gZnJvbSAnLi9qc3gvRm9vRVM3LmpzJztcIixcbiAgICAgIGVycm9yczogW1wiUGFyc2UgZXJyb3JzIGluIGltcG9ydGVkIG1vZHVsZSAnLi9qc3gvRm9vRVM3LmpzJzogVW5leHBlY3RlZCB0b2tlbiA9ICg2OjE2KVwiXSxcbiAgICB9KSxcblxuICAgIC8vIGVzNyBleHBvcnQgc3ludGF4XG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGJheiBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGVycm9yczogWydObyBkZWZhdWx0IGV4cG9ydCBmb3VuZCBpbiBtb2R1bGUuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGJheiwgeyBiYXIgfSBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGVycm9yczogWydObyBkZWZhdWx0IGV4cG9ydCBmb3VuZCBpbiBtb2R1bGUuJ10sXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnZXhwb3J0IGJheiwgKiBhcyBuYW1lcyBmcm9tIFwiLi9uYW1lZC1leHBvcnRzXCInLFxuICAgICAgcGFyc2VyOiAnYmFiZWwtZXNsaW50JyxcbiAgICAgIGVycm9yczogWydObyBkZWZhdWx0IGV4cG9ydCBmb3VuZCBpbiBtb2R1bGUuJ10sXG4gICAgfSksXG4gICAgLy8gZXhwb3J0cyBkZWZhdWx0IGZyb20gYSBtb2R1bGUgd2l0aCBubyBkZWZhdWx0XG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IHR3b2ZlciBmcm9tIFwiLi9icm9rZW4tdHJhbXBvbGluZVwiJyxcbiAgICAgIHBhcnNlcjogJ2JhYmVsLWVzbGludCcsXG4gICAgICBlcnJvcnM6IFsnTm8gZGVmYXVsdCBleHBvcnQgZm91bmQgaW4gbW9kdWxlLiddLFxuICAgIH0pLFxuXG4gICAgLy8gIzMyODogKiBleHBvcnRzIGRvIG5vdCBpbmNsdWRlIGRlZmF1bHRcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICdpbXBvcnQgYmFyRGVmYXVsdCBmcm9tIFwiLi9yZS1leHBvcnRcIicsXG4gICAgICBlcnJvcnM6IFtgTm8gZGVmYXVsdCBleHBvcnQgZm91bmQgaW4gbW9kdWxlLmBdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==