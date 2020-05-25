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
// src/js/bootstrap-custom.js

// comment out unwanted plugins or import your own custom ones
import Alert from '../../node_modules/bootstrap/js/src/alert'
import Button from '../../node_modules/bootstrap/js/src/button'
import Carousel from '../../node_modules/bootstrap/js/src/carousel'
import Collapse from '../../node_modules/bootstrap/js/src/collapse'
import Dropdown from '../../node_modules/bootstrap/js/src/dropdown'
import Modal from '../../node_modules/bootstrap/js/src/modal'
import Popover from '../../node_modules/bootstrap/js/src/popover'
import Scrollspy from '../../node_modules/bootstrap/js/src/scrollspy'
import Tab from '../../node_modules/bootstrap/js/src/tab'
import Toast from '../../node_modules/bootstrap/js/src/toast'
import Tooltip from '../../node_modules/bootstrap/js/src/tooltip'
import Util from '../../node_modules/bootstrap/js/src/util'

// be sure to comment out or add custom exports
export {
  Util,
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Toast,
  Tooltip
}

```

```scss
// src/scss/_variables.scss

// Theme Colors
$primary:       #3c626e;
$dark:          #283140;
$dark-accent:   #739ead;
$light:         #f7f6f5;
$light-accent:  #93a4a7;

// Theme Color Map
$theme-colors: (
  "primary": $primary,
  "secondary": $dark-accent,
  "dark": $dark,
  "dark-accent": $dark-accent,
  "light": $light,
  "light-accent": $light-accent,
);

// NO ROUNDED CORNERS unless .rounded is specified
$enable-rounded: false !default;


```

```scss
// src/scss/bootstrap-custom.scss

// import our custom variables
@import "./variables.scss";

// import required bootstrap
@import "../../node_modules/bootstrap/scss/functions";
@import "../../node_modules/bootstrap/scss/variables";
@import "../../node_modules/bootstrap/scss/mixins";

// if you want to remove colormap keys.... do so here

// import optional bootstrap
@import "../../node_modules/bootstrap/scss/root";
@import "../../node_modules/bootstrap/scss/reboot";
@import "../../node_modules/bootstrap/scss/type";
@import "../../node_modules/bootstrap/scss/images";
@import "../../node_modules/bootstrap/scss/code";
@import "../../node_modules/bootstrap/scss/grid";
@import "../../node_modules/bootstrap/scss/tables";
@import "../../node_modules/bootstrap/scss/forms";
@import "../../node_modules/bootstrap/scss/buttons";
@import "../../node_modules/bootstrap/scss/transitions";
@import "../../node_modules/bootstrap/scss/dropdown";
@import "../../node_modules/bootstrap/scss/button-group";
@import "../../node_modules/bootstrap/scss/input-group";
@import "../../node_modules/bootstrap/scss/custom-forms";
@import "../../node_modules/bootstrap/scss/nav";
@import "../../node_modules/bootstrap/scss/navbar";
@import "../../node_modules/bootstrap/scss/card";
@import "../../node_modules/bootstrap/scss/breadcrumb";
@import "../../node_modules/bootstrap/scss/pagination";
@import "../../node_modules/bootstrap/scss/badge";
@import "../../node_modules/bootstrap/scss/jumbotron";
@import "../../node_modules/bootstrap/scss/alert";
@import "../../node_modules/bootstrap/scss/progress";
@import "../../node_modules/bootstrap/scss/media";
@import "../../node_modules/bootstrap/scss/list-group";
@import "../../node_modules/bootstrap/scss/close";
@import "../../node_modules/bootstrap/scss/toasts";
@import "../../node_modules/bootstrap/scss/modal";
@import "../../node_modules/bootstrap/scss/tooltip";
@import "../../node_modules/bootstrap/scss/popover";
@import "../../node_modules/bootstrap/scss/carousel";
@import "../../node_modules/bootstrap/scss/spinners";
@import "../../node_modules/bootstrap/scss/utilities";
@import "../../node_modules/bootstrap/scss/print";
 
// add/import your own custom components/utilities

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