'use strict';

module.exports = function (context) {
  var namedExportCount = 0;
  var specifierExportCount = 0;
  var hasDefaultExport = false;
  var namedExportNode = null;
  return {
    'ExportSpecifier': function ExportSpecifier(node) {
      if (node.exported.name === 'default') {
        hasDefaultExport = true;
      } else {
        specifierExportCount++;
        namedExportNode = node;
      }
    },
    'ExportNamedDeclaration': function ExportNamedDeclaration(node) {
      namedExportCount++;
      namedExportNode = node;
    },
    'ExportDefaultDeclaration': function ExportDefaultDeclaration() {
      hasDefaultExport = true;
    },

    'Program:exit': function ProgramExit() {
      if (namedExportCount === 1 && specifierExportCount < 2 && !hasDefaultExport) {
        context.report(namedExportNode, 'Prefer default export.');
      }
    }
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3ByZWZlci1kZWZhdWx0LWV4cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsVUFBUyxPQUFULEVBQWtCO0FBQ2pDLE1BQUksbUJBQW1CLENBQXZCO0FBQ0EsTUFBSSx1QkFBdUIsQ0FBM0I7QUFDQSxNQUFJLG1CQUFtQixLQUF2QjtBQUNBLE1BQUksa0JBQWtCLElBQXRCO0FBQ0EsU0FBTztBQUNMLHVCQUFtQix5QkFBUyxJQUFULEVBQWU7QUFDaEMsVUFBSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLEtBQXVCLFNBQTNCLEVBQXNDO0FBQ3BDLDJCQUFtQixJQUFuQjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0EsMEJBQWtCLElBQWxCO0FBQ0Q7QUFDRixLQVJJO0FBU0wsOEJBQTBCLGdDQUFTLElBQVQsRUFBZTtBQUN2QztBQUNBLHdCQUFrQixJQUFsQjtBQUNELEtBWkk7QUFhTCxnQ0FBNEIsb0NBQVc7QUFDckMseUJBQW1CLElBQW5CO0FBQ0QsS0FmSTs7QUFpQkwsb0JBQWdCLHVCQUFXO0FBQ3pCLFVBQUkscUJBQXFCLENBQXJCLElBQTJCLHVCQUF1QixDQUFsRCxJQUF1RCxDQUFDLGdCQUE1RCxFQUE4RTtBQUM1RSxnQkFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyx3QkFBaEM7QUFDRDtBQUNGO0FBckJJLEdBQVA7QUF1QkQsQ0E1QkQiLCJmaWxlIjoicnVsZXMvcHJlZmVyLWRlZmF1bHQtZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBsZXQgbmFtZWRFeHBvcnRDb3VudCA9IDBcbiAgbGV0IHNwZWNpZmllckV4cG9ydENvdW50ID0gMFxuICBsZXQgaGFzRGVmYXVsdEV4cG9ydCA9IGZhbHNlXG4gIGxldCBuYW1lZEV4cG9ydE5vZGUgPSBudWxsXG4gIHJldHVybiB7XG4gICAgJ0V4cG9ydFNwZWNpZmllcic6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmV4cG9ydGVkLm5hbWUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICBoYXNEZWZhdWx0RXhwb3J0ID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BlY2lmaWVyRXhwb3J0Q291bnQrK1xuICAgICAgICBuYW1lZEV4cG9ydE5vZGUgPSBub2RlXG4gICAgICB9XG4gICAgfSxcbiAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5hbWVkRXhwb3J0Q291bnQrK1xuICAgICAgbmFtZWRFeHBvcnROb2RlID0gbm9kZVxuICAgIH0sXG4gICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgaGFzRGVmYXVsdEV4cG9ydCA9IHRydWVcbiAgICB9LFxuXG4gICAgJ1Byb2dyYW06ZXhpdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG5hbWVkRXhwb3J0Q291bnQgPT09IDEgJiYgIHNwZWNpZmllckV4cG9ydENvdW50IDwgMiAmJiAhaGFzRGVmYXVsdEV4cG9ydCkge1xuICAgICAgICBjb250ZXh0LnJlcG9ydChuYW1lZEV4cG9ydE5vZGUsICdQcmVmZXIgZGVmYXVsdCBleHBvcnQuJylcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iXX0=