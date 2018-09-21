'use strict';

const paths = require('./paths');

module.exports = function() {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const lintConfig = {
    extends: ['tslint:recommended', 'tslint-react', 'tslint-config-prettier'],
    rules: {
      'no-unused-expression': [true, 'allow-tagged-template'],
    },
    linterOptions: {
      exclude: [
        'config/**/*.js',
        'node_modules/**/*.ts',
        'coverage/lcov-report/*.js',
        `${paths.appSrc}/serviceWorker.js`,
      ],
    },
  };

  if (env === 'development') {
    lintConfig.defaultSeverity = 'warning';
  }

  return lintConfig;
};
