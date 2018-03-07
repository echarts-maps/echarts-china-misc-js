const fs = require('fs');
const pug = require('pug');
const gulp = require('gulp');
const path = require('path');

gulp.task('template', function() {
  var preview = pug.compileFile(path.join("templates", "preview.pug"));
  var registry = JSON.parse(fs.readFileSync('registry.json'));
  fs.writeFileSync('preview.html', preview(registry));
});
