import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../../components/Button';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Button />', () => {
  describe('default button', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(<Button theme={theme}>Button</Button>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct text, element & background-color', () => {
      const button = mount(<Button theme={theme}>Button</Button>);
      expect(button.text()).toBe('Button');
      expect(button.find('button').length).toBe(1);
      expect(button).toHaveStyleRule('background-color', theme.main);
    });
  });

  describe('reset button', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Button reset theme={theme}>
            Button
          </Button>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element & background-color based on reset prop', () => {
      const button = mount(
        <Button reset theme={theme}>
          Button
        </Button>
      );
      expect(button.find('button').length).toBe(1);
      expect(button).toHaveStyleRule('background-color', 'transparent');
    });
  });

  describe('circle button', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Button circle theme={theme}>
            Button
          </Button>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element & border-radius based on circle prop', () => {
      const button = mount(
        <Button circle theme={theme}>
          Button
        </Button>
      );
      expect(button.find('button').length).toBe(1);
      expect(button).toHaveStyleRule('border-radius', '50%');
    });
  });

  describe('link button', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Button link href="https://www.gauti.info/nag-me" theme={theme}>
            Link
          </Button>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element based on link prop', () => {
      const button = mount(
        <Button link href="https://www.gauti.info/nag-me" theme={theme}>
          Link
        </Button>
      );
      expect(button.find('a').length).toBe(1);
    });
  });
});
