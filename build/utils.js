const gulp = require('gulp');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
var mapshaper = require('mapshaper');
var fs = require('fs');
var maker = require("echarts-mapmaker/src/maker")
const pinyin = require("pinyin");
const path = require("path");
const constants = require("./constants");

function merge_geojson(files){
  for(i = 0; i< (files.length-1); i++){
    if (i==0){
      maker.merge(files[i+1] + '.geojson', files[i] + '.geojson');
    }else{
      maker.merge(files[i+1] + '.geojson', 'merged_' + files[i] + '.geojson');
    }
  }
  return 'merged_' + files[files.length-1] + '.geojson';
}


function disolve_internal_borders(js_file, output_file, map_name){
  return new Promise((resolve, reject)=>{
    var geojson_file = '1.geojson';
    maker.decompress(js_file, geojson_file);
    console.log(js_file);
    disolve(geojson_file +' -dissolve2 -o 2.geojson').then(()=>{
      transform('2.geojson', output_file, map_name);
      resolve()
    }, (error)=>{console.log(error)});
  });
}

function disolve(command){
  return new Promise((resolve, reject) => {
    mapshaper.runCommands(command, (error) => {
      if(error){reject(error);};
      resolve();
    });
  });
}


//geojson对象
function Geojson() {
    this.type  = "FeatureCollection";
    this.features =[];
}


function transform(geojson, geojson4echarts, mapName){
  fs.readFile(geojson, 'utf8', function (err, data) {
    if(err)throw err;
    var shaper = JSON.parse(data);
    var echartsJson = new Geojson();
    echartsJson.features = [
      {
        "type": "Feature",
        "properties": {
          "name": mapName
        },
        "geometry": shaper.geometries[0]
      }
    ];

    fs.writeFileSync(geojson4echarts, JSON.stringify(echartsJson));
  })
}

function getPinyin(Chinese_words){
    const py = pinyin(Chinese_words, {
	    style: pinyin.STYLE_TONE2
	});
    return py.join('_');
}


function make_merged_js(files, mapName){
  var targetFile = getPinyin(mapName) + '.js';
  var merged = merge_geojson(files);
  maker.makeJs(merged, targetFile, mapName);
  console.log('----');
  gulp.src(['./' + targetFile])
    .pipe(rename({dirname: ''}))  
    .pipe(minify({
      noSource:true,
      ext: {min: ".js"}
    }))
    .pipe(gulp.dest(constants.dist));
  console.log('----');  
}


module.exports = {
  disolve_internal_borders: disolve_internal_borders,
  merge_geojson: merge_geojson,
  make_region_js: make_merged_js
}
