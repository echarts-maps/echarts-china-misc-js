var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('中华地区', function(){
  utils.make_region_js(['香港', '广东', '广西', '海南'], '华南');
  utils.make_region_js(['河北', '内蒙古', '山西', '北京', '天津'], '华北');
  utils.make_region_js(['河南', '湖北', '湖南'], '华中');
  utils.make_region_js(['上海', '江苏', '浙江', '安徽', '福建', '山东', '台湾', '江西'], '华东');
  utils.make_region_js(['宁夏','新疆','青海','陕西','甘肃'], '西北');
  utils.make_region_js(['四川', '云南', '贵州', '西藏', '重庆'], '西南');
  utils.make_region_js(['台湾', '香港', '澳门'], '台港澳');
  utils.make_region_js(['辽宁', '吉林', '黑龙江'], '东北');
});

gulp.task('中国区块', ()=>{
  utils.disolve_internal_borders(path.join(constants.dist, 'hua2_bei3.js'), 'hua_bei.geojson', '华北').then(()=>{
    utils.disolve_internal_borders(path.join(constants.dist, 'hua2_nan2.js'), 'hua_nan.geojson', '华南').then(()=>{
      maker.merge('hua_bei.geojson', 'hua_nan.geojson');
      maker.makeJs('merged_hua_bei.geojson', path.join(constants.dist, 'china-regions.js'), '中国区块');
    });
  });
})


