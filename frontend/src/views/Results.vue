<script>
import { supabase } from '../supabaseClient.js';
import DisplayMap from '../components/DisplayMap.vue';
import PlacesList from '../components/PlacesList.vue';
import { places } from '../places.js';

export default {
  name: 'Results',
  components: {
    DisplayMap,
    PlacesList
  },
  data() {
    return {
      pageURL: window.location.href,
      resultID: this.$route.params.id,
      namedPlaces: [],
      creationDate: '',
      error: '',
    }
  },
  methods: {
    handlePlaceIDs(placeIDs, createdAt) {
      this.creationDate = new Date(createdAt + 'Z').toLocaleDateString('en-au', { weekday:'long', year:'numeric', month:'short', day:'numeric'});
      for (let placeID of placeIDs) {
        this.namedPlaces.push(places[placeID]);
      }
    }
  },
  created() {
    supabase
      .from('results')
      .upsert({'id': this.resultID})
      .select()
      .then(response => {
        if (response.status == 400) {
          this.error = 'Invalid result ID';
        } else {
          const data = response.data[0];
          this.handlePlaceIDs(Array.from(data.place_ids.split(','), Number), data.created_at)
        }
      });
  }
}
</script>

<template>
  <div v-if="namedPlaces.length > 0">
    <div class="flex flex-col items-center w-full">
      <router-link to="/" class="mt-6 block text-primary">&lt; return home</router-link>
      <h1 class="text-3xl font-bold mt-6 mb-4">
        <span>{{ namedPlaces.length }}</span> <span v-if="namedPlaces.length == 1">place</span><span v-else>places</span> named!
      </h1>
      <h4 class="text-xl">Result submitted on {{ creationDate }}</h4>
      
      <DisplayMap :places="namedPlaces" />

      <span class="mt-2 px-2">Copy results link: <a class="text-primary" :href="pageURL">{{ pageURL }}</a></span>

      <PlacesList :places="namedPlaces" />
    </div>

    <footer class="footer footer-center p-4 mt-4 text-base-content">
      <router-link class="text-primary" to="/credits">Credits</router-link>
    </footer>
  </div>
  <div v-else>
    <div class="flex flex-col items-center w-full">
      <div v-if="error">
        <router-link to="/" class="mt-6 block text-primary">&lt; return home</router-link>
        <h1 v-if="error" class="text-3xl font-bold mt-10">{{ error }}</h1>
      </div>
      <h1 v-else class="text-3xl font-bold mt-10">Loading results...</h1>
    </div>
  </div>
</template>