import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Select from './Select';

const SearchSort = styled.div`
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

export default () => (
  <SearchSort>
    <SearchWrap>
      <Search />
    </SearchWrap>
    <SortWrap>
      <Select small inline id="nags_sort" label="Sort By">
        <option>Next Nag</option>
        <option>Last Nag</option>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Latest First</option>
        <option>Oldest First</option>
      </Select>
    </SortWrap>
  </SearchSort>
);
