'use strict';

const webpack = require('webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  const svgLoader = defaultConfig.module.rules.find(
    rule => rule.test.source == /\.svg$/.source
  );

  if (svgLoader) {
    svgLoader.use = [
      {
        loader: svgLoader.loader,
        options: {
          noquotes: true,
        },
      },
    ];

    svgLoader.loader = undefined;
  }

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
      require.resolve('react-docgen-typescript-loader'),
    ],
  });
  defaultConfig.plugins.push(
    new webpack.DefinePlugin({ appPath: `"${process.cwd()}/src"` })
  );
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  return defaultConfig;
};
