'use strict';

const spawn = require('react-dev-utils/crossSpawn');
const paths = require('../config/paths');

console.log('Initializing Storybook...');
console.log();

const procDependencies = spawn.sync(
  'start-storybook',
  ['-p', '9001', '-c', paths.appStorybook],
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
