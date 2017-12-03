import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  ${props => props.inverse ? `color: ${props.theme.white}` : ''};
  font-family: icons;
  font-size: ${props => props.big ? '1.2rem' : '1rem'};
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 1;
  speak: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:before {
    content: ${props => props.edit ? '"\\e906"' :
              props.delete ? '"\\e9ac"' :
              props.question ? '"\\ea09"' :
              props.add ? '"\\ea0a"' :
              props.resume ? '"\\ea1c"' :
              props.pause ? '"\\ea1d"' :
              props.search ? '"\\e986"' : ''}
  }
`;

export default props => <Icon {...props}></Icon>;
