<template>
    <div class="hello" style="height: 100%">
        <vue-slider :included="true" :marks="true" v-model="value" :data="sliderOptions" :fixed="true"></vue-slider>
        <l-map :options="{measureControl:true}" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker-cluster :options="{zoomToBoundsOnClick: false}">
            <div v-for="group in getPolygons()" :key="group.timestamp">
                <!--            <l-polygon v-for="s in group.input"-->
                <!--                       :key="s.properties.rank"-->
                <!--                       :color="s.properties.style.color"-->
                <!--                       :lat-lngs="s.geometry.coordinates"-->
                <!--                       :fill-color="s.properties.style.fillColor"-->
                <!--                       @l-mouseover=change_color(s)>-->
                <!--                <polygon-popup :content="s.properties.data" />-->
                <!--            </l-polygon>-->
                <MyGeoJson v-for="s in group.input"
                            :key="s.properties.rank"
                            :geojson="s"
                            :options="options"
                            :options-style="s.properties.style">
                </MyGeoJson>
                <MyGeoJson v-for="s in group.output"
                            :key="s.properties.rank"
                            :geojson="s"
                           :options="options"
                            :options-style="s.properties.style">
                </MyGeoJson>
                <!--            <l-polygon v-for="s in group.output"-->
                <!--                       :key="s.properties.rank"-->
                <!--                       :color="s.properties.style.color"-->
                <!--                       :fill-color="s.properties.style.fillColor"-->
                <!--                       :lat-lngs="s.geometry.coordinates"-->
                <!--                       @l-mouseover=change_color(s)>-->
                <!--                <polygon-popup :content="s.properties.data" />-->
                <!--            </l-polygon>-->
            </div>
<!--                <l-marker :key="c" v-for="c in getPoints()" :lat-lng="c"></l-marker>-->
<!--                <MyGeoJson :key="g" v-for="g in getGeoJSONs()" :geojson="g"></MyGeoJson>-->
            </l-marker-cluster>
        </l-map>
    </div>
</template>

