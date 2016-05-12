'use strict';

var _chai = require('chai');

var _eslint = require('eslint');

/**
 * tests that require fully booting up ESLint
 */


describe('CLI regression tests', function () {
  describe('issue #210', function () {
    var cli = void 0;
    before(function () {
      cli = new _eslint.CLIEngine({
        useEslintrc: false,
        configFile: './tests/files/issue210.config.js',
        rulePaths: ['./lib/rules'],
        rules: {
          'named': 2
        }
      });
    });
    it("doesn't throw an error on gratuitous, erroneous self-reference", function () {
      (0, _chai.expect)(function () {
        return cli.executeOnFiles(['./tests/files/issue210.js']);
      }).not.to.throw(Error);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBOztBQUNBOzs7Ozs7O0FBRUEsU0FBUyxzQkFBVCxFQUFpQyxZQUFZO0FBQzNDLFdBQVMsWUFBVCxFQUF1QixZQUFZO0FBQ2pDLFFBQUksWUFBSjtBQUNBLFdBQU8sWUFBWTtBQUNqQixZQUFNLHNCQUFjO0FBQ2xCLHFCQUFhLEtBREs7QUFFbEIsb0JBQVksa0NBRk07QUFHbEIsbUJBQVcsQ0FBQyxhQUFELENBSE87QUFJbEIsZUFBTztBQUNMLG1CQUFTO0FBREo7QUFKVyxPQUFkLENBQU47QUFRRCxLQVREO0FBVUEsT0FBRyxnRUFBSCxFQUFxRSxZQUFZO0FBQy9FLHdCQUFPO0FBQUEsZUFBTSxJQUFJLGNBQUosQ0FBbUIsQ0FBQywyQkFBRCxDQUFuQixDQUFOO0FBQUEsT0FBUCxFQUFnRSxHQUFoRSxDQUFvRSxFQUFwRSxDQUF1RSxLQUF2RSxDQUE2RSxLQUE3RTtBQUNELEtBRkQ7QUFHRCxHQWZEO0FBZ0JELENBakJEIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGVzdHMgdGhhdCByZXF1aXJlIGZ1bGx5IGJvb3RpbmcgdXAgRVNMaW50XG4gKi9cbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknXG5pbXBvcnQgeyBDTElFbmdpbmUgfSBmcm9tICdlc2xpbnQnXG5cbmRlc2NyaWJlKCdDTEkgcmVncmVzc2lvbiB0ZXN0cycsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ2lzc3VlICMyMTAnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNsaVxuICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICBjbGkgPSBuZXcgQ0xJRW5naW5lKHtcbiAgICAgICAgdXNlRXNsaW50cmM6IGZhbHNlLFxuICAgICAgICBjb25maWdGaWxlOiAnLi90ZXN0cy9maWxlcy9pc3N1ZTIxMC5jb25maWcuanMnLFxuICAgICAgICBydWxlUGF0aHM6IFsnLi9saWIvcnVsZXMnXSxcbiAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAnbmFtZWQnOiAyLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICAgIGl0KFwiZG9lc24ndCB0aHJvdyBhbiBlcnJvciBvbiBncmF0dWl0b3VzLCBlcnJvbmVvdXMgc2VsZi1yZWZlcmVuY2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgZXhwZWN0KCgpID0+IGNsaS5leGVjdXRlT25GaWxlcyhbJy4vdGVzdHMvZmlsZXMvaXNzdWUyMTAuanMnXSkpLm5vdC50by50aHJvdyhFcnJvcilcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==