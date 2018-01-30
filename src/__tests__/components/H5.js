import React from 'react';
import { mount } from 'enzyme';
import H5 from '../../components/H5';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H5 />', () => {
  it('should match snapshot and have correct text & element', () => {
    const h5 = mount(<H5 theme={theme}>Heading 5</H5>);
    expect(h5).toMatchSnapshot();
    expect(h5.text()).toBe('Heading 5');
    expect(h5.find('h5').length).toBe(1);
  });
});
