/**
 * replace html ids and classes with build classes from json file.
 *
 * @param  {String} json
 * @return {String} html
 */


var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var cheerio = require('cheerio');

// consts
const PLUGIN_NAME = 'posthtml-stylus-modules';

function toDashCase (str) {

  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

}

function posthtml(json) {

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {

      var contentStr = file.contents.toString();
      var contentStrLns = contentStr.match(/[^\r\n]+/g);
      var $ = cheerio.load(contentStr);

      Object.keys(json).forEach(function (key) {

        //replacing classes
        $('.' + toDashCase(key))
            .removeClass(toDashCase(key))
            .addClass(json[key]);

        //replacing ids
        $('#' + toDashCase(key))
            .attr('id', json[key] );

      });

      file.contents =  Buffer($.html().toString());
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = posthtml;
