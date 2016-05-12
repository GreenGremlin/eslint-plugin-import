'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _chai = require('chai');

var _getExports = require('core/getExports');

var _getExports2 = _interopRequireDefault(_getExports);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _utils = require('../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getExports', function () {
  var fakeContext = {
    getFilename: _utils.getFilename,
    settings: {},
    parserPath: 'babel-eslint'
  };

  it('should handle ExportAllDeclaration', function () {
    var imports;
    (0, _chai.expect)(function () {
      imports = _getExports2.default.get('./export-all', fakeContext);
    }).not.to.throw(Error);

    (0, _chai.expect)(imports).to.exist;
    (0, _chai.expect)(imports.has('foo')).to.be.true;
  });

  it('should return a cached copy on subsequent requests', function () {
    (0, _chai.expect)(_getExports2.default.get('./named-exports', fakeContext)).to.exist.and.equal(_getExports2.default.get('./named-exports', fakeContext));
  });

  it('should not return a cached copy after modification', function (done) {
    var firstAccess = _getExports2.default.get('./mutator', fakeContext);
    (0, _chai.expect)(firstAccess).to.exist;

    // mutate (update modified time)
    var newDate = new Date();
    fs.utimes((0, _utils.getFilename)('mutator.js'), newDate, newDate, function (error) {
      (0, _chai.expect)(error).not.to.exist;
      (0, _chai.expect)(_getExports2.default.get('./mutator', fakeContext)).not.to.equal(firstAccess);
      done();
    });
  });

  it('should not return a cached copy with different settings', function () {
    var firstAccess = _getExports2.default.get('./named-exports', fakeContext);
    (0, _chai.expect)(firstAccess).to.exist;

    var differentSettings = (0, _objectAssign2.default)({}, fakeContext, { parserPath: 'espree' });

    (0, _chai.expect)(_getExports2.default.get('./named-exports', differentSettings)).to.exist.and.not.to.equal(firstAccess);
  });

  it('should not throw for a missing file', function () {
    var imports;
    (0, _chai.expect)(function () {
      imports = _getExports2.default.get('./does-not-exist', fakeContext);
    }).not.to.throw(Error);

    (0, _chai.expect)(imports).not.to.exist;
  });

  it('should export explicit names for a missing file in exports', function () {
    var imports;
    (0, _chai.expect)(function () {
      imports = _getExports2.default.get('./exports-missing', fakeContext);
    }).not.to.throw(Error);

    (0, _chai.expect)(imports).to.exist;
    (0, _chai.expect)(imports.has('bar')).to.be.true;
  });

  it('finds exports for an ES7 module with babel-eslint', function () {
    var path = (0, _utils.getFilename)('jsx/FooES7.js'),
        contents = fs.readFileSync(path, { encoding: 'utf8' });
    var imports = _getExports2.default.parse(path, contents, { parserPath: 'babel-eslint' });

    (0, _chai.expect)(imports).to.exist;
    (0, _chai.expect)(imports.get('default')).to.exist;
    (0, _chai.expect)(imports.has('Bar')).to.be.true;
  });

  context('deprecation metadata', function () {

    function jsdocTests(parseContext) {
      context('deprecated imports', function () {
        var imports = void 0;
        before('parse file', function () {
          var path = (0, _utils.getFilename)('deprecated.js'),
              contents = fs.readFileSync(path, { encoding: 'utf8' });
          imports = _getExports2.default.parse(path, contents, parseContext);

          // sanity checks
          (0, _chai.expect)(imports.errors).to.be.empty;
        });

        it('works with named imports.', function () {
          (0, _chai.expect)(imports.has('fn')).to.be.true;

          (0, _chai.expect)(imports.get('fn')).to.have.deep.property('doc.tags[0].title', 'deprecated');
          (0, _chai.expect)(imports.get('fn')).to.have.deep.property('doc.tags[0].description', "please use 'x' instead.");
        });

        it('works with default imports.', function () {
          (0, _chai.expect)(imports.has('default')).to.be.true;
          var importMeta = imports.get('default');

          (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].title', 'deprecated');
          (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].description', 'this is awful, use NotAsBadClass.');
        });

        it('works with variables.', function () {
          (0, _chai.expect)(imports.has('MY_TERRIBLE_ACTION')).to.be.true;
          var importMeta = imports.get('MY_TERRIBLE_ACTION');

          (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].title', 'deprecated');
          (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].description', 'please stop sending/handling this action type.');
        });

        context('multi-line variables', function () {
          it('works for the first one', function () {
            (0, _chai.expect)(imports.has('CHAIN_A')).to.be.true;
            var importMeta = imports.get('CHAIN_A');

            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].title', 'deprecated');
            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].description', 'this chain is awful');
          });
          it('works for the second one', function () {
            (0, _chai.expect)(imports.has('CHAIN_B')).to.be.true;
            var importMeta = imports.get('CHAIN_B');

            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].title', 'deprecated');
            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].description', 'so awful');
          });
          it('works for the third one, etc.', function () {
            (0, _chai.expect)(imports.has('CHAIN_C')).to.be.true;
            var importMeta = imports.get('CHAIN_C');

            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].title', 'deprecated');
            (0, _chai.expect)(importMeta).to.have.deep.property('doc.tags[0].description', 'still terrible');
          });
        });
      });

      context('full module', function () {
        var imports = void 0;
        before('parse file', function () {
          var path = (0, _utils.getFilename)('deprecated-file.js'),
              contents = fs.readFileSync(path, { encoding: 'utf8' });
          imports = _getExports2.default.parse(path, contents, parseContext);

          // sanity checks
          (0, _chai.expect)(imports.errors).to.be.empty;
        });

        it('has JSDoc metadata', function () {
          (0, _chai.expect)(imports.doc).to.exist;
        });
      });
    }

    context('default parser', function () {
      jsdocTests({
        parserPath: 'espree',
        parserOptions: {
          sourceType: 'module',
          attachComment: true
        }
      });
    });

    context('babel-eslint', function () {
      jsdocTests({
        parserPath: 'babel-eslint',
        parserOptions: {
          sourceType: 'module',
          attachComment: true
        }
      });
    });
  });

  context('exported static namespaces', function () {
    var espreeContext = { parserPath: 'espree', parserOptions: { sourceType: 'module' }, settings: {} };
    var babelContext = { parserPath: 'babel-eslint', parserOptions: { sourceType: 'module' }, settings: {} };

    it('works with espree & traditional namespace exports', function () {
      var path = (0, _utils.getFilename)('deep/a.js'),
          contents = fs.readFileSync(path, { encoding: 'utf8' });
      var a = _getExports2.default.parse(path, contents, espreeContext);
      (0, _chai.expect)(a.errors).to.be.empty;
      (0, _chai.expect)(a.get('b').namespace).to.exist;
      (0, _chai.expect)(a.get('b').namespace.has('c')).to.be.true;
    });

    it('captures namespace exported as default', function () {
      var path = (0, _utils.getFilename)('deep/default.js'),
          contents = fs.readFileSync(path, { encoding: 'utf8' });
      var def = _getExports2.default.parse(path, contents, espreeContext);
      (0, _chai.expect)(def.errors).to.be.empty;
      (0, _chai.expect)(def.get('default').namespace).to.exist;
      (0, _chai.expect)(def.get('default').namespace.has('c')).to.be.true;
    });

    it('works with babel-eslint & ES7 namespace exports', function () {
      var path = (0, _utils.getFilename)('deep-es7/a.js'),
          contents = fs.readFileSync(path, { encoding: 'utf8' });
      var a = _getExports2.default.parse(path, contents, babelContext);
      (0, _chai.expect)(a.errors).to.be.empty;
      (0, _chai.expect)(a.get('b').namespace).to.exist;
      (0, _chai.expect)(a.get('b').namespace.has('c')).to.be.true;
    });
  });

  context('deep namespace caching', function () {
    var espreeContext = { parserPath: 'espree', parserOptions: { sourceType: 'module' }, settings: {} };
    var a = void 0;
    before('sanity check and prime cache', function (done) {
      // first version
      fs.writeFileSync((0, _utils.getFilename)('deep/cache-2.js'), fs.readFileSync((0, _utils.getFilename)('deep/cache-2a.js')));

      var path = (0, _utils.getFilename)('deep/cache-1.js'),
          contents = fs.readFileSync(path, { encoding: 'utf8' });
      a = _getExports2.default.parse(path, contents, espreeContext);
      (0, _chai.expect)(a.errors).to.be.empty;

      (0, _chai.expect)(a.get('b').namespace).to.exist;
      (0, _chai.expect)(a.get('b').namespace.has('c')).to.be.true;

      // wait ~1s, cache check is 1s resolution
      setTimeout(function reup() {
        fs.unlinkSync((0, _utils.getFilename)('deep/cache-2.js'));
        // swap in a new file and touch it
        fs.writeFileSync((0, _utils.getFilename)('deep/cache-2.js'), fs.readFileSync((0, _utils.getFilename)('deep/cache-2b.js')));
        done();
      }, 1100);
    });

    it('works', function () {
      (0, _chai.expect)(a.get('b').namespace.has('c')).to.be.false;
    });

    after('remove test file', function (done) {
      return fs.unlink((0, _utils.getFilename)('deep/cache-2.js'), done);
    });
  });

  context('Map API', function () {
    context('#size', function () {

      it('counts the names', function () {
        return (0, _chai.expect)(_getExports2.default.get('./named-exports', fakeContext)).to.have.property('size', 8);
      });

      it('includes exported namespace size', function () {
        return (0, _chai.expect)(_getExports2.default.get('./export-all', fakeContext)).to.have.property('size', 1);
      });
    });
  });

  context('issue #210: self-reference', function () {
    it("doesn't crash", function () {
      (0, _chai.expect)(function () {
        return _getExports2.default.get('./narcissist', fakeContext);
      }).not.to.throw(Error);
    });
    it("'has' circular reference", function () {
      (0, _chai.expect)(_getExports2.default.get('./narcissist', fakeContext)).to.exist.and.satisfy(function (m) {
        return m.has('soGreat');
      });
    });
    it("can 'get' circular reference", function () {
      (0, _chai.expect)(_getExports2.default.get('./narcissist', fakeContext)).to.exist.and.satisfy(function (m) {
        return m.get('soGreat') != null;
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2V0RXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7SUFBWSxFOztBQUVaOzs7Ozs7QUFFQSxTQUFTLFlBQVQsRUFBdUIsWUFBWTtBQUNqQyxNQUFNLGNBQWM7QUFDbEIsbUNBRGtCO0FBRWxCLGNBQVUsRUFGUTtBQUdsQixnQkFBWTtBQUhNLEdBQXBCOztBQU1BLEtBQUcsb0NBQUgsRUFBeUMsWUFBWTtBQUNuRCxRQUFJLE9BQUo7QUFDQSxzQkFBTyxZQUFZO0FBQ2pCLGdCQUFVLHFCQUFVLEdBQVYsQ0FBYyxjQUFkLEVBQThCLFdBQTlCLENBQVY7QUFDRCxLQUZELEVBRUcsR0FGSCxDQUVPLEVBRlAsQ0FFVSxLQUZWLENBRWdCLEtBRmhCOztBQUlBLHNCQUFPLE9BQVAsRUFBZ0IsRUFBaEIsQ0FBbUIsS0FBbkI7QUFDQSxzQkFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFaLENBQVAsRUFBMkIsRUFBM0IsQ0FBOEIsRUFBOUIsQ0FBaUMsSUFBakM7QUFFRCxHQVREOztBQVdBLEtBQUcsb0RBQUgsRUFBeUQsWUFBWTtBQUNuRSxzQkFBTyxxQkFBVSxHQUFWLENBQWMsaUJBQWQsRUFBaUMsV0FBakMsQ0FBUCxFQUNHLEVBREgsQ0FDTSxLQUROLENBQ1ksR0FEWixDQUNnQixLQURoQixDQUNzQixxQkFBVSxHQUFWLENBQWMsaUJBQWQsRUFBaUMsV0FBakMsQ0FEdEI7QUFFRCxHQUhEOztBQUtBLEtBQUcsb0RBQUgsRUFBeUQsVUFBQyxJQUFELEVBQVU7QUFDakUsUUFBTSxjQUFjLHFCQUFVLEdBQVYsQ0FBYyxXQUFkLEVBQTJCLFdBQTNCLENBQXBCO0FBQ0Esc0JBQU8sV0FBUCxFQUFvQixFQUFwQixDQUF1QixLQUF2Qjs7O0FBR0EsUUFBTSxVQUFVLElBQUksSUFBSixFQUFoQjtBQUNBLE9BQUcsTUFBSCxDQUFVLHdCQUFZLFlBQVosQ0FBVixFQUFxQyxPQUFyQyxFQUE4QyxPQUE5QyxFQUF1RCxVQUFDLEtBQUQsRUFBVztBQUNoRSx3QkFBTyxLQUFQLEVBQWMsR0FBZCxDQUFrQixFQUFsQixDQUFxQixLQUFyQjtBQUNBLHdCQUFPLHFCQUFVLEdBQVYsQ0FBYyxXQUFkLEVBQTJCLFdBQTNCLENBQVAsRUFBZ0QsR0FBaEQsQ0FBb0QsRUFBcEQsQ0FBdUQsS0FBdkQsQ0FBNkQsV0FBN0Q7QUFDQTtBQUNELEtBSkQ7QUFLRCxHQVhEOztBQWFBLEtBQUcseURBQUgsRUFBOEQsWUFBTTtBQUNsRSxRQUFNLGNBQWMscUJBQVUsR0FBVixDQUFjLGlCQUFkLEVBQWlDLFdBQWpDLENBQXBCO0FBQ0Esc0JBQU8sV0FBUCxFQUFvQixFQUFwQixDQUF1QixLQUF2Qjs7QUFFQSxRQUFNLG9CQUFvQiw0QkFDeEIsRUFEd0IsRUFFeEIsV0FGd0IsRUFHeEIsRUFBRSxZQUFZLFFBQWQsRUFId0IsQ0FBMUI7O0FBS0Esc0JBQU8scUJBQVUsR0FBVixDQUFjLGlCQUFkLEVBQWlDLGlCQUFqQyxDQUFQLEVBQ0csRUFESCxDQUNNLEtBRE4sQ0FDWSxHQURaLENBRUcsR0FGSCxDQUVPLEVBRlAsQ0FFVSxLQUZWLENBRWdCLFdBRmhCO0FBR0QsR0FaRDs7QUFjQSxLQUFHLHFDQUFILEVBQTBDLFlBQVk7QUFDcEQsUUFBSSxPQUFKO0FBQ0Esc0JBQU8sWUFBWTtBQUNqQixnQkFBVSxxQkFBVSxHQUFWLENBQWMsa0JBQWQsRUFBa0MsV0FBbEMsQ0FBVjtBQUNELEtBRkQsRUFFRyxHQUZILENBRU8sRUFGUCxDQUVVLEtBRlYsQ0FFZ0IsS0FGaEI7O0FBSUEsc0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixFQUFwQixDQUF1QixLQUF2QjtBQUVELEdBUkQ7O0FBVUEsS0FBRyw0REFBSCxFQUFpRSxZQUFZO0FBQzNFLFFBQUksT0FBSjtBQUNBLHNCQUFPLFlBQVk7QUFDakIsZ0JBQVUscUJBQVUsR0FBVixDQUFjLG1CQUFkLEVBQW1DLFdBQW5DLENBQVY7QUFDRCxLQUZELEVBRUcsR0FGSCxDQUVPLEVBRlAsQ0FFVSxLQUZWLENBRWdCLEtBRmhCOztBQUlBLHNCQUFPLE9BQVAsRUFBZ0IsRUFBaEIsQ0FBbUIsS0FBbkI7QUFDQSxzQkFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFaLENBQVAsRUFBMkIsRUFBM0IsQ0FBOEIsRUFBOUIsQ0FBaUMsSUFBakM7QUFFRCxHQVREOztBQVdBLEtBQUcsbURBQUgsRUFBd0QsWUFBWTtBQUNsRSxRQUFNLE9BQU8sd0JBQVksZUFBWixDQUFiO1FBQ00sV0FBVyxHQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBRSxVQUFVLE1BQVosRUFBdEIsQ0FEakI7QUFFQSxRQUFJLFVBQVUscUJBQVUsS0FBVixDQUNaLElBRFksRUFFWixRQUZZLEVBR1osRUFBRSxZQUFZLGNBQWQsRUFIWSxDQUFkOztBQU1BLHNCQUFPLE9BQVAsRUFBZ0IsRUFBaEIsQ0FBbUIsS0FBbkI7QUFDQSxzQkFBTyxRQUFRLEdBQVIsQ0FBWSxTQUFaLENBQVAsRUFBK0IsRUFBL0IsQ0FBa0MsS0FBbEM7QUFDQSxzQkFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFaLENBQVAsRUFBMkIsRUFBM0IsQ0FBOEIsRUFBOUIsQ0FBaUMsSUFBakM7QUFDRCxHQVpEOztBQWNBLFVBQVEsc0JBQVIsRUFBZ0MsWUFBWTs7QUFFMUMsYUFBUyxVQUFULENBQW9CLFlBQXBCLEVBQWtDO0FBQ2hDLGNBQVEsb0JBQVIsRUFBOEIsWUFBWTtBQUN4QyxZQUFJLGdCQUFKO0FBQ0EsZUFBTyxZQUFQLEVBQXFCLFlBQVk7QUFDL0IsY0FBTSxPQUFPLHdCQUFZLGVBQVosQ0FBYjtjQUNNLFdBQVcsR0FBRyxZQUFILENBQWdCLElBQWhCLEVBQXNCLEVBQUUsVUFBVSxNQUFaLEVBQXRCLENBRGpCO0FBRUEsb0JBQVUscUJBQVUsS0FBVixDQUFnQixJQUFoQixFQUFzQixRQUF0QixFQUFnQyxZQUFoQyxDQUFWOzs7QUFHQSw0QkFBTyxRQUFRLE1BQWYsRUFBdUIsRUFBdkIsQ0FBMEIsRUFBMUIsQ0FBNkIsS0FBN0I7QUFDRCxTQVBEOztBQVNBLFdBQUcsMkJBQUgsRUFBZ0MsWUFBWTtBQUMxQyw0QkFBTyxRQUFRLEdBQVIsQ0FBWSxJQUFaLENBQVAsRUFBMEIsRUFBMUIsQ0FBNkIsRUFBN0IsQ0FBZ0MsSUFBaEM7O0FBRUEsNEJBQU8sUUFBUSxHQUFSLENBQVksSUFBWixDQUFQLEVBQ0csRUFESCxDQUNNLElBRE4sQ0FDVyxJQURYLENBQ2dCLFFBRGhCLENBQ3lCLG1CQUR6QixFQUM4QyxZQUQ5QztBQUVBLDRCQUFPLFFBQVEsR0FBUixDQUFZLElBQVosQ0FBUCxFQUNHLEVBREgsQ0FDTSxJQUROLENBQ1csSUFEWCxDQUNnQixRQURoQixDQUN5Qix5QkFEekIsRUFDb0QseUJBRHBEO0FBRUQsU0FQRDs7QUFTQSxXQUFHLDZCQUFILEVBQWtDLFlBQVk7QUFDNUMsNEJBQU8sUUFBUSxHQUFSLENBQVksU0FBWixDQUFQLEVBQStCLEVBQS9CLENBQWtDLEVBQWxDLENBQXFDLElBQXJDO0FBQ0EsY0FBTSxhQUFhLFFBQVEsR0FBUixDQUFZLFNBQVosQ0FBbkI7O0FBRUEsNEJBQU8sVUFBUCxFQUFtQixFQUFuQixDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFnQyxRQUFoQyxDQUF5QyxtQkFBekMsRUFBOEQsWUFBOUQ7QUFDQSw0QkFBTyxVQUFQLEVBQW1CLEVBQW5CLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWdDLFFBQWhDLENBQXlDLHlCQUF6QyxFQUFvRSxtQ0FBcEU7QUFDRCxTQU5EOztBQVFBLFdBQUcsdUJBQUgsRUFBNEIsWUFBWTtBQUN0Qyw0QkFBTyxRQUFRLEdBQVIsQ0FBWSxvQkFBWixDQUFQLEVBQTBDLEVBQTFDLENBQTZDLEVBQTdDLENBQWdELElBQWhEO0FBQ0EsY0FBTSxhQUFhLFFBQVEsR0FBUixDQUFZLG9CQUFaLENBQW5COztBQUVBLDRCQUFPLFVBQVAsRUFBbUIsRUFBbkIsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBZ0MsUUFBaEMsQ0FDRSxtQkFERixFQUN1QixZQUR2QjtBQUVBLDRCQUFPLFVBQVAsRUFBbUIsRUFBbkIsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBZ0MsUUFBaEMsQ0FDRSx5QkFERixFQUM2QixnREFEN0I7QUFFRCxTQVJEOztBQVVBLGdCQUFRLHNCQUFSLEVBQWdDLFlBQVk7QUFDMUMsYUFBRyx5QkFBSCxFQUE4QixZQUFZO0FBQ3hDLDhCQUFPLFFBQVEsR0FBUixDQUFZLFNBQVosQ0FBUCxFQUErQixFQUEvQixDQUFrQyxFQUFsQyxDQUFxQyxJQUFyQztBQUNBLGdCQUFNLGFBQWEsUUFBUSxHQUFSLENBQVksU0FBWixDQUFuQjs7QUFFQSw4QkFBTyxVQUFQLEVBQW1CLEVBQW5CLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWdDLFFBQWhDLENBQ0UsbUJBREYsRUFDdUIsWUFEdkI7QUFFQSw4QkFBTyxVQUFQLEVBQW1CLEVBQW5CLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWdDLFFBQWhDLENBQ0UseUJBREYsRUFDNkIscUJBRDdCO0FBRUQsV0FSRDtBQVNBLGFBQUcsMEJBQUgsRUFBK0IsWUFBWTtBQUN6Qyw4QkFBTyxRQUFRLEdBQVIsQ0FBWSxTQUFaLENBQVAsRUFBK0IsRUFBL0IsQ0FBa0MsRUFBbEMsQ0FBcUMsSUFBckM7QUFDQSxnQkFBTSxhQUFhLFFBQVEsR0FBUixDQUFZLFNBQVosQ0FBbkI7O0FBRUEsOEJBQU8sVUFBUCxFQUFtQixFQUFuQixDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFnQyxRQUFoQyxDQUNFLG1CQURGLEVBQ3VCLFlBRHZCO0FBRUEsOEJBQU8sVUFBUCxFQUFtQixFQUFuQixDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFnQyxRQUFoQyxDQUNFLHlCQURGLEVBQzZCLFVBRDdCO0FBRUQsV0FSRDtBQVNBLGFBQUcsK0JBQUgsRUFBb0MsWUFBWTtBQUM5Qyw4QkFBTyxRQUFRLEdBQVIsQ0FBWSxTQUFaLENBQVAsRUFBK0IsRUFBL0IsQ0FBa0MsRUFBbEMsQ0FBcUMsSUFBckM7QUFDQSxnQkFBTSxhQUFhLFFBQVEsR0FBUixDQUFZLFNBQVosQ0FBbkI7O0FBRUEsOEJBQU8sVUFBUCxFQUFtQixFQUFuQixDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFnQyxRQUFoQyxDQUNFLG1CQURGLEVBQ3VCLFlBRHZCO0FBRUEsOEJBQU8sVUFBUCxFQUFtQixFQUFuQixDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFnQyxRQUFoQyxDQUNFLHlCQURGLEVBQzZCLGdCQUQ3QjtBQUVELFdBUkQ7QUFTRCxTQTVCRDtBQTZCRCxPQW5FRDs7QUFxRUEsY0FBUSxhQUFSLEVBQXVCLFlBQVk7QUFDakMsWUFBSSxnQkFBSjtBQUNBLGVBQU8sWUFBUCxFQUFxQixZQUFZO0FBQy9CLGNBQU0sT0FBTyx3QkFBWSxvQkFBWixDQUFiO2NBQ00sV0FBVyxHQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBRSxVQUFVLE1BQVosRUFBdEIsQ0FEakI7QUFFQSxvQkFBVSxxQkFBVSxLQUFWLENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDLFlBQWhDLENBQVY7OztBQUdBLDRCQUFPLFFBQVEsTUFBZixFQUF1QixFQUF2QixDQUEwQixFQUExQixDQUE2QixLQUE3QjtBQUNELFNBUEQ7O0FBU0EsV0FBRyxvQkFBSCxFQUF5QixZQUFZO0FBQ25DLDRCQUFPLFFBQVEsR0FBZixFQUFvQixFQUFwQixDQUF1QixLQUF2QjtBQUNELFNBRkQ7QUFHRCxPQWREO0FBZUQ7O0FBRUQsWUFBUSxnQkFBUixFQUEwQixZQUFZO0FBQ3BDLGlCQUFXO0FBQ1Qsb0JBQVksUUFESDtBQUVULHVCQUFlO0FBQ2Isc0JBQVksUUFEQztBQUViLHlCQUFlO0FBRkY7QUFGTixPQUFYO0FBT0QsS0FSRDs7QUFVQSxZQUFRLGNBQVIsRUFBd0IsWUFBWTtBQUNsQyxpQkFBVztBQUNULG9CQUFZLGNBREg7QUFFVCx1QkFBZTtBQUNiLHNCQUFZLFFBREM7QUFFYix5QkFBZTtBQUZGO0FBRk4sT0FBWDtBQU9ELEtBUkQ7QUFTRCxHQTVHRDs7QUE4R0EsVUFBUSw0QkFBUixFQUFzQyxZQUFZO0FBQ2hELFFBQU0sZ0JBQWdCLEVBQUUsWUFBWSxRQUFkLEVBQXdCLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBdkMsRUFBaUUsVUFBVSxFQUEzRSxFQUF0QjtBQUNBLFFBQU0sZUFBZSxFQUFFLFlBQVksY0FBZCxFQUE4QixlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQTdDLEVBQXVFLFVBQVUsRUFBakYsRUFBckI7O0FBRUEsT0FBRyxtREFBSCxFQUF3RCxZQUFZO0FBQ2xFLFVBQU0sT0FBTyx3QkFBWSxXQUFaLENBQWI7VUFDTSxXQUFXLEdBQUcsWUFBSCxDQUFnQixJQUFoQixFQUFzQixFQUFFLFVBQVUsTUFBWixFQUF0QixDQURqQjtBQUVBLFVBQU0sSUFBSSxxQkFBVSxLQUFWLENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDLGFBQWhDLENBQVY7QUFDQSx3QkFBTyxFQUFFLE1BQVQsRUFBaUIsRUFBakIsQ0FBb0IsRUFBcEIsQ0FBdUIsS0FBdkI7QUFDQSx3QkFBTyxFQUFFLEdBQUYsQ0FBTSxHQUFOLEVBQVcsU0FBbEIsRUFBNkIsRUFBN0IsQ0FBZ0MsS0FBaEM7QUFDQSx3QkFBTyxFQUFFLEdBQUYsQ0FBTSxHQUFOLEVBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixHQUF6QixDQUFQLEVBQXNDLEVBQXRDLENBQXlDLEVBQXpDLENBQTRDLElBQTVDO0FBQ0QsS0FQRDs7QUFTQSxPQUFHLHdDQUFILEVBQTZDLFlBQVk7QUFDdkQsVUFBTSxPQUFPLHdCQUFZLGlCQUFaLENBQWI7VUFDTSxXQUFXLEdBQUcsWUFBSCxDQUFnQixJQUFoQixFQUFzQixFQUFFLFVBQVUsTUFBWixFQUF0QixDQURqQjtBQUVBLFVBQU0sTUFBTSxxQkFBVSxLQUFWLENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDLGFBQWhDLENBQVo7QUFDQSx3QkFBTyxJQUFJLE1BQVgsRUFBbUIsRUFBbkIsQ0FBc0IsRUFBdEIsQ0FBeUIsS0FBekI7QUFDQSx3QkFBTyxJQUFJLEdBQUosQ0FBUSxTQUFSLEVBQW1CLFNBQTFCLEVBQXFDLEVBQXJDLENBQXdDLEtBQXhDO0FBQ0Esd0JBQU8sSUFBSSxHQUFKLENBQVEsU0FBUixFQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxHQUFqQyxDQUFQLEVBQThDLEVBQTlDLENBQWlELEVBQWpELENBQW9ELElBQXBEO0FBQ0QsS0FQRDs7QUFTQSxPQUFHLGlEQUFILEVBQXNELFlBQVk7QUFDaEUsVUFBTSxPQUFPLHdCQUFZLGVBQVosQ0FBYjtVQUNNLFdBQVcsR0FBRyxZQUFILENBQWdCLElBQWhCLEVBQXNCLEVBQUUsVUFBVSxNQUFaLEVBQXRCLENBRGpCO0FBRUEsVUFBTSxJQUFJLHFCQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsWUFBaEMsQ0FBVjtBQUNBLHdCQUFPLEVBQUUsTUFBVCxFQUFpQixFQUFqQixDQUFvQixFQUFwQixDQUF1QixLQUF2QjtBQUNBLHdCQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxTQUFsQixFQUE2QixFQUE3QixDQUFnQyxLQUFoQztBQUNBLHdCQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLEdBQXpCLENBQVAsRUFBc0MsRUFBdEMsQ0FBeUMsRUFBekMsQ0FBNEMsSUFBNUM7QUFDRCxLQVBEO0FBUUQsR0E5QkQ7O0FBZ0NBLFVBQVEsd0JBQVIsRUFBa0MsWUFBWTtBQUM1QyxRQUFNLGdCQUFnQixFQUFFLFlBQVksUUFBZCxFQUF3QixlQUFlLEVBQUUsWUFBWSxRQUFkLEVBQXZDLEVBQWlFLFVBQVUsRUFBM0UsRUFBdEI7QUFDQSxRQUFJLFVBQUo7QUFDQSxXQUFPLDhCQUFQLEVBQXVDLFVBQVUsSUFBVixFQUFnQjs7QUFFckQsU0FBRyxhQUFILENBQWlCLHdCQUFZLGlCQUFaLENBQWpCLEVBQ0UsR0FBRyxZQUFILENBQWdCLHdCQUFZLGtCQUFaLENBQWhCLENBREY7O0FBR0EsVUFBTSxPQUFPLHdCQUFZLGlCQUFaLENBQWI7VUFDTSxXQUFXLEdBQUcsWUFBSCxDQUFnQixJQUFoQixFQUFzQixFQUFFLFVBQVUsTUFBWixFQUF0QixDQURqQjtBQUVBLFVBQUkscUJBQVUsS0FBVixDQUFnQixJQUFoQixFQUFzQixRQUF0QixFQUFnQyxhQUFoQyxDQUFKO0FBQ0Esd0JBQU8sRUFBRSxNQUFULEVBQWlCLEVBQWpCLENBQW9CLEVBQXBCLENBQXVCLEtBQXZCOztBQUVBLHdCQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxTQUFsQixFQUE2QixFQUE3QixDQUFnQyxLQUFoQztBQUNBLHdCQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLEdBQXpCLENBQVAsRUFBc0MsRUFBdEMsQ0FBeUMsRUFBekMsQ0FBNEMsSUFBNUM7OztBQUdBLGlCQUFXLFNBQVMsSUFBVCxHQUFnQjtBQUN6QixXQUFHLFVBQUgsQ0FBYyx3QkFBWSxpQkFBWixDQUFkOztBQUVBLFdBQUcsYUFBSCxDQUFpQix3QkFBWSxpQkFBWixDQUFqQixFQUNFLEdBQUcsWUFBSCxDQUFnQix3QkFBWSxrQkFBWixDQUFoQixDQURGO0FBRUE7QUFDRCxPQU5ELEVBTUcsSUFOSDtBQU9ELEtBckJEOztBQXVCQSxPQUFHLE9BQUgsRUFBWSxZQUFZO0FBQ3RCLHdCQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLEdBQXpCLENBQVAsRUFBc0MsRUFBdEMsQ0FBeUMsRUFBekMsQ0FBNEMsS0FBNUM7QUFDRCxLQUZEOztBQUlBLFVBQU0sa0JBQU4sRUFBMEIsVUFBQyxJQUFEO0FBQUEsYUFBVSxHQUFHLE1BQUgsQ0FBVSx3QkFBWSxpQkFBWixDQUFWLEVBQTBDLElBQTFDLENBQVY7QUFBQSxLQUExQjtBQUNELEdBL0JEOztBQWlDQSxVQUFRLFNBQVIsRUFBbUIsWUFBWTtBQUM3QixZQUFRLE9BQVIsRUFBaUIsWUFBWTs7QUFFM0IsU0FBRyxrQkFBSCxFQUF1QjtBQUFBLGVBQU0sa0JBQU8scUJBQVUsR0FBVixDQUFjLGlCQUFkLEVBQWlDLFdBQWpDLENBQVAsRUFDMUIsRUFEMEIsQ0FDdkIsSUFEdUIsQ0FDbEIsUUFEa0IsQ0FDVCxNQURTLEVBQ0QsQ0FEQyxDQUFOO0FBQUEsT0FBdkI7O0FBR0EsU0FBRyxrQ0FBSCxFQUF1QztBQUFBLGVBQU0sa0JBQU8scUJBQVUsR0FBVixDQUFjLGNBQWQsRUFBOEIsV0FBOUIsQ0FBUCxFQUMxQyxFQUQwQyxDQUN2QyxJQUR1QyxDQUNsQyxRQURrQyxDQUN6QixNQUR5QixFQUNqQixDQURpQixDQUFOO0FBQUEsT0FBdkM7QUFHRCxLQVJEO0FBU0QsR0FWRDs7QUFZQSxVQUFRLDRCQUFSLEVBQXNDLFlBQVk7QUFDaEQsT0FBRyxlQUFILEVBQW9CLFlBQVk7QUFDOUIsd0JBQU87QUFBQSxlQUFNLHFCQUFVLEdBQVYsQ0FBYyxjQUFkLEVBQThCLFdBQTlCLENBQU47QUFBQSxPQUFQLEVBQXlELEdBQXpELENBQTZELEVBQTdELENBQWdFLEtBQWhFLENBQXNFLEtBQXRFO0FBQ0QsS0FGRDtBQUdBLE9BQUcsMEJBQUgsRUFBK0IsWUFBWTtBQUN6Qyx3QkFBTyxxQkFBVSxHQUFWLENBQWMsY0FBZCxFQUE4QixXQUE5QixDQUFQLEVBQ0csRUFESCxDQUNNLEtBRE4sQ0FDWSxHQURaLENBQ2dCLE9BRGhCLENBQ3dCO0FBQUEsZUFBSyxFQUFFLEdBQUYsQ0FBTSxTQUFOLENBQUw7QUFBQSxPQUR4QjtBQUVELEtBSEQ7QUFJQSxPQUFHLDhCQUFILEVBQW1DLFlBQVk7QUFDN0Msd0JBQU8scUJBQVUsR0FBVixDQUFjLGNBQWQsRUFBOEIsV0FBOUIsQ0FBUCxFQUNHLEVBREgsQ0FDTSxLQUROLENBQ1ksR0FEWixDQUNnQixPQURoQixDQUN3QjtBQUFBLGVBQUssRUFBRSxHQUFGLENBQU0sU0FBTixLQUFvQixJQUF6QjtBQUFBLE9BRHhCO0FBRUQsS0FIRDtBQUlELEdBWkQ7QUFjRCxDQTlSRCIsImZpbGUiOiJjb3JlL2dldEV4cG9ydHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nXG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICAnY2hhaSdcbmltcG9ydCBFeHBvcnRNYXAgZnJvbSAnY29yZS9nZXRFeHBvcnRzJ1xuXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcblxuaW1wb3J0IHsgZ2V0RmlsZW5hbWUgfSBmcm9tICcuLi91dGlscydcblxuZGVzY3JpYmUoJ2dldEV4cG9ydHMnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZha2VDb250ZXh0ID0ge1xuICAgIGdldEZpbGVuYW1lOiBnZXRGaWxlbmFtZSxcbiAgICBzZXR0aW5nczoge30sXG4gICAgcGFyc2VyUGF0aDogJ2JhYmVsLWVzbGludCcsXG4gIH1cblxuICBpdCgnc2hvdWxkIGhhbmRsZSBFeHBvcnRBbGxEZWNsYXJhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1wb3J0c1xuICAgIGV4cGVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBpbXBvcnRzID0gRXhwb3J0TWFwLmdldCgnLi9leHBvcnQtYWxsJywgZmFrZUNvbnRleHQpXG4gICAgfSkubm90LnRvLnRocm93KEVycm9yKVxuXG4gICAgZXhwZWN0KGltcG9ydHMpLnRvLmV4aXN0XG4gICAgZXhwZWN0KGltcG9ydHMuaGFzKCdmb28nKSkudG8uYmUudHJ1ZVxuXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gYSBjYWNoZWQgY29weSBvbiBzdWJzZXF1ZW50IHJlcXVlc3RzJywgZnVuY3Rpb24gKCkge1xuICAgIGV4cGVjdChFeHBvcnRNYXAuZ2V0KCcuL25hbWVkLWV4cG9ydHMnLCBmYWtlQ29udGV4dCkpXG4gICAgICAudG8uZXhpc3QuYW5kLmVxdWFsKEV4cG9ydE1hcC5nZXQoJy4vbmFtZWQtZXhwb3J0cycsIGZha2VDb250ZXh0KSlcbiAgfSlcblxuICBpdCgnc2hvdWxkIG5vdCByZXR1cm4gYSBjYWNoZWQgY29weSBhZnRlciBtb2RpZmljYXRpb24nLCAoZG9uZSkgPT4ge1xuICAgIGNvbnN0IGZpcnN0QWNjZXNzID0gRXhwb3J0TWFwLmdldCgnLi9tdXRhdG9yJywgZmFrZUNvbnRleHQpXG4gICAgZXhwZWN0KGZpcnN0QWNjZXNzKS50by5leGlzdFxuXG4gICAgLy8gbXV0YXRlICh1cGRhdGUgbW9kaWZpZWQgdGltZSlcbiAgICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoKVxuICAgIGZzLnV0aW1lcyhnZXRGaWxlbmFtZSgnbXV0YXRvci5qcycpLCBuZXdEYXRlLCBuZXdEYXRlLCAoZXJyb3IpID0+IHtcbiAgICAgIGV4cGVjdChlcnJvcikubm90LnRvLmV4aXN0XG4gICAgICBleHBlY3QoRXhwb3J0TWFwLmdldCgnLi9tdXRhdG9yJywgZmFrZUNvbnRleHQpKS5ub3QudG8uZXF1YWwoZmlyc3RBY2Nlc3MpXG4gICAgICBkb25lKClcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdzaG91bGQgbm90IHJldHVybiBhIGNhY2hlZCBjb3B5IHdpdGggZGlmZmVyZW50IHNldHRpbmdzJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0QWNjZXNzID0gRXhwb3J0TWFwLmdldCgnLi9uYW1lZC1leHBvcnRzJywgZmFrZUNvbnRleHQpXG4gICAgZXhwZWN0KGZpcnN0QWNjZXNzKS50by5leGlzdFxuXG4gICAgY29uc3QgZGlmZmVyZW50U2V0dGluZ3MgPSBhc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIGZha2VDb250ZXh0LFxuICAgICAgeyBwYXJzZXJQYXRoOiAnZXNwcmVlJyB9KVxuXG4gICAgZXhwZWN0KEV4cG9ydE1hcC5nZXQoJy4vbmFtZWQtZXhwb3J0cycsIGRpZmZlcmVudFNldHRpbmdzKSlcbiAgICAgIC50by5leGlzdC5hbmRcbiAgICAgIC5ub3QudG8uZXF1YWwoZmlyc3RBY2Nlc3MpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgZm9yIGEgbWlzc2luZyBmaWxlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbXBvcnRzXG4gICAgZXhwZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGltcG9ydHMgPSBFeHBvcnRNYXAuZ2V0KCcuL2RvZXMtbm90LWV4aXN0JywgZmFrZUNvbnRleHQpXG4gICAgfSkubm90LnRvLnRocm93KEVycm9yKVxuXG4gICAgZXhwZWN0KGltcG9ydHMpLm5vdC50by5leGlzdFxuXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBleHBvcnQgZXhwbGljaXQgbmFtZXMgZm9yIGEgbWlzc2luZyBmaWxlIGluIGV4cG9ydHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGltcG9ydHNcbiAgICBleHBlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgaW1wb3J0cyA9IEV4cG9ydE1hcC5nZXQoJy4vZXhwb3J0cy1taXNzaW5nJywgZmFrZUNvbnRleHQpXG4gICAgfSkubm90LnRvLnRocm93KEVycm9yKVxuXG4gICAgZXhwZWN0KGltcG9ydHMpLnRvLmV4aXN0XG4gICAgZXhwZWN0KGltcG9ydHMuaGFzKCdiYXInKSkudG8uYmUudHJ1ZVxuXG4gIH0pXG5cbiAgaXQoJ2ZpbmRzIGV4cG9ydHMgZm9yIGFuIEVTNyBtb2R1bGUgd2l0aCBiYWJlbC1lc2xpbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcGF0aCA9IGdldEZpbGVuYW1lKCdqc3gvRm9vRVM3LmpzJylcbiAgICAgICAgLCBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgICB2YXIgaW1wb3J0cyA9IEV4cG9ydE1hcC5wYXJzZShcbiAgICAgIHBhdGgsXG4gICAgICBjb250ZW50cyxcbiAgICAgIHsgcGFyc2VyUGF0aDogJ2JhYmVsLWVzbGludCcgfVxuICAgIClcblxuICAgIGV4cGVjdChpbXBvcnRzKS50by5leGlzdFxuICAgIGV4cGVjdChpbXBvcnRzLmdldCgnZGVmYXVsdCcpKS50by5leGlzdFxuICAgIGV4cGVjdChpbXBvcnRzLmhhcygnQmFyJykpLnRvLmJlLnRydWVcbiAgfSlcblxuICBjb250ZXh0KCdkZXByZWNhdGlvbiBtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGpzZG9jVGVzdHMocGFyc2VDb250ZXh0KSB7XG4gICAgICBjb250ZXh0KCdkZXByZWNhdGVkIGltcG9ydHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBpbXBvcnRzXG4gICAgICAgIGJlZm9yZSgncGFyc2UgZmlsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCBwYXRoID0gZ2V0RmlsZW5hbWUoJ2RlcHJlY2F0ZWQuanMnKVxuICAgICAgICAgICAgICAsIGNvbnRlbnRzID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgICAgICAgIGltcG9ydHMgPSBFeHBvcnRNYXAucGFyc2UocGF0aCwgY29udGVudHMsIHBhcnNlQ29udGV4dClcblxuICAgICAgICAgIC8vIHNhbml0eSBjaGVja3NcbiAgICAgICAgICBleHBlY3QoaW1wb3J0cy5lcnJvcnMpLnRvLmJlLmVtcHR5XG4gICAgICAgIH0pXG5cbiAgICAgICAgaXQoJ3dvcmtzIHdpdGggbmFtZWQgaW1wb3J0cy4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGltcG9ydHMuaGFzKCdmbicpKS50by5iZS50cnVlXG5cbiAgICAgICAgICBleHBlY3QoaW1wb3J0cy5nZXQoJ2ZuJykpXG4gICAgICAgICAgICAudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCdkb2MudGFnc1swXS50aXRsZScsICdkZXByZWNhdGVkJylcbiAgICAgICAgICBleHBlY3QoaW1wb3J0cy5nZXQoJ2ZuJykpXG4gICAgICAgICAgICAudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCdkb2MudGFnc1swXS5kZXNjcmlwdGlvbicsIFwicGxlYXNlIHVzZSAneCcgaW5zdGVhZC5cIilcbiAgICAgICAgfSlcblxuICAgICAgICBpdCgnd29ya3Mgd2l0aCBkZWZhdWx0IGltcG9ydHMuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChpbXBvcnRzLmhhcygnZGVmYXVsdCcpKS50by5iZS50cnVlXG4gICAgICAgICAgY29uc3QgaW1wb3J0TWV0YSA9IGltcG9ydHMuZ2V0KCdkZWZhdWx0JylcblxuICAgICAgICAgIGV4cGVjdChpbXBvcnRNZXRhKS50by5oYXZlLmRlZXAucHJvcGVydHkoJ2RvYy50YWdzWzBdLnRpdGxlJywgJ2RlcHJlY2F0ZWQnKVxuICAgICAgICAgIGV4cGVjdChpbXBvcnRNZXRhKS50by5oYXZlLmRlZXAucHJvcGVydHkoJ2RvYy50YWdzWzBdLmRlc2NyaXB0aW9uJywgJ3RoaXMgaXMgYXdmdWwsIHVzZSBOb3RBc0JhZENsYXNzLicpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaXQoJ3dvcmtzIHdpdGggdmFyaWFibGVzLicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoaW1wb3J0cy5oYXMoJ01ZX1RFUlJJQkxFX0FDVElPTicpKS50by5iZS50cnVlXG4gICAgICAgICAgY29uc3QgaW1wb3J0TWV0YSA9IGltcG9ydHMuZ2V0KCdNWV9URVJSSUJMRV9BQ1RJT04nKVxuXG4gICAgICAgICAgZXhwZWN0KGltcG9ydE1ldGEpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShcbiAgICAgICAgICAgICdkb2MudGFnc1swXS50aXRsZScsICdkZXByZWNhdGVkJylcbiAgICAgICAgICBleHBlY3QoaW1wb3J0TWV0YSkudG8uaGF2ZS5kZWVwLnByb3BlcnR5KFxuICAgICAgICAgICAgJ2RvYy50YWdzWzBdLmRlc2NyaXB0aW9uJywgJ3BsZWFzZSBzdG9wIHNlbmRpbmcvaGFuZGxpbmcgdGhpcyBhY3Rpb24gdHlwZS4nKVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnRleHQoJ211bHRpLWxpbmUgdmFyaWFibGVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGl0KCd3b3JrcyBmb3IgdGhlIGZpcnN0IG9uZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV4cGVjdChpbXBvcnRzLmhhcygnQ0hBSU5fQScpKS50by5iZS50cnVlXG4gICAgICAgICAgICBjb25zdCBpbXBvcnRNZXRhID0gaW1wb3J0cy5nZXQoJ0NIQUlOX0EnKVxuXG4gICAgICAgICAgICBleHBlY3QoaW1wb3J0TWV0YSkudG8uaGF2ZS5kZWVwLnByb3BlcnR5KFxuICAgICAgICAgICAgICAnZG9jLnRhZ3NbMF0udGl0bGUnLCAnZGVwcmVjYXRlZCcpXG4gICAgICAgICAgICBleHBlY3QoaW1wb3J0TWV0YSkudG8uaGF2ZS5kZWVwLnByb3BlcnR5KFxuICAgICAgICAgICAgICAnZG9jLnRhZ3NbMF0uZGVzY3JpcHRpb24nLCAndGhpcyBjaGFpbiBpcyBhd2Z1bCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdCgnd29ya3MgZm9yIHRoZSBzZWNvbmQgb25lJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXhwZWN0KGltcG9ydHMuaGFzKCdDSEFJTl9CJykpLnRvLmJlLnRydWVcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydE1ldGEgPSBpbXBvcnRzLmdldCgnQ0hBSU5fQicpXG5cbiAgICAgICAgICAgIGV4cGVjdChpbXBvcnRNZXRhKS50by5oYXZlLmRlZXAucHJvcGVydHkoXG4gICAgICAgICAgICAgICdkb2MudGFnc1swXS50aXRsZScsICdkZXByZWNhdGVkJylcbiAgICAgICAgICAgIGV4cGVjdChpbXBvcnRNZXRhKS50by5oYXZlLmRlZXAucHJvcGVydHkoXG4gICAgICAgICAgICAgICdkb2MudGFnc1swXS5kZXNjcmlwdGlvbicsICdzbyBhd2Z1bCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdCgnd29ya3MgZm9yIHRoZSB0aGlyZCBvbmUsIGV0Yy4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBleHBlY3QoaW1wb3J0cy5oYXMoJ0NIQUlOX0MnKSkudG8uYmUudHJ1ZVxuICAgICAgICAgICAgY29uc3QgaW1wb3J0TWV0YSA9IGltcG9ydHMuZ2V0KCdDSEFJTl9DJylcblxuICAgICAgICAgICAgZXhwZWN0KGltcG9ydE1ldGEpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ2RvYy50YWdzWzBdLnRpdGxlJywgJ2RlcHJlY2F0ZWQnKVxuICAgICAgICAgICAgZXhwZWN0KGltcG9ydE1ldGEpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ2RvYy50YWdzWzBdLmRlc2NyaXB0aW9uJywgJ3N0aWxsIHRlcnJpYmxlJylcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgY29udGV4dCgnZnVsbCBtb2R1bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBpbXBvcnRzXG4gICAgICAgIGJlZm9yZSgncGFyc2UgZmlsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCBwYXRoID0gZ2V0RmlsZW5hbWUoJ2RlcHJlY2F0ZWQtZmlsZS5qcycpXG4gICAgICAgICAgICAgICwgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gICAgICAgICAgaW1wb3J0cyA9IEV4cG9ydE1hcC5wYXJzZShwYXRoLCBjb250ZW50cywgcGFyc2VDb250ZXh0KVxuXG4gICAgICAgICAgLy8gc2FuaXR5IGNoZWNrc1xuICAgICAgICAgIGV4cGVjdChpbXBvcnRzLmVycm9ycykudG8uYmUuZW1wdHlcbiAgICAgICAgfSlcblxuICAgICAgICBpdCgnaGFzIEpTRG9jIG1ldGFkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChpbXBvcnRzLmRvYykudG8uZXhpc3RcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29udGV4dCgnZGVmYXVsdCBwYXJzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBqc2RvY1Rlc3RzKHtcbiAgICAgICAgcGFyc2VyUGF0aDogJ2VzcHJlZScsXG4gICAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgICAgICAgICBhdHRhY2hDb21tZW50OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29udGV4dCgnYmFiZWwtZXNsaW50JywgZnVuY3Rpb24gKCkge1xuICAgICAganNkb2NUZXN0cyh7XG4gICAgICAgIHBhcnNlclBhdGg6ICdiYWJlbC1lc2xpbnQnLFxuICAgICAgICBwYXJzZXJPcHRpb25zOiB7XG4gICAgICAgICAgc291cmNlVHlwZTogJ21vZHVsZScsXG4gICAgICAgICAgYXR0YWNoQ29tbWVudDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBjb250ZXh0KCdleHBvcnRlZCBzdGF0aWMgbmFtZXNwYWNlcycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBlc3ByZWVDb250ZXh0ID0geyBwYXJzZXJQYXRoOiAnZXNwcmVlJywgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9LCBzZXR0aW5nczoge30gfVxuICAgIGNvbnN0IGJhYmVsQ29udGV4dCA9IHsgcGFyc2VyUGF0aDogJ2JhYmVsLWVzbGludCcsIHBhcnNlck9wdGlvbnM6IHsgc291cmNlVHlwZTogJ21vZHVsZScgfSwgc2V0dGluZ3M6IHt9IH1cblxuICAgIGl0KCd3b3JrcyB3aXRoIGVzcHJlZSAmIHRyYWRpdGlvbmFsIG5hbWVzcGFjZSBleHBvcnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcGF0aCA9IGdldEZpbGVuYW1lKCdkZWVwL2EuanMnKVxuICAgICAgICAgICwgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gICAgICBjb25zdCBhID0gRXhwb3J0TWFwLnBhcnNlKHBhdGgsIGNvbnRlbnRzLCBlc3ByZWVDb250ZXh0KVxuICAgICAgZXhwZWN0KGEuZXJyb3JzKS50by5iZS5lbXB0eVxuICAgICAgZXhwZWN0KGEuZ2V0KCdiJykubmFtZXNwYWNlKS50by5leGlzdFxuICAgICAgZXhwZWN0KGEuZ2V0KCdiJykubmFtZXNwYWNlLmhhcygnYycpKS50by5iZS50cnVlXG4gICAgfSlcblxuICAgIGl0KCdjYXB0dXJlcyBuYW1lc3BhY2UgZXhwb3J0ZWQgYXMgZGVmYXVsdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBhdGggPSBnZXRGaWxlbmFtZSgnZGVlcC9kZWZhdWx0LmpzJylcbiAgICAgICAgICAsIGNvbnRlbnRzID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgICAgY29uc3QgZGVmID0gRXhwb3J0TWFwLnBhcnNlKHBhdGgsIGNvbnRlbnRzLCBlc3ByZWVDb250ZXh0KVxuICAgICAgZXhwZWN0KGRlZi5lcnJvcnMpLnRvLmJlLmVtcHR5XG4gICAgICBleHBlY3QoZGVmLmdldCgnZGVmYXVsdCcpLm5hbWVzcGFjZSkudG8uZXhpc3RcbiAgICAgIGV4cGVjdChkZWYuZ2V0KCdkZWZhdWx0JykubmFtZXNwYWNlLmhhcygnYycpKS50by5iZS50cnVlXG4gICAgfSlcblxuICAgIGl0KCd3b3JrcyB3aXRoIGJhYmVsLWVzbGludCAmIEVTNyBuYW1lc3BhY2UgZXhwb3J0cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBhdGggPSBnZXRGaWxlbmFtZSgnZGVlcC1lczcvYS5qcycpXG4gICAgICAgICAgLCBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgICAgIGNvbnN0IGEgPSBFeHBvcnRNYXAucGFyc2UocGF0aCwgY29udGVudHMsIGJhYmVsQ29udGV4dClcbiAgICAgIGV4cGVjdChhLmVycm9ycykudG8uYmUuZW1wdHlcbiAgICAgIGV4cGVjdChhLmdldCgnYicpLm5hbWVzcGFjZSkudG8uZXhpc3RcbiAgICAgIGV4cGVjdChhLmdldCgnYicpLm5hbWVzcGFjZS5oYXMoJ2MnKSkudG8uYmUudHJ1ZVxuICAgIH0pXG4gIH0pXG5cbiAgY29udGV4dCgnZGVlcCBuYW1lc3BhY2UgY2FjaGluZycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBlc3ByZWVDb250ZXh0ID0geyBwYXJzZXJQYXRoOiAnZXNwcmVlJywgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJyB9LCBzZXR0aW5nczoge30gfVxuICAgIGxldCBhXG4gICAgYmVmb3JlKCdzYW5pdHkgY2hlY2sgYW5kIHByaW1lIGNhY2hlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgIC8vIGZpcnN0IHZlcnNpb25cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoZ2V0RmlsZW5hbWUoJ2RlZXAvY2FjaGUtMi5qcycpLFxuICAgICAgICBmcy5yZWFkRmlsZVN5bmMoZ2V0RmlsZW5hbWUoJ2RlZXAvY2FjaGUtMmEuanMnKSkpXG5cbiAgICAgIGNvbnN0IHBhdGggPSBnZXRGaWxlbmFtZSgnZGVlcC9jYWNoZS0xLmpzJylcbiAgICAgICAgICAsIGNvbnRlbnRzID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgICAgYSA9IEV4cG9ydE1hcC5wYXJzZShwYXRoLCBjb250ZW50cywgZXNwcmVlQ29udGV4dClcbiAgICAgIGV4cGVjdChhLmVycm9ycykudG8uYmUuZW1wdHlcblxuICAgICAgZXhwZWN0KGEuZ2V0KCdiJykubmFtZXNwYWNlKS50by5leGlzdFxuICAgICAgZXhwZWN0KGEuZ2V0KCdiJykubmFtZXNwYWNlLmhhcygnYycpKS50by5iZS50cnVlXG5cbiAgICAgIC8vIHdhaXQgfjFzLCBjYWNoZSBjaGVjayBpcyAxcyByZXNvbHV0aW9uXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHJldXAoKSB7XG4gICAgICAgIGZzLnVubGlua1N5bmMoZ2V0RmlsZW5hbWUoJ2RlZXAvY2FjaGUtMi5qcycpKVxuICAgICAgICAvLyBzd2FwIGluIGEgbmV3IGZpbGUgYW5kIHRvdWNoIGl0XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZ2V0RmlsZW5hbWUoJ2RlZXAvY2FjaGUtMi5qcycpLFxuICAgICAgICAgIGZzLnJlYWRGaWxlU3luYyhnZXRGaWxlbmFtZSgnZGVlcC9jYWNoZS0yYi5qcycpKSlcbiAgICAgICAgZG9uZSgpXG4gICAgICB9LCAxMTAwKVxuICAgIH0pXG5cbiAgICBpdCgnd29ya3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBleHBlY3QoYS5nZXQoJ2InKS5uYW1lc3BhY2UuaGFzKCdjJykpLnRvLmJlLmZhbHNlXG4gICAgfSlcblxuICAgIGFmdGVyKCdyZW1vdmUgdGVzdCBmaWxlJywgKGRvbmUpID0+IGZzLnVubGluayhnZXRGaWxlbmFtZSgnZGVlcC9jYWNoZS0yLmpzJyksIGRvbmUpKVxuICB9KVxuXG4gIGNvbnRleHQoJ01hcCBBUEknLCBmdW5jdGlvbiAoKSB7XG4gICAgY29udGV4dCgnI3NpemUnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGl0KCdjb3VudHMgdGhlIG5hbWVzJywgKCkgPT4gZXhwZWN0KEV4cG9ydE1hcC5nZXQoJy4vbmFtZWQtZXhwb3J0cycsIGZha2VDb250ZXh0KSlcbiAgICAgICAgLnRvLmhhdmUucHJvcGVydHkoJ3NpemUnLCA4KSlcblxuICAgICAgaXQoJ2luY2x1ZGVzIGV4cG9ydGVkIG5hbWVzcGFjZSBzaXplJywgKCkgPT4gZXhwZWN0KEV4cG9ydE1hcC5nZXQoJy4vZXhwb3J0LWFsbCcsIGZha2VDb250ZXh0KSlcbiAgICAgICAgLnRvLmhhdmUucHJvcGVydHkoJ3NpemUnLCAxKSlcblxuICAgIH0pXG4gIH0pXG5cbiAgY29udGV4dCgnaXNzdWUgIzIxMDogc2VsZi1yZWZlcmVuY2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoXCJkb2Vzbid0IGNyYXNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGV4cGVjdCgoKSA9PiBFeHBvcnRNYXAuZ2V0KCcuL25hcmNpc3Npc3QnLCBmYWtlQ29udGV4dCkpLm5vdC50by50aHJvdyhFcnJvcilcbiAgICB9KVxuICAgIGl0KFwiJ2hhcycgY2lyY3VsYXIgcmVmZXJlbmNlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGV4cGVjdChFeHBvcnRNYXAuZ2V0KCcuL25hcmNpc3Npc3QnLCBmYWtlQ29udGV4dCkpXG4gICAgICAgIC50by5leGlzdC5hbmQuc2F0aXNmeShtID0+IG0uaGFzKCdzb0dyZWF0JykpXG4gICAgfSlcbiAgICBpdChcImNhbiAnZ2V0JyBjaXJjdWxhciByZWZlcmVuY2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgZXhwZWN0KEV4cG9ydE1hcC5nZXQoJy4vbmFyY2lzc2lzdCcsIGZha2VDb250ZXh0KSlcbiAgICAgICAgLnRvLmV4aXN0LmFuZC5zYXRpc2Z5KG0gPT4gbS5nZXQoJ3NvR3JlYXQnKSAhPSBudWxsKVxuICAgIH0pXG4gIH0pXG5cbn0pXG4iXX0=