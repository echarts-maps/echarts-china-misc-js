var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('华南', function(){
  utils.make_region_js(['香港', '广东', '广西', '海南'], '华南');
});


gulp.task('华北', function(){
  utils.make_region_js(['河北', '内蒙古', '山西', '北京', '天津'], '华北');
});





