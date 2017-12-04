import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Search = styled.div`
  position: relative;

  input {
    padding-left: 20px;
  }

  &:before {
    color: ${props => props.theme.greyLight};
    content: '\\e986';
    font-family: icons;
    font-size: 0.5rem;
    left: 7px;
    position: absolute;
    top: 7px;
  }
`;

export default ({ handleKeyup }) => (
  <Search>
    <Input
      type="search"
      small
      search
      placeholder="Search"
      onKeyUp={handleKeyup}
    />
  </Search>
);
