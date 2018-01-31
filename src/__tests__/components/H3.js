import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import H3 from '../../components/H3';
import theme from '../../theme';
import 'jest-styled-components';

describe('<H3 />', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<H3 theme={theme}>Heading 3</H3>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct text & element', () => {
    const h3 = mount(<H3 theme={theme}>Heading 3</H3>);
    expect(h3.text()).toBe('Heading 3');
    expect(h3.find('h3').length).toBe(1);
  });
});
