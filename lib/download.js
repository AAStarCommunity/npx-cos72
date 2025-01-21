const downloadRepo = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const { getTemplateRepo, validateTemplate } = require('../config/templates');

/**
 * Downloads the template repository to the specified destination
 * @param {string} template - Template name to download
 * @param {string} dest - Destination path
 * @returns {Promise} - Resolves when download completes
 */
function download(template, dest) {
  const spinner = ora('Downloading template...');
  spinner.start();

  return new Promise((resolve, reject) => {
    if (!validateTemplate(template)) {
      spinner.fail(chalk.red(`Invalid template: ${template}`));
      reject(new Error(`Template ${template} not found in configuration`));
      return;
    }

    const repo = getTemplateRepo(template);
    
    downloadRepo(repo, dest, (err) => {
      if (err) {
        spinner.fail(chalk.red('Failed to download template'));
        reject(err);
      } else {
        spinner.succeed(chalk.green('Template downloaded successfully'));
        resolve();
      }
    });
  });
}

module.exports = download;