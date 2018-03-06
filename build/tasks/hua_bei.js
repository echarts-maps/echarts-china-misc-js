var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('华北', function(){
  var files = ['河北', '内蒙古', '山西', '北京', '天津'];
  var merged = utils.merge_geojson(files);
  maker.makeJs(merged, path.join(constants.dist, 'hua_bei.js'), '华北');
});

