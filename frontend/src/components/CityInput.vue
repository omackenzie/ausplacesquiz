<script>
import { places } from '../places.js';
export default {
  name: 'CityInput',
  emits: ['newPlace', 'updateState'],
  data() {
    return {
      placeInput: '',
      errorPlaceName: '',
      timeout: ''
    }
  },
  methods: {
    submit() {
      let result = places.filter(place => place.name.toLowerCase() == this.placeInput.toLowerCase() && place.state == this.currentState);
      if (result.length > 0) {
        for (let place of result) {
          this.$emit('newPlace', {name: place.name, lat: place.lat, lng: place.lng, state: place.state});
        }
        this.errorPlaceName = '';
      } else {
        clearTimeout(this.timeout);
        this.errorPlaceName = this.placeInput;
        this.timeout = setTimeout(() => {
          this.errorPlaceName = '';
        }, 3000);
      }
      this.placeInput = '';
    },
    stateChange(event) {
      this.$emit('updateState', event.target.value);
    }
  },
  props: ['currentState']
}
</script>

<template>
  <div class="flex w-full justify-center">
    <input @keyup.enter="submit" v-model="placeInput" autofocus type="text" placeholder="Type here" class="input input-bordered input-primary mr-2 w-full max-w-xs" />
    <select @change="stateChange" class="select select-primary">
      <option disabled>Select State</option>
      <option value="ACT">Australian Capital Territory</option>
      <option value="NSW" selected>New South Wales</option>
      <option value="NT">Northern Territory</option>
      <option value="QLD">Queensland</option>
      <option value="SA">South Australia</option>
      <option value="TAS">Tasmania</option>
      <option value="VIC">Victoria</option>
      <option value="WA">Western Australia</option>
    </select>
  </div>
  <div v-if="errorPlaceName.length > 0" class="alert alert-error shadow-lg absolute w-96 top-6 alert-box">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>"{{ errorPlaceName }}" is not an accepted place in {{ currentState }}.</span>
    </div>
  </div>
</template>

<style>
  .alert-box {
    animation: alert-box 0.5s ease;
  }

  @keyframes alert-box {
    0% {
      top: -10%;
    }
    100% {
      top: 1.5rem;
    }
  }
</style>
