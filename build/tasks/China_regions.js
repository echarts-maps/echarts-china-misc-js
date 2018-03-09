var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('test', function(){
  utils.make_region_js_2nd(['香港', '广东', '广西', '海南'], '华南');
});


gulp.task('中华地区', function(){
  //utils.make_region_js(['香港', '广东', '广西', '海南'], '华南');
  utils.make_region_js(['河北', '内蒙古', '山西', '北京', '天津'], '华北');
  utils.make_region_js(['河南', '湖北', '湖南'], '华中');
  utils.make_region_js(['宁夏','新疆','青海','陕西','甘肃'], '西北');
  utils.make_region_js(['四川', '云南', '贵州', '西藏', '重庆'], '西南');
  utils.make_region_js(['辽宁', '吉林', '黑龙江'], '东北');
  utils.make_region_js(['上海', '江苏', '浙江', '安徽', '福建', '山东', 'taiwan', '江西'], '华东');
  utils.make_region_js(['taiwan', '香港', '澳门'], '台港澳');
});

gulp.task('华南2', () => {
  utils.make_region_js(['香港', '广东', '广西', 'hainan'], '华南2');
});

gulp.task('manual-taiwan', () => {
  utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/taiwan.js', 'raw-taiwan.geojson', '台湾').then(()=>{
    maker.compress('raw-taiwan.geojson', 'taiwan.geojson');
  })
});
gulp.task('manual-hainan', () => {
  utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/hainan.js', 'raw-hainan.geojson', '海南').then(()=>{
    maker.compress('raw-hainan.geojson', 'hainan.geojson');
  })
});


gulp.task('中国七大区', ['split_geojson'], ()=>{
  utils.disolve_internal_borders(path.join(constants.dist, 'hua2_bei3.js'), 'hua_bei.geojson', '华北').then(()=>{
    utils.disolve_internal_borders(path.join(constants.dist, 'hua2_nan2.js'), 'hua_nan.geojson', '华南').then(()=>{
      utils.disolve_internal_borders(path.join(constants.dist, 'hua2_zhong1.js'), 'hua_zhong.geojson', '华中').then(()=>{
        utils.disolve_internal_borders(path.join(constants.dist, 'hua2_dong1.js'), 'hua_dong.geojson', '华东').then(()=>{
          utils.disolve_internal_borders(path.join(constants.dist, 'xi1_bei3.js'), 'xi_bei.geojson', '西北').then(()=>{
            utils.disolve_internal_borders(path.join(constants.dist, 'xi1_nan2.js'), 'xi_nan.geojson', '西南').then(()=>{
              utils.disolve_internal_borders(path.join(constants.dist, 'dong1_bei3.js'), 'dong_bei.geojson', '东北').then(()=>{
                maker.merge('hua_nan.geojson', './manual_edited_geojson/hai_nan_zhu_dao.geojson');
                console.log('sdfadfasdfadsfad');
                maker.merge('hua_bei.geojson', 'merged_hua_nan.geojson');
                maker.merge('hua_zhong.geojson', 'merged_hua_bei.geojson');
                maker.merge('hua_dong.geojson', 'merged_hua_zhong.geojson');
                maker.merge('xi_bei.geojson', 'merged_hua_dong.geojson');
                maker.merge('xi_nan.geojson', 'merged_xi_bei.geojson');
                maker.merge('dong_bei.geojson', 'merged_xi_nan.geojson');
                maker.makeJs('merged_dong_bei.geojson', path.join(constants.dist, 'china-regions.js'), '中国七大区');
              });
            });
          });
        });
      });
    });
  });
})
