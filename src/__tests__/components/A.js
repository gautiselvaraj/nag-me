import React from 'react';
import { mount } from 'enzyme';
import A from '../../components/A';
import theme from '../../theme';
import 'jest-styled-components';

describe('<A />', () => {
  it('should match snapshot and have correct text, element & color', () => {
    const link = mount(
      <A href="https://www.gauti.info/nag-me" theme={theme}>
        Link
      </A>
    );
    expect(link).toMatchSnapshot();
    expect(link.text()).toBe('Link');
    expect(link.find('a').length).toBe(1);
    expect(link).toHaveStyleRule('color', theme.main);
  });

  it('should match snapshot and have correct element & color based on inverse prop', () => {
    const link = mount(
      <A inverse href="https://www.gauti.info/nag-me" theme={theme}>
        Link
      </A>
    );
    expect(link).toMatchSnapshot();
    expect(link.find('a').length).toBe(1);
    expect(link).toHaveStyleRule('color', theme.white);
  });
});
