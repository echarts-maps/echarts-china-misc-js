var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('华南', function(){
  utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/guangdong.js', 'guangdong.geojson', '广东').then(()=>{
    utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/hainan.js', 'hainan.geojson', '海南').then(()=>{    
      utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/guangxi.js', 'guangxi.geojson', '广西').then(()=>{
        utils.disolve_internal_borders('./node_modules/echarts-china-cities-js/echarts-china-cities-js/xianggang.js', 'xianggang.geojson', '香港').then(()=>{
          utils.disolve_internal_borders('./node_modules/echarts-china-cities-js/echarts-china-cities-js/aomen.js', 'aomen.geojson', '澳门').then(()=>{
            maker.merge('xianggang.geojson', 'aomen.geojson');
            maker.merge('guangdong.geojson', 'merged_xianggang.geojson');
            maker.merge('guangxi.geojson', 'merged_guangdong.geojson');
            maker.merge('hainan.geojson', 'merged_guangxi.geojson');
            maker.makeJs('merged_hainan.geojson', path.join(constants.dist, 'hua_nan.js'), '华南');
          });
        });
      });
    });
  });
});

