'use strict';

var _chai = require('chai');

var _resolve = require('core/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('resolve', function () {
  it('should throw on bad parameters.', function () {
    (0, _chai.expect)(_resolve2.default.bind(null, null, null)).to.throw(Error);
  });

  it('respects import/resolve extensions', function () {
    var file = (0, _resolve2.default)('./jsx/MyCoolComponent', utils.testContext({ 'import/resolve': { 'extensions': ['.jsx'] } }));

    (0, _chai.expect)(file).to.equal(utils.testFilePath('./jsx/MyCoolComponent.jsx'));
  });

  it('should test case sensitivity', function () {
    // Note the spelling error 'MyUncoolComponent' vs 'MyUnCoolComponent'
    var file = (0, _resolve2.default)('./jsx/MyUncoolComponent', utils.testContext({ 'import/resolve': { 'extensions': ['.jsx'] } }));

    (0, _chai.expect)(file, 'path to ./jsx/MyUncoolComponent').to.be.undefined;
  });

  describe('case cache correctness', function () {
    var context = utils.testContext({
      'import/cache': { 'lifetime': 1 }
    });

    var pairs = [['./CaseyKasem.js', './CASEYKASEM.js']];

    pairs.forEach(function (_ref) {
      var original = _ref[0];
      var changed = _ref[1];

      describe(original + ' => ' + changed, function () {

        before('sanity check', function () {
          (0, _chai.expect)((0, _resolve2.default)(original, context)).to.exist;
          (0, _chai.expect)((0, _resolve2.default)(changed, context)).not.to.exist;
        });

        before('rename', function (done) {
          fs.rename(utils.testFilePath(original), utils.testFilePath(changed), done);
        });

        before('verify rename', function (done) {
          return fs.exists(utils.testFilePath(changed), function (exists) {
            return done(exists ? null : new Error('new file does not exist'));
          });
        });

        // these tests fail on a case-sensitive file system
        // because nonexistent files aren't cached
        if (_resolve.CASE_INSENSITIVE) {
          it('gets cached values within cache lifetime', function () {
            // get cached values initially
            (0, _chai.expect)((0, _resolve2.default)(original, context)).to.exist;
            (0, _chai.expect)((0, _resolve2.default)(changed, context)).not.to.exist;
          });

          // special behavior for infinity
          describe('infinite cache', function () {
            this.timeout(1200);
            before(function (done) {
              return setTimeout(done, 1100);
            });

            var lifetimes = ['∞', 'Infinity'];
            lifetimes.forEach(function (inf) {
              var infiniteContext = utils.testContext({
                'import/cache': { 'lifetime': inf }
              });

              it('lifetime: ' + inf + ' still gets cached values after ~1s', function () {
                (0, _chai.expect)((0, _resolve2.default)(original, infiniteContext)).to.exist;
                (0, _chai.expect)((0, _resolve2.default)(changed, infiniteContext)).not.to.exist;
              });
            });
          });
        }

        describe('finite cache', function () {
          this.timeout(1200);
          before(function (done) {
            return setTimeout(done, 1000);
          });
          it('gets correct values after cache lifetime', function () {
            (0, _chai.expect)((0, _resolve2.default)(original, context)).not.to.exist;
            (0, _chai.expect)((0, _resolve2.default)(changed, context)).to.exist;
          });
        });

        after('restore original case', function (done) {
          fs.rename(utils.testFilePath(changed), utils.testFilePath(original), done);
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcmVzb2x2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOzs7O0FBRUE7O0lBQVksRTs7QUFDWjs7SUFBWSxLOzs7Ozs7QUFFWixTQUFTLFNBQVQsRUFBb0IsWUFBWTtBQUM5QixLQUFHLGlDQUFILEVBQXNDLFlBQVk7QUFDaEQsc0JBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBUCxFQUF1QyxFQUF2QyxDQUEwQyxLQUExQyxDQUFnRCxLQUFoRDtBQUNELEdBRkQ7O0FBSUEsS0FBRyxvQ0FBSCxFQUF5QyxZQUFZO0FBQ25ELFFBQUksT0FBTyx1QkFBUyx1QkFBVCxFQUNTLE1BQU0sV0FBTixDQUFrQixFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxNQUFELENBQWhCLEVBQXBCLEVBQWxCLENBRFQsQ0FBWDs7QUFJQSxzQkFBTyxJQUFQLEVBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixNQUFNLFlBQU4sQ0FBbUIsMkJBQW5CLENBQXRCO0FBQ0QsR0FORDs7QUFRQSxLQUFHLDhCQUFILEVBQW1DLFlBQVk7O0FBRTdDLFFBQUksT0FBTyx1QkFBUyx5QkFBVCxFQUNTLE1BQU0sV0FBTixDQUFrQixFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxNQUFELENBQWhCLEVBQXBCLEVBQWxCLENBRFQsQ0FBWDs7QUFJQSxzQkFBTyxJQUFQLEVBQWEsaUNBQWIsRUFBZ0QsRUFBaEQsQ0FBbUQsRUFBbkQsQ0FBc0QsU0FBdEQ7QUFDRCxHQVBEOztBQVNBLFdBQVMsd0JBQVQsRUFBbUMsWUFBWTtBQUM3QyxRQUFNLFVBQVUsTUFBTSxXQUFOLENBQWtCO0FBQ2hDLHNCQUFnQixFQUFFLFlBQVksQ0FBZDtBQURnQixLQUFsQixDQUFoQjs7QUFJQSxRQUFNLFFBQVEsQ0FDWixDQUFDLGlCQUFELEVBQW9CLGlCQUFwQixDQURZLENBQWQ7O0FBSUEsVUFBTSxPQUFOLENBQWMsZ0JBQXlCO0FBQUEsVUFBdkIsUUFBdUI7QUFBQSxVQUFiLE9BQWE7O0FBQ3JDLGVBQVksUUFBWixZQUEyQixPQUEzQixFQUFzQyxZQUFZOztBQUVoRCxlQUFPLGNBQVAsRUFBdUIsWUFBWTtBQUNqQyw0QkFBTyx1QkFBUSxRQUFSLEVBQWtCLE9BQWxCLENBQVAsRUFBbUMsRUFBbkMsQ0FBc0MsS0FBdEM7QUFDQSw0QkFBTyx1QkFBUSxPQUFSLEVBQWlCLE9BQWpCLENBQVAsRUFBa0MsR0FBbEMsQ0FBc0MsRUFBdEMsQ0FBeUMsS0FBekM7QUFDRCxTQUhEOztBQUtBLGVBQU8sUUFBUCxFQUFpQixVQUFVLElBQVYsRUFBZ0I7QUFDL0IsYUFBRyxNQUFILENBQ0UsTUFBTSxZQUFOLENBQW1CLFFBQW5CLENBREYsRUFFRSxNQUFNLFlBQU4sQ0FBbUIsT0FBbkIsQ0FGRixFQUdFLElBSEY7QUFJRCxTQUxEOztBQU9BLGVBQU8sZUFBUCxFQUF3QixVQUFDLElBQUQ7QUFBQSxpQkFDdEIsR0FBRyxNQUFILENBQ0UsTUFBTSxZQUFOLENBQW1CLE9BQW5CLENBREYsRUFFRTtBQUFBLG1CQUFVLEtBQUssU0FBUyxJQUFULEdBQWdCLElBQUksS0FBSixDQUFVLHlCQUFWLENBQXJCLENBQVY7QUFBQSxXQUZGLENBRHNCO0FBQUEsU0FBeEI7Ozs7QUFPQSx1Q0FBc0I7QUFDcEIsYUFBRywwQ0FBSCxFQUErQyxZQUFZOztBQUV6RCw4QkFBTyx1QkFBUSxRQUFSLEVBQWtCLE9BQWxCLENBQVAsRUFBbUMsRUFBbkMsQ0FBc0MsS0FBdEM7QUFDQSw4QkFBTyx1QkFBUSxPQUFSLEVBQWlCLE9BQWpCLENBQVAsRUFBa0MsR0FBbEMsQ0FBc0MsRUFBdEMsQ0FBeUMsS0FBekM7QUFDRCxXQUpEOzs7QUFPQSxtQkFBUyxnQkFBVCxFQUEyQixZQUFZO0FBQ3JDLGlCQUFLLE9BQUwsQ0FBYSxJQUFiO0FBQ0EsbUJBQU8sVUFBQyxJQUFEO0FBQUEscUJBQVUsV0FBVyxJQUFYLEVBQWlCLElBQWpCLENBQVY7QUFBQSxhQUFQOztBQUVBLGdCQUFNLFlBQVksQ0FBRSxHQUFGLEVBQU8sVUFBUCxDQUFsQjtBQUNBLHNCQUFVLE9BQVYsQ0FBa0IsZUFBTztBQUN2QixrQkFBTSxrQkFBbUIsTUFBTSxXQUFOLENBQWtCO0FBQ3pDLGdDQUFnQixFQUFFLFlBQVksR0FBZDtBQUR5QixlQUFsQixDQUF6Qjs7QUFJQSxnQ0FBZ0IsR0FBaEIsMENBQTBELFlBQVk7QUFDcEUsa0NBQU8sdUJBQVEsUUFBUixFQUFrQixlQUFsQixDQUFQLEVBQTJDLEVBQTNDLENBQThDLEtBQTlDO0FBQ0Esa0NBQU8sdUJBQVEsT0FBUixFQUFpQixlQUFqQixDQUFQLEVBQTBDLEdBQTFDLENBQThDLEVBQTlDLENBQWlELEtBQWpEO0FBQ0QsZUFIRDtBQUlELGFBVEQ7QUFVRCxXQWZEO0FBZ0JEOztBQUVELGlCQUFTLGNBQVQsRUFBeUIsWUFBWTtBQUNuQyxlQUFLLE9BQUwsQ0FBYSxJQUFiO0FBQ0EsaUJBQU8sVUFBQyxJQUFEO0FBQUEsbUJBQVUsV0FBVyxJQUFYLEVBQWlCLElBQWpCLENBQVY7QUFBQSxXQUFQO0FBQ0EsYUFBRywwQ0FBSCxFQUErQyxZQUFZO0FBQ3pELDhCQUFPLHVCQUFRLFFBQVIsRUFBa0IsT0FBbEIsQ0FBUCxFQUFtQyxHQUFuQyxDQUF1QyxFQUF2QyxDQUEwQyxLQUExQztBQUNBLDhCQUFPLHVCQUFRLE9BQVIsRUFBaUIsT0FBakIsQ0FBUCxFQUFrQyxFQUFsQyxDQUFxQyxLQUFyQztBQUNELFdBSEQ7QUFJRCxTQVBEOztBQVNBLGNBQU0sdUJBQU4sRUFBK0IsVUFBVSxJQUFWLEVBQWdCO0FBQzdDLGFBQUcsTUFBSCxDQUNFLE1BQU0sWUFBTixDQUFtQixPQUFuQixDQURGLEVBRUUsTUFBTSxZQUFOLENBQW1CLFFBQW5CLENBRkYsRUFHRSxJQUhGO0FBSUQsU0FMRDtBQU1ELE9BOUREO0FBK0RELEtBaEVEO0FBaUVELEdBMUVEO0FBNEVELENBbEdEIiwiZmlsZSI6ImNvcmUvcmVzb2x2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknXG5cbmltcG9ydCByZXNvbHZlLCB7IENBU0VfSU5TRU5TSVRJVkUgfSBmcm9tICdjb3JlL3Jlc29sdmUnXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnXG5cbmRlc2NyaWJlKCdyZXNvbHZlJywgZnVuY3Rpb24gKCkge1xuICBpdCgnc2hvdWxkIHRocm93IG9uIGJhZCBwYXJhbWV0ZXJzLicsIGZ1bmN0aW9uICgpIHtcbiAgICBleHBlY3QocmVzb2x2ZS5iaW5kKG51bGwsIG51bGwsIG51bGwpKS50by50aHJvdyhFcnJvcilcbiAgfSlcblxuICBpdCgncmVzcGVjdHMgaW1wb3J0L3Jlc29sdmUgZXh0ZW5zaW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZSA9IHJlc29sdmUoICcuL2pzeC9NeUNvb2xDb21wb25lbnQnXG4gICAgICAgICAgICAgICAgICAgICAgLCB1dGlscy50ZXN0Q29udGV4dCh7ICdpbXBvcnQvcmVzb2x2ZSc6IHsgJ2V4dGVuc2lvbnMnOiBbJy5qc3gnXSB9fSlcbiAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICBleHBlY3QoZmlsZSkudG8uZXF1YWwodXRpbHMudGVzdEZpbGVQYXRoKCcuL2pzeC9NeUNvb2xDb21wb25lbnQuanN4JykpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCB0ZXN0IGNhc2Ugc2Vuc2l0aXZpdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gTm90ZSB0aGUgc3BlbGxpbmcgZXJyb3IgJ015VW5jb29sQ29tcG9uZW50JyB2cyAnTXlVbkNvb2xDb21wb25lbnQnXG4gICAgdmFyIGZpbGUgPSByZXNvbHZlKCAnLi9qc3gvTXlVbmNvb2xDb21wb25lbnQnXG4gICAgICAgICAgICAgICAgICAgICAgLCB1dGlscy50ZXN0Q29udGV4dCh7ICdpbXBvcnQvcmVzb2x2ZSc6IHsgJ2V4dGVuc2lvbnMnOiBbJy5qc3gnXSB9fSlcbiAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICBleHBlY3QoZmlsZSwgJ3BhdGggdG8gLi9qc3gvTXlVbmNvb2xDb21wb25lbnQnKS50by5iZS51bmRlZmluZWRcbiAgfSlcblxuICBkZXNjcmliZSgnY2FzZSBjYWNoZSBjb3JyZWN0bmVzcycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXRpbHMudGVzdENvbnRleHQoe1xuICAgICAgJ2ltcG9ydC9jYWNoZSc6IHsgJ2xpZmV0aW1lJzogMSB9LFxuICAgIH0pXG5cbiAgICBjb25zdCBwYWlycyA9IFtcbiAgICAgIFsnLi9DYXNleUthc2VtLmpzJywgJy4vQ0FTRVlLQVNFTS5qcyddLFxuICAgIF1cblxuICAgIHBhaXJzLmZvckVhY2goKFtvcmlnaW5hbCwgY2hhbmdlZF0pID0+IHtcbiAgICAgIGRlc2NyaWJlKGAke29yaWdpbmFsfSA9PiAke2NoYW5nZWR9YCwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGJlZm9yZSgnc2FuaXR5IGNoZWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChyZXNvbHZlKG9yaWdpbmFsLCBjb250ZXh0KSkudG8uZXhpc3RcbiAgICAgICAgICBleHBlY3QocmVzb2x2ZShjaGFuZ2VkLCBjb250ZXh0KSkubm90LnRvLmV4aXN0XG4gICAgICAgIH0pXG5cbiAgICAgICAgYmVmb3JlKCdyZW5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgIGZzLnJlbmFtZShcbiAgICAgICAgICAgIHV0aWxzLnRlc3RGaWxlUGF0aChvcmlnaW5hbCksXG4gICAgICAgICAgICB1dGlscy50ZXN0RmlsZVBhdGgoY2hhbmdlZCksXG4gICAgICAgICAgICBkb25lKVxuICAgICAgICB9KVxuXG4gICAgICAgIGJlZm9yZSgndmVyaWZ5IHJlbmFtZScsIChkb25lKSA9PlxuICAgICAgICAgIGZzLmV4aXN0cyhcbiAgICAgICAgICAgIHV0aWxzLnRlc3RGaWxlUGF0aChjaGFuZ2VkKSxcbiAgICAgICAgICAgIGV4aXN0cyA9PiBkb25lKGV4aXN0cyA/IG51bGwgOiBuZXcgRXJyb3IoJ25ldyBmaWxlIGRvZXMgbm90IGV4aXN0JykpKSlcblxuICAgICAgICAvLyB0aGVzZSB0ZXN0cyBmYWlsIG9uIGEgY2FzZS1zZW5zaXRpdmUgZmlsZSBzeXN0ZW1cbiAgICAgICAgLy8gYmVjYXVzZSBub25leGlzdGVudCBmaWxlcyBhcmVuJ3QgY2FjaGVkXG4gICAgICAgIGlmIChDQVNFX0lOU0VOU0lUSVZFKSB7XG4gICAgICAgICAgaXQoJ2dldHMgY2FjaGVkIHZhbHVlcyB3aXRoaW4gY2FjaGUgbGlmZXRpbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBnZXQgY2FjaGVkIHZhbHVlcyBpbml0aWFsbHlcbiAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlKG9yaWdpbmFsLCBjb250ZXh0KSkudG8uZXhpc3RcbiAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlKGNoYW5nZWQsIGNvbnRleHQpKS5ub3QudG8uZXhpc3RcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLy8gc3BlY2lhbCBiZWhhdmlvciBmb3IgaW5maW5pdHlcbiAgICAgICAgICBkZXNjcmliZSgnaW5maW5pdGUgY2FjaGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTIwMClcbiAgICAgICAgICAgIGJlZm9yZSgoZG9uZSkgPT4gc2V0VGltZW91dChkb25lLCAxMTAwKSlcblxuICAgICAgICAgICAgY29uc3QgbGlmZXRpbWVzID0gWyAn4oieJywgJ0luZmluaXR5JyBdXG4gICAgICAgICAgICBsaWZldGltZXMuZm9yRWFjaChpbmYgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpbmZpbml0ZUNvbnRleHQgPSAgdXRpbHMudGVzdENvbnRleHQoe1xuICAgICAgICAgICAgICAgICdpbXBvcnQvY2FjaGUnOiB7ICdsaWZldGltZSc6IGluZiB9LFxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIGl0KGBsaWZldGltZTogJHtpbmZ9IHN0aWxsIGdldHMgY2FjaGVkIHZhbHVlcyBhZnRlciB+MXNgLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc29sdmUob3JpZ2luYWwsIGluZmluaXRlQ29udGV4dCkpLnRvLmV4aXN0XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc29sdmUoY2hhbmdlZCwgaW5maW5pdGVDb250ZXh0KSkubm90LnRvLmV4aXN0XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmliZSgnZmluaXRlIGNhY2hlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMudGltZW91dCgxMjAwKVxuICAgICAgICAgIGJlZm9yZSgoZG9uZSkgPT4gc2V0VGltZW91dChkb25lLCAxMDAwKSlcbiAgICAgICAgICBpdCgnZ2V0cyBjb3JyZWN0IHZhbHVlcyBhZnRlciBjYWNoZSBsaWZldGltZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlKG9yaWdpbmFsLCBjb250ZXh0KSkubm90LnRvLmV4aXN0XG4gICAgICAgICAgICBleHBlY3QocmVzb2x2ZShjaGFuZ2VkLCBjb250ZXh0KSkudG8uZXhpc3RcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGFmdGVyKCdyZXN0b3JlIG9yaWdpbmFsIGNhc2UnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgIGZzLnJlbmFtZShcbiAgICAgICAgICAgIHV0aWxzLnRlc3RGaWxlUGF0aChjaGFuZ2VkKSxcbiAgICAgICAgICAgIHV0aWxzLnRlc3RGaWxlUGF0aChvcmlnaW5hbCksXG4gICAgICAgICAgICBkb25lKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG59KVxuIl19