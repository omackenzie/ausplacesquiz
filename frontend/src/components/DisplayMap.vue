<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LCircle, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  name: 'DisplayMap',
  props: ['places'],
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LTooltip
  },
  data() {
    return {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      zoom: 4.5,
      minZoom: 3,
      maxZoom: 11,
      center: [-24.963907, 134.350432],
      maxBounds: [[-0.300873, 85], [-47.601616, 182]],
      mapOptions: { zoomSnap: 0.5, zoomDelta: 0.5 }
    }
  }
}
</script>

<template>
  <div class="mt-10 px-2" style="width: 960px; height:600px; max-width: 100vw; max-height: 65vh;">
    <l-map :useGlobalLeaflet="false" ref="map" :zoom="zoom" :minZoom="minZoom" :maxZoom="maxZoom" :center="center" :maxBounds="maxBounds" :options="mapOptions" :zoomAnimation="true">
      <l-tile-layer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
      ></l-tile-layer>

      <l-circle v-for="place in places" v-bind:key="place.name" :lat-lng="[place.lat, place.lng]" :radius=3000 color="red" :fill=true fillColor="red">
        <l-tooltip>{{ place.name }}</l-tooltip>
      </l-circle>
    </l-map>
  </div>
</template>

<style>
  .leaflet-container {
    cursor: default !important;
  }

  .leaflet-interactive {
    cursor: default !important;
  }
</style>
