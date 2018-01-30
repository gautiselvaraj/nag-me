import React from 'react';
import { mount } from 'enzyme';
import H1 from '../../components/H1';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H1 />', () => {
  it('should match snapshot and have correct text, element & color', () => {
    const h1 = mount(<H1 theme={theme}>Heading 1</H1>);
    expect(h1).toMatchSnapshot();
    expect(h1.text()).toBe('Heading 1');
    expect(h1.find('h1').length).toBe(1);
    expect(h1).toHaveStyleRule('color', theme.white);
  });
});
