# gulp-preprocess-file

A Gulp plugin for Preprocess files based off environment configuration. Based on Preprocess package


# Usage

## Install

[Use npm](https://docs.npmjs.com/cli/install).

```
$ npm install --save-dev gulp-preprocess-file
```


## Examples

**Gulpfile**

```js
var preprocess = require('gulp-preprocess-file');
 
gulp.task('html', function() {
  gulp.src('./src/*.html')
    .pipe(preprocess({
      context: {
        NODE_ENV: 'production',
        title: 'Hello gulp'
      }
    }))
    .pipe(gulp.dest('./dist/'))
});
```

**html file**

```html
<body>

  <h1><!-- @echo title --></h1>
  <!-- @include ./includes/text.html -->

  <!-- @if NODE_ENV='production' -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
  <!-- @endif -->
  <script>
  var title = '<!-- @echo title -->' || 'Default'
  </script>
</body>
```


more: [preprocess](https://github.com/jsoverson/preprocess)



# License

`gulp-preprocess-file` Based on [Preprocess](https://github.com/jsoverson/preprocess) package

MIT © [Mervin](https://github.com/mengqing723)
