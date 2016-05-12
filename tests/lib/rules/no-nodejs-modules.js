'use strict';

var _utils = require('../utils');

var _eslint = require('eslint');

var ruleTester = new _eslint.RuleTester(),
    rule = require('rules/no-nodejs-modules');

var errors = [{
  ruleId: 'no-nodejs-modules',
  message: 'Do not import Node.js builtin modules'
}];

ruleTester.run('no-nodejs-modules', rule, {
  valid: [(0, _utils.test)({ code: 'import _ from "lodash"' }), (0, _utils.test)({ code: 'import find from "lodash.find"' }), (0, _utils.test)({ code: 'import foo from "./foo"' }), (0, _utils.test)({ code: 'import foo from "../foo"' }), (0, _utils.test)({ code: 'import foo from "foo"' }), (0, _utils.test)({ code: 'import foo from "./"' }), (0, _utils.test)({ code: 'import foo from "@scope/foo"' }), (0, _utils.test)({ code: 'var _ = require("lodash")' }), (0, _utils.test)({ code: 'var find = require("lodash.find")' }), (0, _utils.test)({ code: 'var foo = require("./foo")' }), (0, _utils.test)({ code: 'var foo = require("../foo")' }), (0, _utils.test)({ code: 'var foo = require("foo")' }), (0, _utils.test)({ code: 'var foo = require("./")' }), (0, _utils.test)({ code: 'var foo = require("@scope/foo")' })],
  invalid: [(0, _utils.test)({
    code: 'import path from "path"',
    errors: errors
  }), (0, _utils.test)({
    code: 'import fs from "fs"',
    errors: errors
  }), (0, _utils.test)({
    code: 'var path = require("path")',
    errors: errors
  }), (0, _utils.test)({
    code: 'var fs = require("fs")',
    errors: errors
  })]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5vZGVqcy1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7O0FBRUEsSUFBTSxhQUFhLHdCQUFuQjtJQUNNLE9BQU8sUUFBUSx5QkFBUixDQURiOztBQUdBLElBQU0sU0FBUyxDQUFDO0FBQ2QsVUFBUSxtQkFETTtBQUVkLFdBQVM7QUFGSyxDQUFELENBQWY7O0FBS0EsV0FBVyxHQUFYLENBQWUsbUJBQWYsRUFBb0MsSUFBcEMsRUFBMEM7QUFDeEMsU0FBTyxDQUNMLGlCQUFLLEVBQUUsTUFBTSx3QkFBUixFQUFMLENBREssRUFFTCxpQkFBSyxFQUFFLE1BQU0sZ0NBQVIsRUFBTCxDQUZLLEVBR0wsaUJBQUssRUFBRSxNQUFNLHlCQUFSLEVBQUwsQ0FISyxFQUlMLGlCQUFLLEVBQUUsTUFBTSwwQkFBUixFQUFMLENBSkssRUFLTCxpQkFBSyxFQUFFLE1BQU0sdUJBQVIsRUFBTCxDQUxLLEVBTUwsaUJBQUssRUFBRSxNQUFNLHNCQUFSLEVBQUwsQ0FOSyxFQU9MLGlCQUFLLEVBQUUsTUFBTSw4QkFBUixFQUFMLENBUEssRUFRTCxpQkFBSyxFQUFFLE1BQU0sMkJBQVIsRUFBTCxDQVJLLEVBU0wsaUJBQUssRUFBRSxNQUFNLG1DQUFSLEVBQUwsQ0FUSyxFQVVMLGlCQUFLLEVBQUUsTUFBTSw0QkFBUixFQUFMLENBVkssRUFXTCxpQkFBSyxFQUFFLE1BQU0sNkJBQVIsRUFBTCxDQVhLLEVBWUwsaUJBQUssRUFBRSxNQUFNLDBCQUFSLEVBQUwsQ0FaSyxFQWFMLGlCQUFLLEVBQUUsTUFBTSx5QkFBUixFQUFMLENBYkssRUFjTCxpQkFBSyxFQUFFLE1BQU0saUNBQVIsRUFBTCxDQWRLLENBRGlDO0FBaUJ4QyxXQUFTLENBQ1AsaUJBQUs7QUFDSCxVQUFNLHlCQURIO0FBRUg7QUFGRyxHQUFMLENBRE8sRUFLUCxpQkFBSztBQUNILFVBQU0scUJBREg7QUFFSDtBQUZHLEdBQUwsQ0FMTyxFQVNQLGlCQUFLO0FBQ0gsVUFBTSw0QkFESDtBQUVIO0FBRkcsR0FBTCxDQVRPLEVBYVAsaUJBQUs7QUFDSCxVQUFNLHdCQURIO0FBRUg7QUFGRyxHQUFMLENBYk87QUFqQitCLENBQTFDIiwiZmlsZSI6InJ1bGVzL25vLW5vZGVqcy1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJy4uL3V0aWxzJ1xuXG5pbXBvcnQgeyBSdWxlVGVzdGVyIH0gZnJvbSAnZXNsaW50J1xuXG5jb25zdCBydWxlVGVzdGVyID0gbmV3IFJ1bGVUZXN0ZXIoKVxuICAgICwgcnVsZSA9IHJlcXVpcmUoJ3J1bGVzL25vLW5vZGVqcy1tb2R1bGVzJylcblxuY29uc3QgZXJyb3JzID0gW3tcbiAgcnVsZUlkOiAnbm8tbm9kZWpzLW1vZHVsZXMnLFxuICBtZXNzYWdlOiAnRG8gbm90IGltcG9ydCBOb2RlLmpzIGJ1aWx0aW4gbW9kdWxlcycsXG59XVxuXG5ydWxlVGVzdGVyLnJ1bignbm8tbm9kZWpzLW1vZHVsZXMnLCBydWxlLCB7XG4gIHZhbGlkOiBbXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCInfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgZmluZCBmcm9tIFwibG9kYXNoLmZpbmRcIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBmb28gZnJvbSBcIi4vZm9vXCInfSksXG4gICAgdGVzdCh7IGNvZGU6ICdpbXBvcnQgZm9vIGZyb20gXCIuLi9mb29cIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBmb28gZnJvbSBcImZvb1wiJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAnaW1wb3J0IGZvbyBmcm9tIFwiLi9cIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ2ltcG9ydCBmb28gZnJvbSBcIkBzY29wZS9mb29cIid9KSxcbiAgICB0ZXN0KHsgY29kZTogJ3ZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ3ZhciBmaW5kID0gcmVxdWlyZShcImxvZGFzaC5maW5kXCIpJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAndmFyIGZvbyA9IHJlcXVpcmUoXCIuL2Zvb1wiKSd9KSxcbiAgICB0ZXN0KHsgY29kZTogJ3ZhciBmb28gPSByZXF1aXJlKFwiLi4vZm9vXCIpJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAndmFyIGZvbyA9IHJlcXVpcmUoXCJmb29cIiknfSksXG4gICAgdGVzdCh7IGNvZGU6ICd2YXIgZm9vID0gcmVxdWlyZShcIi4vXCIpJ30pLFxuICAgIHRlc3QoeyBjb2RlOiAndmFyIGZvbyA9IHJlcXVpcmUoXCJAc2NvcGUvZm9vXCIpJ30pLFxuICBdLFxuICBpbnZhbGlkOiBbXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIicsXG4gICAgICBlcnJvcnMsXG4gICAgfSksXG4gICAgdGVzdCh7XG4gICAgICBjb2RlOiAnaW1wb3J0IGZzIGZyb20gXCJmc1wiJyxcbiAgICAgIGVycm9ycyxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICd2YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpJyxcbiAgICAgIGVycm9ycyxcbiAgICB9KSxcbiAgICB0ZXN0KHtcbiAgICAgIGNvZGU6ICd2YXIgZnMgPSByZXF1aXJlKFwiZnNcIiknLFxuICAgICAgZXJyb3JzLFxuICAgIH0pLFxuICBdLFxufSlcbiJdfQ==