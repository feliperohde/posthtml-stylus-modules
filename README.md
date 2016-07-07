
posthtml-stylus-modules
=========

A small library providing utility methods to `replace` HTML classes and ids

## Installation

  npm install posthtml-stylus-modules --save

## Usage

  import postHtml from 'posthtml-stylus-modules';

  ...
  .pipe(plugins.jade(...))
  .pipe(postHtml(jsonWithCssMap))
  ...

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.3 Initial beta release
