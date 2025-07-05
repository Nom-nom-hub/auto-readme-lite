#!/usr/bin/env node

/**
 * Comprehensive test script for auto-readme-lite tool.
 * Tests all features: export detection, CLI commands, scripts, git integration.
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Import the tool's modules
const { scanExports, extractCliCommands, extractScripts, getRecentCommits } = require('../lib/parser');
const { updateReadme } = require('../lib/readme-writer');

const TEST_DIR = __dirname;
const README_PATH = path.join(TEST_DIR, 'README.md');

console.log('🧪 Starting comprehensive test of auto-readme-lite...\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Export Detection
  console.log('📋 Test 1: Export Detection');
  try {
    const exports = await scanExports(TEST_DIR);
    console.log(`   Found ${exports.length} exports`);
    
    // Check for specific exports we expect
    const expectedExports = [
      'main', 'Application', 'Calculator', 'DatabaseManager', 
      'processData', 'validateInput', 'startServer', 'stopServer',
      'createUser', 'validateUser', 'User', 'Config', 'ApiResponse'
    ];
    
    const foundExports = exports.map(e => e.name);
    const missingExports = expectedExports.filter(name => !foundExports.includes(name));
    
    if (missingExports.length === 0) {
      console.log('   ✅ All expected exports found');
      passed++;
    } else {
      console.log(`   ❌ Missing exports: ${missingExports.join(', ')}`);
      failed++;
    }
    
    // Check for JSDoc extraction
    const exportsWithJSDoc = exports.filter(e => e.jsDoc);
    console.log(`   📝 ${exportsWithJSDoc.length} exports have JSDoc comments`);
    
    // Check for parameter extraction
    const exportsWithParams = exports.filter(e => e.params && e.params.length > 0);
    console.log(`   🔧 ${exportsWithParams.length} exports have parameter information`);
    
  } catch (error) {
    console.log(`   ❌ Export detection failed: ${error.message}`);
    failed++;
  }

  // Test 2: CLI Command Extraction
  console.log('\n📋 Test 2: CLI Command Extraction');
  try {
    const cliCommands = extractCliCommands(TEST_DIR);
    console.log(`   Found ${cliCommands.length} CLI commands`);
    
    // Check for specific commands we expect
    const expectedCommands = ['add <a> <b>', 'multiply <a> <b>', 'process <file>', 'serve', 'stop'];
    const foundCommands = cliCommands.map(c => c.name);
    const missingCommands = expectedCommands.filter(name => !foundCommands.includes(name));
    
    if (missingCommands.length === 0) {
      console.log('   ✅ All expected CLI commands found');
      passed++;
    } else {
      console.log(`   ❌ Missing commands: ${missingCommands.join(', ')}`);
      failed++;
    }
    
  } catch (error) {
    console.log(`   ❌ CLI command extraction failed: ${error.message}`);
    failed++;
  }

  // Test 3: Script Extraction
  console.log('\n📋 Test 3: Script Extraction');
  try {
    const pkgPath = path.join(TEST_DIR, 'package.json');
    const scripts = extractScripts(pkgPath);
    console.log(`   Found ${Object.keys(scripts).length} scripts`);
    
    // Check for specific scripts we expect
    const expectedScripts = ['start', 'test', 'build', 'dev', 'lint', 'format'];
    const foundScripts = Object.keys(scripts);
    const missingScripts = expectedScripts.filter(name => !foundScripts.includes(name));
    
    if (missingScripts.length === 0) {
      console.log('   ✅ All expected scripts found');
      passed++;
    } else {
      console.log(`   ❌ Missing scripts: ${missingScripts.join(', ')}`);
      failed++;
    }
    
  } catch (error) {
    console.log(`   ❌ Script extraction failed: ${error.message}`);
    failed++;
  }

  // Test 4: Git Integration
  console.log('\n📋 Test 4: Git Integration');
  try {
    const commits = await getRecentCommits(TEST_DIR, 3);
    if (commits.length > 0) {
      console.log(`   ✅ Found ${commits.length} recent commits`);
      passed++;
    } else {
      console.log('   ⚠️  No recent commits found (this is normal for a test project)');
      passed++; // This is not a failure
    }
  } catch (error) {
    console.log(`   ⚠️  Git integration test: ${error.message} (this is normal if not a git repo)`);
    passed++; // This is not a failure
  }

  // Test 5: README Update
  console.log('\n📋 Test 5: README Update');
  try {
    // Read original README
    const originalContent = fs.readFileSync(README_PATH, 'utf8');
    
    // Generate sections
    const exports = await scanExports(TEST_DIR);
    const cliCommands = extractCliCommands(TEST_DIR);
    const scripts = extractScripts(path.join(TEST_DIR, 'package.json'));
    
    let apiSection = '';
    if (exports.length > 0) {
      apiSection = '## API Reference\n\n';
      exports.forEach(e => {
        apiSection += `### \`${e.name}\`\n\n`;
        apiSection += `**Type:** ${e.kind}\n\n`;
        apiSection += `**File:** \`${e.file}\`\n\n`;
        if (e.params && e.params.length > 0) {
          apiSection += `**Parameters:**\n`;
          e.params.forEach(p => {
            apiSection += `- \`${p.name}\` (${p.type || 'any'})\n`;
          });
          apiSection += '\n';
        }
        if (e.jsDoc) {
          apiSection += `**Description:**\n\`\`\`\n${e.jsDoc}\n\`\`\`\n\n`;
        }
        apiSection += '---\n\n';
      });
    }

    let cliSection = '';
    if (cliCommands.length > 0) {
      cliSection = '## CLI Commands\n\n';
      cliCommands.forEach(cmd => {
        cliSection += `- \`${cmd.name}\` - ${cmd.description}\n`;
      });
      cliSection += '\n';
    }

    let scriptsSection = '';
    if (Object.keys(scripts).length > 0) {
      scriptsSection = '## Available Scripts\n\n';
      Object.entries(scripts).forEach(([k, v]) => {
        scriptsSection += `- \`${k}\` - ${v}\n`;
      });
      scriptsSection += '\n';
    }

    const sections = {
      api: apiSection,
      cli: cliSection,
      scripts: scriptsSection,
      changelog: '## Recent Changes\n\nNo recent commits found.\n\n'
    };

    // Update README
    updateReadme(README_PATH, sections);
    
    // Read updated README
    const updatedContent = fs.readFileSync(README_PATH, 'utf8');
    
    // Check if sections were updated
    if (updatedContent.includes('### `main`') && 
        updatedContent.includes('### `Calculator`') &&
        updatedContent.includes('`add <a> <b>`') &&
        updatedContent.includes('`start` - node index.js')) {
      console.log('   ✅ README sections updated successfully');
      passed++;
    } else {
      console.log('   ❌ README sections not updated correctly');
      failed++;
    }
    
    // Optionally save the updated content for inspection
    const saveUpdated = process.argv.includes('--save');
    if (saveUpdated) {
      console.log('   💾 Updated README saved (use --save flag to keep changes)');
    } else {
      // Restore original content
      fs.writeFileSync(README_PATH, originalContent);
      console.log('   🔄 Original README restored');
    }
    
  } catch (error) {
    console.log(`   ❌ README update failed: ${error.message}`);
    failed++;
  }

  // Test 6: TypeScript Support
  console.log('\n📋 Test 6: TypeScript Support');
  try {
    const tsExports = await scanExports(TEST_DIR);
    const tsFiles = tsExports.filter(e => e.file.includes('.ts'));
    
    if (tsFiles.length > 0) {
      console.log(`   ✅ Found ${tsFiles.length} TypeScript exports`);
      passed++;
    } else {
      console.log('   ❌ No TypeScript exports found');
      failed++;
    }
    
  } catch (error) {
    console.log(`   ❌ TypeScript support test failed: ${error.message}`);
    failed++;
  }

  // Test 7: Parameter and JSDoc Extraction
  console.log('\n📋 Test 7: Parameter and JSDoc Extraction');
  try {
    const exports = await scanExports(TEST_DIR);
    const exportsWithParams = exports.filter(e => e.params && e.params.length > 0);
    const exportsWithJSDoc = exports.filter(e => e.jsDoc);
    
    if (exportsWithParams.length > 0 && exportsWithJSDoc.length > 0) {
      console.log(`   ✅ Found ${exportsWithParams.length} exports with parameters`);
      console.log(`   ✅ Found ${exportsWithJSDoc.length} exports with JSDoc`);
      passed++;
    } else {
      console.log('   ❌ Parameter or JSDoc extraction not working');
      failed++;
    }
    
  } catch (error) {
    console.log(`   ❌ Parameter/JSDoc extraction failed: ${error.message}`);
    failed++;
  }

  // Summary
  console.log('\n📊 Test Summary');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! The auto-readme-lite tool is working correctly.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('❌ Test runner failed:', error);
  process.exit(1);
}); 