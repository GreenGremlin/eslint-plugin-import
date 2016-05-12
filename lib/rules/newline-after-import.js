'use strict';

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function getLineDifference(node, nextToken) {
  return nextToken.loc.start.line - node.loc.start.line;
} /**
   * @fileoverview Rule to enforce new line after import not followed by another import.
   * @author Radek Benkel
   */

function ensureNoForbiddenKeyword(context, node, tokenToInspect, tokenValue) {
  if (!tokenToInspect) {
    return;
  }

  if (getLineDifference(node, tokenToInspect) === 1 && tokenToInspect.type === 'Keyword' && tokenToInspect.value !== tokenValue) {
    context.report({
      loc: tokenToInspect.loc.start,
      message: 'Expected empty line after ' + tokenValue + ' statement not followed by another ' + tokenValue + '.'
    });
  }
}

module.exports = function (context) {
  return {
    ImportDeclaration: function ImportDeclaration(node) {
      var nextToken = context.getSourceCode(node).getTokenAfter(node);

      ensureNoForbiddenKeyword(context, node, nextToken, 'import');
    },
    CallExpression: function CallExpression(node) {
      if ((0, _staticRequire2.default)(node)) {
        var nextTokens = context.getSourceCode(node).getTokensAfter(node, 2);
        var tokenToInspect = nextTokens.length > 1 && nextTokens[0].type === 'Punctuator' ? nextTokens[1] : nextTokens[0];

        ensureNoForbiddenKeyword(context, node, tokenToInspect, 'require');
      }
    }
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25ld2xpbmUtYWZ0ZXItaW1wb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7Ozs7Ozs7QUFNQSxTQUFTLGlCQUFULENBQTJCLElBQTNCLEVBQWlDLFNBQWpDLEVBQTRDO0FBQzFDLFNBQU8sVUFBVSxHQUFWLENBQWMsS0FBZCxDQUFvQixJQUFwQixHQUEyQixLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsSUFBakQ7QUFDRCxDOzs7OztBQUVELFNBQVMsd0JBQVQsQ0FBa0MsT0FBbEMsRUFBMkMsSUFBM0MsRUFBaUQsY0FBakQsRUFBaUUsVUFBakUsRUFBNkU7QUFDM0UsTUFBSSxDQUFDLGNBQUwsRUFBcUI7QUFDbkI7QUFDRDs7QUFFRCxNQUFJLGtCQUFrQixJQUFsQixFQUF3QixjQUF4QixNQUE0QyxDQUE1QyxJQUNDLGVBQWUsSUFBZixLQUF3QixTQUR6QixJQUNzQyxlQUFlLEtBQWYsS0FBeUIsVUFEbkUsRUFFQTtBQUNFLFlBQVEsTUFBUixDQUFlO0FBQ2IsV0FBSyxlQUFlLEdBQWYsQ0FBbUIsS0FEWDtBQUViLGVBQVMsK0JBQStCLFVBQS9CLEdBQ1AscUNBRE8sR0FDaUMsVUFEakMsR0FDOEM7QUFIMUMsS0FBZjtBQUtEO0FBQ0Y7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLFVBQVUsT0FBVixFQUFtQjtBQUNsQyxTQUFPO0FBQ0wsdUJBQW1CLDJCQUFVLElBQVYsRUFBZ0I7QUFDakMsVUFBTSxZQUFZLFFBQVEsYUFBUixDQUFzQixJQUF0QixFQUE0QixhQUE1QixDQUEwQyxJQUExQyxDQUFsQjs7QUFFQSwrQkFBeUIsT0FBekIsRUFBa0MsSUFBbEMsRUFBd0MsU0FBeEMsRUFBbUQsUUFBbkQ7QUFDRCxLQUxJO0FBTUwsb0JBQWdCLHdCQUFTLElBQVQsRUFBZTtBQUM3QixVQUFJLDZCQUFnQixJQUFoQixDQUFKLEVBQTJCO0FBQ3pCLFlBQU0sYUFBYSxRQUFRLGFBQVIsQ0FBc0IsSUFBdEIsRUFBNEIsY0FBNUIsQ0FBMkMsSUFBM0MsRUFBaUQsQ0FBakQsQ0FBbkI7QUFDQSxZQUFNLGlCQUFpQixXQUFXLE1BQVgsR0FBb0IsQ0FBcEIsSUFBeUIsV0FBVyxDQUFYLEVBQWMsSUFBZCxLQUF1QixZQUFoRCxHQUNuQixXQUFXLENBQVgsQ0FEbUIsR0FFbkIsV0FBVyxDQUFYLENBRko7O0FBSUEsaUNBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLGNBQXhDLEVBQXdELFNBQXhEO0FBQ0Q7QUFDRjtBQWZJLEdBQVA7QUFpQkQsQ0FsQkQiLCJmaWxlIjoicnVsZXMvbmV3bGluZS1hZnRlci1pbXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUnVsZSB0byBlbmZvcmNlIG5ldyBsaW5lIGFmdGVyIGltcG9ydCBub3QgZm9sbG93ZWQgYnkgYW5vdGhlciBpbXBvcnQuXG4gKiBAYXV0aG9yIFJhZGVrIEJlbmtlbFxuICovXG5cbmltcG9ydCBpc1N0YXRpY1JlcXVpcmUgZnJvbSAnLi4vY29yZS9zdGF0aWNSZXF1aXJlJ1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBEZWZpbml0aW9uXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXRMaW5lRGlmZmVyZW5jZShub2RlLCBuZXh0VG9rZW4pIHtcbiAgcmV0dXJuIG5leHRUb2tlbi5sb2Muc3RhcnQubGluZSAtIG5vZGUubG9jLnN0YXJ0LmxpbmVcbn1cblxuZnVuY3Rpb24gZW5zdXJlTm9Gb3JiaWRkZW5LZXl3b3JkKGNvbnRleHQsIG5vZGUsIHRva2VuVG9JbnNwZWN0LCB0b2tlblZhbHVlKSB7XG4gIGlmICghdG9rZW5Ub0luc3BlY3QpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChnZXRMaW5lRGlmZmVyZW5jZShub2RlLCB0b2tlblRvSW5zcGVjdCkgPT09IDFcbiAgICAmJiB0b2tlblRvSW5zcGVjdC50eXBlID09PSAnS2V5d29yZCcgJiYgdG9rZW5Ub0luc3BlY3QudmFsdWUgIT09IHRva2VuVmFsdWUpXG4gIHtcbiAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICBsb2M6IHRva2VuVG9JbnNwZWN0LmxvYy5zdGFydCxcbiAgICAgIG1lc3NhZ2U6ICdFeHBlY3RlZCBlbXB0eSBsaW5lIGFmdGVyICcgKyB0b2tlblZhbHVlICtcbiAgICAgICAgJyBzdGF0ZW1lbnQgbm90IGZvbGxvd2VkIGJ5IGFub3RoZXIgJyArIHRva2VuVmFsdWUgKyAnLicsXG4gICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgSW1wb3J0RGVjbGFyYXRpb246IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBjb25zdCBuZXh0VG9rZW4gPSBjb250ZXh0LmdldFNvdXJjZUNvZGUobm9kZSkuZ2V0VG9rZW5BZnRlcihub2RlKVxuXG4gICAgICBlbnN1cmVOb0ZvcmJpZGRlbktleXdvcmQoY29udGV4dCwgbm9kZSwgbmV4dFRva2VuLCAnaW1wb3J0JylcbiAgICB9LFxuICAgIENhbGxFeHByZXNzaW9uOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAoaXNTdGF0aWNSZXF1aXJlKG5vZGUpKSB7XG4gICAgICAgIGNvbnN0IG5leHRUb2tlbnMgPSBjb250ZXh0LmdldFNvdXJjZUNvZGUobm9kZSkuZ2V0VG9rZW5zQWZ0ZXIobm9kZSwgMilcbiAgICAgICAgY29uc3QgdG9rZW5Ub0luc3BlY3QgPSBuZXh0VG9rZW5zLmxlbmd0aCA+IDEgJiYgbmV4dFRva2Vuc1swXS50eXBlID09PSAnUHVuY3R1YXRvcidcbiAgICAgICAgICA/IG5leHRUb2tlbnNbMV1cbiAgICAgICAgICA6IG5leHRUb2tlbnNbMF1cblxuICAgICAgICBlbnN1cmVOb0ZvcmJpZGRlbktleXdvcmQoY29udGV4dCwgbm9kZSwgdG9rZW5Ub0luc3BlY3QsICdyZXF1aXJlJylcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iXX0=