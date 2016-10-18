var fs = require('fs');
var temp = require('temp');
var chai = require('chai');
var chaiFs = require('chai-fs');

var originalCwd = process.cwd();

chai.use(chaiFs);

// Automatically track and cleanup files at exit.
temp.track();

exports.setCleanTestCwd = function () {
  var dummyTestDirectory = temp.mkdirSync('fs-jetpack-test');
  process.chdir(dummyTestDirectory);
};

exports.switchBackToCorrectCwd = function () {
  process.chdir(originalCwd);
};

exports.convertToUnixPathSeparators = function (thing) {
  if (Array.isArray(thing)) {
    return thing.map(function (path) {
      return path.replace(/\\/g, '/');
    });
  }
  return thing.replace(/\\/g, '/');
};

exports.mode = function (path) {
  var mode = fs.statSync(path).mode.toString(8);
  return mode.substring(mode.length - 3);
};