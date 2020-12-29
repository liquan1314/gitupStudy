import {Component, OnInit} from '@angular/core';
import * as shpjs from "shpjs";
import {Latlng} from '../../classes/latlng';
import Polyline = google.maps.Polyline;
// import shp from 'shpjs';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.component.html',
  styleUrls: ['./childs.component.scss']
})
export class ChildsComponent {

  constructor() {
  }

  //创建标记的数据
  locations = [
    {lat: -31.56391, lng: 147.154312,},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
  ];
  uluru = {lat: -25.344, lng: 131.036};
  map: any;  //创建地图
  markers: any; //创建标记
  flightPaths: any; //多边形
  infoWindow: any; //窗口对象
  uploadFile: any; //上传文件对象
  //初始化地图
  newMap(value) {
    var divMap = document.querySelector('#map');
    var that = this;
    //创建一个地图对象
    this.map = new google.maps.Map(document.querySelector('#map'), {
      zoom: 5,  //这是显示地图的缩放，缩放的值越高，地图就越清晰
      center: value,  //这是地图的中心点，让地图显示在我们选中的区域
    })
  }
  //点击鼠标创建创建标记
  newMarker() {
    var that = this
    that.markers = that.locations.map((location, i) => {
      return new google.maps.Marker({
        position: location,
        map: that.map,
        title: `${i}`,
        label: `${i + 1}`
      })
    })
  }

  //改变中心点
  changeCenter(value) {
    this.map.setCenter({
      lat: value.lat,
      lng: value.lng
    })
  }
  //删除标记
  deleteMarker() {
    this.markers.map((item) => {
      item.setMap(null)
    })
  }
  //划线操作，根据我们得到的数据 Polyline绘制折线
  painImg() {
    var that = this;
    const flightpath = new google.maps.Polyline({
      path: that.locations, //这是路线的坐标点
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 0.5,
      strokeWeight: 2
    })
    this.deleteMarker()
    flightpath.setMap(that.map);
  }
  //绘制多边形的函数
  painMoreImg() {
    //flightpaths相当于是我们绘制了一个多边形，如果我们想在地图上展示它，我们就需要把它放到地图上
    this.flightPaths = new google.maps.Polygon({
      paths: this.locations, //这是指定多边形的路径
      // strokeColor: '#f0f', //绘制多边形线条的颜色
      // strokeOpacity: .6, //绘制多边形线条的透明度
      // // strokeWeight: 2,  //绘制线条的厚度
      // // fillColor: '#0ff', //填充颜色
      // fillOpacity: .6, //填充颜色的透明度
    })
    this.flightPaths.setMap(this.map)
    console.log(this.flightPaths.getPath().getAt(2).toString())
  }

  changeColor() {
    this.flightPaths.setOptions({
      fillColor: 'red'
    });
    console.log(1)
    console.log(this.flightPaths.fillColor)
  }

  importData() {
  }

