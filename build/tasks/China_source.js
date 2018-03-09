var fs = require('fs');
var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker");

gulp.task('split_geojson', function(){
  maker.splitAsGeojson('./node_modules/echarts/map/json/china.json', '.');
});

gulp.task('clean_geojson', function(){
  files = ['香港', '广东', '广西', '海南',
           '河北', '内蒙古', '山西', '北京', '天津',
           '河南', '湖北', '湖南',
           '上海', '江苏', '浙江', '安徽', '福建', '山东', '台湾', '江西',
           '宁夏','新疆','青海','陕西','甘肃', '澳门',
           '四川', '云南', '贵州', '西藏', '重庆',
           '辽宁', '吉林', '黑龙江'];
  for(file of files){
    fs.unlinkSync(file + '.geojson');
  }
  
});
