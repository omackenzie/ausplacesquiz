import { describe, it, expect, vi } from 'vitest';
import { shallowMount, flushPromises } from '@vue/test-utils';
import CityInput from '../CityInput.vue';

describe('CityInput.vue Test', () => {
  let wrapper = shallowMount(CityInput, {
    propsData: {
      currentState: 'NSW'
    }
  });

  it('shows error when invalid name entered', async () => {
    vi.useFakeTimers();

    wrapper.vm.placeInput = 'not a real place';
    wrapper.vm.submit();

    await flushPromises();

    expect(wrapper.find('.alert-box').exists()).toBeTruthy();
    expect(wrapper.vm.errorPlaceName).toBe('not a real place');

    // Removes error message after three seconds
    vi.runAllTimers();
    expect(wrapper.vm.errorPlaceName).toBe('');

    vi.restoreAllMocks();
  });

  it('successfully adds town when valid name entered', () => {
    wrapper.vm.placeInput = 'newcastle';
    wrapper.vm.submit();

    expect(wrapper.emitted('newPlace')).toBeTruthy();
    expect(wrapper.vm.errorPlaceName).toBe('');
  });

  it('accepts place names with varying upper/lower case', () => {
    wrapper.vm.placeInput = 'sYdnEY';
    wrapper.vm.submit();

    expect(wrapper.emitted('newPlace')).toBeTruthy();
  });

  it('successfully updates when state is changed', async () => {
    const stateOptions = wrapper.find('select').findAll('option');
    await stateOptions[0].setSelected();
    
    expect(wrapper.emitted('updateState')).toBeTruthy();
  });
});
