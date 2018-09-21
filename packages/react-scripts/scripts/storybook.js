'use strict';

const fs = require('fs-extra');
const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');
const paths = require('../config/paths');
const useYarn = fs.existsSync(path.join(paths.appPath, 'yarn.lock'));

let command;

if (useYarn) {
  command = 'yarnpkg';
} else {
  command = 'npm';
}

console.log('Initializing Storybook...');
console.log();

const procDependencies = spawn.sync(
  command,
  ['start-storybook', '-p', '9001', '-c', paths.appStorybook],
  {
    stdio: 'inherit',
  }
);

if (procDependencies.status !== 0) {
  console.error(`\`${command}\` failed`);
  process.exit(1);
  return;
}

process.exit(1);
