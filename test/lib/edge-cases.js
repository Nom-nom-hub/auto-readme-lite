/**
 * Edge case exports for auto-readme-lite testing.
 */

// Default export (CommonJS)
module.exports = function defaultExportedFunction() {
  return 'I am the default export!';
};

// Default export (ESM style)
exports.default = () => 'I am also a default export!';

// Anonymous function export
exports.anonymous = function() {
  return 'I am anonymous!';
};

// Arrow function export
exports.arrowFunc = (x, y = 2) => x + y;

// Exported constant
exports.MY_CONSTANT = 42;

// Exported object with nested functions
exports.nested = {
  innerFunc: function(a, b) { return a * b; },
  innerArrow: (a, b) => a - b
};

// Exported async function
exports.asyncFunc = async function fetchData(url) {
  return await Promise.resolve('data from ' + url);
};

// Exported generator function
exports.genFunc = function* generator() {
  yield 1;
  yield 2;
};

// Exported function with rest and destructured params
exports.restDestructured = function({a, b}, ...args) {
  return [a, b, ...args];
};

// Exported variable (let/const)
const exportedVar = 'I am exported!';
exports.exportedVar = exportedVar;

// File with only comments (should be skipped)
// (This file is not exported, just for edge case)
//
// This is a comment-only file.

// File with syntax error (should be skipped gracefully)
// (Created as test/lib/syntax-error.js) 