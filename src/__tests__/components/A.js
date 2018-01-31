import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import A from '../../components/A';
import theme from '../../theme';
import 'jest-styled-components';

describe('<A />', () => {
  describe('default link', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <A href="https://www.gauti.info/nag-me" theme={theme}>
            Link
          </A>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct text, element & color', () => {
      const link = mount(
        <A href="https://www.gauti.info/nag-me" theme={theme}>
          Link
        </A>
      );
      expect(link.text()).toBe('Link');
      expect(link.find('a').length).toBe(1);
      expect(link).toHaveStyleRule('color', theme.main);
    });
  });

  describe('inverse link', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <A inverse href="https://www.gauti.info/nag-me" theme={theme}>
            Link
          </A>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element & color based on inverse prop', () => {
      const link = mount(
        <A inverse href="https://www.gauti.info/nag-me" theme={theme}>
          Link
        </A>
      );
      expect(link.find('a').length).toBe(1);
      expect(link).toHaveStyleRule('color', theme.white);
    });
  });
});
