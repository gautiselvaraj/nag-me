import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
`;

export default ({children}) => <Heading>{children}</Heading>
