# gulp-preprocess-file

> A Gulp plugin for Preprocess files based off environment configuration. Based on Preprocess package


# Usage

## Install

[Use npm](https://docs.npmjs.com/cli/install).

```
$ npm install --save-dev gulp-preprocess-file
```


## html examples

**Gulpfile**

```js
var preprocess = require('gulp-preprocess-file');
 
gulp.task('test:html', () => {
  gulp.src('./src/*.html')
    .pipe(preprocess({
      context: {
        NODE_ENV: 'production',
        title: 'this is a title',
        cdnFile: function(file) {
          return 'https://cdn.com/' + file
        }
      },
      extension: {
        srcDir: './src/'
      }
    }))
    .pipe(gulp.dest('dist/'))
})
```

**html file**

```html
<body>
<h1><!-- @echo title --></h1>
<!-- @include ./text.html -->

<!-- @if NODE_ENV!='production' -->
<script src="./libs/jquery.min.js"></script>
<!-- @endif -->
<!-- @if NODE_ENV='production' -->
<script src="<!-- @exec cdnFile('dist/jquery.min.js') -->"></script>
<!-- @endif -->
<script>
var title = '<!-- @echo title -->' || 'Title'
</script>
</body>
```



## Javascript/css examples

**Gulpfile**

```js
var preprocess = require('gulp-preprocess-file');

gulp.task('test:js', () => {
  gulp.src(['./script/*.js'])
    .pipe(preprocess({
      context: {
        NODE_ENV: 'production',
        name: 'John',
      },
      extension: {
        type: 'js'
      }
    }))
    .pipe(gulp.dest('dist/'))
})
```



**test.js file**

```js
var ENV = '/* @echo NODE_ENV */' || 'development'

/* @if NODE_ENV='production' **
console.log('production')
/* @endif */

// @if NODE_ENV='production'
console.log('my name is /* @echo name */')
// @endif
```



more: [preprocess#configuration](https://github.com/jsoverson/preprocess#configuration)



# API

```js
preprocess(options)
```

**options**

Type: `Object`

more: [preprocess#api](https://github.com/jsoverson/preprocess#api)



**options.context**

Type: `Object`

more: [preprocess#context](https://github.com/jsoverson/preprocess#context)



**options.extension**

Type: `Object`

more: [preprocess#options](https://github.com/jsoverson/preprocess#options)



# License

`gulp-preprocess-file` Based on [Preprocess](https://github.com/jsoverson/preprocess) package

MIT © [Mervin](https://github.com/mengqing723)
