import React from 'react';
import { mount } from 'enzyme';
import H3 from '../../components/H3';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H3 />', () => {
  it('should match snapshot and have correct text & element', () => {
    const h3 = mount(<H3 theme={theme}>Heading 3</H3>);
    expect(h3).toMatchSnapshot();
    expect(h3.text()).toBe('Heading 3');
    expect(h3.find('h3').length).toBe(1);
  });
});
