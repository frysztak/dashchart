const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['shared', 'fp-ts']);

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const withPolyfills = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
          entries['main.js'].unshift('./polyfills.js');
        }

        return entries;
      };

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = pipe(withImages, withFonts, withTM, withBundleAnalyzer)();
