var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker");

gulp.task('split_geojson', function(){
  maker.splitAsGeojson('./node_modules/echarts/map/json/china.json', '.');
});
