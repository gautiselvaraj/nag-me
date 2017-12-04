import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from './Search';
import Select from './Select';

const SearchSortWrap = styled.div`
  align-items: center;
  background-color: ${props => props.theme.white};
  border-bottom: 1px solid ${props => props.theme.greyLighter};
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

export default class SearchSort extends Component {
  static propTypes = {
    query: PropTypes.string,
    nagsSearch: PropTypes.func.isRequired,
    nagsSort: PropTypes.func.isRequired
  };

  state = {
    query: this.props.query ? this.props.query : '',
    sortBy: this.props.sortBy ? this.props.sortBy : ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({ query: nextProps.query ? nextProps.query : '' });
    }

    if (nextProps.sortBy !== this.props.sortBy) {
      this.setState({ sortBy: nextProps.sortBy ? nextProps.sortBy : '' });
    }
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    const { nagsSearch, nagsSort } = this.props;
    const { query, sortBy } = this.state;

    return (
      <SearchSortWrap>
        <SearchWrap>
          <Search
            onChange={e => {
              this.handleInputChange(e);
              nagsSearch(e.target.value);
            }}
            value={query}
            name="query"
          />
        </SearchWrap>
        <SortWrap>
          <Select
            small
            inline
            id="nags_sort"
            label="Sort By"
            onChange={e => {
              this.handleInputChange(e);
              nagsSort(e.target.value);
            }}
            value={sortBy}
            name="sortBy"
          >
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
  }
}
