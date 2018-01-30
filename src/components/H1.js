import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  color: ${props => props.theme.white};
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
`;

export default ({ children, ...otherProps }) => (
  <Heading {...otherProps}>{children}</Heading>
);
