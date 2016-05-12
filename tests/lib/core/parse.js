'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _chai = require('chai');

var _parse = require('core/parse');

var _parse2 = _interopRequireDefault(_parse);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('parse(content, { settings, ecmaFeatures })', function () {
  var content = void 0;

  before(function (done) {
    return fs.readFile((0, _utils.getFilename)('jsx.js'), { encoding: 'utf8' }, function (err, f) {
      if (err) {
        done(err);
      } else {
        content = f;done();
      }
    });
  });

  it("doesn't support JSX by default", function () {
    (0, _chai.expect)(function () {
      return (0, _parse2.default)(content, { parserPath: 'espree' });
    }).to.throw(Error);
  });
  it('infers jsx from ecmaFeatures when using stock parser', function () {
    (0, _chai.expect)(function () {
      return (0, _parse2.default)(content, { parserPath: 'espree', parserOptions: { sourceType: 'module', ecmaFeatures: { jsx: true } } });
    }).not.to.throw(Error);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7SUFBWSxFOztBQUNaOztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLFNBQVMsNENBQVQsRUFBdUQsWUFBWTtBQUNqRSxNQUFJLGdCQUFKOztBQUVBLFNBQU8sVUFBQyxJQUFEO0FBQUEsV0FDTCxHQUFHLFFBQUgsQ0FBWSx3QkFBWSxRQUFaLENBQVosRUFBbUMsRUFBRSxVQUFVLE1BQVosRUFBbkMsRUFDRSxVQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVk7QUFBRSxVQUFJLEdBQUosRUFBUztBQUFFLGFBQUssR0FBTDtBQUFXLE9BQXRCLE1BQTRCO0FBQUUsa0JBQVUsQ0FBVixDQUFhO0FBQVE7QUFBQyxLQURwRSxDQURLO0FBQUEsR0FBUDs7QUFJQSxLQUFHLGdDQUFILEVBQXFDLFlBQVk7QUFDL0Msc0JBQU87QUFBQSxhQUFNLHFCQUFNLE9BQU4sRUFBZSxFQUFFLFlBQVksUUFBZCxFQUFmLENBQU47QUFBQSxLQUFQLEVBQXVELEVBQXZELENBQTBELEtBQTFELENBQWdFLEtBQWhFO0FBQ0QsR0FGRDtBQUdBLEtBQUcsc0RBQUgsRUFBMkQsWUFBWTtBQUNyRSxzQkFBTztBQUFBLGFBQU0scUJBQU0sT0FBTixFQUFlLEVBQUUsWUFBWSxRQUFkLEVBQXdCLGVBQWUsRUFBRSxZQUFZLFFBQWQsRUFBd0IsY0FBYyxFQUFFLEtBQUssSUFBUCxFQUF0QyxFQUF2QyxFQUFmLENBQU47QUFBQSxLQUFQLEVBQ0csR0FESCxDQUNPLEVBRFAsQ0FDVSxLQURWLENBQ2dCLEtBRGhCO0FBRUQsR0FIRDtBQUlELENBZEQiLCJmaWxlIjoiY29yZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSdcbmltcG9ydCBwYXJzZSBmcm9tICdjb3JlL3BhcnNlJ1xuXG5pbXBvcnQgeyBnZXRGaWxlbmFtZSB9IGZyb20gJy4uL3V0aWxzJ1xuXG5kZXNjcmliZSgncGFyc2UoY29udGVudCwgeyBzZXR0aW5ncywgZWNtYUZlYXR1cmVzIH0pJywgZnVuY3Rpb24gKCkge1xuICBsZXQgY29udGVudFxuXG4gIGJlZm9yZSgoZG9uZSkgPT5cbiAgICBmcy5yZWFkRmlsZShnZXRGaWxlbmFtZSgnanN4LmpzJyksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9LFxuICAgICAgKGVyciwgZikgPT4geyBpZiAoZXJyKSB7IGRvbmUoZXJyKSB9IGVsc2UgeyBjb250ZW50ID0gZjsgZG9uZSgpIH19KSlcblxuICBpdChcImRvZXNuJ3Qgc3VwcG9ydCBKU1ggYnkgZGVmYXVsdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgZXhwZWN0KCgpID0+IHBhcnNlKGNvbnRlbnQsIHsgcGFyc2VyUGF0aDogJ2VzcHJlZScgfSkpLnRvLnRocm93KEVycm9yKVxuICB9KVxuICBpdCgnaW5mZXJzIGpzeCBmcm9tIGVjbWFGZWF0dXJlcyB3aGVuIHVzaW5nIHN0b2NrIHBhcnNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBleHBlY3QoKCkgPT4gcGFyc2UoY29udGVudCwgeyBwYXJzZXJQYXRoOiAnZXNwcmVlJywgcGFyc2VyT3B0aW9uczogeyBzb3VyY2VUeXBlOiAnbW9kdWxlJywgZWNtYUZlYXR1cmVzOiB7IGpzeDogdHJ1ZSB9IH0gfSkpXG4gICAgICAubm90LnRvLnRocm93KEVycm9yKVxuICB9KVxufSlcbiJdfQ==