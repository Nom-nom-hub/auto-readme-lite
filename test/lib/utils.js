/**
 * Utility functions for data processing and validation.
 */

/**
 * Processes data from a file.
 * @param {string} filePath - Path to the input file
 * @param {string} [outputPath] - Optional output file path
 * @returns {Promise<Object>} Processing result with status and data
 */
async function processData(filePath, outputPath = null) {
  try {
    // Simulate file processing
    const data = await readFile(filePath);
    const processed = transformData(data);
    
    if (outputPath) {
      await writeFile(outputPath, processed);
    }
    
    return {
      status: 'success',
      data: processed,
      outputPath
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Validates input data.
 * @param {any} input - Input data to validate
 * @param {Object} schema - Validation schema
 * @returns {boolean} True if valid, false otherwise
 */
function validateInput(input, schema) {
  if (!input || !schema) {
    return false;
  }
  
  // Simple validation logic
  for (const [key, rules] of Object.entries(schema)) {
    if (rules.required && !input[key]) {
      return false;
    }
    if (rules.type && typeof input[key] !== rules.type) {
      return false;
    }
  }
  
  return true;
}

/**
 * Formats a date string.
 * @param {Date|string} date - Date to format
 * @param {string} [format='YYYY-MM-DD'] - Format string
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Generates a random ID.
 * @param {number} [length=8] - Length of the ID
 * @returns {string} Random ID string
 */
function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper functions (not exported)
async function readFile(path) {
  // Simulate file reading
  return { content: 'test data', size: 1024 };
}

async function writeFile(path, data) {
  // Simulate file writing
  return { success: true, path };
}

function transformData(data) {
  // Simulate data transformation
  return { ...data, transformed: true, timestamp: Date.now() };
}

// Export functions
module.exports = {
  processData,
  validateInput,
  formatDate,
  generateId
}; 