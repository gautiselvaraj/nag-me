import React from 'react';
import styled from 'styled-components';

const Heading = styled.h3`
  font-size: 1.2rem;
  margin-top: .35rem;
  margin-bottom: .35rem;
`;

export default ({children}) => <Heading>{children}</Heading>
