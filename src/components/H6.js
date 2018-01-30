import React from 'react';
import styled from 'styled-components';

const Heading = styled.h6`
  font-size: 0.95rem;
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
`;

export default ({ children, ...otherProps }) => (
  <Heading {...otherProps}>{children}</Heading>
);
