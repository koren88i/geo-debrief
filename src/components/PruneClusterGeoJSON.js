import {PruneCluster} from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
// import * as L from 'leaflet';

class GeoJsonPruneMarker extends PruneCluster.Marker {
  constructor(geoJsonLayer, lat, lng, data = {}, category, weight = 1, filtered = false) {
    // const tmp = new GeoJSONClusterable(geojson);
    // const {lat, lng } = geojson.getLatLng();
    super(lat, lng, data, category, weight, filtered);
    this.geojson = geoJsonLayer.toGeoJSON();
  }
}

export {GeoJsonPruneMarker};

// class GeoJSONClusterable extends L.GeoJSON {
//   initialize(geoJson, options) {
//     super.initialize(geoJson, options);
//     this._latlng = this.getBounds().getCenter();
//   }
//
//   getLatLng() {
//     return this._latlng;
//   }
//
//   setLatLng() {}
// }