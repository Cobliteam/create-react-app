'use strict';

const webpack = require('webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  const svgLoader = defaultConfig.module.rules.find(
    rule => rule.test.source == /\.svg$/.source
  );

  if (svgLoader) {
    svgLoader.loader = undefined;
  }

  defaultConfig.module.rules.push({
    test: /\.svg$/,
    loader: undefined,
    use: ({ resource }) => [
      {
        loader: require.resolve('@svgr/webpack'),
        options: {
          replaceAttrValues: {
            '#FFF': 'currentColor',
          },
          svgoConfig: {
            plugins: [
              {
                removeDesc: false,
              },
              {
                cleanupIDs: {
                  prefix: `svg${relative(context, resource)}`,
                },
              },
            ],
          },
        },
      },
    ],
  });

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [
            [require.resolve('babel-preset-react-app'), { flow: false }],
            [require.resolve('@babel/preset-typescript')],
          ],
          plugins: [
            [
              require.resolve('babel-plugin-emotion'),
              {
                autoLabel: true,
                sourceMap: true,
                labelFormat: '[local]',
              },
            ],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // Don't waste time on Gzipping the cache
          cacheCompression: false,
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
