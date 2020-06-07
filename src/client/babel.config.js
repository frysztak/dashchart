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
    dev: {
      presets: ['next/babel'],
      plugins: [['styled-components', { ssr: true }]],
    },
    prod: {
      presets: ['next/babel'],
      plugins: [['styled-components', { ssr: true }]],
    },
  },
};