<script>
  import Vue from 'vue';
  import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
  import {LGeoJson, LMap, LPolygon, LPopup, LTileLayer} from 'vue2-leaflet';
  import {Icon, latLng, DomEvent, GeoJSON} from 'leaflet'
  import {findRealParent, propsBinder} from 'vue2-leaflet'
  import 'leaflet/dist/leaflet.css'
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  import GeoJsonPopup from "./GeoJsonPopup";
  import MyGeoJson from "./MyGeoJson";

  // class MyGeoJSON extends GeoJSON {
  //   getLatLng(){
  //     return super.getBounds().getCenter();
  //   }
  // }

  GeoJSON.prototype.getLatLng = function() {
    return this.getBounds().getCenter();
  };

  // const A = Vue.extend({
  //   mixins: [LGeoJson],
  //   methods: {
  //     getLatLng: function() {
  //       return this.getBounds().getCenter();
  //     }
  //   },
  //   mounted () {
  //     this.mapObject = GeoJSON(this.geojson, this.mergedOptions);
  //     DomEvent.on(this.mapObject, this.$listeners);
  //     propsBinder(this, this.mapObject, this.$options.props);
  //     this.parentContainer = findRealParent(this.$parent, true);
  //     this.parentContainer.addLayer(this, !this.visible);
  //     this.$nextTick(() => {
  //       this.$emit('ready', this.mapObject);
  //     });
  //   }
  // });

  Vue.component('l-map', LMap);
  Vue.component('l-tile-layer', LTileLayer);
  Vue.component('l-polygon', LPolygon);
  Vue.component('l-popup', LPopup);
  Vue.component('l-marker-cluster', Vue2LeafletMarkerCluster);

  delete Icon.Default.prototype._getIconUrl;

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  const polygons = [
    {
      timestamp: 1559059200,
      input: [
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "stay",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'blue',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[35.010057, 32.012681], [35.145061, 32.093511], [35.177096, 32.062481], [35.035227, 31.989389], [35.010057, 32.012681]]]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "stay",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'red',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[35.037515, 32.028853], [35.06116, 32.005565], [35.036753, 31.990683], [34.937597, 32.067653], [34.97192, 32.085108], [35.037515, 32.028853]]]
          }
        }
      ],
      output: [
        {
          "type": "Feature",
          "properties": {
            "rank": 1,
            "data": {
              classification: "stay",
              time: "2018"
            },
            "style": {
              "stroke": true,
              "color": "blue",
              "weight": 4,
              "opacity": 0.5,
              "fill": true,
              "fillColor": 'green',
              "fillOpacity": 0.2,
              "clickable": true
            }
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[35.036753, 32.029944], [35.06116, 32.004069], [35.037515, 31.990481], [35.009294, 32.012479], [35.036753, 32.029944]]]
          }
        }
      ]
    },
    {
      timestamp: 1559059380,
      input: [
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'blue',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[34.985649, 32.001036], [34.953614, 32.025619], [34.865899, 31.957677], [34.897934, 31.938255], [34.985649, 32.001036]]]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'red',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[34.920054, 31.997801], [34.952851, 32.027559], [35.042092, 31.955735], [35.007006, 31.935666], [34.920054, 31.997801]]]
          }
        }
      ],
      output: [
        {
          "type": "Feature",
          "properties": {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            "style": {
              "stroke": true,
              "color": "blue",
              "weight": 4,
              "opacity": 0.5,
              "fill": true,
              "fillColor": 'green',
              "fillOpacity": 0.2,
              "clickable": true
            }
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[34.935309, 31.985693], [34.935309, 32.012479], [34.971081, 32.012479], [34.971081, 31.985693], [34.935309, 31.985693]]]
          }
        }
      ]
    },
    {
      timestamp: 1559059620,
      input: [
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'blue',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[34.904799, 32.041141], [34.852933, 31.971269], [34.817847, 31.991978], [34.878103, 32.053428], [34.904799, 32.041141]]]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            'style': {
              'stroke': true,
              'color': 'red',
              'weight': 4,
              'opacity': 0.5,
              'fill': true,
              'fillColor': 'red',
              'fillOpacity': 0.2,
              'clickable': true
            }
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[34.803355, 32.027559], [34.897934, 31.995213], [34.872764, 31.973858], [34.785812, 32.013975], [34.803355, 32.027559]]]
          }
        }
      ],
      output: [
        {
          "type": "Feature",
          "properties": {
            "rank": 1,
            "data": {
              classification: "move",
              time: "2018"
            },
            "style": {
              "stroke": true,
              "color": "blue",
              "weight": 4,
              "opacity": 0.5,
              "fill": true,
              "fillColor": 'green',
              "fillOpacity": 0.2,
              "clickable": true
            }
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[34.839204, 31.984528], [34.839204, 32.009891], [34.871544, 32.009891], [34.871544, 31.984528], [34.839204, 31.984528]]]
          }
        }
      ]
    }
  ];

  function onEachFeatureFunction (feature, layer) {
    let PopupCont = Vue.extend(GeoJsonPopup);
    let popup = new PopupCont({ propsData: {content: feature.properties.data}});
    layer.bindPopup(popup.$mount().$el);
  }

  export default {
    name: 'HelloWorld',
    components: {LMap, VueSlider, MyGeoJson},
    props: {
      msg: String
    },
    computed: {
      options () {
        return {
          onEachFeature: onEachFeatureFunction
        };
      }
    },
    data: function () {
      return {
        zoom: 9,
        center: latLng(32.012681, 35.010057),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        polygons: polygons,
        value: [polygons[0].timestamp, polygons[0].timestamp + 180],
        sliderOptions: polygons.map(p => p.timestamp)
      }
    },
    methods: {
      change_color(shape) {
        shape.color = '#ee0000';
      },
      getPolygons() {
        const polygons = this.polygons.filter(x => x.timestamp >= this.value[0] && x.timestamp <= this.value[1]);

        return polygons === undefined ? {input: [], output: []} : polygons;
      },
      getPoints() {
        const bla = [];
        for (let i = 0; i< 30000;i++) {
          bla.push([32.86 + 50 * Math.random() - 0.05, 35.35 + 40 * Math.random() - 0.08])
          // bla.push([35,32])
        }
        return bla;
      },
      getGeoJSONs() {
        return polygons[1].input;
      },
      entries(obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array

        while (i--)
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: null;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
