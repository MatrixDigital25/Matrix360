const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [search, replace] of replacements) {
    if (content.includes(search)) {
      content = content.split(search).join(replace);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

replaceInFile('./src/pages/EnterpriseDashboard.tsx', [
  ['bg-white', 'bg-panel-bg'],
  ['border-border-light', 'border-panel-border']
]);

replaceInFile('./src/pages/ConsultantDashboard.tsx', [
  ['bg-white', 'bg-panel-bg'],
  ['border-border-light', 'border-panel-border']
]);
