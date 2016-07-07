var should = require('chai').should();
var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var posthtmlstylus = require('../');

var jsonSample = {
      "someId":"someId",
      "hello":"hello",
      "world":"world",
      "wordX":"wordX",


      "someIdId":"someIdId",
      "hell":"hell",
      "stringToTest":"stringToTest"

    };


describe('posthtml-stylus-modules', function() {
  describe('in buffer mode', function() {

    it('should replace text 1', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('<section id="some-id" class="foo hello world word-x"><span> hello world!</span></section>')
      });

      // Create a prefixer plugin stream
      var mypostHtml = posthtmlstylus(jsonSample);

      // write the fake file to it
      mypostHtml.write(fakeFile);

      // wait for the file to come back out
      mypostHtml.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), '<section id="someId" class="foo hello world wordX"><span> hello world!</span></section>');
        done();
      });

    });


    it('should replace text 2', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('<header id="some-id-id" class="foo bar baz hell string-to-test"><b> another string!</b></header>')
      });

      // Create a prefixer plugin stream
      var mypostHtml = posthtmlstylus(jsonSample);

      // write the fake file to it
      mypostHtml.write(fakeFile);

      // wait for the file to come back out
      mypostHtml.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), '<header id="someIdId" class="foo bar baz hell stringToTest"><b> another string!</b></header>');
        done();
      });

    });

  });
});
