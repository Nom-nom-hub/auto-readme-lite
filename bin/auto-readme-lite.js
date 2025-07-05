#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { scanExports, extractCliCommands, extractScripts, getRecentCommits } = require('../lib/parser');
const { updateReadme } = require('../lib/readme-writer');
const yargs = require('yargs');

async function getChalk() {
  try {
    const mod = await import('chalk');
    return mod.default || mod;
  } catch (e) {
    return { cyan: x => x, yellow: x => x, green: x => x, blue: x => x };
  }
}

(async () => {
const chalk = await getChalk();

const argv = yargs
  .usage('Usage: auto-readme-lite [options]')
  .option('dry-run', { type: 'boolean', describe: 'Preview README output without writing' })
  .option('watch', { type: 'boolean', describe: 'Watch mode (optional)' })
  .option('sections', { type: 'string', describe: 'Comma-separated sections to include (api,cli,scripts,git)' })
  .option('dir', { type: 'string', describe: 'Target project directory', default: process.cwd() })
  .help()
  .argv;

if (argv.help || process.argv.length <= 2) {
  console.log(`\nUsage: auto-readme-lite [options]\n\nOptions:\n  --dry-run     Preview README output without writing\n  --watch       Watch mode (optional)\n  --sections    Comma-separated sections to include (api,cli,scripts,git)\n  --dir         Target project directory\n  --help        Show help\n`);
  process.exit(0);
}

const rootDir = path.resolve(argv.dir);
const readmePath = path.join(rootDir, 'README.md');
const pkgPath = path.join(rootDir, 'package.json');

async function main() {
  const sectionsToUpdate = (argv.sections || 'api,cli,scripts,git').split(',');
  console.log(chalk.cyan('auto-readme-lite: Generating README sections...'));

  // API
  let apiSection = '';
  if (sectionsToUpdate.includes('api')) {
    const exports = await scanExports(rootDir);
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
        if (e.returnType) {
          apiSection += `**Returns:** \`${e.returnType}\`\n\n`;
        }
        if (e.jsDoc) {
          apiSection += `**Description:**\n\`\`\`\n${e.jsDoc}\n\`\`\`\n\n`;
        }
        apiSection += '---\n\n';
      });
    } else {
      apiSection = '## API Reference\n\nNo exported functions or classes found.\n\n';
    }
  }

  // CLI
  let cliSection = '';
  if (sectionsToUpdate.includes('cli')) {
    const cliCommands = extractCliCommands(rootDir);
    if (cliCommands.length > 0) {
      cliSection = '## CLI Commands\n\n';
      cliCommands.forEach(cmd => {
        cliSection += `- \`${cmd.name}\` - ${cmd.description}\n`;
      });
      cliSection += '\n';
    } else {
      cliSection = '## CLI Commands\n\nNo CLI commands found.\n\n';
    }
  }

  // Scripts
  let scriptsSection = '';
  if (sectionsToUpdate.includes('scripts')) {
    const scripts = extractScripts(pkgPath);
    if (Object.keys(scripts).length > 0) {
      scriptsSection = '## Available Scripts\n\n';
      Object.entries(scripts).forEach(([k, v]) => {
        scriptsSection += `- \`${k}\` - ${v}\n`;
      });
      scriptsSection += '\n';
    } else {
      scriptsSection = '## Available Scripts\n\nNo scripts found.\n\n';
    }
  }

  // Changelog (git)
  let changelogSection = '';
  if (sectionsToUpdate.includes('git') || sectionsToUpdate.includes('changelog')) {
    try {
      const commits = await getRecentCommits(rootDir, 3);
      if (commits.length > 0) {
        changelogSection = '## Recent Changes\n\n';
        commits.forEach(c => {
          const date = new Date(c.date).toLocaleDateString();
          changelogSection += `- **\`${c.hash.slice(0,7)}\`** (${date}) - ${c.message} _by ${c.author}_\n`;
        });
        changelogSection += '\n';
      } else {
        changelogSection = '## Recent Changes\n\nNo recent commits found.\n\n';
      }
    } catch (e) {
      changelogSection = '## Recent Changes\n\nNo git repository found.\n\n';
    }
  }

  const sections = {
    api: apiSection,
    cli: cliSection,
    scripts: scriptsSection,
    changelog: changelogSection,
  };

  if (argv['dry-run']) {
    console.log(chalk.yellow('\n--- Preview ---'));
    Object.entries(sections).forEach(([k, v]) => {
      if (sectionsToUpdate.includes(k)) {
        console.log(chalk.green(`\n[${k.toUpperCase()}]\n`));
        console.log(v);
      }
    });
    return;
  }

  updateReadme(readmePath, sections);
  console.log(chalk.green('README.md updated!'));
}

await main();

if (argv.watch) {
  const chokidar = require('chokidar');
  chokidar.watch(['**/*.js', '**/*.ts', 'package.json', '.git/HEAD']).on('change', () => {
    console.log(chalk.blue('File change detected. Re-running...'));
    main();
  });
}
})(); 