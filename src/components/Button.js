import React from 'react';
import styled, {css} from 'styled-components';

const ButtonStyles = css`
  color: ${props => props.theme.white};
  box-sizing: border-box;
  font-size: .85rem;
  line-height: ${props => props.small ? '1.5rem' : '2rem'};
  text-decoration: none;
  text-transform: uppercase;
  transition-duration: .5s;
  transition-property: background-color;
`;

const Button = styled.button`
  background-color: ${props => props.reset ? 'transparent' : props.theme.main};
  border: ${props => props.reset ? '0' : `1px solid ${props => props.theme.mainDarken}`};
  cursor: pointer;
  display: inline-block;
  padding: ${props => props.reset ? '0' : '0 .75rem'};
  ${props => props.reset ? '' : ButtonStyles};

  &:hover {
    background-color: ${props => props.reset ? 'transparent' : props.theme.mainLighten};
  }
`;

const Link = Button.withComponent('a');

export default ({children, link, ...otherProps}) => (
  link ?
  <Link {...otherProps}>{children}</Link> :
  <Button {...otherProps}>{children}</Button>
);
