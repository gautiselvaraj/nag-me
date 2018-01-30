import React from 'react';
import { mount } from 'enzyme';
import H6 from '../../components/H6';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H5 />', () => {
  it('should match snapshot and have correct text & element', () => {
    const h6 = mount(<H6 theme={theme}>Heading 6</H6>);
    expect(h6).toMatchSnapshot();
    expect(h6.text()).toBe('Heading 6');
    expect(h6.find('h6').length).toBe(1);
  });
});
