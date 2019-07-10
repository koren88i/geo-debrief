<template>
    <div style="display: none;">
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
  import {PruneCluster, PruneClusterForLeaflet} from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
  import {findRealParent, propsBinder} from 'vue2-leaflet'
  import {GeoJsonPruneMarker} from './PruneClusterGeoJSON'
  import * as L from 'leaflet'

  export default {
    name: "PruneCluster",
    props: {
      options: {
        type: Object,
        default() {
          return {
            size: 100
          };
        },
      }
    },
    data() {
      return {
        ready: false,
      };
    },
    mounted() {
      this.mapObject = new PruneClusterForLeaflet(100);
      this.mapObject.BuildLeafletMarker = function(geoJsonPruneMarker, position) {
        var a = position;
        a +1;
        return new L.GeoJSON(geoJsonPruneMarker.geojson);
        };
      L.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this);
    },
    beforeDestroy() {
      this.parentContainer.removeLayer(this);
    },
    methods: {
      addLayer(layer, alreadyAdded) {
        if (!alreadyAdded) {
          if (!layer.mapObject.getLatLng) {
            const {lat, lng} = layer.mapObject.getBounds().getCenter();
            const geoJsonMarker = new GeoJsonPruneMarker(layer.mapObject, lat, lng);
            this.mapObject.RegisterMarker(geoJsonMarker);
          } else {
            const {lat, lng} = layer.mapObject.getLatLng();
            const marker = new PruneCluster.Marker(lat, lng);
            this.mapObject.RegisterMarker(marker);
          }
        }
      },
      removeLayer(layer, alreadyRemoved) {
        if (!alreadyRemoved) {
          this.mapObject.removeLayer(layer.mapObject);
        }
      },
    },
  }
</script>

<style>
    @import url(~prunecluster/dist/LeafletStyleSheet.css);
</style>