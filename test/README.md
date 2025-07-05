# Test Project for auto-readme-lite

This is a test project to verify that the auto-readme-lite tool works correctly.

## Overview

This project contains various JavaScript and TypeScript files with different export patterns, CLI commands, and package.json scripts to test all features of the auto-readme-lite tool.

## Features

- Multiple export patterns (CommonJS, ES modules, shorthand)
- CLI commands using Commander.js and Yargs
- TypeScript interfaces and types
- JSDoc comments with parameters and return types
- Various npm scripts

## Installation

```bash
npm install
```

## Usage

```bash
# Start the application
npm start

# Run tests
npm test

# Build the project
npm run build
```

<!-- auto-readme:api:start -->
## API Reference

### `default`

**Type:** FunctionDeclaration

**File:** `edge-types.ts`

**Returns:** `string`

---

### `complexParams`

**Type:** FunctionDeclaration

**File:** `edge-types.ts`

**Parameters:**
- `{a, b}` ({ a: number; b: number; })
- `args` (string[])

**Returns:** `[number, number, string[]]`

---

### `Status`

**Type:** EnumDeclaration

**File:** `edge-types.ts`

**Description:**
```
TypeScript edge cases for auto-readme-lite.
```

---

### `Point`

**Type:** TypeAliasDeclaration

**File:** `edge-types.ts`

---

### `main`

**Type:** FunctionDeclaration

**File:** `index.js`

**Returns:** `void`

---

### `Application`

**Type:** ClassDeclaration

**File:** `index.js`

---

### `main`

**Type:** Function

**File:** `index.js`

---

### `Application`

**Type:** Function

**File:** `index.js`

---

### `Calculator`

**Type:** Function

**File:** `index.js`

---

### `DatabaseManager`

**Type:** Function

**File:** `index.js`

---

### `processData`

**Type:** Function

**File:** `index.js`

---

### `validateInput`

**Type:** Function

**File:** `index.js`

---

### `startServer`

**Type:** Function

**File:** `index.js`

---

### `stopServer`

**Type:** Function

**File:** `index.js`

---

### `Calculator`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `DatabaseManager`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `createCalculator`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `quickAdd`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `add`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `multiply`

**Type:** ShorthandPropertyAssignment

**File:** `lib\calculator.js`

---

### `Calculator`

**Type:** Function

**File:** `lib\calculator.js`

---

### `DatabaseManager`

**Type:** Function

**File:** `lib\calculator.js`

---

### `createCalculator`

**Type:** Function

**File:** `lib\calculator.js`

**Description:**
```
 Function exports
*
 * Creates a new calculator instance.
 * @returns {Calculator} A new Calculator instance
 
```

---

### `quickAdd`

**Type:** Function

**File:** `lib\calculator.js`

**Parameters:**
- `a` (any)
- `b` (any)

**Description:**
```
*
 * Performs a quick addition.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum
 
```

---

### `add`

**Type:** Function

**File:** `lib\calculator.js`

---

### `multiply`

**Type:** Function

**File:** `lib\calculator.js`

**Parameters:**
- `a` (any)
- `b` (any)

---

### `defaultExport`

**Type:** Function

**File:** `lib\edge-cases.js`

---

### `anonymous`

**Type:** Function

**File:** `lib\edge-cases.js`

---

### `asyncFunc`

**Type:** Function

**File:** `lib\edge-cases.js`

**Parameters:**
- `url` (any)

---

### `genFunc`

**Type:** Function

**File:** `lib\edge-cases.js`

---

### `restDestructured`

**Type:** Function

**File:** `lib\edge-cases.js`

**Parameters:**
- `undefined` (any)
- `undefined` (any)

---

### `startServer`

**Type:** ShorthandPropertyAssignment

**File:** `lib\server.js`

---

### `stopServer`

**Type:** ShorthandPropertyAssignment

**File:** `lib\server.js`

---

### `getServerStatus`

**Type:** ShorthandPropertyAssignment

**File:** `lib\server.js`

---

### `restartServer`

**Type:** ShorthandPropertyAssignment

**File:** `lib\server.js`

---

### `startServer`

**Type:** Function

**File:** `lib\server.js`

**Parameters:**
- `undefined` (any)

