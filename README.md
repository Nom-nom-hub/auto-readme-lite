# 🚀 `auto-readme-lite`

A **fully offline** Node.js CLI tool that automatically generates and updates project README.md files using **static analysis** - no AI APIs, no internet required!

## **Core Philosophy**
- **100% Offline** - Works without any external API calls
- **Static Analysis** - Uses AST parsing to understand your code
- **Content Safe** - Never overwrites your custom README content
- **Universal** - Works with any JavaScript/TypeScript project

---

## **🔧 Technical Architecture**

### **File Structure**
```
auto-readme-lite/
├── bin/auto-readme-lite.js    # CLI entry point
├── lib/
│   ├── parser.js              # Static analysis engine
│   ├── readme-writer.js       # README generation
│   └── precommit.js           # Git hook setup
├── example/                   # Test project
├── package.json               # NPM metadata
└── README.md                  # Auto-generated docs
```

### **Key Dependencies**
- **`ts-morph`** - TypeScript/JavaScript AST parsing
- **`@babel/parser`** - CommonJS export detection
- **`@babel/traverse`** - AST traversal
- **`simple-git`** - Git operations
- **`chalk`** - Colored CLI output
- **`yargs`** - CLI argument parsing

---

## **🎯 Core Features**

### **1. Export Detection**
**Detects all exported functions, classes, and interfaces:**

**ES Modules:**
```javascript
export function foo() {}
export class Bar {}
export default function() {}
```

**CommonJS:**
```javascript
module.exports = { foo, bar }
module.exports = function() {}
exports.foo = function() {}
```

**Shorthand Syntax:**
```javascript
module.exports = { add, Greeter }
```

**Output:**
```markdown
## API Reference

### `startDripSystem`

**Type:** Function

**File:** `drip-booster.js`

---
```

### **2. CLI Command Extraction**
**Finds CLI commands from popular libraries:**

**Commander.js:**
```javascript
.command('add <a> <b>').description('Add two numbers')
```

**Yargs:**
```javascript
.command('name', 'description')
```

**Output:**
```markdown
## CLI Commands

- `add <a> <b>` - Add two numbers
```

### **3. Package.json Scripts**
**Lists all npm scripts:**

**Input:**
```json
{
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "tsc"
  }
}
```

**Output:**
```markdown
## Available Scripts

- `start` - node index.js
- `test` - jest
- `build` - tsc
```

### **4. Git Integration**
**Shows recent commit history:**

**Output:**
```markdown
## Recent Changes

- **`abc1234`** (2024-01-15) - feat: add new feature _by John Doe_
- **`def5678`** (2024-01-14) - fix: resolve bug _by Jane Smith_
```

**Fallback:** "No git repository found" if no git

---

## **🛡️ Safety Features**

### **Content Preservation**
- **Section Tags** - Uses `<!-- auto-readme:section:start -->` and `<!-- auto-readme:section:end -->`
- **Custom Content** - Never overwrites your manual content
- **Selective Updates** - Only updates specified sections

### **Smart File Filtering**
- **Excludes** `node_modules`, `.git`, `dist`, `build`, `.next`, `coverage`
- **Includes** `.js` and `.ts` files
- **Recursive scanning** - Finds files in subdirectories

### **Auto tsconfig.json Creation**
- **Creates minimal tsconfig.json** if one doesn't exist
- **Works on any project** - No TypeScript setup required
- **Universal compatibility** - Pure JS projects work too

---

## **📋 CLI Interface**

### **Basic Usage**
```bash
# Generate all sections
npx auto-readme-lite

# Preview only (no file changes)
npx auto-readme-lite --dry-run

# Specific sections only
npx auto-readme-lite --sections api,cli,scripts

# Different project directory
npx auto-readme-lite --dir ./my-project

# Watch mode (auto-update on changes)
npx auto-readme-lite --watch
```

### **Help Output**
```bash
Usage: auto-readme-lite [options]

Options:
  --dry-run     Preview README output without writing
  --watch       Watch mode (optional)
  --sections    Comma-separated sections to include (api,cli,scripts,git)
  --dir         Target project directory
  --help        Show help
```

---

## **🎨 Output Formatting**

### **Professional Markdown**
- **Clean headers** - `## API Reference`, `## CLI Commands`
- **Proper spacing** - Consistent formatting throughout
- **Code blocks** - JSDoc comments in code blocks
- **File paths** - Backticks around file names
- **Separators** - Clean dividers between sections

### **Example Output**
```markdown
## API Reference

### `startDripSystem`

**Type:** Function

**File:** `drip-booster.js`

**Parameters:**
- `config` (object) - Configuration object
- `options` (any) - Additional options

**Returns:** `Promise<void>`

**Description:**
```
Starts the drip system with the given configuration.
Handles all download sessions and statistics.
```

---
```

---

## **🚀 Advanced Features**

### **Pre-commit Hook Setup**
```bash
node lib/precommit.js
```
Installs a git hook that runs auto-readme-lite before each commit.

### **Watch Mode**
```bash
npx auto-readme-lite --watch
```
Automatically re-runs when files change.

### **Section Control**
```bash
# Only API documentation
npx auto-readme-lite --sections api

# Only CLI and scripts
npx auto-readme-lite --sections cli,scripts

# Everything except git
npx auto-readme-lite --sections api,cli,scripts
```

---

## **🔍 How It Works**

### **1. File Discovery**
- Recursively scans for `.js` and `.ts` files
- Excludes build directories and dependencies
- Creates tsconfig.json if needed

### **2. Static Analysis**
- **ES Modules** - Uses ts-morph for TypeScript/JavaScript parsing
- **CommonJS** - Uses Babel AST for export detection
- **CLI Commands** - Regex-based extraction with comment filtering
- **Package.json** - Direct JSON parsing

### **3. Content Generation**
- **Merges** ES module and CommonJS exports
- **Formats** output with proper markdown
- **Preserves** existing custom content
- **Updates** only auto-generated sections

### **4. File Writing**
- **Backup** - Safely updates README.md
- **Validation** - Ensures proper markdown structure
- **Error Handling** - Graceful fallbacks for missing files

---

## **🎯 Use Cases**

### **Perfect For:**
- **Open source projects** - Auto-document APIs
- **CLI tools** - Extract command documentation
- **Libraries** - Generate API reference
- **Monorepos** - Document multiple packages
- **Legacy projects** - Add documentation to existing code

### **Ideal Scenarios:**
- **No existing docs** - Start from scratch
- **Outdated docs** - Keep them current
- **Team projects** - Consistent documentation
- **CI/CD** - Automated doc updates

---

## **⚡ Performance**

### **Speed Optimizations**
- **Smart filtering** - Only scans relevant files
- **Efficient parsing** - Uses optimized AST traversal
- **Minimal dependencies** - Lightweight footprint
- **Fast execution** - Typically completes in seconds

### **Memory Usage**
- **Streaming** - Processes files one at a time
- **Cleanup** - Proper memory management
- **No caching** - Fresh analysis each run

---

## **🔧 Development & Testing**

### **Local Development**
```bash
# Install dependencies
npm install

# Test locally
node bin/auto-readme-lite.js --dry-run

# Test on example project
cd example && node ../bin/auto-readme-lite.js --dry-run
```

### **Testing Strategy**
- **Example project** - Pre-configured test case
- **Real projects** - Test on actual codebases
- **Edge cases** - Handle missing files, no exports, etc.

---

## **📦 Publishing Ready**

### **NPM Package**
```json
{
  "name": "auto-readme-lite",
  "version": "1.0.0",
  "bin": {
    "auto-readme-lite": "bin/auto-readme-lite.js"
  },
  "keywords": ["readme", "cli", "automation", "offline", "static-analysis"],
  "license": "MIT"
}
```

### **Installation**
```bash
# Global install
npm install -g auto-readme-lite

# Use anywhere
auto-readme-lite

# Or use with npx
npx auto-readme-lite
```

---

## **🌟 Unique Advantages**

### **1. 100% Offline**
- No API calls, no internet required
- Works in air-gapped environments
- No rate limits or costs

### **2. Content Safe**
- Never overwrites custom content
- Predictable behavior
- Safe for production use

### **3. Universal Compatibility**
- Works with ES modules and CommonJS
- Handles TypeScript and JavaScript
- Auto-creates required config files

### **4. Professional Output**
- Clean, readable markdown
- Proper formatting and structure
- Consistent styling

### **5. Developer Friendly**
- Clear CLI interface
- Helpful error messages
- Flexible configuration

---



<!-- auto-readme:cli:start -->
## CLI Commands

- `add <a> <b>` - Add two numbers
- `add <a> <b>` - Add two numbers
- `multiply <a> <b>` - Multiply two numbers
- `process <file>` - Process a data file
- `serve` - Start the server
- `stop` - Stop the server


