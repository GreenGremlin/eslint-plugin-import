'use strict';

require('es6-symbol/implement');

var expect = require('chai').expect;

var path = require('path'),
    fs = require('fs');

describe('package', function () {
  var pkg = path.join(process.cwd(), 'lib'),
      module = void 0;

  before('is importable', function () {
    module = require(pkg);
  });

  it('exists', function () {
    expect(module).to.exist;
  });

  it('has every rule', function (done) {

    fs.readdir(path.join(pkg, 'rules'), function (err, files) {
      expect(err).not.to.exist;

      files.forEach(function (f) {
        expect(module.rules).to.have.property(path.basename(f, '.js'));
      });

      done();
    });
  });

  it('exports all configs', function (done) {
    fs.readdir(path.join(process.cwd(), 'config'), function (err, files) {
      if (err) {
        done(err);return;
      }
      for (var _iterator = files, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var file = _ref;

        if (file[0] === '.') continue;
        expect(module.configs).to.have.property(file.slice(0, -3)); // drop '.js'
      }
      done();
    });
  });

  it('has configs only for rules that exist', function () {
    var _loop = function _loop(configFile) {
      var preamble = 'import/';

      var _loop2 = function _loop2(rule) {
        expect(function () {
          return require('rules/' + rule.slice(preamble.length));
        }).not.to.throw(Error);
      };

      for (var rule in module.configs[configFile].rules) {
        _loop2(rule);
      }
    };

    for (var configFile in module.configs) {
      _loop(configFile);
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFJLFNBQVMsUUFBUSxNQUFSLEVBQWdCLE1BQTdCOztBQUVBLElBQUksT0FBTyxRQUFRLE1BQVIsQ0FBWDtJQUNJLEtBQUssUUFBUSxJQUFSLENBRFQ7O0FBR0EsU0FBUyxTQUFULEVBQW9CLFlBQVk7QUFDOUIsTUFBSSxNQUFNLEtBQUssSUFBTCxDQUFVLFFBQVEsR0FBUixFQUFWLEVBQXlCLEtBQXpCLENBQVY7TUFDSSxlQURKOztBQUdBLFNBQU8sZUFBUCxFQUF3QixZQUFZO0FBQ2xDLGFBQVMsUUFBUSxHQUFSLENBQVQ7QUFDRCxHQUZEOztBQUlBLEtBQUcsUUFBSCxFQUFhLFlBQVk7QUFDdkIsV0FBTyxNQUFQLEVBQWUsRUFBZixDQUFrQixLQUFsQjtBQUNELEdBRkQ7O0FBSUEsS0FBRyxnQkFBSCxFQUFxQixVQUFVLElBQVYsRUFBZ0I7O0FBRW5DLE9BQUcsT0FBSCxDQUNFLEtBQUssSUFBTCxDQUFVLEdBQVYsRUFBZSxPQUFmLENBREYsRUFFRSxVQUFVLEdBQVYsRUFBZSxLQUFmLEVBQXNCO0FBQ3BCLGFBQU8sR0FBUCxFQUFZLEdBQVosQ0FBZ0IsRUFBaEIsQ0FBbUIsS0FBbkI7O0FBRUEsWUFBTSxPQUFOLENBQWMsVUFBVSxDQUFWLEVBQWE7QUFDekIsZUFBTyxPQUFPLEtBQWQsRUFBcUIsRUFBckIsQ0FBd0IsSUFBeEIsQ0FDRyxRQURILENBQ1ksS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixLQUFqQixDQURaO0FBRUQsT0FIRDs7QUFLQTtBQUNELEtBWEg7QUFZRCxHQWREOztBQWdCQSxLQUFHLHFCQUFILEVBQTBCLFVBQVUsSUFBVixFQUFnQjtBQUN4QyxPQUFHLE9BQUgsQ0FBVyxLQUFLLElBQUwsQ0FBVSxRQUFRLEdBQVIsRUFBVixFQUF5QixRQUF6QixDQUFYLEVBQStDLFVBQVUsR0FBVixFQUFlLEtBQWYsRUFBc0I7QUFDbkUsVUFBSSxHQUFKLEVBQVM7QUFBRSxhQUFLLEdBQUwsRUFBVztBQUFRO0FBQzlCLDJCQUFpQixLQUFqQixrSEFBd0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLFlBQWYsSUFBZTs7QUFDdEIsWUFBSSxLQUFLLENBQUwsTUFBWSxHQUFoQixFQUFxQjtBQUNyQixlQUFPLE9BQU8sT0FBZCxFQUF1QixFQUF2QixDQUEwQixJQUExQixDQUErQixRQUEvQixDQUF3QyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQXhDLEU7QUFDRDtBQUNEO0FBQ0QsS0FQRDtBQVFELEdBVEQ7O0FBV0EsS0FBRyx1Q0FBSCxFQUE0QyxZQUFZO0FBQUEsK0JBQzdDLFVBRDZDO0FBRXBELFVBQUksV0FBVyxTQUFmOztBQUZvRCxtQ0FJM0MsSUFKMkM7QUFLbEQsZUFBTztBQUFBLGlCQUFNLFFBQVEsV0FBUyxLQUFLLEtBQUwsQ0FBVyxTQUFTLE1BQXBCLENBQWpCLENBQU47QUFBQSxTQUFQLEVBQ0csR0FESCxDQUNPLEVBRFAsQ0FDVSxLQURWLENBQ2dCLEtBRGhCO0FBTGtEOztBQUlwRCxXQUFLLElBQUksSUFBVCxJQUFpQixPQUFPLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLEtBQTVDLEVBQW1EO0FBQUEsZUFBMUMsSUFBMEM7QUFHbEQ7QUFQbUQ7O0FBQ3RELFNBQUssSUFBSSxVQUFULElBQXVCLE9BQU8sT0FBOUIsRUFBdUM7QUFBQSxZQUE5QixVQUE4QjtBQU90QztBQUNGLEdBVEQ7QUFXRCxDQWxERCIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdlczYtc3ltYm9sL2ltcGxlbWVudCdcblxudmFyIGV4cGVjdCA9IHJlcXVpcmUoJ2NoYWknKS5leHBlY3RcblxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgLCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZGVzY3JpYmUoJ3BhY2thZ2UnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBwa2cgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xpYicpXG4gICAgLCBtb2R1bGVcblxuICBiZWZvcmUoJ2lzIGltcG9ydGFibGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9kdWxlID0gcmVxdWlyZShwa2cpXG4gIH0pXG5cbiAgaXQoJ2V4aXN0cycsIGZ1bmN0aW9uICgpIHtcbiAgICBleHBlY3QobW9kdWxlKS50by5leGlzdFxuICB9KVxuXG4gIGl0KCdoYXMgZXZlcnkgcnVsZScsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICBmcy5yZWFkZGlyKFxuICAgICAgcGF0aC5qb2luKHBrZywgJ3J1bGVzJylcbiAgICAsIGZ1bmN0aW9uIChlcnIsIGZpbGVzKSB7XG4gICAgICAgIGV4cGVjdChlcnIpLm5vdC50by5leGlzdFxuXG4gICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBleHBlY3QobW9kdWxlLnJ1bGVzKS50by5oYXZlXG4gICAgICAgICAgICAucHJvcGVydHkocGF0aC5iYXNlbmFtZShmLCAnLmpzJykpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICB9KVxuXG4gIGl0KCdleHBvcnRzIGFsbCBjb25maWdzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBmcy5yZWFkZGlyKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnY29uZmlnJyksIGZ1bmN0aW9uIChlcnIsIGZpbGVzKSB7XG4gICAgICBpZiAoZXJyKSB7IGRvbmUoZXJyKTsgcmV0dXJuIH1cbiAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgaWYgKGZpbGVbMF0gPT09ICcuJykgY29udGludWVcbiAgICAgICAgZXhwZWN0KG1vZHVsZS5jb25maWdzKS50by5oYXZlLnByb3BlcnR5KGZpbGUuc2xpY2UoMCwgLTMpKSAvLyBkcm9wICcuanMnXG4gICAgICB9XG4gICAgICBkb25lKClcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdoYXMgY29uZmlncyBvbmx5IGZvciBydWxlcyB0aGF0IGV4aXN0JywgZnVuY3Rpb24gKCkge1xuICAgIGZvciAobGV0IGNvbmZpZ0ZpbGUgaW4gbW9kdWxlLmNvbmZpZ3MpIHtcbiAgICAgIGxldCBwcmVhbWJsZSA9ICdpbXBvcnQvJ1xuXG4gICAgICBmb3IgKGxldCBydWxlIGluIG1vZHVsZS5jb25maWdzW2NvbmZpZ0ZpbGVdLnJ1bGVzKSB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiByZXF1aXJlKCdydWxlcy8nK3J1bGUuc2xpY2UocHJlYW1ibGUubGVuZ3RoKSkpXG4gICAgICAgICAgLm5vdC50by50aHJvdyhFcnJvcilcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbn0pXG5cbiJdfQ==