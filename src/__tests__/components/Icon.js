import React from 'react';
import { mount } from 'enzyme';
import Icon from '../../components/Icon';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Icon />', () => {
  it('should match snapshot and have correct element, content before, text & font-size', () => {
    let icon = mount(<Icon edit theme={theme} />);
    expect(icon).toMatchSnapshot();
    expect(icon.text()).toBe('');
    expect(icon.find('i').length).toBe(1);
    expect(icon).toHaveStyleRule('font-size', '1rem');
    icon = mount(<Icon edit big theme={theme} />);
    expect(icon).toHaveStyleRule('font-size', '1.2rem');
    expect(icon).toHaveStyleRule('content', '"\\e906"', {
      modifier: ':before'
    });
  });

  it('should match snapshot and have correct element & color', () => {
    const icon = mount(<Icon edit inverse theme={theme} />);
    expect(icon).toMatchSnapshot();
    expect(icon.find('i').length).toBe(1);
    expect(icon).toHaveStyleRule('color', theme.white);
  });
});
