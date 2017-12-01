import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: ${props => props.theme.main};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.mainLighten};
  }
`;

export default ({children, ...otherProps}) => <Link {...otherProps}>{children}</Link>
