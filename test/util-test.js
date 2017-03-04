var util   = require('../lib/util');
var assert = require('assert');


describe('util.toHumanTime()', function() {
  it('Returns correctly formatted time', function() {
    assert.equal(util.toHumanTime(60 * 20 + 30), '20:30');
    assert.equal(util.toHumanTime(60 * 60 * 4 + 60 * 8 + 8), '4:08:08');
    assert.equal(util.toHumanTime(60 * 60 * 4 + 60 * 30 + 8), '4:30:08');
  });
});

describe('util.toHumanSize()', function() {
  it('Returns correctly formatted size', function() {
    assert.equal(util.toHumanSize(1 << 3), '8B');
    assert.equal(util.toHumanSize((1 << 10) * 4.5), '4.5KB');
    assert.equal(util.toHumanSize(0), '0');
  });
});

describe('util.tmpl()', function() {
  describe('With one match', function() {
    it('Returns a templated string', function() {
      var rs = util.tmpl('hello {title}', [{ title: 'world' }]);
      assert.equal(rs, 'hello world');
    });
  });

  describe('With several matches', function() {
    it('Returns a templated string', function() {
      var rs = util.tmpl('The {biganimal} jumped over the {smallanimal}', [{
        biganimal: 'dog',
        smallanimal: 'frog',
      }]);
      assert.equal(rs, 'The dog jumped over the frog');
    });
  });

  describe('Referencing a nested child', function() {
    it('Returns a templated string', function() {
      var rs = util.tmpl('Package is {mypkg.name} {pkg.version.str}', [{
        mypkg: { name: 'ytdl' },
        pkg: { version: { str: 'v0.4.2' } },
        something: { else: 'hey' },
      }]);
      assert.equal(rs, 'Package is ytdl v0.4.2');
    });
  });

  describe('With several context objects', function() {
    it('Returns a templated string', function() {
      var rs = util.tmpl('Video is {title}.{container}', [
        { title: 'super mario' },
        { container: 'mp4' },
      ]);
      assert.equal(rs, 'Video is super mario.mp4');
    });
  });

  describe('With no match', function() {
    it('Returns a templated string', function() {
      var rs = util.tmpl('My name is {name}', [{ what:'nothing here' }]);
      assert.equal(rs, 'My name is {name}');
    });
  });
});
