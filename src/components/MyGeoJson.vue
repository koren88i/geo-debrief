<script>
  import { optionsMerger, propsBinder, findRealParent, LLayerGroup } from 'vue2-leaflet';
  import { geoJSON, DomEvent, setOptions, Polygon } from 'leaflet';
  export default {
    name: 'MyGeoJson',
    mixins: [LLayerGroup],
    props: {
      geojson: {
        type: [Object, Array],
        custom: true,
        default: () => ({})
      },
      options: {
        type: Object,
        custom: true,
        default: () => ({})
      },
      optionsStyle: {
        type: [Object, Function],
        custom: true,
        default: null
      }
    },
    computed: {
      mergedOptions () {
        return optionsMerger({
          ...this.layerGroupOptions,
          style: this.optionsStyle
        }, this);
      }
    },
    mounted () {
      Polygon.prototype.getLatLng = function() {
        this._latlng = this.getBounds().getCenter();
        return this._latlng;
      };

      Polygon.prototype.setLatLng = function(lat, lng) {
      };

      this.mapObject = geoJSON(this.geojson, this.mergedOptions);
      DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent, true);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(() => {
        this.$emit('ready', this.mapObject);
      });
    },
    beforeDestroy () {
      this.parentContainer.mapObject.removeLayer(this.mapObject);
    },
    methods: {
      setGeojson (newVal) {
        this.mapObject.clearLayers();
        this.mapObject.addData(newVal);
      },
      getGeoJSONData () {
        return this.mapObject.toGeoJSON();
      },
      getBounds () {
        return this.mapObject.getBounds();
      },
      setOptions (newVal, oldVal) {
        this.mapObject.clearLayers();
        setOptions(this.mapObject, this.mergedOptions);
        this.mapObject.addData(this.geojson);
      },
      setOptionsStyle (newVal, oldVal) {
        this.mapObject.setStyle(newVal);
      }
    },
    render () {
      return null;
    }
  };
</script>

<style>
    @import "~leaflet.markercluster/dist/MarkerCluster.css";
    @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>