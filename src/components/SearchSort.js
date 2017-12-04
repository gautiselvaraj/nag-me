import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from './Search';
import Select from './Select';

const SearchSortWrap = styled.div`
  align-items: center;
  background-color: ${props=> props.theme.white};
  border-bottom: 1px solid ${props=> props.theme.greyLighter};
  display: flex;
  padding: 5px;
  justify-content: space-between;
`;

const SearchWrap = styled.div`
  flex-grow: 1;
`;

const SortWrap = styled.div`
  color: ${props => props.theme.greyDark};
  margin-left: 10px;
`;

let SearchSort = ({nagsSearch, nagsSort}) => (
  <SearchSortWrap>
    <SearchWrap>
      <Search handleKeyup={e => nagsSearch(e.target.value)} />
    </SearchWrap>
    <SortWrap>
      <Select small inline id="nags_sort" label="Sort By" handleChange={e => nagsSort(e.target.value)}>
        <option value="nextNag">Next Nag</option>
        <option value="lastNag">Last Nag</option>
        <option value="AZ">A-Z</option>
        <option value="ZA">Z-A</option>
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </Select>
    </SortWrap>
  </SearchSortWrap>
);

SearchSort.propTypes = {
  nagsSearch: PropTypes.func.isRequired,
  nagsSort: PropTypes.func.isRequired
}

export default SearchSort;
