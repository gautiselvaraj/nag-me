import React from 'react';
import styled from 'styled-components';
import H1 from './H1';
import A from './A';

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

const Icon = styled.span`
  align-items: center;
  background-color: ${props=> props.theme.main};
  border-radius: 50%;
  color: ${props=> props.theme.white};
  display: flex;
  font-size: .85rem;
  font-weight: bold;
  height: 20px;
  justify-content: center;
  width: 20px;

  &:hover {
    background-color: ${props=> props.theme.mainLighten};
  }
`;

export default () => (
  <Header>
    <Heading>
      <H1>Nag Me</H1>
    </Heading>
    <Link>
      <A href="https://www.gauti.info/nag-me" target="_blank" title="More information about Nag Me">
        <Icon>?</Icon>
      </A>
    </Link>
  </Header>
);
