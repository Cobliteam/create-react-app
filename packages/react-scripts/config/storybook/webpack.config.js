'use strict';

const webpack = require('webpack');

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
      require.resolve('react-docgen-typescript-loader'),
    ],
  });
  defaultConfig.plugins.push(
    new webpack.DefinePlugin({ appPath: `"${process.cwd()}/src"` })
  );
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  return defaultConfig;
};
