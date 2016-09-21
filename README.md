# My startup project using gulp

Start developing fast with pug templates, postCSS and babel support ...

## Setup and start developing

Go to directory where you want your project

```bash
cd Projects
```

Get latest code from git repository

```bash
git clone https://github.com/SKaDiZZ/new-project.git
```

Go to your new project directory

```bash
cd new-project
```

Install node modules

```bash
npm install
```

Build project for first time
```bash
gulp build
```

Start developing

```bash
gulp
```

## Project is using:
* Live preview
  * [browser-sync](https://github.com/BrowserSync/browser-sync) : Live preview
* Manage javascript compilation, bundle, minify
  * [gulp-babel](https://github.com/babel/gulp-babel) : Add babel support
  * [babelify](https://github.com/babel/babelify) : Browserify transform for Babel
  * [browserify](https://github.com/substack/node-browserify) : Build JS bundle
  * [vinyl-buffer](https://github.com/hughsk/vinyl-buffer)
  * [vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream)
  * [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) : Inline source maps are embedded in the source file
  * [gulp-uglify](https://github.com/terinjokes/gulp-uglify) : Minify JS files
* Manage errors
  * [gulp-plumber](https://github.com/floatdrop/gulp-plumber) : Manage gulp errors
* Manage tasks
  * [run-sequence](https://github.com/OverZealous/run-sequence) : Runs a sequence of gulp tasks in the specified order.
* Manage files
  * [gulp-clean](https://github.com/peter-vilja/gulp-clean) : A gulp plugin for removing files and folders from given paths
  * [gulp-rename](https://github.com/hparra/gulp-rename) : Rename minified files
* Manage templates
  * [gulp-pug](https://github.com/jamen/gulp-pug) : Write your html faster
* Manage CSS using postCSS plugins and sass
  * [gulp-postcss](https://github.com/postcss/gulp-postcss) : Pipe CSS through PostCSS processors with a single parse
  * [autoprefixer](https://github.com/postcss/autoprefixer) : Parse CSS and add vendor prefixes to rules
  * [cssnano](https://github.com/ben-eb/cssnano) : Minify CSS files
  * [gulp-sass](https://github.com/dlmanning/gulp-sass) : Add SASS support
  * Manage images
    * [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) : Minify PNG, JPEG, GIF and SVG images