  //在地图上生成一个infoWindow
  producetInfoWindow() {
    alert(1)
    let infoWindow = new google.maps.InfoWindow({
      content: 'hello google'
    })
    const marker = new google.maps.Marker({
      position: this.uluru,
      map: this.map,
    })
    infoWindow.open(this.map, marker)
  }
  //导入数据生成的多边形
  Ploygonpain(value){
    let that = this;
    //导入的数据，被转换为geoJSON在转换为坐标点，再到这的生成多边形 Ploygon
    let ployGon = new google.maps.Polygon({
      paths:value,
      strokeColor:'red',
      strokeOpacity:.6,
      strokeWeight:2,
      fillColor:'red',
    })

    ployGon.setMap(that.map)
  }
  // twoMap(value){
  //   let map = new google.maps.Map(document.getElementById('app'),{
  //     center:{lat: -25.344, lng: 131.036},
  //     zoom:4,
  //   })
  //   let polygon = new google.maps.Polygon({
  //       paths:value,
  //       fillColor:'red',
  //       strokeColor:'yellow'
  //   })
  //   polygon.setMap(map)
  //   polygon.addListener('click',(event)=>{
  //     console.log(event.latLng.lat(),event.latLng.lng())
  //   })
  // }
  //使用h5自带的方法 fileRead把shapfile解析成二进制，然后转为Geojson文件
  changShap() {
    console.log(this)
    let that = this;
    let reader = new FileReader(); //实例化一个reader对象，对shapefile文件进行读取
    reader.readAsArrayBuffer(this.uploadFile.files[0]); //解析我上传的文件
    reader.onerror = function () {
      console.log('解析出错了')
    }
    reader.onloadstart = function () {
      console.log('解析开始')
    }
    reader.onprogress = function () {
      console.log('解析正在加载')
    }
    reader.onload = function () {
      var fileData = this.result; //fileData就是我们读取到的二进制文件
      //2.我们通过引入shapfile文件进行解析二进制那个转换为GeoJson文件
      let shapfile = require('shapefile');

      shapfile.read(fileData).then(geoJson => {
        console.log(geoJson)
        // const geoFeatures = that.convertToFeatures(geoJson);//对geoJSON对象数据进行处理
        // const mapData = new google.maps.Data();  //创建google map数据层
        // // console.log(geoFeatures)
        // //  把数据显示在数据层上
        // mapData.addGeoJson({  //返回一个数组 parsed json  序列化
        //   type: 'FeatureCollection',
        //   features: geoFeatures
        // });
        // console.log(mapData)
        // mapData.setMap(that.map);  //把数据层显示在地图上
        //设置地图上的数据层的样式
        // mapData.setStyle({
        //   fillColor:'yellow',
        //   strokeWeight:2,
        //   strokeColor:'red'
        // })
        // return;
        //features  特征
        //geometry  几何
        //coordinates  坐标
        const eqfeed_callback = function (geoJson) {
          for (let i = 0; i <geoJson.features.length; i++) {
            let arr:any[] = [] //MultiPolygon多变型的数组 一个feature就是一个数组
            const coords = geoJson.features[i].geometry.coordinates; //得到一个数组
            let type = coords.length;  //geoJson.features[i].geometry.type;  //得到当前几何的类型是什么，geoJSON的对象类型可以是point ploygon lineString
            if(type !== 1 ){
              console.log(coords.length)
              //解析MultiPolygon的多边形的数据
              if(coords[0].length === 1){
                for (let j = 0; j < coords.length; j++) {  //便利coords里面的数组
                  let arr1:any[] = []
                  for (let h = 0; h < coords[j].length; h++) {
                    for (let k = 0; k < coords[j][h].length; k++) {
                      let str = new Latlng();
                      str.lat = coords[j][h][k][1];
                      str.lng = coords[j][h][k][0];
                      arr1.push(str)
                    }
                  }
                  arr.push(arr1)
                }
                that.Ploygonpain(arr)
              // }else if(coords[0].length !==1){
              //   let MulityPolygon:any[] = [] //Polygon多变型的数组 一个feature就是一个数组 下面是对polygon的坐标解析
              //   for (let j=0;j<coords.length;j++){
              //     for(let h=0;h<coords[j].length;h++) {
              //       let str = new Latlng(); //生成坐标点
              //       str.lat = coords[j][h][1];
              //       str.lng = coords[j][h][0];
              //       MulityPolygon.push(str);
              //     }
              //   };
              //   that.Ploygonpain(MulityPolygon)
              }
            }
            else if(type === 1){
              let arr12:any[] = []
              //解析Ploygon的数据
              let arrMulity:any[] = [] //Polygon多变型的数组 一个feature就是一个数组 下面是对polygon的坐标解析
              for (let j=0;j<coords.length;j++){
                  for(let h=0;h<coords[j].length;h++) {
                      let str = new Latlng(); //生成坐标点
                      str.lat = coords[j][h][1];
                      str.lng = coords[j][h][0];
                      arrMulity.push(str);
                  }
                };
              // that.Ploygonpain(arrMulity)
            }

          }
        }
        eqfeed_callback(geoJson)
      })
    }
  }

  ngAfterViewInit(): void {
    this.newMap(this.uluru)
    this.uploadFile = document.getElementById('uploadFile');
  }

  convertToFeatures(data: any){
    // Google map API is only support Feature and FeatureCollection.
    let geoFeatures = [];

    if (Array.isArray(data)) {
      data.forEach((item) => {
        geoFeatures = geoFeatures.concat(this.convertToFeatures(item));
      });
    } else {
      //进行判断，判断geoJson数据里面的类型时features 还是 featuresCollection 还是GeometryCollection
      switch (data.type) {
        case 'FeatureCollection':
          geoFeatures = data.features;
          break;
        case 'Feature':
          geoFeatures.push(data);
          break;
        case 'GeometryCollection':    //返回一个
          geoFeatures = data.geometries.map((item) => {
            return {
              type: 'Feature',
              properties: {},
              geometry: item, //几何类型
            };
          });
          break;
        default:
          geoFeatures.push({
            type: 'Feature',
            properties: {},
            geometry: data
          });
      }
    }

    return geoFeatures;
  }

}
