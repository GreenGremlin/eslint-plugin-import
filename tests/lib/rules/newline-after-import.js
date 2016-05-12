'use strict';

var _eslint = require('eslint');

var IMPORT_ERROR_MESSAGE = 'Expected empty line after import statement not followed by another import.';
var REQUIRE_ERROR_MESSAGE = 'Expected empty line after require statement not followed by another require.';

var ruleTester = new _eslint.RuleTester();

ruleTester.run('newline-after-import', require('rules/newline-after-import'), {
  valid: [{
    code: "import foo from 'foo';\n\nvar foo = 'bar';",
    parserOptions: { sourceType: 'module' }
  }, {
    code: "var foo = require('foo-module');\n\nvar foo = 'bar';",
    parserOptions: { sourceType: 'module' }
  }, {
    code: "require('foo-module');\n\nvar foo = 'bar';",
    parserOptions: { sourceType: 'module' }
  }, {
    code: "import foo from 'foo';\nimport { bar } from './bar-lib';",
    parserOptions: { sourceType: 'module' }
  }, {
    code: "import foo from 'foo';\n\nvar a = 123;\n\nimport { bar } from './bar-lib';",
    parserOptions: { sourceType: 'module' }
  }, {
    code: "var foo = require('foo-module');\n\nvar a = 123;\n\nvar bar = require('bar-lib');",
    parserOptions: { sourceType: 'module' }
  }],

  invalid: [{
    code: "import foo from 'foo';\nexport default function() {};",
    errors: [{
      line: 2,
      column: 1,
      message: IMPORT_ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "var foo = require('foo-module');\nvar something = 123;",
    errors: [{
      line: 2,
      column: 1,
      message: REQUIRE_ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "import foo from 'foo';\nvar a = 123;\n\nimport { bar } from './bar-lib';\nvar b=456;",
    errors: [{
      line: 2,
      column: 1,
      message: IMPORT_ERROR_MESSAGE
    }, {
      line: 5,
      column: 1,
      message: IMPORT_ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "var foo = require('foo-module');\nvar a = 123;\n\nvar bar = require('bar-lib');\nvar b=456;",
    errors: [{
      line: 2,
      column: 1,
      message: REQUIRE_ERROR_MESSAGE
    }, {
      line: 5,
      column: 1,
      message: REQUIRE_ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "var foo = require('foo-module');\nvar a = 123;\n\nrequire('bar-lib');\nvar b=456;",
    errors: [{
      line: 2,
      column: 1,
      message: REQUIRE_ERROR_MESSAGE
    }, {
      line: 5,
      column: 1,
      message: REQUIRE_ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25ld2xpbmUtYWZ0ZXItaW1wb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTSx1QkFBdUIsNEVBQTdCO0FBQ0EsSUFBTSx3QkFBd0IsOEVBQTlCOztBQUVBLElBQU0sYUFBYSx3QkFBbkI7O0FBRUEsV0FBVyxHQUFYLENBQWUsc0JBQWYsRUFBdUMsUUFBUSw0QkFBUixDQUF2QyxFQUE4RTtBQUM1RSxTQUFPLENBQ0w7QUFDRSxVQUFNLDRDQURSO0FBRUUsbUJBQWUsRUFBRSxZQUFZLFFBQWQ7QUFGakIsR0FESyxFQUtMO0FBQ0UsVUFBTSxzREFEUjtBQUVFLG1CQUFlLEVBQUUsWUFBWSxRQUFkO0FBRmpCLEdBTEssRUFTTDtBQUNFLFVBQU0sNENBRFI7QUFFRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQUZqQixHQVRLLEVBYUw7QUFDRSxVQUFNLDBEQURSO0FBRUUsbUJBQWUsRUFBRSxZQUFZLFFBQWQ7QUFGakIsR0FiSyxFQWlCTDtBQUNFLFVBQU0sNEVBRFI7QUFFRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQUZqQixHQWpCSyxFQXFCTDtBQUNFLFVBQU0sbUZBRFI7QUFFRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQUZqQixHQXJCSyxDQURxRTs7QUE0QjVFLFdBQVMsQ0FDUDtBQUNFLFVBQU0sdURBRFI7QUFFRSxZQUFRLENBQUU7QUFDUixZQUFNLENBREU7QUFFUixjQUFRLENBRkE7QUFHUixlQUFTO0FBSEQsS0FBRixDQUZWO0FBT0UsbUJBQWUsRUFBRSxZQUFZLFFBQWQ7QUFQakIsR0FETyxFQVVQO0FBQ0UsVUFBTSx3REFEUjtBQUVFLFlBQVEsQ0FBRTtBQUNSLFlBQU0sQ0FERTtBQUVSLGNBQVEsQ0FGQTtBQUdSLGVBQVM7QUFIRCxLQUFGLENBRlY7QUFPRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQVBqQixHQVZPLEVBbUJQO0FBQ0UsVUFBTSxzRkFEUjtBQUVFLFlBQVEsQ0FDUjtBQUNFLFlBQU0sQ0FEUjtBQUVFLGNBQVEsQ0FGVjtBQUdFLGVBQVM7QUFIWCxLQURRLEVBTVI7QUFDRSxZQUFNLENBRFI7QUFFRSxjQUFRLENBRlY7QUFHRSxlQUFTO0FBSFgsS0FOUSxDQUZWO0FBYUUsbUJBQWUsRUFBRSxZQUFZLFFBQWQ7QUFiakIsR0FuQk8sRUFrQ1A7QUFDRSxVQUFNLDZGQURSO0FBRUUsWUFBUSxDQUNOO0FBQ0UsWUFBTSxDQURSO0FBRUUsY0FBUSxDQUZWO0FBR0UsZUFBUztBQUhYLEtBRE0sRUFNTjtBQUNFLFlBQU0sQ0FEUjtBQUVFLGNBQVEsQ0FGVjtBQUdFLGVBQVM7QUFIWCxLQU5NLENBRlY7QUFhRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQWJqQixHQWxDTyxFQWlEUDtBQUNFLFVBQU0sbUZBRFI7QUFFRSxZQUFRLENBQ047QUFDRSxZQUFNLENBRFI7QUFFRSxjQUFRLENBRlY7QUFHRSxlQUFTO0FBSFgsS0FETSxFQU1OO0FBQ0UsWUFBTSxDQURSO0FBRUUsY0FBUSxDQUZWO0FBR0UsZUFBUztBQUhYLEtBTk0sQ0FGVjtBQWFFLG1CQUFlLEVBQUUsWUFBWSxRQUFkO0FBYmpCLEdBakRPO0FBNUJtRSxDQUE5RSIsImZpbGUiOiJydWxlcy9uZXdsaW5lLWFmdGVyLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbmNvbnN0IElNUE9SVF9FUlJPUl9NRVNTQUdFID0gJ0V4cGVjdGVkIGVtcHR5IGxpbmUgYWZ0ZXIgaW1wb3J0IHN0YXRlbWVudCBub3QgZm9sbG93ZWQgYnkgYW5vdGhlciBpbXBvcnQuJztcbmNvbnN0IFJFUVVJUkVfRVJST1JfTUVTU0FHRSA9ICdFeHBlY3RlZCBlbXB0eSBsaW5lIGFmdGVyIHJlcXVpcmUgc3RhdGVtZW50IG5vdCBmb2xsb3dlZCBieSBhbm90aGVyIHJlcXVpcmUuJztcblxuY29uc3QgcnVsZVRlc3RlciA9IG5ldyBSdWxlVGVzdGVyKClcblxucnVsZVRlc3Rlci5ydW4oJ25ld2xpbmUtYWZ0ZXItaW1wb3J0JywgcmVxdWlyZSgncnVsZXMvbmV3bGluZS1hZnRlci1pbXBvcnQnKSwge1xuICB2YWxpZDogW1xuICAgIHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IGZvbyBmcm9tICdmb28nO1xcblxcbnZhciBmb28gPSAnYmFyJztcIixcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH0sXG4gICAge1xuICAgICAgY29kZTogXCJ2YXIgZm9vID0gcmVxdWlyZSgnZm9vLW1vZHVsZScpO1xcblxcbnZhciBmb28gPSAnYmFyJztcIixcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH0sXG4gICAge1xuICAgICAgY29kZTogXCJyZXF1aXJlKCdmb28tbW9kdWxlJyk7XFxuXFxudmFyIGZvbyA9ICdiYXInO1wiLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcImltcG9ydCBmb28gZnJvbSAnZm9vJztcXG5pbXBvcnQgeyBiYXIgfSBmcm9tICcuL2Jhci1saWInO1wiLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcImltcG9ydCBmb28gZnJvbSAnZm9vJztcXG5cXG52YXIgYSA9IDEyMztcXG5cXG5pbXBvcnQgeyBiYXIgfSBmcm9tICcuL2Jhci1saWInO1wiLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcInZhciBmb28gPSByZXF1aXJlKCdmb28tbW9kdWxlJyk7XFxuXFxudmFyIGEgPSAxMjM7XFxuXFxudmFyIGJhciA9IHJlcXVpcmUoJ2Jhci1saWInKTtcIixcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH1cbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAge1xuICAgICAgY29kZTogXCJpbXBvcnQgZm9vIGZyb20gJ2Zvbyc7XFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7fTtcIixcbiAgICAgIGVycm9yczogWyB7XG4gICAgICAgIGxpbmU6IDIsXG4gICAgICAgIGNvbHVtbjogMSxcbiAgICAgICAgbWVzc2FnZTogSU1QT1JUX0VSUk9SX01FU1NBR0VcbiAgICAgIH0gXSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH0sXG4gICAge1xuICAgICAgY29kZTogXCJ2YXIgZm9vID0gcmVxdWlyZSgnZm9vLW1vZHVsZScpO1xcbnZhciBzb21ldGhpbmcgPSAxMjM7XCIsXG4gICAgICBlcnJvcnM6IFsge1xuICAgICAgICBsaW5lOiAyLFxuICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgIG1lc3NhZ2U6IFJFUVVJUkVfRVJST1JfTUVTU0FHRVxuICAgICAgfSBdLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcImltcG9ydCBmb28gZnJvbSAnZm9vJztcXG52YXIgYSA9IDEyMztcXG5cXG5pbXBvcnQgeyBiYXIgfSBmcm9tICcuL2Jhci1saWInO1xcbnZhciBiPTQ1NjtcIixcbiAgICAgIGVycm9yczogW1xuICAgICAge1xuICAgICAgICBsaW5lOiAyLFxuICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgIG1lc3NhZ2U6IElNUE9SVF9FUlJPUl9NRVNTQUdFXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsaW5lOiA1LFxuICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgIG1lc3NhZ2U6IElNUE9SVF9FUlJPUl9NRVNTQUdFXG4gICAgICB9XSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH0sXG4gICAge1xuICAgICAgY29kZTogXCJ2YXIgZm9vID0gcmVxdWlyZSgnZm9vLW1vZHVsZScpO1xcbnZhciBhID0gMTIzO1xcblxcbnZhciBiYXIgPSByZXF1aXJlKCdiYXItbGliJyk7XFxudmFyIGI9NDU2O1wiLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5lOiAyLFxuICAgICAgICAgIGNvbHVtbjogMSxcbiAgICAgICAgICBtZXNzYWdlOiBSRVFVSVJFX0VSUk9SX01FU1NBR0VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDUsXG4gICAgICAgICAgY29sdW1uOiAxLFxuICAgICAgICAgIG1lc3NhZ2U6IFJFUVVJUkVfRVJST1JfTUVTU0FHRVxuICAgICAgICB9XSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH0sXG4gICAge1xuICAgICAgY29kZTogXCJ2YXIgZm9vID0gcmVxdWlyZSgnZm9vLW1vZHVsZScpO1xcbnZhciBhID0gMTIzO1xcblxcbnJlcXVpcmUoJ2Jhci1saWInKTtcXG52YXIgYj00NTY7XCIsXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IDIsXG4gICAgICAgICAgY29sdW1uOiAxLFxuICAgICAgICAgIG1lc3NhZ2U6IFJFUVVJUkVfRVJST1JfTUVTU0FHRVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluZTogNSxcbiAgICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgICAgbWVzc2FnZTogUkVRVUlSRV9FUlJPUl9NRVNTQUdFXG4gICAgICAgIH1dLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgXVxufSk7XG4iXX0=