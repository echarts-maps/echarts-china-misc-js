var gulp = require('gulp');
var maker = require("echarts-mapmaker/src/maker")
var constants = require('../constants')
var path = require('path');

gulp.task('苏皖浙', function(){
  maker.decompress('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/zhejiang.js', 'zhejiang.geojson');
  maker.decompress('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/anhui.js', 'anhui.geojson');
  maker.decompress('./node_modules/echarts-china-provinces-js/echarts-china-provinces-js/jiangsu.js', 'jiangsu.geojson');
  maker.merge('zhejiang.geojson', 'anhui.geojson');
  maker.merge('jiangsu.geojson', 'merged_zhejiang.geojson');
  maker.makeJs('merged_jiangsu.geojson', path.join(constants.dist, 'su_wan_zhe.js'), '苏皖浙');
});
