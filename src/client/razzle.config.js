'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }) => {
    config.resolve.alias.common = path.resolve('../shared');

    return config;
  },
};
