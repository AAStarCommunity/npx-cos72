#!/usr/bin/env node  
const { program } = require('commander');  
const create = require('../lib/create');  
const chalk = require('chalk');  
const pkg = require('../package.json');  

program  
  .version(pkg.version)  
  .description(pkg.description);  

program  
  .command('create <project-name>')  
  .description('Create a new project')  
  .option('-t, --template <template>', 'Choose a template (default/vue/react)', 'default')  
  .action((projectName, options) => {  
    create(projectName, options);  
  });  

// Add a default action for direct project creation  
program  
  .arguments('<project-name>')  
  .option('-t, --template <template>', 'Choose a template (default/vue/react)', 'default')  
  .action((projectName, options) => {  
    create(projectName, options);  
  });  

program.parse(process.argv);  

// Show help when no arguments provided  
if (!process.argv.slice(2).length) {  
  program.outputHelp();  
}