'use strict';

var _eslint = require('eslint');

var ERROR_MESSAGE = 'Unexpected namespace import.';

var ruleTester = new _eslint.RuleTester();

ruleTester.run('no-namespace', require('rules/no-namespace'), {
  valid: [{ code: "import { a, b } from 'foo';", parserOptions: { sourceType: 'module' } }, { code: "import { a, b } from './foo';", parserOptions: { sourceType: 'module' } }, { code: "import bar from 'bar';", parserOptions: { sourceType: 'module' } }, { code: "import bar from './bar';", parserOptions: { sourceType: 'module' } }],

  invalid: [{
    code: "import * as foo from 'foo';",
    errors: [{
      line: 1,
      column: 8,
      message: ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "import defaultExport, * as foo from 'foo';",
    errors: [{
      line: 1,
      column: 23,
      message: ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }, {
    code: "import * as foo from './foo';",
    errors: [{
      line: 1,
      column: 8,
      message: ERROR_MESSAGE
    }],
    parserOptions: { sourceType: 'module' }
  }]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5hbWVzcGFjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQU0sZ0JBQWdCLDhCQUF0Qjs7QUFFQSxJQUFNLGFBQWEsd0JBQW5COztBQUVBLFdBQVcsR0FBWCxDQUFlLGNBQWYsRUFBK0IsUUFBUSxvQkFBUixDQUEvQixFQUE4RDtBQUM1RCxTQUFPLENBQ0wsRUFBRSxNQUFNLDZCQUFSLEVBQXVDLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBdEQsRUFESyxFQUVMLEVBQUUsTUFBTSwrQkFBUixFQUF5QyxlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQXhELEVBRkssRUFHTCxFQUFFLE1BQU0sd0JBQVIsRUFBa0MsZUFBZSxFQUFFLFlBQVksUUFBZCxFQUFqRCxFQUhLLEVBSUwsRUFBRSxNQUFNLDBCQUFSLEVBQW9DLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBbkQsRUFKSyxDQURxRDs7QUFRNUQsV0FBUyxDQUNQO0FBQ0UsVUFBTSw2QkFEUjtBQUVFLFlBQVEsQ0FBRTtBQUNSLFlBQU0sQ0FERTtBQUVSLGNBQVEsQ0FGQTtBQUdSLGVBQVM7QUFIRCxLQUFGLENBRlY7QUFPRSxtQkFBZSxFQUFFLFlBQVksUUFBZDtBQVBqQixHQURPLEVBVVA7QUFDRSxVQUFNLDRDQURSO0FBRUUsWUFBUSxDQUFFO0FBQ1IsWUFBTSxDQURFO0FBRVIsY0FBUSxFQUZBO0FBR1IsZUFBUztBQUhELEtBQUYsQ0FGVjtBQU9FLG1CQUFlLEVBQUUsWUFBWSxRQUFkO0FBUGpCLEdBVk8sRUFtQlA7QUFDRSxVQUFNLCtCQURSO0FBRUUsWUFBUSxDQUFFO0FBQ1IsWUFBTSxDQURFO0FBRVIsY0FBUSxDQUZBO0FBR1IsZUFBUztBQUhELEtBQUYsQ0FGVjtBQU9FLG1CQUFlLEVBQUUsWUFBWSxRQUFkO0FBUGpCLEdBbkJPO0FBUm1ELENBQTlEIiwiZmlsZSI6InJ1bGVzL25vLW5hbWVzcGFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbmNvbnN0IEVSUk9SX01FU1NBR0UgPSAnVW5leHBlY3RlZCBuYW1lc3BhY2UgaW1wb3J0Lic7XG5cbmNvbnN0IHJ1bGVUZXN0ZXIgPSBuZXcgUnVsZVRlc3RlcigpXG5cbnJ1bGVUZXN0ZXIucnVuKCduby1uYW1lc3BhY2UnLCByZXF1aXJlKCdydWxlcy9uby1uYW1lc3BhY2UnKSwge1xuICB2YWxpZDogW1xuICAgIHsgY29kZTogXCJpbXBvcnQgeyBhLCBiIH0gZnJvbSAnZm9vJztcIiwgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9IH0sXG4gICAgeyBjb2RlOiBcImltcG9ydCB7IGEsIGIgfSBmcm9tICcuL2Zvbyc7XCIsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSB9LFxuICAgIHsgY29kZTogXCJpbXBvcnQgYmFyIGZyb20gJ2Jhcic7XCIsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSB9LFxuICAgIHsgY29kZTogXCJpbXBvcnQgYmFyIGZyb20gJy4vYmFyJztcIiwgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9IH1cbiAgXSxcblxuICBpbnZhbGlkOiBbXG4gICAge1xuICAgICAgY29kZTogXCJpbXBvcnQgKiBhcyBmb28gZnJvbSAnZm9vJztcIixcbiAgICAgIGVycm9yczogWyB7XG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGNvbHVtbjogOCxcbiAgICAgICAgbWVzc2FnZTogRVJST1JfTUVTU0FHRVxuICAgICAgfSBdLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcImltcG9ydCBkZWZhdWx0RXhwb3J0LCAqIGFzIGZvbyBmcm9tICdmb28nO1wiLFxuICAgICAgZXJyb3JzOiBbIHtcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgY29sdW1uOiAyMyxcbiAgICAgICAgbWVzc2FnZTogRVJST1JfTUVTU0FHRVxuICAgICAgfSBdLFxuICAgICAgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9XG4gICAgfSxcbiAgICB7XG4gICAgICBjb2RlOiBcImltcG9ydCAqIGFzIGZvbyBmcm9tICcuL2Zvbyc7XCIsXG4gICAgICBlcnJvcnM6IFsge1xuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBjb2x1bW46IDgsXG4gICAgICAgIG1lc3NhZ2U6IEVSUk9SX01FU1NBR0VcbiAgICAgIH0gXSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfVxuICAgIH1cbiAgXVxufSk7XG4iXX0=