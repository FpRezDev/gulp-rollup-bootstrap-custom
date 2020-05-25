# gulp-rollup-bootstrap-custom
Gulp plugin to wrap up a custom Bootstrap js and sass project quickly, including libs copy to root as well. 

Install
========

```
npm i -D gulp-rollup-bootstrap-custom
```

Usage
======

### Example

```yaml
#.browserslistrc
# Example
>= 1%
last 1 major version
not dead
Chrome >= 45
Firefox >= 38
Edge >= 12
Explorer >= 10
iOS >= 9
Safari >= 9
Android >= 4.4
Opera >= 30
```

```json
// babel.config.json
// example
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false,
        "exclude": ["transform-typeof-symbol"]
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

```js
// gulpfile.js

const { buildCss, buildJs, buildLibs } = require('gulp-rollup-bootstrap-custom');

// bootsrap custom css  and/or custom scss components
// allow for easy bundling
const cssConfig = {
  inputFiles: 'src/scss/bootstrap-custom.scss',
  outputDir: 'wwwroot/css/',
  sourcemap: true,
  minimize: true,
  autoprefixer: {
    flexbox: 'no-2009'
  },
  sass: {
    outputStyle: 'expanded'
  }
};

// bootstrap custom js file and/or custom plugins
// allows for easy bundling
const jsConfig = {
  input: './src/js/bootstrap-custom.js',
  external: ['jquery', 'popper.js'],
  minimize: true,
  output: {
    file: './wwwroot/js/bootstrap-custom.min.js',
    name: 'index',
    format: 'umd',
    sourcemap: true,
    globals: { 
      jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
      'popper.js': 'Popper'
    }
  }
};

// libs dependencies
// currently only adding .min and .min.map
const libsConfig = [
  {
    outputDirectory: 'wwwroot/libs/jquery/',
    inputFiles: 'node_modules/jquery/dist/jquery.slim.min.*'
  },
  {
    outputDirectory: 'wwwroot/libs/popper.js/',
    inputFiles: 'node_modules/popper.js/dist/umd/popper.min.*'
  }
];


exports.buildCss = () => { return buildCss(cssConfig); };
exports.buildJs = () => { return buildJs(jsConfig); };
exports.buildLibs = () => { return buildLibs(libsConfig); };

```