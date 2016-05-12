'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.recursivePatternCapture = recursivePatternCapture;

require('es6-symbol/implement');

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _crypto = require('crypto');

var _doctrine = require('doctrine');

var doctrine = _interopRequireWildcard(_doctrine);

var _parse2 = require('./parse');

var _parse3 = _interopRequireDefault(_parse2);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _ignore = require('./ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _hash = require('./hash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exportCache = new _es6Map2.default();

/**
 * detect exports without a full parse.
 * used primarily to ignore the import/ignore setting, iif it looks like
 * there might be something there (i.e., jsnext:main is set).
 * @type {RegExp}
 */
var hasExports = new RegExp('(^|[\\n;])\\s*export\\s[\\w{*]');

var ExportMap = function () {
  function ExportMap(path) {
    _classCallCheck(this, ExportMap);

    this.path = path;
    this.namespace = new _es6Map2.default();
    // todo: restructure to key on path, value is resolver + map of names
    this.reexports = new _es6Map2.default();
    this.dependencies = new _es6Map2.default();
    this.errors = [];
  }

  ExportMap.get = function get(source, context) {

    var path = (0, _resolve2.default)(source, context);
    if (path == null) return null;

    return ExportMap.for(path, context);
  };

  ExportMap.for = function _for(path, context) {
    var exportMap = void 0;

    var cacheKey = (0, _hash.hashObject)((0, _crypto.createHash)('sha256'), {
      settings: context.settings,
      parserPath: context.parserPath,
      parserOptions: context.parserOptions,
      path: path
    }).digest('hex');

    exportMap = exportCache.get(cacheKey);

    // return cached ignore
    if (exportMap === null) return null;

    var stats = fs.statSync(path);
    if (exportMap != null) {
      // date equality check
      if (exportMap.mtime - stats.mtime === 0) {
        return exportMap;
      }
      // future: check content equality?
    }

    var content = fs.readFileSync(path, { encoding: 'utf8' });

    // check for and cache ignore
    if ((0, _ignore2.default)(path, context) && !hasExports.test(content)) {
      exportCache.set(cacheKey, null);
      return null;
    }

    exportMap = ExportMap.parse(path, content, context);
    exportMap.mtime = stats.mtime;

    exportCache.set(cacheKey, exportMap);
    return exportMap;
  };

  ExportMap.parse = function parse(path, content, context) {
    var m = new ExportMap(path);

    try {
      var ast = (0, _parse3.default)(content, context);
    } catch (err) {
      m.errors.push(err);
      return m; // can't continue
    }

    // attempt to collect module doc
    ast.comments.some(function (c) {
      if (c.type !== 'Block') return false;
      try {
        var doc = doctrine.parse(c.value, { unwrap: true });
        if (doc.tags.some(function (t) {
          return t.title === 'module';
        })) {
          m.doc = doc;
          return true;
        }
      } catch (err) {/* ignore */}
      return false;
    });

    var namespaces = new _es6Map2.default();

    function remotePath(node) {
      return _resolve2.default.relative(node.source.value, path, context.settings);
    }

    function resolveImport(node) {
      var rp = remotePath(node);
      if (rp == null) return null;
      return ExportMap.for(rp, context);
    }

    function getNamespace(identifier) {
      if (!namespaces.has(identifier.name)) return;

      return function () {
        return resolveImport(namespaces.get(identifier.name));
      };
    }

    function addNamespace(object, identifier) {
      var nsfn = getNamespace(identifier);
      if (nsfn) {
        Object.defineProperty(object, 'namespace', { get: nsfn });
      }

      return object;
    }

    ast.body.forEach(function (n) {

      if (n.type === 'ExportDefaultDeclaration') {
        var exportMeta = captureDoc(n);
        if (n.declaration.type === 'Identifier') {
          addNamespace(exportMeta, n.declaration);
        }
        m.namespace.set('default', exportMeta);
        return;
      }

      if (n.type === 'ExportAllDeclaration') {
        var _ret = function () {
          var remoteMap = remotePath(n);
          if (remoteMap == null) return {
              v: void 0
            };
          m.dependencies.set(remoteMap, function () {
            return ExportMap.for(remoteMap, context);
          });
          return {
            v: void 0
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      // capture namespaces in case of later export
      if (n.type === 'ImportDeclaration') {
        var ns = void 0;
        if (n.specifiers.some(function (s) {
          return s.type === 'ImportNamespaceSpecifier' && (ns = s);
        })) {
          namespaces.set(ns.local.name, n);
        }
        return;
      }

      if (n.type === 'ExportNamedDeclaration') {
        // capture declaration
        if (n.declaration != null) {
          switch (n.declaration.type) {
            case 'FunctionDeclaration':
            case 'ClassDeclaration':
            case 'TypeAlias':
              // flowtype with babel-eslint parser
              m.namespace.set(n.declaration.id.name, captureDoc(n));
              break;
            case 'VariableDeclaration':
              n.declaration.declarations.forEach(function (d) {
                return recursivePatternCapture(d.id, function (id) {
                  return m.namespace.set(id.name, captureDoc(d, n));
                });
              });
              break;
          }
        }

        n.specifiers.forEach(function (s) {
          var exportMeta = {};
          var local = void 0;

          switch (s.type) {
            case 'ExportDefaultSpecifier':
              if (!n.source) return;
              local = 'default';
              break;
            case 'ExportNamespaceSpecifier':
              m.namespace.set(s.exported.name, Object.defineProperty(exportMeta, 'namespace', {
                get: function get() {
                  return resolveImport(n);
                }
              }));
              return;
            case 'ExportSpecifier':
              if (!n.source) {
                m.namespace.set(s.exported.name, addNamespace(exportMeta, s.local));
                return;
              }
            // else falls through
            default:
              local = s.local.name;
              break;
          }

          // todo: JSDoc
          m.reexports.set(s.exported.name, { local: local, getImport: function getImport() {
              return resolveImport(n);
            } });
        });
      }
    });

    return m;
  };

  /**
   * Note that this does not check explicitly re-exported names for existence
   * in the base namespace, but it will expand all `export * from '...'` exports
   * if not found in the explicit namespace.
   * @param  {string}  name
   * @return {Boolean} true if `name` is exported by this module.
   */


  ExportMap.prototype.has = function has(name) {
    if (this.namespace.has(name)) return true;
    if (this.reexports.has(name)) return true;

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (var _iterator = this.dependencies.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var dep = _ref;

        var innerMap = dep();

        // todo: report as unresolved?
        if (!innerMap) continue;

        if (innerMap.has(name)) return true;
      }
    }

    return false;
  };

  /**
   * ensure that imported name fully resolves.
   * @param  {[type]}  name [description]
   * @return {Boolean}      [description]
   */


  ExportMap.prototype.hasDeep = function hasDeep(name) {
    if (this.namespace.has(name)) return { found: true, path: [this] };

    if (this.reexports.has(name)) {
      var _reexports$get = this.reexports.get(name);

      var local = _reexports$get.local;
      var getImport = _reexports$get.getImport;
      var imported = getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return { found: true, path: [this] };

      // safeguard against cycles, only if name matches
      if (imported.path === this.path && local === name) return { found: false, path: [this] };

      var deep = imported.hasDeep(local);
      deep.path.unshift(this);

      return deep;
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (var _iterator2 = this.dependencies.values(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var dep = _ref2;

        var innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        var innerValue = innerMap.hasDeep(name);
        if (innerValue.found) {
          innerValue.path.unshift(this);
          return innerValue;
        }
      }
    }

    return { found: false, path: [this] };
  };

  ExportMap.prototype.get = function get(name) {
    if (this.namespace.has(name)) return this.namespace.get(name);

    if (this.reexports.has(name)) {
      var _reexports$get2 = this.reexports.get(name);

      var local = _reexports$get2.local;
      var getImport = _reexports$get2.getImport;
      var imported = getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return null;

      // safeguard against cycles, only if name matches
      if (imported.path === this.path && local === name) return undefined;

      return imported.get(local);
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (var _iterator3 = this.dependencies.values(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var dep = _ref3;

        var innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        var innerValue = innerMap.get(name);
        if (innerValue !== undefined) return innerValue;
      }
    }

    return undefined;
  };

  ExportMap.prototype.forEach = function forEach(callback, thisArg) {
    var _this = this;

    this.namespace.forEach(function (v, n) {
      return callback.call(thisArg, v, n, _this);
    });

    this.reexports.forEach(function (_ref4, name) {
      var getImport = _ref4.getImport;
      var local = _ref4.local;
      return callback.call(thisArg, getImport().get(local), name, _this);
    });

    this.dependencies.forEach(function (dep) {
      return dep().forEach(function (v, n) {
        return n !== 'default' && callback.call(thisArg, v, n, _this);
      });
    });
  };

  // todo: keys, values, entries?

  ExportMap.prototype.reportErrors = function reportErrors(context, declaration) {
    context.report({
      node: declaration.source,
      message: 'Parse errors in imported module \'' + declaration.source.value + '\': ' + ('' + this.errors.map(function (e) {
        return e.message + ' (' + e.lineNumber + ':' + e.column + ')';
      }).join(', '))
    });
  };

  _createClass(ExportMap, [{
    key: 'hasDefault',
    get: function get() {
      return this.get('default') != null;
    } // stronger than this.has

  }, {
    key: 'size',
    get: function get() {
      var size = this.namespace.size + this.reexports.size;
      this.dependencies.forEach(function (dep) {
        return size += dep().size;
      });
      return size;
    }
  }]);

  return ExportMap;
}();

/**
 * parse JSDoc from the first node that has leading comments
 * @param  {...[type]} nodes [description]
 * @return {{doc: object}}
 */


exports.default = ExportMap;
function captureDoc() {
  var metadata = {};

  // 'some' short-circuits on first 'true'

  for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
    nodes[_key] = arguments[_key];
  }

  nodes.some(function (n) {
    if (!n.leadingComments) return false;

    // capture XSDoc
    n.leadingComments.forEach(function (comment) {
      // skip non-block comments
      if (comment.value.slice(0, 4) !== '*\n *') return;
      try {
        metadata.doc = doctrine.parse(comment.value, { unwrap: true });
      } catch (err) {
        /* don't care, for now? maybe add to `errors?` */
      }
    });
    return true;
  });

  return metadata;
}

/**
 * Traverse a pattern/identifier node, calling 'callback'
 * for each leaf identifier.
 * @param  {node}   pattern
 * @param  {Function} callback
 * @return {void}
 */
function recursivePatternCapture(pattern, callback) {
  switch (pattern.type) {
    case 'Identifier':
      // base case
      callback(pattern);
      break;

    case 'ObjectPattern':
      pattern.properties.forEach(function (_ref5) {
        var value = _ref5.value;

        recursivePatternCapture(value, callback);
      });
      break;

    case 'ArrayPattern':
      pattern.elements.forEach(function (element) {
        if (element == null) return;
        recursivePatternCapture(element, callback);
      });
      break;
  }
}
//# sourceMappingURL=data:application/json;base64,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T0FBbEIsQ0FBMEIsbUJBQVc7O0FBRW5DLFVBQUksUUFBUSxLQUFSLENBQWMsS0FBZCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixNQUE4QixPQUFsQyxFQUEyQztBQUMzQyxVQUFJO0FBQ0YsaUJBQVMsR0FBVCxHQUFlLFNBQVMsS0FBVCxDQUFlLFFBQVEsS0FBdkIsRUFBOEIsRUFBRSxRQUFRLElBQVYsRUFBOUIsQ0FBZjtBQUNELE9BRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTs7QUFFYjtBQUNGLEtBUkQ7QUFTQSxXQUFPLElBQVA7QUFDRCxHQWREOztBQWdCQSxTQUFPLFFBQVA7QUFDRDs7Ozs7Ozs7O0FBU00sU0FBUyx1QkFBVCxDQUFpQyxPQUFqQyxFQUEwQyxRQUExQyxFQUFvRDtBQUN6RCxVQUFRLFFBQVEsSUFBaEI7QUFDRSxTQUFLLFlBQUw7O0FBQ0UsZUFBUyxPQUFUO0FBQ0E7O0FBRUYsU0FBSyxlQUFMO0FBQ0UsY0FBUSxVQUFSLENBQW1CLE9BQW5CLENBQTJCLGlCQUFlO0FBQUEsWUFBWixLQUFZLFNBQVosS0FBWTs7QUFDeEMsZ0NBQXdCLEtBQXhCLEVBQStCLFFBQS9CO0FBQ0QsT0FGRDtBQUdBOztBQUVGLFNBQUssY0FBTDtBQUNFLGNBQVEsUUFBUixDQUFpQixPQUFqQixDQUF5QixVQUFDLE9BQUQsRUFBYTtBQUNwQyxZQUFJLFdBQVcsSUFBZixFQUFxQjtBQUNyQixnQ0FBd0IsT0FBeEIsRUFBaUMsUUFBakM7QUFDRCxPQUhEO0FBSUE7QUFoQko7QUFrQkQiLCJmaWxlIjoiY29yZS9nZXRFeHBvcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdlczYtc3ltYm9sL2ltcGxlbWVudCdcbmltcG9ydCBNYXAgZnJvbSAnZXM2LW1hcCdcblxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnXG5cbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tICdjcnlwdG8nXG5pbXBvcnQgKiBhcyBkb2N0cmluZSBmcm9tICdkb2N0cmluZSdcblxuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UnXG5pbXBvcnQgcmVzb2x2ZSBmcm9tICcuL3Jlc29sdmUnXG5pbXBvcnQgaXNJZ25vcmVkIGZyb20gJy4vaWdub3JlJ1xuXG5pbXBvcnQgeyBoYXNoT2JqZWN0IH0gZnJvbSAnLi9oYXNoJ1xuXG5jb25zdCBleHBvcnRDYWNoZSA9IG5ldyBNYXAoKVxuXG4vKipcbiAqIGRldGVjdCBleHBvcnRzIHdpdGhvdXQgYSBmdWxsIHBhcnNlLlxuICogdXNlZCBwcmltYXJpbHkgdG8gaWdub3JlIHRoZSBpbXBvcnQvaWdub3JlIHNldHRpbmcsIGlpZiBpdCBsb29rcyBsaWtlXG4gKiB0aGVyZSBtaWdodCBiZSBzb21ldGhpbmcgdGhlcmUgKGkuZS4sIGpzbmV4dDptYWluIGlzIHNldCkuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG5jb25zdCBoYXNFeHBvcnRzID0gbmV3IFJlZ0V4cCgnKF58W1xcXFxuO10pXFxcXHMqZXhwb3J0XFxcXHNbXFxcXHd7Kl0nKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBvcnRNYXAge1xuICBjb25zdHJ1Y3RvcihwYXRoKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aFxuICAgIHRoaXMubmFtZXNwYWNlID0gbmV3IE1hcCgpXG4gICAgLy8gdG9kbzogcmVzdHJ1Y3R1cmUgdG8ga2V5IG9uIHBhdGgsIHZhbHVlIGlzIHJlc29sdmVyICsgbWFwIG9mIG5hbWVzXG4gICAgdGhpcy5yZWV4cG9ydHMgPSBuZXcgTWFwKClcbiAgICB0aGlzLmRlcGVuZGVuY2llcyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuZXJyb3JzID0gW11cbiAgfVxuXG4gIGdldCBoYXNEZWZhdWx0KCkgeyByZXR1cm4gdGhpcy5nZXQoJ2RlZmF1bHQnKSAhPSBudWxsIH0gLy8gc3Ryb25nZXIgdGhhbiB0aGlzLmhhc1xuXG4gIGdldCBzaXplKCkge1xuICAgIGxldCBzaXplID0gdGhpcy5uYW1lc3BhY2Uuc2l6ZSArIHRoaXMucmVleHBvcnRzLnNpemVcbiAgICB0aGlzLmRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcCA9PiBzaXplICs9IGRlcCgpLnNpemUpXG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIHN0YXRpYyBnZXQoc291cmNlLCBjb250ZXh0KSB7XG5cbiAgICB2YXIgcGF0aCA9IHJlc29sdmUoc291cmNlLCBjb250ZXh0KVxuICAgIGlmIChwYXRoID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgICByZXR1cm4gRXhwb3J0TWFwLmZvcihwYXRoLCBjb250ZXh0KVxuICB9XG5cbiAgc3RhdGljIGZvcihwYXRoLCBjb250ZXh0KSB7XG4gICAgbGV0IGV4cG9ydE1hcFxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBoYXNoT2JqZWN0KGNyZWF0ZUhhc2goJ3NoYTI1NicpLCB7XG4gICAgICBzZXR0aW5nczogY29udGV4dC5zZXR0aW5ncyxcbiAgICAgIHBhcnNlclBhdGg6IGNvbnRleHQucGFyc2VyUGF0aCxcbiAgICAgIHBhcnNlck9wdGlvbnM6IGNvbnRleHQucGFyc2VyT3B0aW9ucyxcbiAgICAgIHBhdGgsXG4gICAgfSkuZGlnZXN0KCdoZXgnKVxuXG4gICAgZXhwb3J0TWFwID0gZXhwb3J0Q2FjaGUuZ2V0KGNhY2hlS2V5KVxuXG4gICAgLy8gcmV0dXJuIGNhY2hlZCBpZ25vcmVcbiAgICBpZiAoZXhwb3J0TWFwID09PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoKVxuICAgIGlmIChleHBvcnRNYXAgIT0gbnVsbCkge1xuICAgICAgLy8gZGF0ZSBlcXVhbGl0eSBjaGVja1xuICAgICAgaWYgKGV4cG9ydE1hcC5tdGltZSAtIHN0YXRzLm10aW1lID09PSAwKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRNYXBcbiAgICAgIH1cbiAgICAgIC8vIGZ1dHVyZTogY2hlY2sgY29udGVudCBlcXVhbGl0eT9cbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuXG4gICAgLy8gY2hlY2sgZm9yIGFuZCBjYWNoZSBpZ25vcmVcbiAgICBpZiAoaXNJZ25vcmVkKHBhdGgsIGNvbnRleHQpICYmICFoYXNFeHBvcnRzLnRlc3QoY29udGVudCkpIHtcbiAgICAgIGV4cG9ydENhY2hlLnNldChjYWNoZUtleSwgbnVsbClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgZXhwb3J0TWFwID0gRXhwb3J0TWFwLnBhcnNlKHBhdGgsIGNvbnRlbnQsIGNvbnRleHQpXG4gICAgZXhwb3J0TWFwLm10aW1lID0gc3RhdHMubXRpbWVcblxuICAgIGV4cG9ydENhY2hlLnNldChjYWNoZUtleSwgZXhwb3J0TWFwKVxuICAgIHJldHVybiBleHBvcnRNYXBcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZShwYXRoLCBjb250ZW50LCBjb250ZXh0KSB7XG4gICAgdmFyIG0gPSBuZXcgRXhwb3J0TWFwKHBhdGgpXG5cbiAgICB0cnkge1xuICAgICAgdmFyIGFzdCA9IHBhcnNlKGNvbnRlbnQsIGNvbnRleHQpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBtLmVycm9ycy5wdXNoKGVycilcbiAgICAgIHJldHVybiBtIC8vIGNhbid0IGNvbnRpbnVlXG4gICAgfVxuXG4gICAgLy8gYXR0ZW1wdCB0byBjb2xsZWN0IG1vZHVsZSBkb2NcbiAgICBhc3QuY29tbWVudHMuc29tZShjID0+IHtcbiAgICAgIGlmIChjLnR5cGUgIT09ICdCbG9jaycpIHJldHVybiBmYWxzZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jID0gZG9jdHJpbmUucGFyc2UoYy52YWx1ZSwgeyB1bndyYXA6IHRydWUgfSlcbiAgICAgICAgaWYgKGRvYy50YWdzLnNvbWUodCA9PiB0LnRpdGxlID09PSAnbW9kdWxlJykpIHtcbiAgICAgICAgICBtLmRvYyA9IGRvY1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikgeyAvKiBpZ25vcmUgKi8gfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIGNvbnN0IG5hbWVzcGFjZXMgPSBuZXcgTWFwKClcblxuICAgIGZ1bmN0aW9uIHJlbW90ZVBhdGgobm9kZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmUucmVsYXRpdmUobm9kZS5zb3VyY2UudmFsdWUsIHBhdGgsIGNvbnRleHQuc2V0dGluZ3MpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZUltcG9ydChub2RlKSB7XG4gICAgICBjb25zdCBycCA9IHJlbW90ZVBhdGgobm9kZSlcbiAgICAgIGlmIChycCA9PSBudWxsKSByZXR1cm4gbnVsbFxuICAgICAgcmV0dXJuIEV4cG9ydE1hcC5mb3IocnAsIGNvbnRleHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlKGlkZW50aWZpZXIpIHtcbiAgICAgIGlmICghbmFtZXNwYWNlcy5oYXMoaWRlbnRpZmllci5uYW1lKSkgcmV0dXJuXG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlSW1wb3J0KG5hbWVzcGFjZXMuZ2V0KGlkZW50aWZpZXIubmFtZSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTmFtZXNwYWNlKG9iamVjdCwgaWRlbnRpZmllcikge1xuICAgICAgY29uc3QgbnNmbiA9IGdldE5hbWVzcGFjZShpZGVudGlmaWVyKVxuICAgICAgaWYgKG5zZm4pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgJ25hbWVzcGFjZScsIHsgZ2V0OiBuc2ZuIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9XG5cblxuICAgIGFzdC5ib2R5LmZvckVhY2goZnVuY3Rpb24gKG4pIHtcblxuICAgICAgaWYgKG4udHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcbiAgICAgICAgY29uc3QgZXhwb3J0TWV0YSA9IGNhcHR1cmVEb2MobilcbiAgICAgICAgaWYgKG4uZGVjbGFyYXRpb24udHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgYWRkTmFtZXNwYWNlKGV4cG9ydE1ldGEsIG4uZGVjbGFyYXRpb24pXG4gICAgICAgIH1cbiAgICAgICAgbS5uYW1lc3BhY2Uuc2V0KCdkZWZhdWx0JywgZXhwb3J0TWV0YSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChuLnR5cGUgPT09ICdFeHBvcnRBbGxEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgbGV0IHJlbW90ZU1hcCA9IHJlbW90ZVBhdGgobilcbiAgICAgICAgaWYgKHJlbW90ZU1hcCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgbS5kZXBlbmRlbmNpZXMuc2V0KHJlbW90ZU1hcCwgKCkgPT4gRXhwb3J0TWFwLmZvcihyZW1vdGVNYXAsIGNvbnRleHQpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gY2FwdHVyZSBuYW1lc3BhY2VzIGluIGNhc2Ugb2YgbGF0ZXIgZXhwb3J0XG4gICAgICBpZiAobi50eXBlID09PSAnSW1wb3J0RGVjbGFyYXRpb24nKSB7XG4gICAgICAgIGxldCBuc1xuICAgICAgICBpZiAobi5zcGVjaWZpZXJzLnNvbWUocyA9PiBzLnR5cGUgPT09ICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInICYmIChucyA9IHMpKSkge1xuICAgICAgICAgIG5hbWVzcGFjZXMuc2V0KG5zLmxvY2FsLm5hbWUsIG4pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChuLnR5cGUgPT09ICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJyl7XG4gICAgICAgIC8vIGNhcHR1cmUgZGVjbGFyYXRpb25cbiAgICAgICAgaWYgKG4uZGVjbGFyYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHN3aXRjaCAobi5kZWNsYXJhdGlvbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgIGNhc2UgJ0NsYXNzRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgY2FzZSAnVHlwZUFsaWFzJzogLy8gZmxvd3R5cGUgd2l0aCBiYWJlbC1lc2xpbnQgcGFyc2VyXG4gICAgICAgICAgICAgIG0ubmFtZXNwYWNlLnNldChuLmRlY2xhcmF0aW9uLmlkLm5hbWUsIGNhcHR1cmVEb2MobikpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgbi5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuZm9yRWFjaCgoZCkgPT5cbiAgICAgICAgICAgICAgICByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShkLmlkLCBpZCA9PiBtLm5hbWVzcGFjZS5zZXQoaWQubmFtZSwgY2FwdHVyZURvYyhkLCBuKSkpKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG4uc3BlY2lmaWVycy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZXhwb3J0TWV0YSA9IHt9XG4gICAgICAgICAgbGV0IGxvY2FsXG5cbiAgICAgICAgICBzd2l0Y2ggKHMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcic6XG4gICAgICAgICAgICAgIGlmICghbi5zb3VyY2UpIHJldHVyblxuICAgICAgICAgICAgICBsb2NhbCA9ICdkZWZhdWx0J1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnRXhwb3J0TmFtZXNwYWNlU3BlY2lmaWVyJzpcbiAgICAgICAgICAgICAgbS5uYW1lc3BhY2Uuc2V0KHMuZXhwb3J0ZWQubmFtZSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydE1ldGEsICduYW1lc3BhY2UnLCB7XG4gICAgICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gcmVzb2x2ZUltcG9ydChuKSB9LFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjYXNlICdFeHBvcnRTcGVjaWZpZXInOlxuICAgICAgICAgICAgICBpZiAoIW4uc291cmNlKSB7XG4gICAgICAgICAgICAgICAgbS5uYW1lc3BhY2Uuc2V0KHMuZXhwb3J0ZWQubmFtZSwgYWRkTmFtZXNwYWNlKGV4cG9ydE1ldGEsIHMubG9jYWwpKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGVsc2UgZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9jYWwgPSBzLmxvY2FsLm5hbWVcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB0b2RvOiBKU0RvY1xuICAgICAgICAgIG0ucmVleHBvcnRzLnNldChzLmV4cG9ydGVkLm5hbWUsIHsgbG9jYWwsIGdldEltcG9ydDogKCkgPT4gcmVzb2x2ZUltcG9ydChuKSB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gbVxuICB9XG5cbiAgLyoqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IGNoZWNrIGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWQgbmFtZXMgZm9yIGV4aXN0ZW5jZVxuICAgKiBpbiB0aGUgYmFzZSBuYW1lc3BhY2UsIGJ1dCBpdCB3aWxsIGV4cGFuZCBhbGwgYGV4cG9ydCAqIGZyb20gJy4uLidgIGV4cG9ydHNcbiAgICogaWYgbm90IGZvdW5kIGluIHRoZSBleHBsaWNpdCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIG5hbWVcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgbmFtZWAgaXMgZXhwb3J0ZWQgYnkgdGhpcyBtb2R1bGUuXG4gICAqL1xuICBoYXMobmFtZSkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZS5oYXMobmFtZSkpIHJldHVybiB0cnVlXG4gICAgaWYgKHRoaXMucmVleHBvcnRzLmhhcyhuYW1lKSkgcmV0dXJuIHRydWVcblxuICAgIC8vIGRlZmF1bHQgZXhwb3J0cyBtdXN0IGJlIGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWQgKCMzMjgpXG4gICAgaWYgKG5hbWUgIT09ICdkZWZhdWx0Jykge1xuICAgICAgZm9yIChsZXQgZGVwIG9mIHRoaXMuZGVwZW5kZW5jaWVzLnZhbHVlcygpKSB7XG4gICAgICAgIGxldCBpbm5lck1hcCA9IGRlcCgpXG5cbiAgICAgICAgLy8gdG9kbzogcmVwb3J0IGFzIHVucmVzb2x2ZWQ/XG4gICAgICAgIGlmICghaW5uZXJNYXApIGNvbnRpbnVlXG5cbiAgICAgICAgaWYgKGlubmVyTWFwLmhhcyhuYW1lKSkgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBlbnN1cmUgdGhhdCBpbXBvcnRlZCBuYW1lIGZ1bGx5IHJlc29sdmVzLlxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICBuYW1lIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBoYXNEZWVwKG5hbWUpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2UuaGFzKG5hbWUpKSByZXR1cm4geyBmb3VuZDogdHJ1ZSwgcGF0aDogW3RoaXNdIH1cblxuICAgIGlmICh0aGlzLnJlZXhwb3J0cy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHsgbG9jYWwsIGdldEltcG9ydCB9ID0gdGhpcy5yZWV4cG9ydHMuZ2V0KG5hbWUpXG4gICAgICAgICAgLCBpbXBvcnRlZCA9IGdldEltcG9ydCgpXG5cbiAgICAgIC8vIGlmIGltcG9ydCBpcyBpZ25vcmVkLCByZXR1cm4gZXhwbGljaXQgJ251bGwnXG4gICAgICBpZiAoaW1wb3J0ZWQgPT0gbnVsbCkgcmV0dXJuIHsgZm91bmQ6IHRydWUsIHBhdGg6IFt0aGlzXSB9XG5cbiAgICAgIC8vIHNhZmVndWFyZCBhZ2FpbnN0IGN5Y2xlcywgb25seSBpZiBuYW1lIG1hdGNoZXNcbiAgICAgIGlmIChpbXBvcnRlZC5wYXRoID09PSB0aGlzLnBhdGggJiYgbG9jYWwgPT09IG5hbWUpIHJldHVybiB7IGZvdW5kOiBmYWxzZSwgcGF0aDogW3RoaXNdIH1cblxuICAgICAgY29uc3QgZGVlcCA9IGltcG9ydGVkLmhhc0RlZXAobG9jYWwpXG4gICAgICBkZWVwLnBhdGgudW5zaGlmdCh0aGlzKVxuXG4gICAgICByZXR1cm4gZGVlcFxuICAgIH1cblxuXG4gICAgLy8gZGVmYXVsdCBleHBvcnRzIG11c3QgYmUgZXhwbGljaXRseSByZS1leHBvcnRlZCAoIzMyOClcbiAgICBpZiAobmFtZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBmb3IgKGxldCBkZXAgb2YgdGhpcy5kZXBlbmRlbmNpZXMudmFsdWVzKCkpIHtcbiAgICAgICAgbGV0IGlubmVyTWFwID0gZGVwKClcbiAgICAgICAgLy8gdG9kbzogcmVwb3J0IGFzIHVucmVzb2x2ZWQ/XG4gICAgICAgIGlmICghaW5uZXJNYXApIGNvbnRpbnVlXG5cbiAgICAgICAgLy8gc2FmZWd1YXJkIGFnYWluc3QgY3ljbGVzXG4gICAgICAgIGlmIChpbm5lck1hcC5wYXRoID09PSB0aGlzLnBhdGgpIGNvbnRpbnVlXG5cbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbm5lck1hcC5oYXNEZWVwKG5hbWUpXG4gICAgICAgIGlmIChpbm5lclZhbHVlLmZvdW5kKSB7XG4gICAgICAgICAgaW5uZXJWYWx1ZS5wYXRoLnVuc2hpZnQodGhpcylcbiAgICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZm91bmQ6IGZhbHNlLCBwYXRoOiBbdGhpc10gfVxuICB9XG5cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2UuaGFzKG5hbWUpKSByZXR1cm4gdGhpcy5uYW1lc3BhY2UuZ2V0KG5hbWUpXG5cbiAgICBpZiAodGhpcy5yZWV4cG9ydHMuaGFzKG5hbWUpKSB7XG4gICAgICBjb25zdCB7IGxvY2FsLCBnZXRJbXBvcnQgfSA9IHRoaXMucmVleHBvcnRzLmdldChuYW1lKVxuICAgICAgICAgICwgaW1wb3J0ZWQgPSBnZXRJbXBvcnQoKVxuXG4gICAgICAvLyBpZiBpbXBvcnQgaXMgaWdub3JlZCwgcmV0dXJuIGV4cGxpY2l0ICdudWxsJ1xuICAgICAgaWYgKGltcG9ydGVkID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgICAgIC8vIHNhZmVndWFyZCBhZ2FpbnN0IGN5Y2xlcywgb25seSBpZiBuYW1lIG1hdGNoZXNcbiAgICAgIGlmIChpbXBvcnRlZC5wYXRoID09PSB0aGlzLnBhdGggJiYgbG9jYWwgPT09IG5hbWUpIHJldHVybiB1bmRlZmluZWRcblxuICAgICAgcmV0dXJuIGltcG9ydGVkLmdldChsb2NhbClcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0IGV4cG9ydHMgbXVzdCBiZSBleHBsaWNpdGx5IHJlLWV4cG9ydGVkICgjMzI4KVxuICAgIGlmIChuYW1lICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIGZvciAobGV0IGRlcCBvZiB0aGlzLmRlcGVuZGVuY2llcy52YWx1ZXMoKSkge1xuICAgICAgICBsZXQgaW5uZXJNYXAgPSBkZXAoKVxuICAgICAgICAvLyB0b2RvOiByZXBvcnQgYXMgdW5yZXNvbHZlZD9cbiAgICAgICAgaWYgKCFpbm5lck1hcCkgY29udGludWVcblxuICAgICAgICAvLyBzYWZlZ3VhcmQgYWdhaW5zdCBjeWNsZXNcbiAgICAgICAgaWYgKGlubmVyTWFwLnBhdGggPT09IHRoaXMucGF0aCkgY29udGludWVcblxuICAgICAgICBsZXQgaW5uZXJWYWx1ZSA9IGlubmVyTWFwLmdldChuYW1lKVxuICAgICAgICBpZiAoaW5uZXJWYWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5uZXJWYWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB0aGlzLm5hbWVzcGFjZS5mb3JFYWNoKCh2LCBuKSA9PlxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2LCBuLCB0aGlzKSlcblxuICAgIHRoaXMucmVleHBvcnRzLmZvckVhY2goKHsgZ2V0SW1wb3J0LCBsb2NhbCB9LCBuYW1lKSA9PlxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBnZXRJbXBvcnQoKS5nZXQobG9jYWwpLCBuYW1lLCB0aGlzKSlcblxuICAgIHRoaXMuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwID0+IGRlcCgpLmZvckVhY2goKHYsIG4pID0+XG4gICAgICBuICE9PSAnZGVmYXVsdCcgJiYgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2LCBuLCB0aGlzKSkpXG4gIH1cblxuICAvLyB0b2RvOiBrZXlzLCB2YWx1ZXMsIGVudHJpZXM/XG5cbiAgcmVwb3J0RXJyb3JzKGNvbnRleHQsIGRlY2xhcmF0aW9uKSB7XG4gICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgbm9kZTogZGVjbGFyYXRpb24uc291cmNlLFxuICAgICAgbWVzc2FnZTogYFBhcnNlIGVycm9ycyBpbiBpbXBvcnRlZCBtb2R1bGUgJyR7ZGVjbGFyYXRpb24uc291cmNlLnZhbHVlfSc6IGAgK1xuICAgICAgICAgICAgICAgICAgYCR7dGhpcy5lcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZSA9PiBgJHtlLm1lc3NhZ2V9ICgke2UubGluZU51bWJlcn06JHtlLmNvbHVtbn0pYClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcsICcpfWAsXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIHBhcnNlIEpTRG9jIGZyb20gdGhlIGZpcnN0IG5vZGUgdGhhdCBoYXMgbGVhZGluZyBjb21tZW50c1xuICogQHBhcmFtICB7Li4uW3R5cGVdfSBub2RlcyBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHt7ZG9jOiBvYmplY3R9fVxuICovXG5mdW5jdGlvbiBjYXB0dXJlRG9jKC4uLm5vZGVzKSB7XG4gIGNvbnN0IG1ldGFkYXRhID0ge31cblxuICAvLyAnc29tZScgc2hvcnQtY2lyY3VpdHMgb24gZmlyc3QgJ3RydWUnXG4gIG5vZGVzLnNvbWUobiA9PiB7XG4gICAgaWYgKCFuLmxlYWRpbmdDb21tZW50cykgcmV0dXJuIGZhbHNlXG5cbiAgICAvLyBjYXB0dXJlIFhTRG9jXG4gICAgbi5sZWFkaW5nQ29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgIC8vIHNraXAgbm9uLWJsb2NrIGNvbW1lbnRzXG4gICAgICBpZiAoY29tbWVudC52YWx1ZS5zbGljZSgwLCA0KSAhPT0gJypcXG4gKicpIHJldHVyblxuICAgICAgdHJ5IHtcbiAgICAgICAgbWV0YWRhdGEuZG9jID0gZG9jdHJpbmUucGFyc2UoY29tbWVudC52YWx1ZSwgeyB1bndyYXA6IHRydWUgfSlcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvKiBkb24ndCBjYXJlLCBmb3Igbm93PyBtYXliZSBhZGQgdG8gYGVycm9ycz9gICovXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9KVxuXG4gIHJldHVybiBtZXRhZGF0YVxufVxuXG4vKipcbiAqIFRyYXZlcnNlIGEgcGF0dGVybi9pZGVudGlmaWVyIG5vZGUsIGNhbGxpbmcgJ2NhbGxiYWNrJ1xuICogZm9yIGVhY2ggbGVhZiBpZGVudGlmaWVyLlxuICogQHBhcmFtICB7bm9kZX0gICBwYXR0ZXJuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShwYXR0ZXJuLCBjYWxsYmFjaykge1xuICBzd2l0Y2ggKHBhdHRlcm4udHlwZSkge1xuICAgIGNhc2UgJ0lkZW50aWZpZXInOiAvLyBiYXNlIGNhc2VcbiAgICAgIGNhbGxiYWNrKHBhdHRlcm4pXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnT2JqZWN0UGF0dGVybic6XG4gICAgICBwYXR0ZXJuLnByb3BlcnRpZXMuZm9yRWFjaCgoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKHZhbHVlLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQXJyYXlQYXR0ZXJuJzpcbiAgICAgIHBhdHRlcm4uZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgcmVjdXJzaXZlUGF0dGVybkNhcHR1cmUoZWxlbWVudCwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgfVxufVxuIl19