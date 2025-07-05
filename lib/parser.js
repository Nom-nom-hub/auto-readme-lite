// parser.js - static analysis utilities for auto-readme-lite
const { Project } = require('ts-morph');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

/**
 * Recursively get all .js/.ts files in a directory, excluding node_modules and other build directories.
 * @param {string} dir
 * @returns {string[]}
 */
function getAllJsTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // Skip node_modules, .git, and other build directories
      if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build' || file === '.next' || file === 'coverage') {
        continue;
      }
      results = results.concat(getAllJsTsFiles(filePath));
    } else if (file.endsWith('.js') || file.endsWith('.ts')) {
      // Skip files in node_modules or other build directories
      if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
        results.push(filePath);
      }
    }
  }
  console.log(`Found ${results.length} JS/TS files:`, results.map(f => path.relative(dir, f)));
  return results;
}

/**
 * Parse CommonJS exports in a file using Babel AST.
 * @param {string} filePath
 * @returns {Array} - List of exported symbols
 */
function parseCommonJsExports(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = babelParser.parse(code, {
      sourceType: 'unambiguous',
      plugins: ['jsx', 'typescript'],
    });
  } catch (e) {
    return [];
  }
  const results = [];
  const functionMap = new Map(); // Store function definitions
  
  // First pass: collect all function declarations
  traverse(ast, {
    FunctionDeclaration(path) {
      const name = path.node.id?.name;
      if (name) {
        const params = path.node.params.map(p => ({ name: p.name, type: 'any' }));
        let jsDoc = '';
        if (path.node.leadingComments) {
          jsDoc = path.node.leadingComments.map(c => c.value).join('\n');
        }
        functionMap.set(name, { params, jsDoc, kind: 'Function' });
      }
    },
    VariableDeclarator(path) {
      if (path.node.init && (path.node.init.type === 'FunctionExpression' || path.node.init.type === 'ArrowFunctionExpression')) {
        const name = path.node.id?.name;
        if (name) {
          const params = path.node.init.params.map(p => ({ name: p.name, type: 'any' }));
          let jsDoc = '';
          // Check for comments before the variable declaration
          if (path.node.leadingComments) {
            jsDoc = path.node.leadingComments.map(c => c.value).join('\n');
          } else if (path.parent && path.parent.leadingComments) {
            jsDoc = path.parent.leadingComments.map(c => c.value).join('\n');
          }
          functionMap.set(name, { params, jsDoc, kind: 'Function' });
        }
      }
    },
    // Also catch function expressions assigned to variables
    AssignmentExpression(path) {
      if (path.node.right && (path.node.right.type === 'FunctionExpression' || path.node.right.type === 'ArrowFunctionExpression')) {
        if (path.node.left.type === 'Identifier') {
          const name = path.node.left.name;
          const params = path.node.right.params.map(p => ({ name: p.name, type: 'any' }));
          let jsDoc = '';
          if (path.node.leadingComments) {
            jsDoc = path.node.leadingComments.map(c => c.value).join('\n');
          }
          functionMap.set(name, { params, jsDoc, kind: 'Function' });
        }
      }
    }
  });
  
  // Second pass: find exports
  traverse(ast, {
    AssignmentExpression(path) {
      // module.exports = { foo, bar }
      if (
        path.node.left.type === 'MemberExpression' &&
        path.node.left.object.name === 'module' &&
        path.node.left.property.name === 'exports'
      ) {
        if (path.node.right.type === 'ObjectExpression') {
          for (const prop of path.node.right.properties) {
            if (prop.type === 'ObjectProperty') {
              let name, params = [], jsDoc = '', kind = 'Function';
              
              // Handle shorthand: { add, Greeter }
              if (prop.shorthand && prop.key.type === 'Identifier') {
                name = prop.key.name;
                // Look up function details from our map
                const funcDetails = functionMap.get(name);
                if (funcDetails) {
                  params = funcDetails.params;
                  jsDoc = funcDetails.jsDoc;
                  kind = funcDetails.kind;
                }
              } else if (prop.value.type === 'FunctionExpression' || prop.value.type === 'ArrowFunctionExpression') {
                // Handle: { foo: function() {} }
                name = prop.key.name || prop.key.value || 'anonymousFunction';
                params = prop.value.params.map(p => ({ name: p.name, type: 'any' }));
                kind = 'Function';
              } else if (prop.value.type === 'Identifier') {
                // Handle: { foo: bar } where bar is a function/class
                name = prop.key.name || prop.key.value;
                const funcDetails = functionMap.get(prop.value.name);
                if (funcDetails) {
                  params = funcDetails.params;
                  jsDoc = funcDetails.jsDoc;
                  kind = funcDetails.kind;
                }
              }
              
              if (name) {
                results.push({
                  name,
                  kind,
                  params,
                  returnType: '',
                  jsDoc,
                  file: filePath,
                });
              }
            }
          }
        } else if (path.node.right.type === 'FunctionExpression' || path.node.right.type === 'ArrowFunctionExpression') {
          // module.exports = function() {...}
          const params = path.node.right.params.map(p => ({ name: p.name, type: 'any' }));
          results.push({
            name: 'defaultExport',
            kind: 'Function',
            params,
            returnType: '',
            jsDoc: '',
            file: filePath,
          });
        }
      }
      // exports.foo = function() {...}
      if (
        path.node.left.type === 'MemberExpression' &&
        path.node.left.object.name === 'exports' &&
        path.node.right.type === 'FunctionExpression'
      ) {
        const name = path.node.left.property.name || 'anonymousFunction';
        const params = path.node.right.params.map(p => ({ name: p.name, type: 'any' }));
        results.push({
          name,
          kind: 'Function',
          params,
          returnType: '',
          jsDoc: '',
          file: filePath,
        });
      }
    },
  });
  return results;
}

/**
 * Ensure tsconfig.json exists for ts-morph, create minimal one if needed.
 * @param {string} dir - Directory to check/create tsconfig.json
 */
function ensureTsConfig(dir) {
  const tsConfigPath = path.join(dir, 'tsconfig.json');
  if (!fs.existsSync(tsConfigPath)) {
    const minimalConfig = {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "allowJs": true,
        "checkJs": false,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true
      },
      "include": ["**/*.js", "**/*.ts"]
    };
    fs.writeFileSync(tsConfigPath, JSON.stringify(minimalConfig, null, 2));
    console.log(`Created minimal tsconfig.json in ${dir}`);
  }
}

/**
 * Scan exported functions, classes, and interfaces from .js/.ts files in a directory tree.
 * @param {string} dir - Directory to scan
 * @returns {Promise<Array>} - List of exported symbols with metadata
 */
async function scanExports(dir) {
  // Ensure tsconfig.json exists
  ensureTsConfig(dir);
  
  const project = new Project({
    tsConfigFilePath: path.join(dir, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });
  const files = getAllJsTsFiles(dir);
  const results = [];
  for (const filePath of files) {
    const file = path.relative(dir, filePath);
    // ES module exports
    const sourceFile = project.addSourceFileAtPath(filePath);
    sourceFile.getExportedDeclarations().forEach((decls, name) => {
      decls.forEach(decl => {
        const kind = decl.getKindName();
        const jsDoc = decl.getJsDocs ? decl.getJsDocs().map(doc => doc.getComment()).join('\n') : '';
        let params = [], returnType = '';
        if (decl.getParameters) {
          params = decl.getParameters().map(p => ({
            name: p.getName(),
            type: p.getType().getText(),
          }));
        }
        if (decl.getReturnType) {
          returnType = decl.getReturnType().getText();
        }
        results.push({
          file,
          name,
          kind,
          params,
          returnType,
          jsDoc,
        });
      });
    });
    // CommonJS exports
    const cjsExports = parseCommonJsExports(filePath).map(e => ({
      ...e,
      file,
    }));
    results.push(...cjsExports);
  }
  return results;
}

/**
 * Extract CLI commands and options from files using commander or yargs (MVP: regex-based).
 * @param {string} dir - Directory to scan
 * @returns {Array} - List of CLI commands and options
 */
function extractCliCommands(dir) {
  const files = getAllJsTsFiles(dir);
  const commands = [];
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Only scan files that likely contain CLI code
    if (!content.includes('commander') && !content.includes('yargs')) {
      continue;
    }
    
    // Look for actual CLI command patterns, not comments or code examples
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip comments and code examples
      if (line.startsWith('//') || line.startsWith('/*') || line.includes('// Commander:') || line.includes('// Yargs:')) {
        continue;
      }
      
      // Commander: .command('name ...').description('desc ...')
      const commandMatch = line.match(/\.command\(['"`]([^'"`]+)['"`]\)/);
      if (commandMatch) {
        // Look for description on the same line or next line
        let description = '';
        const descMatch = line.match(/\.description\(['"`]([^'"`]+)['"`]\)/);
        if (descMatch) {
          description = descMatch[1];
        } else if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          const nextDescMatch = nextLine.match(/\.description\(['"`]([^'"`]+)['"`]\)/);
          if (nextDescMatch) {
            description = nextDescMatch[1];
          }
        }
        
        if (description) {
          commands.push({ 
            name: commandMatch[1], 
            description: description, 
            file: path.relative(dir, filePath) 
          });
        }
      }
      
      // Yargs: .command('name ...', 'desc ...')
      const yargsMatch = line.match(/\.command\(['"`]([^'"`]+)['"`],\s*['"`]([^'"`]+)['"`]/);
      if (yargsMatch) {
        commands.push({ 
          name: yargsMatch[1], 
          description: yargsMatch[2], 
          file: path.relative(dir, filePath) 
        });
      }
    }
  }
  return commands;
}

/**
 * Extract scripts from package.json
 * @param {string} pkgPath - Path to package.json
 * @returns {Object} - Scripts object
 */
function extractScripts(pkgPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.scripts || {};
}

/**
 * Get recent git commits for changelog
 * @param {string} repoDir - Path to git repo
 * @param {number} count - Number of commits
 * @returns {Promise<Array>} - List of commit messages
 */
async function getRecentCommits(repoDir, count = 3) {
  const git = simpleGit(repoDir);
  const log = await git.log({ maxCount: count });
  return log.all.map(c => ({
    hash: c.hash,
    date: c.date,
    message: c.message,
    author: c.author_name,
  }));
}

module.exports = {
  scanExports,
  extractCliCommands,
  extractScripts,
  getRecentCommits,
}; 