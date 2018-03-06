var gulp = require('gulp');
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var maker = require("echarts-mapmaker/src/maker")


gulp.task('华中', function(){
  utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/henan.js', 'henan.geojson', '河南').then(()=>{
    utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/hubei.js', 'hubei.geojson', '湖北').then(()=>{    
      utils.disolve_internal_borders('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/hunan.js', 'hunan.geojson', '湖南').then(()=>{
        maker.merge('hubei.geojson', 'henan.geojson');
        maker.merge('hunan.geojson', 'merged_hubei.geojson');
        maker.makeJs('merged_hunan.geojson', path.join(constants.dist, 'hua_zhong.js'), '华中');
      });
    });
  });
});

