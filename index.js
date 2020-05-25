const { rollup } = require('gulp-js-rollup-babel');
const { buildStyles } = require('gulp-sass-autoprefixer');
const { copyLibs } = require('gulp-copy-libs');


/**
 * Babel Rollup Config 
 * @param {Object} config Babel Rollup Config
 * @param {string|Array.<string>} config.exclude Paths to exclude from compilation
 * @param {string} config.input Filename including path
 * @param {boolean} config.minimize Minimize output?
 * @param {Array.<string>} config.external External libraries
 * @param { Object } config.output Rollup output options
 * @param { string } config.output.file Output filename including path
 * @param { string } config.output.format umd | preferred format
 * @param { boolean } config.output.sourcemap whether or not to include sourcemaps
 * @param { object } config.output.globals global libraries, {key: value}
 *
 **/
const buildJs = ( config ) => {
  
  if(typeof config === 'function') {
    throw "Expecting a css configuration {cssConfig}, but recieved a callback function";
  }
  return rollup(config);
};

/**
 * @param {Object} config 
 * @param {string | Array.<string>} config.inputFiles FileNames including path
 * @param {string} config.outputDir Output directory path
 * @param {boolean} config.sourcemap Create sourcemap,
 * @param {boolean} config.minimize Minimize Css
 * @param {Object} config.autoprefixer Autoprefixer Config
 * @param {Object} config.sass Sass Configuration
 */
const buildCss = ( config ) => {
  if(typeof config === 'function') {
    throw "Expecting a css configuration {config}, but recieved a callback function";
  }
  return buildStyles(config);
};


/**
 * @typedef {Object} LibsConfig Libs configuration object
 * @property {string} outputDirectory - path to output directory
 * @property {string | string[] } inputFiles - Indicates whether the Power component is present.
 */

/**
 * @param {Array.<LibsConfig>} config array of libs dependencies
 */
const buildLibs = ( config ) => {
  if(typeof config === 'function') {
    throw "Expecting a libs configuration {Array}.<LibsConfig>, but recieved a callback function";
  }
  return copyLibs(config);
};

exports.buildJs = buildJs;
exports.buildCss = buildCss;
exports.buildLibs = buildLibs;
