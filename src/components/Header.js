import React from 'react';
import styled from 'styled-components';
import H1 from './H1';
import Button from './Button';
import Icon from './Icon';
import A from './A';

const Header = styled.header`
  align-items: center;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.white};
  display: flex;
  padding: 10px;
`;

const Heading = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Link = styled.div`
  flex: 0 0 25px;
  height: 20px;
  text-align: center;
`;

export default () => (
  <Header>
    <Link>
      <A href="https://www.gauti.info/nag-me" target="_blank" title="More information about Nag Me">
        <Icon inverse question />
      </A>
    </Link>
    <Heading>
      <H1>Nag Me</H1>
    </Heading>
    <Link>
      <Button reset title="Add new Nag">
        <Icon inverse add />
      </Button>
    </Link>
  </Header>
);
