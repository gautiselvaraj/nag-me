import React from 'react';
import styled from 'styled-components';
import H1 from './H1';
import Button from './Button';

const Header = styled.header`
  align-items: center;
  background-color: ${props => props.theme.greyLightest};
  border-bottom: 1px solid ${props=> props.theme.greyLighter};
  display: flex;
  padding: 10px;
`;

const Heading = styled.div`
  flex-grow: 1;
`;

const Link = styled.div`
  flex: 0 0 20px;
`;

export default () => (
  <Header>
    <Heading>
      <H1>Nag Me</H1>
    </Heading>
    <Link>
      <Button link circle href="https://www.gauti.info/nag-me" target="_blank" title="More information about Nag Me">
        ?
      </Button>
    </Link>
  </Header>
);
