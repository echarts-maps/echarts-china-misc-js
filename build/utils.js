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
      maker.merge(addGeojsonSuffix(files[i+1]), addGeojsonSuffix(files[i]));
    }else{
      maker.merge(addGeojsonSuffix(files[i+1]), 'merged_' + addGeojsonSuffix(files[i]));
      fs.unlinkSync('merged_' + addGeojsonSuffix(files[i]));
    }
  }
  return 'merged_' + addGeojsonSuffix(files[files.length-1]);
}

function addGeojsonSuffix(afile){
  if(afile.indexOf('.geojson')=== -1){
    return afile + '.geojson';
  }else{
    return afile;
  }
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
  fs.unlinkSync(merged);
  return gulp.src(['./' + targetFile])
    .pipe(rename({dirname: ''}))  
    .pipe(minify({
      noSource:true,
      ext: {min: ".js"}
    }))
    .pipe(gulp.dest(constants.dist));
}

function make_merged_js_2nd(files, mapName){
  var targetFile = getPinyin(mapName) + '.js';
  var merged = merge_geojson(files);
  maker.cutByFile('china-contour.json', merged);
  maker.merge(merged, 'cut_china-contour.json');
  maker.makeJs('merged_' + merged, targetFile, mapName);
  gulp.src(['./' + targetFile])
    .pipe(rename({dirname: ''}))  
    .pipe(minify({
      noSource:true,
      ext: {min: ".js"}
    }))
    .pipe(gulp.dest(constants.dist));
  return 'merged_' + merged;
}


module.exports = {
  disolve_internal_borders: disolve_internal_borders,
  merge_geojson: merge_geojson,
  make_region_js: make_merged_js,
  make_region_js_2nd: make_merged_js_2nd
}
