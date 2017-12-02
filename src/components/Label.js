import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-size: ${props => props.small ? '.8rem' : '1rem'};
  line-height: ${props => props.small ? '1.5rem' : '2rem'};
  ${props => props.inline ? 'margin-right: 5px;' : ''};
`;

export default ({children, ...otherProps}) => (
  <Label {...otherProps}>
    {children}
  </Label>
);
