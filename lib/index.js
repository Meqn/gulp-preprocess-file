const through = require('through2');
const path = require('path')
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const _ = require('lodash')
const pp = require('preprocess');

const PLUGIN_NAME = 'gulp-preprocess-file';

function gulpPreprocessFile(context, options) {
  context = _.merge({
    NODE_ENV: 'development'
  }, process.env, context)

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

    context.srcDir = context.srcDir || path.dirname(file.path)
    options = _.isEmpty(options) ? getFileType(file.path) : options

    if (file.isBuffer()) {
      var content = pp.preprocess(file.contents.toString(), context, options)
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