<!-- auto-readme:cli:end -->
<!-- auto-readme:api:start -->
## API Reference

### `add`

**Type:** Function

**File:** `example/test.js`

**Parameters:**
- `a` (any)
- `b` (any)

**Description:**
```
*
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 
```

---

### `Greeter`

**Type:** Function

**File:** `example/test.js`

---

### `scanExports`

**Type:** ShorthandPropertyAssignment

**File:** `lib/parser.js`

---

### `extractCliCommands`

**Type:** ShorthandPropertyAssignment

**File:** `lib/parser.js`

---

### `extractScripts`

**Type:** ShorthandPropertyAssignment

**File:** `lib/parser.js`

---

### `getRecentCommits`

**Type:** ShorthandPropertyAssignment

**File:** `lib/parser.js`

---

### `scanExports`

**Type:** Function

**File:** `lib/parser.js`

**Parameters:**
- `dir` (any)

**Description:**
```
*
 * Scan exported functions, classes, and interfaces from .js/.ts files in a directory tree.
 * @param {string} dir - Directory to scan
 * @returns {Promise<Array>} - List of exported symbols with metadata
 
```

---

### `extractCliCommands`

**Type:** Function

**File:** `lib/parser.js`

**Parameters:**
- `dir` (any)

**Description:**
```
*
 * Extract CLI commands and options from files using commander or yargs (MVP: regex-based).
 * @param {string} dir - Directory to scan
 * @returns {Array} - List of CLI commands and options
 
```

---

### `extractScripts`

**Type:** Function

**File:** `lib/parser.js`

**Parameters:**
- `pkgPath` (any)

**Description:**
```
*
 * Extract scripts from package.json
 * @param {string} pkgPath - Path to package.json
 * @returns {Object} - Scripts object
 
```

---

### `getRecentCommits`

**Type:** Function

**File:** `lib/parser.js`

**Parameters:**
- `repoDir` (any)
- `undefined` (any)

**Description:**
```
*
 * Get recent git commits for changelog
 * @param {string} repoDir - Path to git repo
 * @param {number} count - Number of commits
 * @returns {Promise<Array>} - List of commit messages
 
```

---

### `setupPrecommitHook`

**Type:** Function

**File:** `lib/precommit.js`

---

### `updateReadme`

**Type:** ShorthandPropertyAssignment

**File:** `lib/readme-writer.js`

---

### `replaceSection`

**Type:** ShorthandPropertyAssignment

**File:** `lib/readme-writer.js`

---

### `updateReadme`

**Type:** Function

**File:** `lib/readme-writer.js`

**Parameters:**
- `readmePath` (any)
- `sections` (any)

**Description:**
```
*
 * Update README.md, replacing only auto-generated sections with :start/:end tags.
 * @param {string} readmePath - Path to README.md
 * @param {Object} sections - {cli, api, scripts, changelog}
 
```

---

### `replaceSection`

**Type:** Function

**File:** `lib/readme-writer.js`

**Parameters:**
- `content` (any)
- `section` (any)
- `replacement` (any)

**Description:**
```
*
 * Replace a section in the README between <!-- auto-readme:section:start --> and <!-- auto-readme:section:end --> tags.
 * @param {string} content
 * @param {string} section
 * @param {string} replacement
 * @returns {string}
 
```

---

### `default`

**Type:** FunctionDeclaration

**File:** `test/edge-types.ts`

**Returns:** `string`

---

### `complexParams`

**Type:** FunctionDeclaration

**File:** `test/edge-types.ts`

**Parameters:**
- `{a, b}` ({ a: number; b: number; })
- `args` (string[])

**Returns:** `[number, number, string[]]`

---

### `Status`

**Type:** EnumDeclaration

**File:** `test/edge-types.ts`

**Description:**
```
TypeScript edge cases for auto-readme-lite.
```

---

### `Point`

**Type:** TypeAliasDeclaration

**File:** `test/edge-types.ts`

---

### `main`

**Type:** FunctionDeclaration

**File:** `test/index.js`

**Returns:** `void`

---

### `Application`

**Type:** ClassDeclaration

**File:** `test/index.js`

---

### `main`

**Type:** Function

**File:** `test/index.js`

---

### `Application`

**Type:** Function

**File:** `test/index.js`

---

### `Calculator`

**Type:** Function

**File:** `test/index.js`

---

### `DatabaseManager`

**Type:** Function

**File:** `test/index.js`

---

### `processData`