**Description:**
```
*
 * Starts the server on the specified port.
 * @param {number} port - Port number to start the server on
 * @returns {Promise<Object>} Server start result
 
```

---

### `stopServer`

**Type:** Function

**File:** `lib\server.js`

**Description:**
```
*
 * Stops the running server.
 * @returns {Promise<Object>} Server stop result
 
```

---

### `getServerStatus`

**Type:** Function

**File:** `lib\server.js`

**Description:**
```
*
 * Gets the current server status.
 * @returns {Object|null} Server status or null if not running
 
```

---

### `restartServer`

**Type:** Function

**File:** `lib\server.js`

**Parameters:**
- `undefined` (any)

**Description:**
```
*
 * Restarts the server.
 * @param {number} port - Port to restart on
 * @returns {Promise<Object>} Restart result
 
```

---

### `processData`

**Type:** ShorthandPropertyAssignment

**File:** `lib\utils.js`

---

### `validateInput`

**Type:** ShorthandPropertyAssignment

**File:** `lib\utils.js`

---

### `formatDate`

**Type:** ShorthandPropertyAssignment

**File:** `lib\utils.js`

---

### `generateId`

**Type:** ShorthandPropertyAssignment

**File:** `lib\utils.js`

---

### `processData`

**Type:** Function

**File:** `lib\utils.js`

**Parameters:**
- `filePath` (any)
- `undefined` (any)

**Description:**
```
*
 * Utility functions for data processing and validation.
 
*
 * Processes data from a file.
 * @param {string} filePath - Path to the input file
 * @param {string} [outputPath] - Optional output file path
 * @returns {Promise<Object>} Processing result with status and data
 
```

---

### `validateInput`

**Type:** Function

**File:** `lib\utils.js`

**Parameters:**
- `input` (any)
- `schema` (any)

**Description:**
```
*
 * Validates input data.
 * @param {any} input - Input data to validate
 * @param {Object} schema - Validation schema
 * @returns {boolean} True if valid, false otherwise
 
```

---

### `formatDate`

**Type:** Function

**File:** `lib\utils.js`

**Parameters:**
- `date` (any)
- `undefined` (any)

**Description:**
```
*
 * Formats a date string.
 * @param {Date|string} date - Date to format
 * @param {string} [format='YYYY-MM-DD'] - Format string
 * @returns {string} Formatted date string
 
```

---

### `generateId`

**Type:** Function

**File:** `lib\utils.js`

**Parameters:**
- `undefined` (any)

**Description:**
```
*
 * Generates a random ID.
 * @param {number} [length=8] - Length of the ID
 * @returns {string} Random ID string
 
```

---

### `createUser`

**Type:** FunctionDeclaration

**File:** `types.ts`

**Parameters:**
- `name` (string)
- `email` (string)
- `age` (number)

**Returns:** `Promise<import("C:/Users/Kaiden/Desktop/auto-readme-lite/test/types").User>`

**Description:**
```
Creates a new user.
```

---

### `validateUser`

**Type:** FunctionDeclaration

**File:** `types.ts`

**Parameters:**
- `user` (import("C:/Users/Kaiden/Desktop/auto-readme-lite/test/types").User)

**Returns:** `boolean`

**Description:**
```
Validates user data.
```

---

### `User`

**Type:** InterfaceDeclaration

**File:** `types.ts`

**Description:**
```
TypeScript interfaces and types for testing.
User interface for testing TypeScript support.
```

---

### `Config`

**Type:** InterfaceDeclaration

**File:** `types.ts`

**Description:**
```
Configuration interface.
```

---

### `ApiResponse`

**Type:** InterfaceDeclaration

**File:** `types.ts`

**Description:**
```
API response interface.
```

---

### `defaultConfig`

**Type:** VariableDeclaration

**File:** `types.ts`

---

### `UserId`

**Type:** TypeAliasDeclaration

**File:** `types.ts`

---

### `Email`

**Type:** TypeAliasDeclaration

**File:** `types.ts`

---


<!-- auto-readme:api:end -->

<!-- auto-readme:cli:start -->

<!-- auto-readme:cli:end -->

<!-- auto-readme:scripts:start -->

<!-- auto-readme:scripts:end -->

<!-- auto-readme:changelog:start -->

<!-- auto-readme:changelog:end --> 