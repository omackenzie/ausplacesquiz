<script>
  export default {
    props: ['places'],
    methods: {
      stateLongForm(state) {
        const long = {
          'NSW': 'New South Wales',
          'VIC': 'Victoria',
          'QLD': 'Queensland',
          'WA': 'Western Australia',
          'SA': 'South Australia',
          'TAS': 'Tasmania',
          'ACT': 'Australian Capital Territory',
          'NT': 'Northern Territory'
        }
        return long[state];
      }
    }
  }
</script>

<template>
  <div class="overflow-x-auto mt-4 px-2">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th></th>
          <th>Place</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(place, index) in places.slice().reverse()" v-bind:key="place.name">
          <th>{{ places.length - index }}</th>
          <td>{{ place.name }}</td>
          <td>{{ stateLongForm(place.state) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
