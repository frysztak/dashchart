const path = require('path');

module.exports = {
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/preset-typescript', '@storybook/addon-knobs/register'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(ts|tsx)?$/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true, configFile: '.storybook/tsconfig.json' },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'icons/',
          },
        },
      ],
    });

    // Return the altered config
    return config;
  },
};
