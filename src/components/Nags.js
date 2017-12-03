import React from 'react';
import styled from 'styled-components';
import Nag from './Nag';

const Nags = styled.ul`
  background-color: ${props => props.theme.greyLightest};
  list-style-type: none;
  margin: 0;
  overflow-x: hidden;
  padding: .5rem;
`;

export default ({nags}) => (
  <Nags>
    {!!nags &&
      nags.map(n => <Nag key={n.id} nag={n} />)
    }
  </Nags>
)
