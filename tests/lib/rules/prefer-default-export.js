'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/prefer-default-export');

ruleTester.run('prefer-default-export', rule, {
  valid: [(0, _utils.test)({
    code: '\n        export const foo = \'foo\';\n        export const bar = \'bar\';'
  }), (0, _utils.test)({
    code: '\n        export const foo = \'foo\';\n        export default bar;'
  }), (0, _utils.test)({
    code: '\n        export { foo, bar }'
  }), (0, _utils.test)({
    code: '\n        export { foo as default }'
  })],
  invalid: [(0, _utils.test)({
    code: '\n        export const foo = \'foo\';',
    errors: [{
      ruleId: 'ExportNamedDeclaration',
      message: 'Prefer default export.'
    }]
  }), (0, _utils.test)({
    code: '\n        const foo = \'foo\';\n        export { foo };',
    errors: [{
      ruleId: 'ExportNamedDeclaration',
      message: 'Prefer default export.'
    }]
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3ByZWZlci1kZWZhdWx0LWV4cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUVBLElBQU0sYUFBYSx3QkFBbkI7SUFDTSxPQUFPLFFBQVEsNkJBQVIsQ0FEYjs7QUFHQSxXQUFXLEdBQVgsQ0FBZSx1QkFBZixFQUF3QyxJQUF4QyxFQUE4QztBQUM1QyxTQUFPLENBQ0wsaUJBQUs7QUFDSDtBQURHLEdBQUwsQ0FESyxFQU1MLGlCQUFLO0FBQ0g7QUFERyxHQUFMLENBTkssRUFXTCxpQkFBSztBQUNIO0FBREcsR0FBTCxDQVhLLEVBZUwsaUJBQUs7QUFDSDtBQURHLEdBQUwsQ0FmSyxDQURxQztBQXFCNUMsV0FBUyxDQUNQLGlCQUFLO0FBQ0gsaURBREc7QUFHSCxZQUFRLENBQUM7QUFDUCxjQUFRLHdCQUREO0FBRVAsZUFBUztBQUZGLEtBQUQ7QUFITCxHQUFMLENBRE8sRUFTUCxpQkFBSztBQUNILG1FQURHO0FBSUgsWUFBUSxDQUFDO0FBQ1AsY0FBUSx3QkFERDtBQUVQLGVBQVM7QUFGRixLQUFEO0FBSkwsR0FBTCxDQVRPO0FBckJtQyxDQUE5QyIsImZpbGUiOiJydWxlcy9wcmVmZXItZGVmYXVsdC1leHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbmNvbnN0IHJ1bGVUZXN0ZXIgPSBuZXcgUnVsZVRlc3RlcigpXG4gICAgLCBydWxlID0gcmVxdWlyZSgncnVsZXMvcHJlZmVyLWRlZmF1bHQtZXhwb3J0JylcblxucnVsZVRlc3Rlci5ydW4oJ3ByZWZlci1kZWZhdWx0LWV4cG9ydCcsIHJ1bGUsIHtcbiAgdmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgZXhwb3J0IGNvbnN0IGZvbyA9ICdmb28nO1xuICAgICAgICBleHBvcnQgY29uc3QgYmFyID0gJ2Jhcic7YCxcbiAgICAgIH0pLFxuICAgIHRlc3Qoe1xuICAgICAgY29kZTogYFxuICAgICAgICBleHBvcnQgY29uc3QgZm9vID0gJ2Zvbyc7XG4gICAgICAgIGV4cG9ydCBkZWZhdWx0IGJhcjtgLFxuICAgICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIGV4cG9ydCB7IGZvbywgYmFyIH1gLFxuICAgICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBgXG4gICAgICAgIGV4cG9ydCB7IGZvbyBhcyBkZWZhdWx0IH1gLFxuICAgICAgfSksXG4gIF0sXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgZXhwb3J0IGNvbnN0IGZvbyA9ICdmb28nO2AsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nLFxuICAgICAgICBtZXNzYWdlOiAnUHJlZmVyIGRlZmF1bHQgZXhwb3J0LicsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IGBcbiAgICAgICAgY29uc3QgZm9vID0gJ2Zvbyc7XG4gICAgICAgIGV4cG9ydCB7IGZvbyB9O2AsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIHJ1bGVJZDogJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nLFxuICAgICAgICBtZXNzYWdlOiAnUHJlZmVyIGRlZmF1bHQgZXhwb3J0LicsXG4gICAgICB9XSxcbiAgICB9KSxcbiAgXSxcbn0pXG4iXX0=