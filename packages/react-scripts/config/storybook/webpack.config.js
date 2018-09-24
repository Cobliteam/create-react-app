'use strict';

const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const webpack = require('webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      // This loader parallelizes code compilation, it is optional but
      // improves compile time on larger projects
      {
        loader: require.resolve('thread-loader'),
        options: {
          poolTimeout: Infinity, // keep workers alive for more effective watch mode
        },
      },
      {
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [
            [
              require.resolve('@cobli/babel-preset-react-app'),
              {
                flow: false,
              },
            ],
            [require.resolve('@babel/preset-typescript')],
          ],
          // Make sure we have a unique cache identifier, erring on the
          // side of caution.
          // We remove this when the user ejects because the default
          // is sane and uses Babel options. Instead of options, we use
          // the react-scripts and babel-preset-react-app versions.
          // cacheIdentifier: getCacheIdentifier('development', [
          //   'babel-plugin-named-asset-import',
          //   'babel-preset-react-app',
          //   'react-dev-utils',
          //   'react-scripts',
          // ]),
          // @remove-on-eject-end
          plugins: [
            [
              require.resolve('babel-plugin-emotion'),
              {
                autoLabel: true,
                sourceMap: true,
                labelFormat: '[filename]--[local]',
              },
            ],
            [
              require.resolve('@cobli/babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: 'svgr/webpack![path]',
                  },
                },
              },
            ],
            'react-hot-loader/babel',
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // Don't waste time on Gzipping the cache
          cacheCompression: false,
          highlightCode: true,
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
