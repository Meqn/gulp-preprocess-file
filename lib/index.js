var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var _ = require('lodash')
var pp = require('preprocess');

const PLUGIN_NAME = 'gulp-preprocess-file';

function gulpPreprocessFile(options) {
  var opts = _.merge({}, options)
  var context = _.merge({}, process.env, opts.context)
  var extension = _.merge({}, opts.extension)

  // create stream
  // function(file, encoding, callback)
  var stream = through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file)
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var content = pp.preprocess(file.contents.toString(), context, extension)
      file.contents = new Buffer(content)
    }

    this.push(file);
    cb();
  });

  return stream;
};

module.exports = gulpPreprocessFile;
