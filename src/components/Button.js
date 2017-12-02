import React from 'react';
import styled, {css} from 'styled-components';

const circleButtonStyles = css`
  border-radius: 50%;
  font-size: .85rem;
  line-height: 25px;
  padding: 0;
  text-align: center;
  width: 25px;
`;

const Button = styled.button`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.main};
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: .85rem;
  line-height: ${props => props.small ? '1.5rem' : '2rem'};
  padding-left .75rem;
  padding-right .75rem;
  text-decoration: none;
  text-transform: uppercase;
  transition-duration: .5s;
  transition-property: background-color;
  ${props => props.circle ? circleButtonStyles : ''};

  &:hover {
    background-color: ${props => props.theme.mainLighten};
  }
`;

const Link = Button.withComponent('a');

export default ({children, link, ...otherProps}) => (
  link ?
  <Link {...otherProps}>{children}</Link> :
  <Button {...otherProps}>{children}</Button>
);
