import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import H1 from './H1';
import Button from './Button';
import Icon from './Icon';
import A from './A';

const HeaderWrap = styled.header`
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
  height: 18px;
  text-align: center;
`;

let Header = ({ nagIndex, nagNew }) => (
  <HeaderWrap>
    <Link>
      <A
        href="https://www.gauti.info/nag-me"
        target="_blank"
        title="More information about Nag Me"
      >
        <Icon inverse question />
      </A>
    </Link>
    <Heading>
      <Button reset title="Nags Index" onClick={() => nagIndex()}>
        <H1>Nag Me</H1>
      </Button>
    </Heading>
    <Link>
      <Button reset title="Create a nag" onClick={() => nagNew()}>
        <Icon inverse add />
      </Button>
    </Link>
  </HeaderWrap>
);

Header.propTypes = {
  nagIndex: PropTypes.func.isRequired,
  nagNew: PropTypes.func.isRequired
};

export default Header;
