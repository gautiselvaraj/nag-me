import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchSort from '../../components/SearchSort';
import theme from '../../theme';
import 'jest-styled-components';

describe('<SearchSort />', () => {
  let nagsSearch, nagsSort;

  beforeEach(() => {
    nagsSearch = jest.fn();
    nagsSort = jest.fn();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <SearchSort
          query=""
          nagsSearch={nagsSearch}
          nagsSort={nagsSort}
          theme={theme}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements & styles', () => {
    const searchSort = mount(
      <SearchSort
        query=""
        nagsSearch={nagsSearch}
        nagsSort={nagsSort}
        theme={theme}
      />
    );
    const searchInput = searchSort.find('input[placeholder="Search"]');
    expect(searchInput.length).toBe(1);
    searchInput.simulate('change', { target: { value: 'Search Query' } });
    expect(nagsSearch.mock.calls[0][0]).toBe('Search Query');

    const sortInput = searchSort.find('select#nags_sort');
    expect(sortInput.length).toBe(1);
    sortInput.simulate('change', { target: { value: 'AZ' } });
    expect(nagsSort.mock.calls[0][0]).toBe('AZ');

    expect(searchSort.find('select#nags_sort option').length).toBe(6);
  });
});
