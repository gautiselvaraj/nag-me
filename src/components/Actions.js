import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Select from './Select';

const Actions = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props=> props.theme.greyLighter};
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
`;

export default () => (
  <Actions>
    <Button small>New Nag</Button>
    <div>
      <Select small inline id="nags_sort" label="Sort By">
        <option>Next Nag</option>
        <option>Last Nag</option>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Latest First</option>
        <option>Oldest First</option>
      </Select>
    </div>
  </Actions>
);
