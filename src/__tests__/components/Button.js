import React from 'react';
import { mount } from 'enzyme';
import Button from '../../components/Button';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Button />', () => {
  it('should match snapshot and have correct text, element & background-color', () => {
    const button = mount(<Button theme={theme}>Button</Button>);
    expect(button).toMatchSnapshot();
    expect(button.text()).toBe('Button');
    expect(button.find('button').length).toBe(1);
    expect(button).toHaveStyleRule('background-color', theme.main);
  });

  it('should match snapshot and have correct element & background-color based on reset prop', () => {
    const button = mount(
      <Button reset theme={theme}>
        Button
      </Button>
    );
    expect(button).toMatchSnapshot();
    expect(button.find('button').length).toBe(1);
    expect(button).toHaveStyleRule('background-color', 'transparent');
  });

  it('should match snapshot and have correct element & border-radius based on circle prop', () => {
    const button = mount(
      <Button circle theme={theme}>
        Button
      </Button>
    );
    expect(button).toMatchSnapshot();
    expect(button.find('button').length).toBe(1);
    expect(button).toHaveStyleRule('border-radius', '50%');
  });

  it('should match snapshot and have correct element based on link prop', () => {
    const button = mount(
      <Button link href="https://www.gauti.info/nag-me" theme={theme}>
        Link
      </Button>
    );
    expect(button).toMatchSnapshot();
    expect(button.find('a').length).toBe(1);
  });
});
