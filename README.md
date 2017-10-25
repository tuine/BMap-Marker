# BMap-Marker

百度地图多点标注，添加数据源，可选择可搜索  
http://git.tuine.me/BMap-Marker 

**搜索组件→_→**[search-select](https://github.com/tuine/search-select)

---
#功能介绍
* 自定义内容
* 自定义标注图标
* 文本框联动选择+搜索
* 多个标注
* 多城市多地点定义

---

#实例
```javascript
var all_data = [[{"title":{"text":"北京北站","className":"title"},"point":{"lng":"116.359425","lat":"39.953220"}
                    ,"content":{"text":["地址：北京北站","电话：000000000"],"className":"content"}},{"title":{"text":"北京欢乐谷","className":"title"}
                    ,"point":{"lng":"116.501717","lat":"39.874192"},"content":{"text":["地址：北京欢乐谷"],"className":"content"}}]
                    ,[{"title":{"text":"天津西站","className":"title"},"point":{"lng":"117.169986","lat":"39.164270"}
                    ,"content":{"text":["地址：天津西站"],"className":"content"}}]];//地图数据源。text表示文本内容
 var map_obj  = new BaiduMap({
      id: "container2",
      type: ["地图", "卫星", "三维"],
      level: 12,
      zoom: true,//缩放
      width: 0,//标注宽
      height: 0,//标注高
      point: {
          lng: lng,//初始经纬度
          lat: lat
      },
      icon: {
          url: "img/pos.png",//指示标图片
          width: 36,
          height: 36
      }
  }, all_data);
```
---
#Other  
简简单单临时项目需求,没太优化
