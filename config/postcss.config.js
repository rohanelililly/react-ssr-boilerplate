const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const plugins = [autoprefixer];

if (process.env.NODE_ENV === 'production') plugins.push(cssnano);

module.exports = { plugins };