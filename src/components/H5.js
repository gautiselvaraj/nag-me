import React from 'react';
import styled from 'styled-components';

const Heading = styled.h5`
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

export default ({ children, ...otherProps }) => (
  <Heading {...otherProps}>{children}</Heading>
);
