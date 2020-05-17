const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['shared', 'fp-ts']);

module.exports = withImages(withFonts(withTM()));
