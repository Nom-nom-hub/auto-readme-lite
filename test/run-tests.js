#!/usr/bin/env node

/**
 * Simple test runner for auto-readme-lite.
 * Run this to quickly test the tool on the test project.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Running auto-readme-lite tests...\n');

const testDir = __dirname;

try {
  // Test 1: Dry run
  console.log('📋 Test 1: Dry run (preview mode)');
  execSync(`node bin/auto-readme-lite.js --dir "${testDir}" --dry-run`, { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('✅ Dry run completed successfully\n');

  // Test 2: Actual update
  console.log('📋 Test 2: Actual README update');
  execSync(`node bin/auto-readme-lite.js --dir "${testDir}" --sections api,cli,scripts`, { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('✅ README updated successfully\n');

  // Test 3: Check specific sections
  console.log('📋 Test 3: Specific sections only');
  execSync(`node bin/auto-readme-lite.js --dir "${testDir}" --sections api`, { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('✅ API section updated successfully\n');

  console.log('🎉 All tests completed successfully!');
  console.log('\n📁 Check the test/README.md file to see the generated documentation.');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
} 