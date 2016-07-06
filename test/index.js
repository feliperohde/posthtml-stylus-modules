var should = require('chai').should(),
    jsonSample = {
      "someId":"_main_someId",
      "hello":"_main_hello",
      "world":"_main_world",
      "wordX":"_main_wordX",


      "someIdId":"_main_someIdId",
      "hell":"_main_hell",
      "stringToTest":"stringToTest"

    };

var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var posthtmlstylus = require('../');

describe('posthtml-stylus-modules', function() {
  describe('in buffer mode', function() {

    it('should replace text 1', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('<section id="some-id" class="foo hello world word-x"><span> hello world!</span></section>')
      });

      // Create a prefixer plugin stream
      var myPrefixer = posthtmlstylus(jsonSample);

      // write the fake file to it
      myPrefixer.write(fakeFile);

      // wait for the file to come back out
      myPrefixer.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), '<section id="_main_someId" class="foo _main_hello _main_world _main_wordX"><span> hello world!</span></section>');
        done();
      });

    });


    it('should replace text 2', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('<header id="some-id-id" class="foo bar baz hell string-to-test"><b> another string!</b></header>')
      });

      // Create a prefixer plugin stream
      var myPrefixer = posthtmlstylus(jsonSample);

      // write the fake file to it
      myPrefixer.write(fakeFile);

      // wait for the file to come back out
      myPrefixer.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), '<header id="_main_someIdId" class="foo bar baz _main_hell stringToTest"><b> another string!</b></header>');
        done();
      });

    });

  });
});
