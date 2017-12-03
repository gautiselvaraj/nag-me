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

const CircleButtonStyles = css`
  border-radius: 50%;
  height: ${props => props.small ? '1.5rem' : '2rem'};
  text-align: center;
  width: ${props => props.small ? '1.5rem' : '2rem'};

  i {
    position: relative;
    top: 2px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.reset ? 'transparent' : props.theme.main};
  border: ${props => props.reset ? '0' : `1px solid ${props => props.theme.mainDarken}`};
  cursor: pointer;
  display: inline-block;
  padding: ${props => props.reset || props.circle ? '0' : '0 .75rem'};
  ${props => props.reset ? '' : ButtonStyles};
  ${props => props.circle ? CircleButtonStyles : ''};

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