**Type:** Function

**File:** `test/index.js`

---

### `validateInput`

**Type:** Function

**File:** `test/index.js`

---

### `startServer`

**Type:** Function

**File:** `test/index.js`

---

### `stopServer`

**Type:** Function

**File:** `test/index.js`

---

### `Calculator`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `DatabaseManager`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `createCalculator`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `quickAdd`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `add`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `multiply`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/calculator.js`

---

### `Calculator`

**Type:** Function

**File:** `test/lib/calculator.js`

---

### `DatabaseManager`

**Type:** Function

**File:** `test/lib/calculator.js`

---

### `createCalculator`

**Type:** Function

**File:** `test/lib/calculator.js`

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

**File:** `test/lib/calculator.js`

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

**File:** `test/lib/calculator.js`

---

### `multiply`

**Type:** Function

**File:** `test/lib/calculator.js`

**Parameters:**
- `a` (any)
- `b` (any)

---

### `defaultExport`

**Type:** Function

**File:** `test/lib/edge-cases.js`

---

### `anonymous`

**Type:** Function

**File:** `test/lib/edge-cases.js`

---

### `asyncFunc`

**Type:** Function

**File:** `test/lib/edge-cases.js`

**Parameters:**
- `url` (any)

---

### `genFunc`

**Type:** Function

**File:** `test/lib/edge-cases.js`

---

### `restDestructured`

**Type:** Function

**File:** `test/lib/edge-cases.js`

**Parameters:**
- `undefined` (any)
- `undefined` (any)

---

### `startServer`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/server.js`

---

### `stopServer`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/server.js`

---

### `getServerStatus`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/server.js`

---

### `restartServer`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/server.js`

---

### `startServer`

**Type:** Function

**File:** `test/lib/server.js`

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

**File:** `test/lib/server.js`

**Description:**
```
*
 * Stops the running server.
 * @returns {Promise<Object>} Server stop result
 
```

---

### `getServerStatus`

**Type:** Function

**File:** `test/lib/server.js`

**Description:**
```
*
 * Gets the current server status.
 * @returns {Object|null} Server status or null if not running
 
```

---

### `restartServer`

**Type:** Function

**File:** `test/lib/server.js`

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

**File:** `test/lib/utils.js`

---

### `validateInput`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/utils.js`

---

### `formatDate`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/utils.js`

---

### `generateId`

**Type:** ShorthandPropertyAssignment

**File:** `test/lib/utils.js`

---

### `processData`

**Type:** Function

**File:** `test/lib/utils.js`

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

**File:** `test/lib/utils.js`

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

**File:** `test/lib/utils.js`

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

**File:** `test/lib/utils.js`

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

**File:** `test/types.ts`

**Parameters:**
- `name` (string)
- `email` (string)
- `age` (number)

**Returns:** `Promise<import("/home/runner/work/auto-readme-lite/auto-readme-lite/test/types").User>`

**Description:**
```
Creates a new user.
```

---

### `validateUser`

**Type:** FunctionDeclaration

**File:** `test/types.ts`

**Parameters:**
- `user` (import("/home/runner/work/auto-readme-lite/auto-readme-lite/test/types").User)

**Returns:** `boolean`

**Description:**
```
Validates user data.
```

---

### `User`

**Type:** InterfaceDeclaration

**File:** `test/types.ts`

**Description:**
```
TypeScript interfaces and types for testing.
User interface for testing TypeScript support.
```

---

### `Config`

**Type:** InterfaceDeclaration

**File:** `test/types.ts`

**Description:**
```
Configuration interface.
```

---

### `ApiResponse`

**Type:** InterfaceDeclaration

**File:** `test/types.ts`

**Description:**
```
API response interface.
```

---

### `defaultConfig`

**Type:** VariableDeclaration

**File:** `test/types.ts`

---

### `UserId`

**Type:** TypeAliasDeclaration

**File:** `test/types.ts`

---

### `Email`

**Type:** TypeAliasDeclaration

**File:** `test/types.ts`

---


<!-- auto-readme:api:end -->
<!-- auto-readme:scripts:start -->
## Available Scripts

- `test` - node example/test.js
- `test:comprehensive` - node test/test-auto-readme.js
- `test:comprehensive:save` - node test/test-auto-readme.js --save
- `test:quick` - node test/run-tests.js


<!-- auto-readme:scripts:end -->
<!-- auto-readme:changelog:start -->

<!-- auto-readme:changelog:end --> 