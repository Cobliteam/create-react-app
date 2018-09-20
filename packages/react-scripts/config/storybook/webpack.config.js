const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
// Storybook does not work with Webpack 4, so I need to import webpack from storybook node_modules
const webpack = require('@storybook/react/node_modules/webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
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
          // @remove-on-eject-end
          presets: [
            [
              require.resolve('babel-preset-react-app'),
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
              require.resolve('babel-plugin-named-asset-import'),
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
