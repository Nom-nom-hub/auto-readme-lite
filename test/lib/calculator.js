/**
 * Calculator module with various mathematical operations.
 * Demonstrates different export patterns for testing.
 */

/**
 * Calculator class for basic mathematical operations.
 * @class Calculator
 */
class Calculator {
  /**
   * Creates a new Calculator instance.
   * @constructor
   */
  constructor() {
    this.history = [];
  }

  /**
   * Adds two numbers.
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The sum of a and b
   */
  add(a, b) {
    const result = a + b;
    this.history.push(`add(${a}, ${b}) = ${result}`);
    return result;
  }

  /**
   * Multiplies two numbers.
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The product of a and b
   */
  multiply(a, b) {
    const result = a * b;
    this.history.push(`multiply(${a}, ${b}) = ${result}`);
    return result;
  }

  /**
   * Gets the calculation history.
   * @returns {Array<string>} Array of calculation strings
   */
  getHistory() {
    return this.history;
  }
}

/**
 * Database manager for storing calculation results.
 * @class DatabaseManager
 */
class DatabaseManager {
  constructor() {
    this.data = new Map();
  }

  /**
   * Stores a calculation result.
   * @param {string} key - The calculation key
   * @param {any} value - The result value
   */
  store(key, value) {
    this.data.set(key, value);
  }

  /**
   * Retrieves a stored value.
   * @param {string} key - The key to retrieve
   * @returns {any} The stored value or undefined
   */
  retrieve(key) {
    return this.data.get(key);
  }
}

// Function exports
/**
 * Creates a new calculator instance.
 * @returns {Calculator} A new Calculator instance
 */
function createCalculator() {
  return new Calculator();
}

/**
 * Performs a quick addition.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum
 */
function quickAdd(a, b) {
  return a + b;
}

// Shorthand exports (for testing)
const add = quickAdd;
const multiply = (a, b) => a * b;

// Export everything
module.exports = {
  Calculator,
  DatabaseManager,
  createCalculator,
  quickAdd,
  add,
  multiply
}; 