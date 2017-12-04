import React from 'react';
import styled from 'styled-components';
import Label from './Label';

const InputWrap = styled.div`
  display: flex;
  flex-direction: ${props => props.inline ? 'row' : 'column'};
`;

const InputError = styled.div`
  color: red;
  font-size: .85rem;
  margin-top: 5px;
`;

const Input = styled.input`
  border: 1px solid ${props => props.error ? 'red' : props.theme.greyLighter};
  border-radius: ${props => props.search ? '1rem' : '5px'};
  box-sizing: border-box;
  font-size: ${props => props.small ? '.85rem' : '1rem'};
  height: ${props => props.small ? '1.5rem' : '2rem'};
  padding: 0 .35rem;
  ${props => props.inline ? '' : 'width: 100%;'};
`;

export default ({label, error, id, ...otherProps}) => (
  <InputWrap {...otherProps}>
    {!!label &&
      <Label htmlFor={id} {...otherProps}>{label}</Label>
    }
    <Input id={id} error={error} {...otherProps} />
    {!!error &&
      <InputError>{error}</InputError>
    }
  </InputWrap>
)
