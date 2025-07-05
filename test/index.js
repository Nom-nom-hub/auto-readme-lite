#!/usr/bin/env node

/**
 * Main entry point for the test application.
 * This file demonstrates various export patterns for testing auto-readme-lite.
 */

const { program } = require('commander');
const yargs = require('yargs');
const { Calculator, DatabaseManager } = require('./lib/calculator');
const { processData, validateInput } = require('./lib/utils');
const { startServer, stopServer } = require('./lib/server');

// ES Module style exports (for testing)
export function main() {
  console.log('Application started');
}

export class Application {
  constructor() {
    this.name = 'TestApp';
  }
  
  start() {
    console.log(`${this.name} is running`);
  }
}

// CommonJS exports
module.exports = {
  main,
  Application,
  Calculator,
  DatabaseManager,
  processData,
  validateInput,
  startServer,
  stopServer
};

// CLI setup with Commander
program
  .name('test-app')
  .description('Test application for auto-readme-lite')
  .version('1.0.0');

program
  .command('add <a> <b>')
  .description('Add two numbers')
  .action((a, b) => {
    const calc = new Calculator();
    console.log(calc.add(parseInt(a), parseInt(b)));
  });

program
  .command('multiply <a> <b>')
  .description('Multiply two numbers')
  .action((a, b) => {
    const calc = new Calculator();
    console.log(calc.multiply(parseInt(a), parseInt(b)));
  });

program
  .command('process <file>')
  .description('Process a data file')
  .option('-o, --output <path>', 'Output file path')
  .action((file, options) => {
    const result = processData(file, options.output);
    console.log('Processing complete:', result);
  });

// Yargs setup
yargs
  .command('serve', 'Start the server', (yargs) => {
    return yargs.option('port', {
      alias: 'p',
      type: 'number',
      default: 3000,
      description: 'Port to run the server on'
    });
  }, (argv) => {
    startServer(argv.port);
  })
  .command('stop', 'Stop the server', () => {
    stopServer();
  })
  .help()
  .argv;

// Run CLI if this file is executed directly
if (require.main === module) {
  program.parse();
} 