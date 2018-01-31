import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import H5 from '../../components/H5';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H5 />', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<H5 theme={theme}>Heading 5</H5>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct text & element', () => {
    const h5 = mount(<H5 theme={theme}>Heading 5</H5>);
    expect(h5.text()).toBe('Heading 5');
    expect(h5.find('h5').length).toBe(1);
  });
});
