# echarts-china-misc-js

## 简介 - Introduction

中国的各种区域图。

Custom boundaries of regions in China.

# 地图 - Map

| echarts 注册名 | 地区 |
| ------------------|:-------:|
| 苏皖浙             | 苏州、安徽、浙江，三省合体 |
| 华南               | 广东、广西、海南、香港、澳门 |
| 华南2               | 广东、广西、海南(海南诸岛）、香港、澳门 |
| 华北               | 内蒙古、河北、山西、北京，天津 |
| 华中               | 河南、湖北、湖南             |
| 西北               | 宁夏、'新疆、青海、陕西、甘肃 |
| 西南               |   四川、云南、贵州、西藏、重庆|
| 东北               |    辽宁、吉林、黑龙江 |
| 华东               |  上海、江苏、浙江、安徽、福建、山东、台湾、江西|
| 台港澳             | 台湾、香港、澳门 |

## 安装 - Installation

```
npm install echarts-china-misc-js
```

## 版权 license

目前地图来自百度。版权是 MIT。

This projects is NOT associated with official Apache ECharts (incubating) project and is independently maintained by [@chfw](https://github.com/chfw).


## Build instructions for myself

```
gulp manual-hainan
gulp manual-taiwan
gulp 中国七大区
gulp
```

`manual-edited-geojson` contains manually edited 海南诸岛. it has:

1. manual view port from echarts hot fix
2. the view port was manually inserted into it.
