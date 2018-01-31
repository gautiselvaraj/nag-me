import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Search from '../../components/Search';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Search />', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Search theme={theme} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements & styles', () => {
    const search = mount(<Search theme={theme} />);
    expect(search.find('input[placeholder="Search"]').length).toBe(1);
    expect(search).toHaveStyleRule('content', "'\\e986'", {
      modifier: ':before'
    });
  });
});
