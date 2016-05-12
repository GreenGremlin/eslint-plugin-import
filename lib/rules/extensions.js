'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash.endswith');

var _lodash2 = _interopRequireDefault(_lodash);

var _resolve = require('../core/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _importType = require('../core/importType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (context) {
  var configuration = context.options[0] || 'never';

  function isUseOfExtensionEnforced(extension) {
    if ((typeof configuration === 'undefined' ? 'undefined' : _typeof(configuration)) === 'object') {
      return configuration[extension] === 'always';
    }

    return configuration === 'always';
  }

  function isResolvableWithoutExtension(file) {
    var extension = _path2.default.extname(file);
    var fileWithoutExtension = file.slice(0, -extension.length);
    var resolvedFileWithoutExtension = (0, _resolve2.default)(fileWithoutExtension, context);

    return resolvedFileWithoutExtension === (0, _resolve2.default)(file, context);
  }

  function checkFileExtension(node) {
    var source = node.source;

    var importPath = source.value;

    // don't enforce anything on builtins
    if ((0, _importType.isBuiltIn)(importPath)) return;

    var resolvedPath = (0, _resolve2.default)(importPath, context);

    // get extension from resolved path, if possible.
    // for unresolved, use source value.
    var extension = _path2.default.extname(resolvedPath || importPath).substring(1);

    if (!extension || !(0, _lodash2.default)(importPath, extension)) {
      if (isUseOfExtensionEnforced(extension)) {
        context.report({
          node: source,
          message: 'Missing file extension ' + (extension ? '"' + extension + '" ' : '') + 'for "' + importPath + '"'
        });
      }
    } else if (extension) {
      if (!isUseOfExtensionEnforced(extension) && isResolvableWithoutExtension(importPath)) {
        context.report({
          node: source,
          message: 'Unexpected use of file extension "' + extension + '" for "' + importPath + '"'
        });
      }
    }
  }

  return {
    ImportDeclaration: checkFileExtension
  };
};

module.exports.schema = [{
  oneOf: [{
    enum: ['always', 'never']
  }, {
    type: 'object',
    patternProperties: {
      '.*': { enum: ['always', 'never'] }
    }
  }]
}];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2V4dGVuc2lvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsT0FBVixFQUFtQjtBQUNsQyxNQUFNLGdCQUFnQixRQUFRLE9BQVIsQ0FBZ0IsQ0FBaEIsS0FBc0IsT0FBNUM7O0FBRUEsV0FBUyx3QkFBVCxDQUFrQyxTQUFsQyxFQUE2QztBQUMzQyxRQUFJLFFBQU8sYUFBUCx5Q0FBTyxhQUFQLE9BQXlCLFFBQTdCLEVBQXVDO0FBQ3JDLGFBQU8sY0FBYyxTQUFkLE1BQTZCLFFBQXBDO0FBQ0Q7O0FBRUQsV0FBTyxrQkFBa0IsUUFBekI7QUFDRDs7QUFFRCxXQUFTLDRCQUFULENBQXNDLElBQXRDLEVBQTRDO0FBQzFDLFFBQU0sWUFBWSxlQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWxCO0FBQ0EsUUFBTSx1QkFBdUIsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsVUFBVSxNQUF6QixDQUE3QjtBQUNBLFFBQU0sK0JBQStCLHVCQUFRLG9CQUFSLEVBQThCLE9BQTlCLENBQXJDOztBQUVBLFdBQU8saUNBQWlDLHVCQUFRLElBQVIsRUFBYyxPQUFkLENBQXhDO0FBQ0Q7O0FBRUQsV0FBUyxrQkFBVCxDQUE0QixJQUE1QixFQUFrQztBQUFBLFFBQ3hCLE1BRHdCLEdBQ2IsSUFEYSxDQUN4QixNQUR3Qjs7QUFFaEMsUUFBTSxhQUFhLE9BQU8sS0FBMUI7OztBQUdBLFFBQUksMkJBQVUsVUFBVixDQUFKLEVBQTJCOztBQUUzQixRQUFNLGVBQWUsdUJBQVEsVUFBUixFQUFvQixPQUFwQixDQUFyQjs7OztBQUlBLFFBQU0sWUFBWSxlQUFLLE9BQUwsQ0FBYSxnQkFBZ0IsVUFBN0IsRUFBeUMsU0FBekMsQ0FBbUQsQ0FBbkQsQ0FBbEI7O0FBRUEsUUFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLHNCQUFTLFVBQVQsRUFBcUIsU0FBckIsQ0FBbkIsRUFBb0Q7QUFDbEQsVUFBSSx5QkFBeUIsU0FBekIsQ0FBSixFQUF5QztBQUN2QyxnQkFBUSxNQUFSLENBQWU7QUFDYixnQkFBTSxNQURPO0FBRWIsZ0RBQzRCLGtCQUFnQixTQUFoQixVQUFnQyxFQUQ1RCxjQUNzRSxVQUR0RTtBQUZhLFNBQWY7QUFLRDtBQUNGLEtBUkQsTUFRTyxJQUFJLFNBQUosRUFBZTtBQUNwQixVQUFJLENBQUMseUJBQXlCLFNBQXpCLENBQUQsSUFBd0MsNkJBQTZCLFVBQTdCLENBQTVDLEVBQXNGO0FBQ3BGLGdCQUFRLE1BQVIsQ0FBZTtBQUNiLGdCQUFNLE1BRE87QUFFYiwwREFBOEMsU0FBOUMsZUFBaUUsVUFBakU7QUFGYSxTQUFmO0FBSUQ7QUFDRjtBQUNGOztBQUVELFNBQU87QUFDTCx1QkFBbUI7QUFEZCxHQUFQO0FBR0QsQ0FyREQ7O0FBdURBLE9BQU8sT0FBUCxDQUFlLE1BQWYsR0FBd0IsQ0FDdEI7QUFDRSxTQUFPLENBQ0w7QUFDRSxVQUFNLENBQUUsUUFBRixFQUFZLE9BQVo7QUFEUixHQURLLEVBSUw7QUFDRSxVQUFNLFFBRFI7QUFFRSx1QkFBbUI7QUFDakIsWUFBTSxFQUFFLE1BQU0sQ0FBRSxRQUFGLEVBQVksT0FBWixDQUFSO0FBRFc7QUFGckIsR0FKSztBQURULENBRHNCLENBQXhCIiwiZmlsZSI6InJ1bGVzL2V4dGVuc2lvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGVuZHNXaXRoIGZyb20gJ2xvZGFzaC5lbmRzd2l0aCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi4vY29yZS9yZXNvbHZlJ1xuaW1wb3J0IHsgaXNCdWlsdEluIH0gZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb250ZXh0Lm9wdGlvbnNbMF0gfHwgJ25ldmVyJ1xuXG4gIGZ1bmN0aW9uIGlzVXNlT2ZFeHRlbnNpb25FbmZvcmNlZChleHRlbnNpb24pIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbltleHRlbnNpb25dID09PSAnYWx3YXlzJ1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWd1cmF0aW9uID09PSAnYWx3YXlzJ1xuICB9XG5cbiAgZnVuY3Rpb24gaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbihmaWxlKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKGZpbGUpXG4gICAgY29uc3QgZmlsZVdpdGhvdXRFeHRlbnNpb24gPSBmaWxlLnNsaWNlKDAsIC1leHRlbnNpb24ubGVuZ3RoKVxuICAgIGNvbnN0IHJlc29sdmVkRmlsZVdpdGhvdXRFeHRlbnNpb24gPSByZXNvbHZlKGZpbGVXaXRob3V0RXh0ZW5zaW9uLCBjb250ZXh0KVxuXG4gICAgcmV0dXJuIHJlc29sdmVkRmlsZVdpdGhvdXRFeHRlbnNpb24gPT09IHJlc29sdmUoZmlsZSwgY29udGV4dClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRmlsZUV4dGVuc2lvbihub2RlKSB7XG4gICAgY29uc3QgeyBzb3VyY2UgfSA9IG5vZGVcbiAgICBjb25zdCBpbXBvcnRQYXRoID0gc291cmNlLnZhbHVlXG5cbiAgICAvLyBkb24ndCBlbmZvcmNlIGFueXRoaW5nIG9uIGJ1aWx0aW5zXG4gICAgaWYgKGlzQnVpbHRJbihpbXBvcnRQYXRoKSkgcmV0dXJuXG5cbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSByZXNvbHZlKGltcG9ydFBhdGgsIGNvbnRleHQpXG5cbiAgICAvLyBnZXQgZXh0ZW5zaW9uIGZyb20gcmVzb2x2ZWQgcGF0aCwgaWYgcG9zc2libGUuXG4gICAgLy8gZm9yIHVucmVzb2x2ZWQsIHVzZSBzb3VyY2UgdmFsdWUuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKHJlc29sdmVkUGF0aCB8fCBpbXBvcnRQYXRoKS5zdWJzdHJpbmcoMSlcblxuICAgIGlmICghZXh0ZW5zaW9uIHx8ICFlbmRzV2l0aChpbXBvcnRQYXRoLCBleHRlbnNpb24pKSB7XG4gICAgICBpZiAoaXNVc2VPZkV4dGVuc2lvbkVuZm9yY2VkKGV4dGVuc2lvbikpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGU6IHNvdXJjZSxcbiAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgYE1pc3NpbmcgZmlsZSBleHRlbnNpb24gJHtleHRlbnNpb24gPyBgXCIke2V4dGVuc2lvbn1cIiBgIDogJyd9Zm9yIFwiJHtpbXBvcnRQYXRofVwiYCxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV4dGVuc2lvbikge1xuICAgICAgaWYgKCFpc1VzZU9mRXh0ZW5zaW9uRW5mb3JjZWQoZXh0ZW5zaW9uKSAmJiBpc1Jlc29sdmFibGVXaXRob3V0RXh0ZW5zaW9uKGltcG9ydFBhdGgpKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlOiBzb3VyY2UsXG4gICAgICAgICAgbWVzc2FnZTogYFVuZXhwZWN0ZWQgdXNlIG9mIGZpbGUgZXh0ZW5zaW9uIFwiJHtleHRlbnNpb259XCIgZm9yIFwiJHtpbXBvcnRQYXRofVwiYCxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIEltcG9ydERlY2xhcmF0aW9uOiBjaGVja0ZpbGVFeHRlbnNpb24sXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuc2NoZW1hID0gW1xuICB7XG4gICAgb25lT2Y6IFtcbiAgICAgIHtcbiAgICAgICAgZW51bTogWyAnYWx3YXlzJywgJ25ldmVyJyBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgJy4qJzogeyBlbnVtOiBbICdhbHdheXMnLCAnbmV2ZXInIF0gfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl1cbiJdfQ==