'use strict';

const storybook = require('@storybook/react');

// appPath is defined in webpack.config.js
const req = require.context(appPath, true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

storybook.configure(loadStories, module);
