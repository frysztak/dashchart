module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
    development: {
      presets: ['next/babel'],
      plugins: [['styled-components', { ssr: true }]],
    },
    production: {
      presets: ['next/babel'],
      plugins: [['styled-components', { ssr: true }]],
    },
  },
};
