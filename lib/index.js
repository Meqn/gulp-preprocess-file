var through = require('through2');
var path = require('path')
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var _ = require('lodash')
var pp = require('preprocess');

const PLUGIN_NAME = 'gulp-preprocess-file';

function gulpPreprocessFile(options) {
  var opts = _.merge({}, options)
  var context = _.merge({}, process.env, opts.context)
  var extension

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

    context.srcDir = opts.srcDir || path.dirname(file.path);
    context.NODE_ENV = context.NODE_ENV || 'development';
    extension = _.isEmpty(opts.extension) ? getFileType(file.path) : opts.extension;

    if (file.isBuffer()) {
      var content = pp.preprocess(file.contents.toString(), context, extension)
      file.contents = new Buffer(content)
    }

    this.push(file);
    cb();
  });

  return stream;
};

function getFileType(file) {
  return path.extname(file).split('.').pop() || ''
}

module.exports = gulpPreprocessFile;
