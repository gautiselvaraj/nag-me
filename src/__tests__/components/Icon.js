import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Icon from '../../components/Icon';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Icon />', () => {
  describe('default icon', () => {
    it('should match snapshot', () => {
      const tree = renderer.create(<Icon edit theme={theme} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element, content before, text & font-size', () => {
      let icon = mount(<Icon edit theme={theme} />);
      expect(icon.text()).toBe('');
      expect(icon.find('i').length).toBe(1);
      expect(icon).toHaveStyleRule('font-size', '1rem');
      icon = mount(<Icon edit big theme={theme} />);
      expect(icon).toHaveStyleRule('font-size', '1.2rem');
      expect(icon).toHaveStyleRule('content', '"\\e906"', {
        modifier: ':before'
      });
    });
  });

  describe('inverse link', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(<Icon edit inverse theme={theme} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element & color', () => {
      const icon = mount(<Icon edit inverse theme={theme} />);
      expect(icon.find('i').length).toBe(1);
      expect(icon).toHaveStyleRule('color', theme.white);
    });
  });
});
