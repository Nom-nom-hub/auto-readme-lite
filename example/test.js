/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * Greeter class
 */
class Greeter {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }
  /**
   * Greet the user
   * @returns {string}
   */
  greet() {
    return `Hello, ${this.name}!`;
  }
}

// CLI using commander
const { Command } = require('commander');
const program = new Command();
program
  .name('test')
  .description('Test CLI')
  .version('0.1.0');

program
  .command('add <a> <b>')
  .description('Add two numbers')
  .action((a, b) => {
    console.log(add(Number(a), Number(b)));
  });

if (require.main === module) {
  program.parse(process.argv);
}

module.exports = { add, Greeter }; 