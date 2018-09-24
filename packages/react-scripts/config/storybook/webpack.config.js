'use strict';

const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
// Storybook does not work with Webpack 4, so I need to import webpack from storybook node_modules
const webpack = require('@storybook/react/node_modules/webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  });
  defaultConfig.plugins.push(new TSDocgenPlugin());
  defaultConfig.plugins.push(
    new webpack.DefinePlugin({ appPath: `"${process.cwd()}/src"` })
  );
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  return defaultConfig;
};
