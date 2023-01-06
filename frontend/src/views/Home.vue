<script>
import { supabase } from '../supabaseClient.js';
import CityInput from '../components/CityInput.vue';
import DisplayMap from '../components/DisplayMap.vue';
import PlacesList from '../components/PlacesList.vue';
import { places } from '../places.js';

export default {
  name: 'Home',
  components: {
    CityInput,
    DisplayMap,
    PlacesList
  },
  data() {
    return {
      namedPlaces: JSON.parse(localStorage.getItem('namedPlaces')) || [],
      currentState: 'NSW'
    }
  },
  methods: {
    addPlace(newPlace) {
      if (!this.namedPlaces.find(place => place.name.toLowerCase() == newPlace.name.toLowerCase() && (place.lat, place.lng) == (newPlace.lat, newPlace.lng))) this.namedPlaces.push(newPlace);
    },
    clearPlaces() {
      localStorage.removeItem('namedPlaces');
      this.namedPlaces = [];
    },
    submitResults() {
      // Clear stored data
      localStorage.removeItem('namedPlaces');

      // Convert named places to list of IDs
      let placeIDs = [];
      for (let namedPlace of this.namedPlaces) {
        placeIDs.push(places.findIndex(place => place.name === namedPlace.name));
      }

      supabase
        .from('results')
        .insert({place_ids: placeIDs.toString()})
        .select()
        .then(response => response.data[0])
        .then(data => this.$router.push({ path: `/results/${data.id}` }));
    }
  },
  watch: {
    namedPlaces: {
      handler() {
        localStorage.setItem('namedPlaces', JSON.stringify(this.namedPlaces));
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col items-center w-full flex-1">
      <h1 class="text-3xl font-bold my-10">Australian Places Quiz</h1>
      <CityInput @newPlace="(place) => addPlace(place)" @updateState="(state) => currentState = state" :currentState="currentState" />
      <DisplayMap :places="namedPlaces" />
      
      <div class="mt-4">
        You have named <span>{{ namedPlaces.length }}</span> <span v-if="namedPlaces.length == 1">place</span><span v-else>places</span> so far.
      </div>

      <div v-if="namedPlaces.length > 0" class="flex w-96 mt-4 gap-x-2 justify-center" style="max-width: 90vw;">
        <label for="end-game-modal" class="btn btn-secondary w-1/2">End Game</label>
        <label for="clear-modal" class="btn btn-error w-1/2">Clear</label>
      </div>

      <details v-if="namedPlaces.length > 0" class="mt-6 max-w-full">
        <summary class="cursor-pointer">View Named Places</summary>
        <PlacesList :places="namedPlaces" class="mx-2" />
      </details>
    </div>

    <footer class="footer footer-center p-4 mt-4 text-base-content">
      <router-link class="text-primary" to="/credits">Credits</router-link>
    </footer>
  </div>

  <input type="checkbox" id="end-game-modal" class="modal-toggle" />
  <div class="modal" style="z-index: 10000">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Finish Game Now?</h3>
      <p class="py-4">You won't be able to enter any more places but can share a link to your results.</p>
      <div class="modal-action">
        <button @click="submitResults" class="btn btn-success">OK</button>
        <label for="end-game-modal" class="btn btn-error">Cancel</label>
      </div>
    </div>
  </div>

  <input type="checkbox" id="clear-modal" class="modal-toggle" />
  <div class="modal" style="z-index: 10000">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Clear</h3>
      <p class="py-4">Are you sure you want to clear?</p>
      <div class="modal-action">
        <label @click="clearPlaces" for="clear-modal" class="btn btn-success">OK</label>
        <label for="clear-modal" class="btn btn-error">Cancel</label>
      </div>
    </div>
  </div>
</template>

<style>
details {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 1em 0;
  width: 800px;
}

summary {
  font-weight: bold;
  margin: -0.5em -1em 0;
  padding: 0.5em 1em;
}

details[open] {
  padding: 0.5em 1em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
}
</style>
