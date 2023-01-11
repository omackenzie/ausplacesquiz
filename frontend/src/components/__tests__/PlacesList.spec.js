import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PlacesList from '../PlacesList.vue';

describe('PlacesList.vue Test', () => {
  let wrapper = shallowMount(PlacesList, {
    propsData: {
      places: [
        {name:'Newcastle',lat:-32.92921,lng:151.77002,state:'NSW'},
        {name:'Sydney',lat:-33.8652,lng:151.2096,state:'NSW'}
      ]
    }
  });

  it('renders table correctly', () => {
    const tableRows = wrapper.findAll('tbody tr');

    // Shows elements of table in correct order (reverse)
    expect(tableRows[0].find('th').text()).toBe('2');
    expect(tableRows[0].findAll('td')[0].text()).toBe('Sydney')
    expect(tableRows[1].find('th').text()).toBe('1');

    // Shows long form of state
    expect(tableRows[0].findAll('td')[1].text()).toBe('New South Wales');
  });
});