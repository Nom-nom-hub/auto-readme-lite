// precommit.js - sets up a pre-commit git hook to run auto-readme-lite
const fs = require('fs');
const path = require('path');

function setupPrecommitHook() {
  const gitDir = path.join(process.cwd(), '.git');
  const hookDir = path.join(gitDir, 'hooks');
  const hookPath = path.join(hookDir, 'pre-commit');
  if (!fs.existsSync(gitDir)) {
    console.error('Not a git repository.');
    process.exit(1);
  }
  if (!fs.existsSync(hookDir)) {
    fs.mkdirSync(hookDir);
  }
  const hookScript = `#!/bin/sh\nnpx auto-readme-lite --sections api,cli,scripts,changelog\n`;
  fs.writeFileSync(hookPath, hookScript, { mode: 0o755 });
  console.log('Pre-commit hook installed!');
}

if (require.main === module) {
  setupPrecommitHook();
}

module.exports = { setupPrecommitHook }; 