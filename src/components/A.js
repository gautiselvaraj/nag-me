import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: ${props => props.inverse ? props.theme.white : props.theme.main};
  text-decoration: none;

  &:hover {
    color: ${props => props.inverse ? props.theme.greyLighter : props.theme.mainLighten};
  }
`;

export default ({children, ...otherProps}) => <Link {...otherProps}>{children}</Link>
