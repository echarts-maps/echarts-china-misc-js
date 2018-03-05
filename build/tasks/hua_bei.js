var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('华北', function(){
  utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/neimenggu.js', 'neimenggu.geojson', '内蒙古').then(()=>{
    utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/hebei.js', 'hebei.geojson', '河北').then(()=>{    
      utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/shanxi.js', 'shanxi.geojson', '山西').then(()=>{
        utils.disolve_internal_borders('./node_modules/echarts-china-cities-js/echarts-china-cities-js/beijing.js', 'beijing.geojson', '北京').then(()=>{
          utils.disolve_internal_borders('./node_modules/echarts-china-cities-js/echarts-china-cities-js/tianjin.js', 'tianjin.geojson', '天津').then(()=>{
            maker.merge('neimenggu.geojson', 'hebei.geojson');
            maker.merge('shanxi.geojson', 'merged_neimenggu.geojson');
            maker.merge('beijing.geojson', 'merged_shanxi.geojson');
            maker.merge('tianjin.geojson', 'merged_beijing.geojson');
            maker.makeJs('merged_tianjin.geojson', path.join(constants.dist, 'hua_bei.js'), '华北');
          });
        });
      });
    });
  });
});

