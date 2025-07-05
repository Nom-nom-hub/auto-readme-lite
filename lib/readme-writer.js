// readme-writer.js - generates/updates README.md for auto-readme-lite
const fs = require('fs');

/**
 * Update README.md, replacing only auto-generated sections with :start/:end tags.
 * @param {string} readmePath - Path to README.md
 * @param {Object} sections - {cli, api, scripts, changelog}
 */
function updateReadme(readmePath, sections) {
  let readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '';
  readme = replaceSection(readme, 'cli', sections.cli);
  readme = replaceSection(readme, 'api', sections.api);
  readme = replaceSection(readme, 'scripts', sections.scripts);
  readme = replaceSection(readme, 'changelog', sections.changelog);
  fs.writeFileSync(readmePath, readme, 'utf8');
}

/**
 * Replace a section in the README between <!-- auto-readme:section:start --> and <!-- auto-readme:section:end --> tags.
 * @param {string} content
 * @param {string} section
 * @param {string} replacement
 * @returns {string}
 */
function replaceSection(content, section, replacement) {
  const startTag = `<!-- auto-readme:${section}:start -->`;
  const endTag = `<!-- auto-readme:${section}:end -->`;
  const sectionRegex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'g');
  
  if (content.match(sectionRegex)) {
    // Replace existing section
    return content.replace(sectionRegex, `${startTag}\n${replacement}\n${endTag}`);
  } else {
    // Add new section at the end
    return content + `\n${startTag}\n${replacement}\n${endTag}\n`;
  }
}

module.exports = {
  updateReadme,
  replaceSection,
}; 