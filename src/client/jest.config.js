module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: ['/node_modules/(?!fp-ts).+\\.js$'],
  testPathIgnorePatterns: ['/node_modules/', '.yalc/'],
};
