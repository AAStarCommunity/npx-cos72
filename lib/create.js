const fs = require('node:fs-extra');  
const path = require('node:path');  
const chalk = require('chalk');  
const download = require('./download');  

/**
 * Creates a new project with the specified template
 * @param {string} projectName - Name of the project to create
 * @param {Object} options - CLI options
 * @param {string} options.template - Template to use (default: 'default')
 */
async function create(projectName, options) {  
  const cwd = process.cwd();  
  const dest = path.join(cwd, projectName);  
  const template = options.template || 'default';  

  // Check if project directory already exists  
  if (fs.existsSync(dest)) {  
    console.log(chalk.red(`Project directory ${projectName} already exists`));  
    return;  
  }  

  try {  
    // Download template  
    await download(template, dest);  

    // Update package.json with new project name  
    const pkgPath = path.join(dest, 'package.json');  
    const pkg = require(pkgPath);  
    pkg.name = projectName;  
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));  

    console.log(chalk.green(`
    Project ${projectName} created successfully!
    
    Next steps:
    cd ${projectName}
    npm install
    npm start
    `));  
  } catch (error) {  
    console.error(chalk.red('Failed to create project:'), error.message);  
    // Clean up failed project directory  
    if (fs.existsSync(dest)) {  
      fs.removeSync(dest);  
    }  
  }  
}  

module.exports = create;