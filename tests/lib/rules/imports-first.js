'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/imports-first');

ruleTester.run('imports-first', rule, {
                valid: [(0, _utils.test)({ code: "import { x } from './foo'; import { y } from './bar';\
                  export { x, y }" }), (0, _utils.test)({ code: "import { x } from 'foo'; import { y } from './bar'" }), (0, _utils.test)({ code: "import { x } from './foo'; import { y } from 'bar'" }), (0, _utils.test)({ code: "'use directive';\
                  import { x } from 'foo';" })],
                invalid: [(0, _utils.test)({ code: "import { x } from './foo';\
                  export { x };\
                  import { y } from './foo';",
                                errors: 1
                }), (0, _utils.test)({ code: "import { x } from './foo';\
                  export { x };\
                  import { y } from './bar';\
                  import { z } from './baz';",
                                errors: 2
                }), (0, _utils.test)({ code: "import { x } from './foo'; import { y } from 'bar'",
                                options: ['absolute-first'],
                                errors: 1
                }), (0, _utils.test)({ code: "import { x } from 'foo';\
                  'use directive';\
                  import { y } from 'bar';",
                                errors: 1
                })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2ltcG9ydHMtZmlyc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQSxJQUFNLGFBQWEsd0JBQW5CO0lBQ00sT0FBTyxRQUFRLHFCQUFSLENBRGI7O0FBR0EsV0FBVyxHQUFYLENBQWUsZUFBZixFQUFnQyxJQUFoQyxFQUFzQztBQUNwQyx1QkFBTyxDQUNMLGlCQUFLLEVBQUUsTUFBTTtrQ0FBUixFQUFMLENBREssRUFHTCxpQkFBSyxFQUFFLE1BQU0sb0RBQVIsRUFBTCxDQUhLLEVBSUwsaUJBQUssRUFBRSxNQUFNLG9EQUFSLEVBQUwsQ0FKSyxFQUtMLGlCQUFLLEVBQUUsTUFBTTsyQ0FBUixFQUFMLENBTEssQ0FENkI7QUFVcEMseUJBQVMsQ0FDUCxpQkFBSyxFQUFFLE1BQU07OzZDQUFSO0FBR0Usd0NBQVE7QUFIVixpQkFBTCxDQURPLEVBTVAsaUJBQUssRUFBRSxNQUFNOzs7NkNBQVI7QUFJRSx3Q0FBUTtBQUpWLGlCQUFMLENBTk8sRUFZUCxpQkFBSyxFQUFFLE1BQU0sb0RBQVI7QUFDRSx5Q0FBUyxDQUFDLGdCQUFELENBRFg7QUFFRSx3Q0FBUTtBQUZWLGlCQUFMLENBWk8sRUFnQlAsaUJBQUssRUFBRSxNQUFNOzsyQ0FBUjtBQUdFLHdDQUFRO0FBSFYsaUJBQUwsQ0FoQk87QUFWMkIsQ0FBdEMiLCJmaWxlIjoicnVsZXMvaW1wb3J0cy1maXJzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICcuLi91dGlscydcblxuaW1wb3J0IHsgbGludGVyLCBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAgICwgcnVsZSA9IHJlcXVpcmUoJ3J1bGVzL2ltcG9ydHMtZmlyc3QnKVxuXG5ydWxlVGVzdGVyLnJ1bignaW1wb3J0cy1maXJzdCcsIHJ1bGUsIHtcbiAgdmFsaWQ6IFtcbiAgICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgeyB4IH0gZnJvbSAnLi9mb28nOyBpbXBvcnQgeyB5IH0gZnJvbSAnLi9iYXInO1xcXG4gICAgICAgICAgICAgICAgICBleHBvcnQgeyB4LCB5IH1cIiB9KVxuICAsIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICdmb28nOyBpbXBvcnQgeyB5IH0gZnJvbSAnLi9iYXInXCIgfSlcbiAgLCB0ZXN0KHsgY29kZTogXCJpbXBvcnQgeyB4IH0gZnJvbSAnLi9mb28nOyBpbXBvcnQgeyB5IH0gZnJvbSAnYmFyJ1wiIH0pXG4gICwgdGVzdCh7IGNvZGU6IFwiJ3VzZSBkaXJlY3RpdmUnO1xcXG4gICAgICAgICAgICAgICAgICBpbXBvcnQgeyB4IH0gZnJvbSAnZm9vJztcIiB9KVxuICAsXG4gIF0sXG4gIGludmFsaWQ6IFtcbiAgICB0ZXN0KHsgY29kZTogXCJpbXBvcnQgeyB4IH0gZnJvbSAnLi9mb28nO1xcXG4gICAgICAgICAgICAgICAgICBleHBvcnQgeyB4IH07XFxcbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IHkgfSBmcm9tICcuL2Zvbyc7XCJcbiAgICAgICAgICwgZXJyb3JzOiAxXG4gICAgICAgICB9KVxuICAsIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICcuL2Zvbyc7XFxcbiAgICAgICAgICAgICAgICAgIGV4cG9ydCB7IHggfTtcXFxuICAgICAgICAgICAgICAgICAgaW1wb3J0IHsgeSB9IGZyb20gJy4vYmFyJztcXFxuICAgICAgICAgICAgICAgICAgaW1wb3J0IHsgeiB9IGZyb20gJy4vYmF6JztcIlxuICAgICAgICAgLCBlcnJvcnM6IDJcbiAgICAgICAgIH0pXG4gICwgdGVzdCh7IGNvZGU6IFwiaW1wb3J0IHsgeCB9IGZyb20gJy4vZm9vJzsgaW1wb3J0IHsgeSB9IGZyb20gJ2JhcidcIlxuICAgICAgICAgLCBvcHRpb25zOiBbJ2Fic29sdXRlLWZpcnN0J11cbiAgICAgICAgICwgZXJyb3JzOiAxXG4gICAgICAgICB9KVxuICAsIHRlc3QoeyBjb2RlOiBcImltcG9ydCB7IHggfSBmcm9tICdmb28nO1xcXG4gICAgICAgICAgICAgICAgICAndXNlIGRpcmVjdGl2ZSc7XFxcbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IHkgfSBmcm9tICdiYXInO1wiXG4gICAgICAgICAsIGVycm9yczogMVxuICAgICAgICAgfSlcbiAgLFxuICBdXG59KVxuIl19