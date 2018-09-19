const paths = require('./paths');

module.exports = {
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
