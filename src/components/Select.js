import React from 'react';
import styled from 'styled-components';
import Label from './Label';

const SelectWrap = styled.div`
  display: flex;
  flex-direction: ${props => props.inline ? 'row' : 'column'};
`;

const Select = styled.select`
  font-size: ${props => props.small ? '.85rem' : '1rem'};
  height: ${props => props.small ? '1.5rem' : '2rem'};
  margin-top: 0;
  margin-bottom: 0;
  ${props => props.inline ? '' : 'width: 100%;'};
`;

export default ({children, label, id, ...otherProps}) => (
  <SelectWrap {...otherProps}>
    {!!label &&
      <Label htmlFor={id} {...otherProps}>{label}</Label>
    }
    <Select id={id} {...otherProps}>
      {children}
    </Select>
  </SelectWrap>
)
