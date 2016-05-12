'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _utils = require('../utils');

var _eslint = require('eslint');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-duplicates');

ruleTester.run('no-duplicates', rule, {
  valid: [(0, _utils.test)({ code: 'import "./malformed.js"' }), (0, _utils.test)({ code: "import { x } from './foo'; import { y } from './bar'" }),

  // #86: every unresolved module should not show up as 'null' and duplicate
  (0, _utils.test)({ code: 'import foo from "234artaf";' + 'import { shoop } from "234q25ad"' })],
  invalid: [(0, _utils.test)({
    code: "import { x } from './foo'; import { y } from './foo'",
    errors: ['\'./foo\' imported multiple times.', '\'./foo\' imported multiple times.']
  }), (0, _utils.test)({
    code: "import { x } from './foo'; import { y } from './foo'; import { z } from './foo'",
    errors: ['\'./foo\' imported multiple times.', '\'./foo\' imported multiple times.', '\'./foo\' imported multiple times.']
  }),

  // ensure resolved path results in warnings
  (0, _utils.test)({
    code: "import { x } from './bar'; import { y } from 'bar';",
    settings: { 'import/resolve': {
        paths: [path.join(process.cwd(), 'tests', 'files')] } },
    errors: 2 }), // path ends up hardcoded


  // #86: duplicate unresolved modules should be flagged
  (0, _utils.test)({
    code: "import foo from 'non-existent'; import bar from 'non-existent';",
    errors: ["'non-existent' imported multiple times.", "'non-existent' imported multiple times."]
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWR1cGxpY2F0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7SUFBWSxJOztBQUNaOztBQUVBOzs7O0FBRUEsSUFBTSxhQUFhLHdCQUFuQjtJQUNNLE9BQU8sUUFBUSxxQkFBUixDQURiOztBQUdBLFdBQVcsR0FBWCxDQUFlLGVBQWYsRUFBZ0MsSUFBaEMsRUFBc0M7QUFDcEMsU0FBTyxDQUNMLGlCQUFLLEVBQUUsTUFBTSx5QkFBUixFQUFMLENBREssRUFHTCxpQkFBSyxFQUFFLE1BQU0sc0RBQVIsRUFBTCxDQUhLOzs7QUFNTCxtQkFBSyxFQUFFLE1BQU0sZ0NBQ0Esa0NBRFIsRUFBTCxDQU5LLENBRDZCO0FBVXBDLFdBQVMsQ0FDUCxpQkFBSztBQUNILFVBQU0sc0RBREg7QUFFSCxZQUFRLENBQUMsb0NBQUQsRUFBdUMsb0NBQXZDO0FBRkwsR0FBTCxDQURPLEVBTVAsaUJBQUs7QUFDSCxVQUFNLGlGQURIO0FBRUgsWUFBUSxDQUFDLG9DQUFELEVBQXVDLG9DQUF2QyxFQUE2RSxvQ0FBN0U7QUFGTCxHQUFMLENBTk87OztBQVlQLG1CQUFLO0FBQ0gsVUFBTSxxREFESDtBQUVILGNBQVUsRUFBRSxrQkFBa0I7QUFDNUIsZUFBTyxDQUFDLEtBQUssSUFBTCxDQUFXLFFBQVEsR0FBUixFQUFYLEVBQ1csT0FEWCxFQUNvQixPQURwQixDQUFELENBRHFCLEVBQXBCLEVBRlA7QUFNSCxZQUFRLENBTkwsRUFBTCxDQVpPLEU7Ozs7QUFzQlAsbUJBQUs7QUFDSCxVQUFNLGlFQURIO0FBRUgsWUFBUSxDQUNOLHlDQURNLEVBRU4seUNBRk07QUFGTCxHQUFMLENBdEJPO0FBVjJCLENBQXRDIiwiZmlsZSI6InJ1bGVzL25vLWR1cGxpY2F0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmltcG9ydCB7IFJ1bGVUZXN0ZXIgfSBmcm9tICdlc2xpbnQnXG5cbmNvbnN0IHJ1bGVUZXN0ZXIgPSBuZXcgUnVsZVRlc3RlcigpXG4gICAgLCBydWxlID0gcmVxdWlyZSgncnVsZXMvbm8tZHVwbGljYXRlcycpXG5cbnJ1bGVUZXN0ZXIucnVuKCduby1kdXBsaWNhdGVzJywgcnVsZSwge1xuICB2YWxpZDogW1xuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IFwiLi9tYWxmb3JtZWQuanNcIicgfSksXG5cbiAgICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgeyB4IH0gZnJvbSAnLi9mb28nOyBpbXBvcnQgeyB5IH0gZnJvbSAnLi9iYXInXCIgfSksXG5cbiAgICAvLyAjODY6IGV2ZXJ5IHVucmVzb2x2ZWQgbW9kdWxlIHNob3VsZCBub3Qgc2hvdyB1cCBhcyAnbnVsbCcgYW5kIGR1cGxpY2F0ZVxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGZvbyBmcm9tIFwiMjM0YXJ0YWZcIjsnICtcbiAgICAgICAgICAgICAgICAgJ2ltcG9ydCB7IHNob29wIH0gZnJvbSBcIjIzNHEyNWFkXCInIH0pLFxuICBdLFxuICBpbnZhbGlkOiBbXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICcuL2Zvbyc7IGltcG9ydCB7IHkgfSBmcm9tICcuL2ZvbydcIixcbiAgICAgIGVycm9yczogWydcXCcuL2Zvb1xcJyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcy4nLCAnXFwnLi9mb29cXCcgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMuJ10sXG4gICAgfSksXG5cbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6IFwiaW1wb3J0IHsgeCB9IGZyb20gJy4vZm9vJzsgaW1wb3J0IHsgeSB9IGZyb20gJy4vZm9vJzsgaW1wb3J0IHsgeiB9IGZyb20gJy4vZm9vJ1wiLFxuICAgICAgZXJyb3JzOiBbJ1xcJy4vZm9vXFwnIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzLicsICdcXCcuL2Zvb1xcJyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcy4nLCAnXFwnLi9mb29cXCcgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMuJ10sXG4gICAgfSksXG5cbiAgICAvLyBlbnN1cmUgcmVzb2x2ZWQgcGF0aCByZXN1bHRzIGluIHdhcm5pbmdzXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICcuL2Jhcic7IGltcG9ydCB7IHkgfSBmcm9tICdiYXInO1wiLFxuICAgICAgc2V0dGluZ3M6IHsgJ2ltcG9ydC9yZXNvbHZlJzoge1xuICAgICAgICBwYXRoczogW3BhdGguam9pbiggcHJvY2Vzcy5jd2QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICwgJ3Rlc3RzJywgJ2ZpbGVzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICldIH19LFxuICAgICAgZXJyb3JzOiAyLCAvLyBwYXRoIGVuZHMgdXAgaGFyZGNvZGVkXG4gICAgIH0pLFxuXG4gICAgLy8gIzg2OiBkdXBsaWNhdGUgdW5yZXNvbHZlZCBtb2R1bGVzIHNob3VsZCBiZSBmbGFnZ2VkXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiBcImltcG9ydCBmb28gZnJvbSAnbm9uLWV4aXN0ZW50JzsgaW1wb3J0IGJhciBmcm9tICdub24tZXhpc3RlbnQnO1wiLFxuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIFwiJ25vbi1leGlzdGVudCcgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMuXCIsXG4gICAgICAgIFwiJ25vbi1leGlzdGVudCcgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMuXCIsXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==